import React, { useState } from "react";
import { ChatState } from "./context/ChatProvider";
import { Snackbar, Alert, Box, Button, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import ChatLoading from "./ChatLoading";
import { getSender } from "../config/ChatLogic.js";
import GroupChatModel from "./miscellaneous/GroupChatModel.jsx";

const MyChat = ({fetchAgain}) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errType, setErrType] = useState(false);

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/chat`, config);
      setChats(data);
    } catch (err) {
      console.log(err.message);
      setErrorMessage(err.message);
      setOpenSnackbar(true);
      return;
    }
  };

  React.useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      sx={{
        borderWidth: "1px",
        borderRadius: 2,
        width: { xs: "100%", md: "27%" },
        height: "80vh",
        background: "white",
        p: 2,
        display: {
          xs: selectedChat ? "none" : "flex",
          md: "flex",
        },
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={errType ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          pb: 2,
          px: 2,
          fontSize: { xs: "27px", md: "29px" },
          fontFamily: "Work sans",
          fontWeight: 300,
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        My Chats
        <GroupChatModel>
          <Button
            sx={{
              textTransform: "none",
              color: "white",
              fontWeight: "700",
              py: 1,
              display: "flex",
              alignItems: "center",
            }}
            variant="contained"
          >
            New Group chat &nbsp;
            <AddIcon />
          </Button>
        </GroupChatModel>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 2,
          backgroundColor: "#F8F8F8",
          width: "100%",
          height: "100%",
          borderRadius: 2,
          overflowY: "hidden",
        }}
      >
        {chats ? (
          <Stack sx={{ overflowY: "scroll" }}>
            {chats.map((chat) => (
              <Box
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
                sx={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedChat === chat ? "#38B2AC" : "#E8E8E8",
                  color: selectedChat === chat ? "white" : "black",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  mb: 1,
                }}
              >
                <Typography>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Typography>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChat;
