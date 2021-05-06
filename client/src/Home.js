import React from 'react';
import './Home.css';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Copyright from './Copyright.js';
function Home() {
	return (
		<div id='homeComponent'>
			<h3>Welcome to Chat</h3>
			<div>
				<Link to='/login'>
					<Button
						className='buttons_landing'
						variant='contained'
						color='primary'>
						Login
					</Button>
				</Link>

				<span> </span>
				<Link to='/signup'>
					<Button
						className='buttons_landing'
						variant='contained'
						color='primary'>
						SignUp
					</Button>
				</Link>
				<Copyright />
			</div>
		</div>
	);
}

export default Home;
