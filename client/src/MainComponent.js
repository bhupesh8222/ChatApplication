import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar.js';
import Chat from './Chat.js';
import './App.css';

import axios from './axios';

function MainComponent() {
	let [message, setMessage] = useState([]);

	useEffect(() => {
		axios.get('http://localhost:2000/').then((response) => {
			console.log(response);
		});
	}, []);

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
