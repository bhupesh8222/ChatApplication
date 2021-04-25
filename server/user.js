import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique: 1,
	},
	email: {
		type: String,
		unique: 1,
	},

	password: String,
	//imgId: String,

	MyConversation: [
		{
			friendName: String,
			chats: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'conversation',
			},
		},
	],
});

userSchema.plugin(passportLocalMongoose);
const userModel = mongoose.model('User', userSchema);

/*userModel.create({
  username : "Anshit",
  password : "ASSS",
  email : "asasa",
  conversation :[
      {
        friend : "Bhupesh",
        chats : "6082a6a58ac43d3bac0850f7"

      }
  ]

})*/

export default userModel;
