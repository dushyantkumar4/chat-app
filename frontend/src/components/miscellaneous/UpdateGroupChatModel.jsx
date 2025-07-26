import React,{useState} from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  FormControl,
  TextField,
  Box,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { ChatState } from "../context/ChatProvider";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(5),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(0),
  },
}));

const UpdateGroupChatModel = ({
  fetchAgain,
  setFetchAgain,
  open,
  // user,
  handleClose,
}) => {
  const [groupChatName,setGroupChatName] = useState();
  const [search,setSearch] = useState();
  const [searchReselt,setSearchResult] = useState([]);
  const [loading,setLaoding] = useState(false);
  const {selectedChat,setSelectedChat,user} = ChatState ();

  const getInitials = (name = "") => {
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  return (
    <Box>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{  }}
      >
        <DialogTitle sx={{ m: 0, p: 2 ,mb:3}} id="customized-dialog-title">
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
        {/* <IconButton
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
        </IconButton> */}
        <DialogContent>
          <Typography></Typography>
          <FormControl>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <TextField
                sx={{ width: "100%", mb: 2 }}
                id="outlined-basic"
                label="Chat Name"
                variant="outlined"
                // onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button color="success" variant="contained" sx={{}}>
                Update
              </Button>
            </Box>

            <TextField
              sx={{ width: "100%", mb: 1 }}
              id="outlined-basic"
              label="Add Users eg:Alok"
              variant="outlined"
              // onChange={(e) => handleSearch(e.target.value)}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ textTransform: "none" ,mb:2,mr:2 }}
            color="error"
          >
            Leave Group
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Box>
  );
};

export default UpdateGroupChatModel;
