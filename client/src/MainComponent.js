import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar.js';
import Chat from './Chat.js';
import './App.css';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from './axios';

function MainComponent(CURRENT_USER) {
	const [message, setMessage] = useState([]);
	//---------ACCESSING THE USER DETAILS-------------
	//console.log(CURRENT_USER.location.state.user);
	//----------------------------
	const userDetails = CURRENT_USER.location.state.user;
	console.log(userDetails);
	//console.log(CURRENT_USER.location.state.user);
	/*useEffect(() => {
    const pusher = new Pusher('1daad050e7d8ba9c63ad', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage)=> {
      setMessage([...message, newMessage]);
    });
    setMessage()
  }, [message])*/

	//REDIRECTING TO THE MAIN PAGE FROM EITHER LOGIN/SIGNUP, so CURRENT_USER.location.state contains the details of user

	return (
		<div className='app'>
			{CURRENT_USER.location.state && (
				<div className='app_components'>
					<Sidebar userDetails={userDetails} />
					<Chat userDetails={userDetails} />
				</div>
			)}
			{!CURRENT_USER.location.state && (
				<div>
					<h1> ACCESS DENIED!</h1>
					<div className='denied_access'>
						<Link to='/login'>
							<Button variant='contained' color='primary'>
								Login
							</Button>
						</Link>
						<Link to='/signup'>
							<Button variant='contained' color='primary'>
								Signup
							</Button>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}

export default MainComponent;
