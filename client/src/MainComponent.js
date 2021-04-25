import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar.js';
import Chat from './Chat.js';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from './axios';

function MainComponent(CURRENT_USER) {
	let [message, setMessage] = useState([]);

	//---------ACCESSING THE USER DETAILS-------------
	//console.log(CURRENT_USER.location.state.user);
	//----------------------------

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

	return (
		<div className='app'>
			<div className='app_components'>
				<Sidebar CURRENT_USER={CURRENT_USER} />
				<Chat message={message} />
			</div>
		</div>
	);
}

export default MainComponent;
