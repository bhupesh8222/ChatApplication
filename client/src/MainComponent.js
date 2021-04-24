import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar.js';
import Chat from './Chat.js';
import './App.css';

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
				<Sidebar />
				<Chat message={message} />
			</div>
		</div>
	);
}

export default MainComponent;
