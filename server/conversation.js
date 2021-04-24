import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    messages:[
        {
            text : String,
            timestamp : String,
            sender : String,
            reciever : String
        }
    ]
})

const conversationModel = mongoose.model("conversation", conversationSchema);

/*conversationModel.create({
    friendName : "Bhupesh",
    messages : [{
        text : "String",
        timestamp : "String",
        sender : "String",
        reciever : "String"
    }]
})*/
export {conversationModel, conversationSchema}; 