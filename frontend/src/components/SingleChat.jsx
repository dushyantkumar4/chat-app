import React, { useState } from "react";
import { Box, Typography, IconButton, Divider } from "@mui/material";
import { ChatState } from "./context/ChatProvider";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getSenderFull, getSender } from "../config/ChatLogic.js";
import ProfileModal from "./miscellaneous/ProfileModel.jsx";
import UpdateGroupChatModel from "./miscellaneous/UpdateGroupChatModel.jsx";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };
  return (
    <>
      {selectedChat ? (
        <>
          <Box
            sx={{
              fontSize: { xs: "28px", md: "30px" },
              pb: 1,
              px: 2,
              width: "100%",
              fontFamily: "Work sans",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: { xs: "28px", md: "30px" },
                width: "100%",
              }}
            >
              <IconButton
                onClick={() => setSelectedChat(null)}
                sx={{
                  display: { xs: "flex", md: "none" },
                  backgroundColor: "#e8e8e8",
                }}
              >
                <ArrowBackIcon sx={{ color: "black" }} />
              </IconButton>
              <Box>
                {!selectedChat.isGroupChat ? (
                  <>
                    {getSender(user, selectedChat.users)}
                    <ProfileModal
                      user={getSenderFull(user, selectedChat.users)}
                      open={openDialog}
                      handleClose={handleDialogClose}
                    />
                  </>
                ) : (
                  <>
                    {selectedChat.chatName.toUpperCase()}
                    <UpdateGroupChatModel
                      fetchAgain={fetchAgain}
                      setFetchAgain={setFetchAgain}
                      user={getSenderFull(user, selectedChat.users)}
                      open={openDialog}
                      handleClose={handleDialogClose}
                    />
                  </>
                )}
              </Box>
              <IconButton>
                <VisibilityIcon onClick={handleDialogOpen} />
              </IconButton>
            </Box>
          </Box>
          {/* <Divider  component="" sx={{width:"100%"}}/> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
              backgroundColor: "#E8E8E8",
              width: "100%",
              height: "100%",
              borderRadius: 3,
              overflowY: "hidden",
            }}
          >
            messagehere
          </Box>
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            backgroundColor: "white",
            color: "black",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "30px",
              pb: 2,
              fontFamily: "Work sans",
              color: "black",
            }}
          >
            Click on user to start Chating
          </Typography>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
