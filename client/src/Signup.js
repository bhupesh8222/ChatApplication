import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import Copyright from './Copyright.js';
import axios from './axios';

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

export default function SignIn() {
	const history = useHistory();
	const classes = useStyles();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const [IsError, setIsError] = useState(false);

	const getTimeStamp = () => {
		let date = new Date();
		return date.toLocaleString();
	};

	const submitForm = async (e) => {
		e.preventDefault();
		axios
			.post('/signup', {
				username: username,
				password: password,
				email: email,
			})
			.then((response) => {
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
					Sign Up
				</Typography>
				<form className={classes.form} onSubmit={submitForm}>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						id='email'
						label='Set Username'
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
						id='email'
						label='Email Address'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						autoComplete='email'
						required
						type='email'
						id='standard-required'
					/>
					<TextField
						variant='outlined'
						margin='normal'
						required
						fullWidth
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						label='Set Password'
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
						Sign Up
					</Button>
				</form>
			</div>

			{IsError && (
				<Box mt={8}>
					<h3>SOMETHING WENT WRONG!!!</h3>
					<p>
						Maybe a user with that username already exist or enter correct email
						ID.
					</p>
				</Box>
			)}

			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}
