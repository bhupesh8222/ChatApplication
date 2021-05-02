import React, { useEffect, useState } from 'react';
import './sidebar.css';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Button from '@material-ui/core/Button';

import axios from './axios';

function Sidebar(props) {
	const [friends, setFriends] = useState(props.userDetails.MyConversation);
	let user = props.userDetails;

	const getLastMessage = () => {
		return 'This is the last message sent.....';
	};

	/*const getChatDetails = (e) => {
		//console.log(e.target.textContent);
		const myfriend = e.target.textContent;
		axios
			.post('http://localhost:2000/chats', { friend: myfriend })
			.then((response) => {
				console.log(response);
			})
			.catch((error) => console.log(error));
	};*/
	/*useEffect(() => {
		axios
			.post('/message/add/Hello')
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => console.log(error));
	}, []);*/

	return (
		<div className='sidebar'>
			<div className='sidebar_header'>
				<div>
					<Avatar />
					<div className='user'>{user.username}</div>
				</div>

				<Button className='btn__' variant='outlined'>
					Logout
				</Button>
			</div>
			<div className='sidebar_search'>
				<SearchOutlinedIcon />
				<input type='text' placeholder='Search or start new chat'></input>
			</div>
			<div className='sidebar_chatArea'>
				<div className='sidebar_chat'>
					{friends.map((e) => (
						<div
							onClick={(e) => props.getChatDetails(e)}
							key={e.friendName}
							className='sidebar_chat_info'>
							<Avatar />
							<div>
								<h2>{e.friendName}</h2>
								<p>{getLastMessage()}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
