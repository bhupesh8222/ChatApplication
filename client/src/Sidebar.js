import React, { useEffect, useState, useRef } from 'react';
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
	const [gotError, setgotError] = useState(false);
	const [inputValue, setinputValue] = useState('');
	const [foundUser, setfoundUser] = useState();
	const element = useRef(null);
	const [Selected, setSelected] = useState();
	let user = props.userDetails;

	const SearchUser = (e) => {
		e.preventDefault();
		axios
			.post('/searchuser', { userName: inputValue })
			.then((res) => {
				if (!res.data.username) {
					setgotError(true);
				} else if (res.data.username) {
					setfoundUser(res.data.username);
				}
			})
			.catch((err) => console.log(err));
	};

	/*const getLastMessage = (f) => {
		axios
			.post('http://localhost:2000/lastmessage', { friend: f })
			.then((res) => {
				return res.data;
			});
	};*/

	const onChangeInput = (e) => {
		//RESETTING USER & ERROR
		setgotError(false);
		setfoundUser();
		setinputValue(e.target.value);
	};

	//FOR CHECKING WHETHER WE ARE SENDING REQUEST TO EXISTING FRIEND
	const Isfriend = (name) => {
		for (let i = 0; i < user.MyConversation.length; i = i + 1) {
			if (user.MyConversation[i].friendName == name) return true;
		}
		return false;
	};

	//POTENTIAL BUG
	const AddFriend = () => {
		axios.post('/add', { friend: foundUser }).then((res) => {
			console.log(res.data);
			user = res.data;
			setinputValue('');
			setFriends(res.data.MyConversation);
			history.push('/app', { user: res.data });
		});
	};

	const chatDetailsBgColor = (e) => {
		props.getChatDetails(e);
		setSelected(e.target.innerText);
	};

	return (
		<div className='sidebar'>
			<div className='sidebar_header'>
				<div>
					<Avatar />
				</div>
				<div className='user'>{user.username}</div>
				<Button
					className='btn__'
					variant='contained'
					color='secondary'
					onClick={props.Logout}>
					Logout
				</Button>
			</div>

			<form onSubmit={(e) => SearchUser(e)}>
				<input
					id='searchFriend'
					value={inputValue}
					onChange={(e) => onChangeInput(e)}
					type='text'
					placeholder='Search for a friend'></input>
				<button>SUBMIT</button>
			</form>
			{!inputValue && (
				<div className='sidebar_chatArea'>
					<div className='sidebar_chat'>
						{friends.map((e) => (
							<div
								key={e.friendName}
								className='sidebar_chat_info'
								style={{
									backgroundColor: Selected === e.friendName ? 'thistle' : '',
								}}
								ref={element}>
								<Avatar />
								<div>
									<h2 onClick={(e) => chatDetailsBgColor(e)}>{e.friendName}</h2>
									<div>{/*getLastMessage(e.friendName)*/}</div>
								</div>
							</div>
						))}
					</div>
				</div>
			)}

			{inputValue && (
				<div>
					{!foundUser && (
						<div className='addfriend'>
							<div>
								<CircularProgress color='secondary' />
							</div>
						</div>
					)}

					{foundUser && (
						<>
							<div className='addfriend'>
								<h4>USER FOUND!</h4>
							</div>

							<div className='sidebar_chat_info foundUser'>
								<Avatar />
								<div>
									<h2>{foundUser}</h2>
									<h3>{/*getLastMessage(e.friendName)*/}</h3>
								</div>
							</div>
							<div className='addfriend'>
								{user.username != foundUser && !Isfriend(foundUser) && (
									<Button
										variant='contained'
										color='secondary'
										onClick={AddFriend}>
										Add Friend
									</Button>
								)}
							</div>
						</>
					)}
					{gotError && (
						<div className='userError'>No user with such name exist</div>
					)}
				</div>
			)}
		</div>
	);
}

export default Sidebar;
