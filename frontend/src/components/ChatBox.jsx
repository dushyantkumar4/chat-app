import React from "react";
import { ChatState } from "../components/context/ChatProvider.jsx";
import { Box } from "@mui/material";
import SingleChat from "./SingleChat.jsx";

const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();
  return (
    <Box
      sx={{
        display: { xs: selectedChat ? "flex" : "none" },
        md: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        backgroundColor: "white",
        width: { xs: "100%", md: "65%" },
        borderRadius: 2,
        borderWidth: 1,
        height:"80vh"
      }}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default ChatBox;
