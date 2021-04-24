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
import axios from './axios';

function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='https://material-ui.com/'>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

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

	const getTimeStamp = () => {
		let date = new Date();
		return date.toLocaleString();
	};

	const submitForm = async (e) => {
		e.preventDefault();
		const user = await axios.post('http://localhost:2000/signup', {
			username: username,
			password: password,
			email: email,
		});

		history.push('/');
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
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}
