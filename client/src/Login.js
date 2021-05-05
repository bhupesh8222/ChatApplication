import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import axios from './axios';
import Copyright from './Copyright.js';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},

	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn(x) {
	const history = useHistory();
	const classes = useStyles();
	const [IsError, setIsError] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const submitForm = (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:2000/login', {
				username: username,
				password: password,
			})
			.then((response) => {
				console.log(response);
				history.push('/app', { user: response.data });
			})
			.catch((error) => setIsError(true));

		//console.log(user.data); //user.data contains the details
		//CALLING THE HOME PAGE AFTER SIGNUP & SENDING DETAILS OF CURRENT USER THERE !
		//history.push('/', { user: user.data });
	};
	return (
		<Container component='main' maxWidth='xs'>
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component='h1' variant='h5'>
					Sign in
				</Typography>
				<form className={classes.form} onSubmit={submitForm}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='email'
						label='Enter UserName'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						autoComplete='text'
						autoFocus
						required
						id='standard-required'
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						label='Enter Password'
						type='password'
						id='password'
						autoComplete='current-password'
						required
						id='standard-required'
					/>

					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						Sign In
					</Button>
					<Grid container>
						<Grid item>
							<Link to='/signup' variant='body2'>
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			{IsError && (
				<Box mt={8}>
					<h3>SOMETHING WENT WRONG!!!</h3>
					<p>Enter correct details .</p>
				</Box>
			)}
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}
