import React, {useEffect, useState} from 'react';
import Sidebar from "./Sidebar.js"
import Chat from "./Chat.js"
import './App.css';
import Pusher from "pusher-js";
import axios from "./axios";
function App() {
  let [message, setMessage] = useState([]);

  useEffect(()=>{
    axios.get("/message/get").then((response)=>{
        setMessage(response.data);
    })
  },[])

  useEffect(() => {
    const pusher = new Pusher('1daad050e7d8ba9c63ad', {
      cluster: 'ap2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage)=> {
      alert(JSON.stringify(newMessage));
      setMessage([...message, newMessage]);
    });
  }, [message])

  console.log(message);

  return (
    <div className = "app">
      <div className="app_components">
      <Sidebar/>
      <Chat/>
      </div>
    </div>

  );
}

export default App;
