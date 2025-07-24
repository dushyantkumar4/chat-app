import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  styled,
  Button,
  TextField,
  Snackbar,
  Alert,
  FormControl,
  Skeleton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ChatState } from "../context/ChatProvider";
import axios from "axios";
import UserListItem from "../UserAvtar/UserListItem.jsx";
import UserBadgeItem from "../UserAvtar/UserBadgeItem.jsx";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(),
  },
  "& .MuiDialog-paper": {
    width: "600px",
    maxWidth: "40%",
    borderRadius: 8,
  },
}));

const GroupChatModel = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState();
  const [searchReselt, setSearchResult] = useState([]);
  const [loading, setLaoding] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errType, setErrType] = useState(false);

  const { user, chats, setChats } = ChatState();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLaoding(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setLaoding(false);
      setSearchResult(data);
    } catch (err) {
      console.log(err.message);
      setErrorMessage(err.message);
      setOpenSnackbar(true);
      return;
    }
  };
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      setErrorMessage("please provide all the detals");
      setOpenSnackbar(true);
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      setErrType(true);
      setErrorMessage("new group chat created");
      setOpenSnackbar(true);
      return;
    } catch (err) {
      setErrorMessage(err.message);
      setOpenSnackbar(true);
      return;
    }
  };

  const handleGroup = (userToAdd) => {
    if (selectedUsers.includes(userToAdd)) {
      setErrorMessage("user already added");
      setOpenSnackbar(true);
      return;
    }
    setSelectedUsers([...selectedUsers, userToAdd]);
  };
  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== delUser._id));
  };

  return (
    <div>
      <span onClick={handleClickOpen}>{children}</span>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
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
        <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography gutterBottom sx={{ fontSize: "34px", fontWeight: 300 }}>
            Create Group Chat
          </Typography>
          <FormControl>
            <TextField
              sx={{ width: "100%", mb: 2 }}
              id="outlined-basic"
              label="Chat Name"
              variant="outlined"
              onChange={(e) => setGroupChatName(e.target.value)}
            />
            <TextField
              sx={{ width: "100%", mb: 1 }}
              id="outlined-basic"
              label="Add Users eg:Alok"
              variant="outlined"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </FormControl>
          <Box sx={{ width: "full", display: "flex", flexWrap: "wrap" }}>
            {selectedUsers.map((u) => (
              <UserBadgeItem
                key={u.id}
                user={u}
                handleFunction={() => handleDelete(u)}
              />
            ))}
          </Box>

          {loading ? (
            <Skeleton
              animation="wave"
              variant="rounded"
              width={210}
              height={100}
            />
          ) : (
            searchReselt
              ?.slice(0, 4)
              .map((user) => (
                <UserListItem
                  user={user}
                  key={user.id}
                  handleFunction={() => handleGroup(user)}
                />
              ))
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={handleSubmit}
          >
            Create Chat
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default GroupChatModel;
