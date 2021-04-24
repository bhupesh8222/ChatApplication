import { Avatar, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import './chat.css';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import axios from './axios';

function Chat({ message }) {
	const [input, setInput] = useState(' ');

	const sendMessage = async (e) => {
		e.preventDefault();
		await axios.post('http://localhost:9000/message/add', {
			message: input,
			username: 'BHUPESH',
			timestamp: '12:00',
		});

		setInput(' ');
	};

	return (
		<div className='chat'>
			<div className='chat_header'>
				<Avatar />
				<div className='chat_header_info'>
					<h3>Room Name</h3>
					<p>Last Seen........</p>
				</div>
				<div className='chat_header_right'>
					<IconButton>
						<SearchOutlinedIcon />
					</IconButton>
					<IconButton>
						<AttachFileIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>
			<div className='chat_body'>
				{message.map((m) => (
					<div key={m._id} className='chat_message'>
						<p className='chat_name'>{m.username}</p>
						<span className='chat_content'>
							{m.message} <span className='chat_time'>{m.timestamp}</span>
						</span>
					</div>
				))}
			</div>
			<div className='chat_footer'>
				<InsertEmoticonIcon />
				<form onSubmit={sendMessage}>
					<input
						value={input}
						onChange={(e) => setInput(e.target.value)}
						type='text'
						placeholder='Enter the message'></input>
					<button>SUBMIT</button>
				</form>
			</div>
		</div>
	);
}

export default Chat;
