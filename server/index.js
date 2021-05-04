import express from 'express';
import mongoose from 'mongoose';
import queryString from 'query-string';
import { conversationModel } from './conversation.js';
import userModel from './user.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passportLocalMongoose from 'passport-local-mongoose';
import passport from 'passport';
import expressSession from 'express-session';
import passportLocal from 'passport-local';
const port = process.env.PORT || 2000;
import Pusher from 'pusher';
const app = express();

app.use(express.json());

app.use(
	express.urlencoded({
		extended: true,
	})
);

//WE CAN MAKE CORS POSSIBLE W/O CORS LIBRARY
//cors library is doing these stuffs for us, i.e setting the access-control-allow-origin-response

app.use(function (req, res, next) {
	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

	// Request methods you wish to allow
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	);

	// Request headers you wish to allow
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,content-type'
	);

	// Set to true if you need the website to include cookies in the requests sent
	// to the API (e.g. in case you use sessions)
	res.setHeader('Access-Control-Allow-Credentials', true);

	// Pass to next layer of middleware
	next();
});

/*app.use(
	cors({
		origin: 'http://localhost:3000',
		credentials: true,
	})
);*/
app.use(cookieParser('This is the secret'));

//import passportLocalMongoose from "passport-local-mongoose";

app.use(
	expressSession({
		secret: 'This is the secret',
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

const pusher = new Pusher({
	appId: '1192384',
	key: '1daad050e7d8ba9c63ad',
	secret: 'b8d11efded9f95ec538a',
	cluster: 'ap2',
	useTLS: true,
});

const url =
	'mongodb+srv://bhupesh:bhupesh@cluster0.etje3.mongodb.net/ChatApp?retryWrites=true&w=majority';

mongoose.connect(url, {
	useCreateIndex: true,
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

const db = mongoose.connection;
db.once('open', () => {
	console.log('CONNECTED');
	const msgCollection = db.collection('conversations');
	const changeStream = msgCollection.watch();
	changeStream.on('change', (change) => {
		console.log(change);
		if (change.operationType == 'update') {
			const msgDetails = change.updateDescription.updatedFields;
			console.log('Messgae Deials', msgDetails);
			let data = Object.values(msgDetails)[1];
			console.log(data);
			pusher.trigger('messages', 'inserted', data);
		} else {
			console.log('PUSHER ERROR!');
		}
	});
});
///-------------------------------------ROUTES----------------------------------------------

//---------------------------------------AUTH-----------------------------------------------

app.post('/signup', async (req, res) => {
	let newUser = new userModel({
		username: req.body.username,
		email: req.body.email,
		conversation: [],
	});
	try {
		let userDetails = await userModel.register(newUser, req.body.password);
		await passport.authenticate('local');

		res.send(userDetails);
	} catch (error) {
		console.log(error);
		res.status(500).send(console.error);
	}
});

app.post(
	'/login',
	passport.authenticate('local', { session: true }),
	(req, res) => {
		res.send(req.user);
		//console.log(req.session);
	}
);

app.get('/logout', (req, res) => {
	console.log('LOGGEDOUT!');
	req.logout();
	res.send('Logged Out!');
});

//-----------------------------OTHER ROUTES---------------------------

function isloggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		console.log('NOT LOGGED IN !');
		res.status(500).send('DENIED PERMISSION!');
	}
}

app.get('/', isloggedIn, (req, res) => {
	res.send(req.user);
});

//route to see conversation with a friend

app.post('/chats', isloggedIn, async (req, res) => {
	try {
		const conversation = await req.user.MyConversation.find(
			(element) => element.friendName == req.body.friend
		);
		const messages = await conversationModel.findById(conversation.chats);
		res.send(messages);
		//await MessageModel.remove({})
	} catch (error) {
		console.log(error);
		res.status(500).send(error);
	}
});

//send message to a friend

app.post('/message/add', isloggedIn, async (req, res) => {
	console.log('REQUESTED');
	//console.log(req.params.friend);
	try {
		//console.log(req.body.friend);

		const conversation = req.user.MyConversation.find(
			(element) => element.friendName == req.body.reciever
		);

		console.log('CONVERSATION CHATS ', conversation);

		if (conversation.chats) {
			const messagesFound = await conversationModel.findById(
				conversation.chats
			);
			await messagesFound.messages.push(req.body);
			await messagesFound.save();
			res.send(messagesFound);
		}

		//FIRST TIME SENDING MESSAGE!
		/*else {
			console.log('FIRST TIME SENDING MESSAGE!');

			const NewConversation = {
				messages: [req.body],
			};

			const conversationCreated = await conversationModel.create(
				NewConversation
			);

			console.log(conversationCreated);

			conversation.chats = conversationCreated._id;
			req.user.save();

			//finding friend
			const FriendFound = await userModel.findOne({
				username: req.body.friend,
			});

			console.log('FRIEND FOUND', FriendFound);

			//finding conversation
			const FriendConversation = await FriendFound.MyConversation.find(
				(element) => element.friendName == req.user.username
			);

			FriendConversation.chats = conversationCreated._id;

			FriendFound.save();

			res.send(conversationCreated.messages);
		}*/
	} catch (error) {
		res.status(500).send(error);
	}
});

//add friend
app.post('/add', isloggedIn, async (req, res) => {
	try {
		const NewConversation = {
			messages: [
				{
					text: 'System Generated first Message',
					sender: req.user.username,
					reciever: req.body.friend,
				},
			],
		};

		const conversationCreated = await conversationModel.create(NewConversation);

		//Adding friend

		const FriendFound = await userModel.findOne({ username: req.body.friend });
		console.log(FriendFound);

		FriendFound.MyConversation = await [
			{ friendName: req.user.username },
		].concat(FriendFound.MyConversation);

		//linking the chats
		FriendFound.MyConversation[0].chats = conversationCreated;

		/*await FriendFound.MyConversation.push({
			friendName: req.user.username,
		});*/

		await FriendFound.save();

		req.user.MyConversation = await [{ friendName: req.body.friend }].concat(
			req.user.MyConversation
		);

		//linking the chats
		req.user.MyConversation[0].chats = conversationCreated;

		/*await req.user.MyConversation.push({
			friendName: req.body.friend,
		});*/

		await req.user.save();

		res.send(req.user);
	} catch (error) {
		res.status(500).send(error);
	}
});

/*app.post("/addfriend",isloggedIn, async(req,res)=>{
  
    //req.user contains the details of the user in the current session
    
})*/

app.post('/lastmessage', isloggedIn, async (req, res) => {
	try {
		const friend = req.body.friend;
		const conversation = req.user.MyConversation.find(
			(element) => element.friendName == friend
		);

		const chats = await conversationModel.findById(conversation.chats);
		//console.log(chats);
		res.send(chats.messages[chats.messages.length - 1].text);
	} catch (error) {
		res.status(500).send(error);
	}
});

//Search User

app.post('/searchuser', isloggedIn, async (req, res) => {
	try {
		const user = await userModel.findOne({ username: req.body.userName });
		if (!user) res.send('No user exist!');
		if (user) res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.listen(port, () => {
	console.log('SERVER STARTED!');
});
