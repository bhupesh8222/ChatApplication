import { Avatar, IconButton } from "@material-ui/core";
import React from "react";
import "./chat.css"
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';

function Chat()
{
    return(
        <div className="chat">
            <div className= "chat_header">
                <Avatar/>
                <div className = "chat_header_info">
                    <h3>Room Name</h3>
                    <p>Last Seen........</p>
                </div>
                <div className = "chat_header_right">
                    <IconButton>
                        <SearchOutlinedIcon/>
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className = "chat_body">
                <div className="chat_message">
                    <p className="chat_name">BHUPESH</p>
                    <span className="chat_content">This is a chat_message  <span className="chat_time">12:00</span></span>
                </div>
                <div className="chat_message chat_reciever">
                    <p className="chat_name">BHUPESH</p>
                    <span className="chat_content chat_content_reciever ">This is a chat_message  <span className="chat_time">12:00</span></span>
                 </div>
            </div>
            <div className="chat_footer">
            <InsertEmoticonIcon/>
            <form>
                <input type= "text" placeholder ="Enter the message"></input>
                <button>SUBMIT</button>
            </form>
            </div>
        </div>
    )
}

export default Chat;