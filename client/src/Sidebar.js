import React from 'react'
import "./sidebar.css"
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from "./SidebarChat";

function Sidebar() {
    return (
        <div className = "sidebar">
            <div className = "sidebar_header">
                <Avatar/>
                <div className = "sidebar_header_right">
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>
            <div className = "sidebar_search">
                <SearchOutlinedIcon />
                <input type = "text" placeholder= "Search or start new chat"></input>
            </div>
            <div className = "sidebar_chatArea">
                <SidebarChat/>
                <SidebarChat/>
            </div>
        </div>
    )
}

export default Sidebar
