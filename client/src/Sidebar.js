import React, { useEffect } from 'react';
import './sidebar.css';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Button from '@material-ui/core/Button';
import SidebarChat from './SidebarChat';
import axios from './axios';

function Sidebar(CURRENT_USER) {
	useEffect(() => {
		axios
			.post('/message/add/Hello')
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => console.log(error));
	}, []);
	return (
		<div className='sidebar'>
			<div className='sidebar_header'>
				<div>
					<Avatar />
					<div className='user'>USER</div>
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
				<SidebarChat />
				<SidebarChat />
			</div>
		</div>
	);
}

export default Sidebar;
