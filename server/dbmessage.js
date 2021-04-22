import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
    message:String,
    username :String,
    timestamp:String
})

export default mongoose.model("chatmessage", chatSchema);