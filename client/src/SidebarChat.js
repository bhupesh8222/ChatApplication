import React from "react";
import  {Avatar} from '@material-ui/core';
import "./SidebarChat.css"


function SidebarChat ()
{
    return(
        <div className= "sidebar_chat">
            <Avatar/>
            <div className = "sidebar_chat_info">
            <h2>ROOM NAME</h2>
            <p>Heelo this is the last message</p>
            </div>
        </div>
    )
}

export default SidebarChat;
