import React, { useState } from "react";
import { ChatState } from "../components/context/ChatProvider";
import Box from "@mui/material/Box";
import SideBar from "../components/miscellaneous/SideBar";
import MyChat from "../components/MyChat.jsx";
import ChatBox from "../components/ChatBox.jsx";

const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState();
  return (
    <div style={{ width: "100%" }}>
      {user && <SideBar />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          w: "100%",
          h: "90vh",
          p: "10px",
        }}
      >
        {user && (
          <MyChat fetchAgain={fetchAgain}/>
        )}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
