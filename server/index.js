import express from 'express';
import mongoose from 'mongoose';
import queryString from 'query-string';
import { conversationModel } from './conversation.js';
import userModel from './user.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const port = process.env.PORT || 2000;

const app = express();
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use(cors());
app.use(cookieParser());

import passport from 'passport';
import expressSession from 'express-session';
import passportLocal from 'passport-local';
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

/*const pusher = new Pusher({
    appId: "1192384",
    key: "1daad050e7d8ba9c63ad",
    secret: "b8d11efded9f95ec538a",
    cluster: "ap2",
    useTLS: true
  });*/

const url =
	'mongodb+srv://bhupesh:bhupesh@cluster0.etje3.mongodb.net/ChatApp?retryWrites=true&w=majority';

mongoose
	.connect(url, {
		useCreateIndex: true,
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => {
		console.log('DB CONNECTED!');

		/*const db= mongoose.connection;

    const msgCollection = db.collection("chatmessages");
    const changeStream = msgCollection.watch();
    changeStream.on("change", (change, error)=>{
      if(change.operationType=="insert")
       {
           const msgDetails = change.fullDocument;
           pusher.trigger("messages" , "inserted", {
               username : msgDetails.username,
               message : msgDetails.message,
               timestamp:msgDetails.message.timestamp
           })
       }
       else{
           console.log("PUSHER ERROR!", error);
       }
    })*/
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

app.post('/login', passport.authenticate('local', {}), (req, res) => {
	res.send(req.user);
	//console.log(req.session);
});

app.get('/logout', (req, res) => {
	req.logout();
});

//-----------------------------OTHER ROUTES---------------------------

function isloggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.status(500).send('DENIED PERMISSION!');
	}
}

app.get('/', (req, res) => {
	res.send(req.user);
});

//route to see conversation with a friend

app.get('/message/get/:friend', isloggedIn, async (req, res) => {
	try {
		const conversation = await req.user.MyConversation.find(
			(element) => element.friendName == req.params.friend
		);
		const messages = await conversationModel.findById(conversation.chats);
		res.send(messages);
		//await MessageModel.remove({})
	} catch (error) {
		res.status(500).send(error);
	}
});

//send message to a friend

app.post('/message/add/:friend', isloggedIn, async (req, res) => {
	console.log('REQUESTED');
	//console.log(req.params.friend);
	try {
		//console.log(req.user);

		const conversation = req.user.MyConversation.find(
			(element) => element.friendName == req.params.friend
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
		else {
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
				username: req.params.friend,
			});

			console.log('FRIEND FOUND', FriendFound);

			//finding conversation
			const FriendConversation = await FriendFound.MyConversation.find(
				(element) => element.friendName == req.user.username
			);

			FriendConversation.chats = conversationCreated._id;

			FriendFound.save();

			res.send(conversationCreated.messages);
		}
	} catch (error) {
		res.status(500).send(error);
	}
});

//add friend
app.post('/add', async (req, res) => {
	console.log('add');

	const FriendFound = await userModel.findOne({ username: req.body.friend });
	console.log(FriendFound);

	await FriendFound.MyConversation.push({
		friendName: req.user.username,
	});

	await FriendFound.save();

	await req.user.MyConversation.push({
		friendName: req.body.friend,
	});

	await req.user.save();

	res.send(req.user);
});

/*app.post("/addfriend",isloggedIn, async(req,res)=>{
  
    //req.user contains the details of the user in the current session
    
})*/

app.listen(port, () => {
	console.log('SERVER STARTED!');
});
