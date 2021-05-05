import React from 'react';
import './Home.css';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
function Home() {
	return (
		<div id='homeComponent'>
			<h3>Welcome to Chat</h3>
			<div>
				<Link href='/login'>
					<Button
						className='buttons_landing'
						variant='contained'
						color='primary'>
						Login
					</Button>
				</Link>

				<span> </span>
				<Link href='/signup'>
					<Button
						className='buttons_landing'
						variant='contained'
						color='primary'>
						SignUp
					</Button>
				</Link>
			</div>
		</div>
	);
}

export default Home;
