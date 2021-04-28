import React, { useState } from 'react';
import { Avatar } from '@material-ui/core';
import './SidebarChat.css';
import axios from './axios';

function SidebarChat({ userDetails }) {
	//const [friendsList, setFriendsList] = useState(props.MyConversation);
	console.log(userDetails.username);
	return (
		<div className='sidebar_chat'>
			{/*{friendsList.map((friend) => (
				<div className='sidebar_chat_info'>
					<h2>{friend.friendName}</h2>
					<p>Heelo this is the last message</p>
				</div>
            ))}*/}
			<Avatar />
		</div>
	);
}

export default SidebarChat;
