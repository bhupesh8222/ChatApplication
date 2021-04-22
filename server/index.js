import express from "express";
import mongoose from "mongoose";
import MessageModel from "./dbmessage.js";
import Pusher from "pusher";
import cors from "cors";
const port = process.env.PORT || 9000;

const app = express();
app.use(express.json());
app.use(cors());
const pusher = new Pusher({
    appId: "1192384",
    key: "1daad050e7d8ba9c63ad",
    secret: "b8d11efded9f95ec538a",
    cluster: "ap2",
    useTLS: true
  });

const url ="mongodb+srv://bhupesh:bhupesh@cluster0.etje3.mongodb.net/ChatApp?retryWrites=true&w=majority";

mongoose.connect(url, {
    useCreateIndex:true,
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>{
    console.log("DB CONNECTED!");

    const db= mongoose.connection;

    const msgCollection = db.collection("chatmessages");
    const changeStream = msgCollection.watch();
    changeStream.on("change", (change)=>{
       if(change.operationType=="insert")
       {
           const msgDetails = change.fullDocument;
           pusher.trigger("messages" /*channel*/, "inserted", /*eventName*/{
               username : msgDetails.username,
               message : msgDetails.message
           })
       }
       else{
           console.log("PUSHER ERROR!");
       }
    })
});

app.get("/", (req,res)=>{
    res.send("HOME!");
})

app.get("/message/get", async(req, res)=>{
    try{
        let data = await MessageModel.find();
        res.send(data)
    }
    catch(error)
    {
        res.status(500).send(error);
    }

})

app.post("/message/add", async (req,res)=>{
    const message = req.body;
    try{
        let data = await MessageModel.create(message);
        res.send(data);
    }
    catch(error)
    {
        res.status(500).send(error);
    }
})


app.listen(port, ()=>{
    console.log("SERVER STARTED!");
})