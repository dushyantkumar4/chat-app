import React from 'react'
import {ChatState} from "../components/context/ChatProvider.jsx";
import {Box} from "@mui/material";

const ChatBox = () => {
  const {selectedChat} = ChatState();
  return (
    <Box>
      
    </Box>
  )
}

export default ChatBox;