import { Avatar, IconButton } from '@material-ui/core';
import React, { useState } from 'react';
import './chat.css';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import axios from './axios';

function Chat(props) {
	//console.log(props.message);
	return (
		<div className='chat'>
			{props.currentFriend && (
				<>
					<div className='chat_header'>
						<Avatar />
						<div className='chat_header_info'>
							<h3>{props.currentFriend}</h3>
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
						{props.message.map((m) => (
							<div key={m._id} className='chat_message'>
								<p className='chat_name'>{m.sender}</p>
								<span className='chat_content'>
									{m.text} <span className='chat_time'></span>
								</span>
							</div>
						))}
					</div>
					<div className='chat_footer'>
						<InsertEmoticonIcon />
						<form onSubmit={props.sendMessage}>
							<input
								value={props.input}
								onChange={(e) => props.setInput(e.target.value)}
								type='text'
								placeholder='Enter the message'></input>
							<button>SUBMIT</button>
						</form>
					</div>
				</>
			)}
		</div>
	);
}

export default Chat;
