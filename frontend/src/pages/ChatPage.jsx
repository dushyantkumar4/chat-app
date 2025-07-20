import React from "react";
import { ChatState } from "../components/context/ChatProvider";
import Box from "@mui/material/Box";
import SideBar from "../components/miscellaneous/SideBar";
import MyChat from "../components/MyChat.jsx"
import ChatBox from "../components/ChatBox.jsx"

const ChatPage = () => {
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {user && <SideBar />}
      <Box  sx={{display:"flex", justifyContent:"space-between",w:"100%",h:"90vh",p:"10px"}}>
        {user && <MyChat/>}
        {user && <ChatBox/>}
      </Box>
    </div>
  );
};

export default ChatPage;
