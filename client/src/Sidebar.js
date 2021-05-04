import React, { useEffect, useState } from 'react';
import './sidebar.css';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from './axios';

function Sidebar(props) {
	const history = useHistory();
	const [friends, setFriends] = useState(props.userDetails.MyConversation);
	const [found, setfound] = useState(false);
	const [inputValue, setinputValue] = useState(' ');
	let user = props.userDetails;

	const SearchUser = () => {};
	const getLastMessage = (f) => {
		axios
			.post('http://localhost:2000/lastmessage', { friend: f })
			.then((res) => {
				return res.data;
			});
	};

	return (
		<div className='sidebar'>
			<div className='sidebar_header'>
				<div>
					<Avatar />
					<div className='user'>{user.username}</div>
				</div>

				<Button className='btn__' variant='outlined' onClick={props.Logout}>
					Logout
				</Button>
			</div>

			<form onSubmit={SearchUser}>
				<input
					id='searchFriend'
					value={inputValue}
					onChange={(e) => setinputValue(e.target.value)}
					type='text'
					placeholder='Search for a friend'></input>
				<button>SUBMIT</button>
			</form>
			{!inputValue && (
				<div className='sidebar_chatArea'>
					<div className='sidebar_chat'>
						{friends.map((e) => (
							<div key={e.friendName} className='sidebar_chat_info'>
								<Avatar />
								<div>
									<h2 onClick={(e) => props.getChatDetails(e)}>
										{e.friendName}
									</h2>
									<h3>{/*getLastMessage(e.friendName)*/}</h3>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{inputValue && (
				<div>
					{!found && (
						<div className='addfriend'>
							<CircularProgress color='secondary' />
						</div>
					)}

					{found && (
						<>
							<div className='addfriend'>
								<h3>USER FOUND!</h3>
							</div>

							<div className='sidebar_chat_info foundUser'>
								<Avatar />
								<div>
									<h2>SEARCHED</h2>
									<h3>{/*getLastMessage(e.friendName)*/}</h3>
								</div>
							</div>
							<div className='addfriend'>
								<Button variant='contained'>Add friend</Button>
							</div>
						</>
					)}
				</div>
			)}
		</div>
	);
}

export default Sidebar;
