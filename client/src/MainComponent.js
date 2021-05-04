import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar.js';
import Chat from './Chat.js';
import './App.css';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from './axios';
import Pusher from 'pusher-js';
import { useHistory } from 'react-router-dom';

function MainComponent(CURRENT_USER) {
	const history = useHistory();
	const [message, setMessage] = useState([]);
	const [currentFriend, setcurrentFriend] = useState();
	const [input, setInput] = useState(' ');

	useEffect(() => {
		const pusher = new Pusher('1daad050e7d8ba9c63ad', {
			cluster: 'ap2',
		});
		Pusher.logToConsole = true;

		var channel = pusher.subscribe('messages');
		channel.bind('inserted', (data) => {
			console.log('NewMessge from pusher', data);
			//alert(JSON.stringify(data));
			setMessage([...message, data]);
		});
	}, [message]);

	const sendMessage = async (e) => {
		e.preventDefault();
		axios
			.post('http://localhost:2000/message/add', {
				text: input,
				sender: CURRENT_USER.location.state.user.username,
				reciever: currentFriend,
				timestamp: new Date().toLocaleString(),
			})
			.then((res) => {
				//setMessage(res.data);
			})
			.catch((err) => console.log(err));
		setInput(' ');
	};

	const Logout = async () => {
		await axios.get('http://localhost:2000/logout');
		history.push('/login');
	};

	const getChatDetails = async (e) => {
		const myfriend = e.target.textContent;
		axios
			.post('http://localhost:2000/chats', { friend: myfriend })
			.then((response) => {
				//console.log(response.data.messages);
				setMessage(response.data.messages);
				setcurrentFriend(myfriend);
			})
			.catch((error) => console.log(error));
	};

	//---------ACCESSING THE USER DETAILS-------------
	//console.log(CURRENT_USER.location.state.user);
	//----------------------------
	const userDetails = CURRENT_USER.location.state.user;
	//console.log(userDetails);

	//console.log(CURRENT_USER.location.state.user);

	//REDIRECTING TO THE MAIN PAGE FROM EITHER LOGIN/SIGNUP, so CURRENT_USER.location.state contains the details of user

	return (
		<div className='app'>
			{CURRENT_USER.location.state && (
				<div className='app_components'>
					<Sidebar
						userDetails={userDetails}
						getChatDetails={getChatDetails}
						Logout={Logout}
					/>
					{message && (
						<Chat
							message={message}
							currentFriend={currentFriend}
							sendMessage={sendMessage}
							setInput={setInput}
							input={input}
							currentUser={userDetails.username}
						/>
					)}
				</div>
			)}
			{!CURRENT_USER.location.state && (
				<div>
					<h1> ACCESS DENIED!</h1>
					<div className='denied_access'>
						<Link to='/login'>
							<Button variant='contained' color='primary'>
								Login
							</Button>
						</Link>
						<Link to='/signup'>
							<Button variant='contained' color='primary'>
								Signup
							</Button>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
}

export default MainComponent;
