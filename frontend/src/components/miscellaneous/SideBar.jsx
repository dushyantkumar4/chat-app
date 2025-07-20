import React, { useState } from "react";
import {
  Box,
  Tooltip,
  Button,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Avatar,
  Divider,
  Drawer,
  TextField,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import ProfileModel from "./ProfileModel";
import { ChatState } from "../context/ChatProvider";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [search, setSearch] = useState("");
  const [serchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = ChatState();
  const navigate = useNavigate();

  const useMenuState = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    return {
      anchorEl,
      open: Boolean(anchorEl),
      handleOpen: (event) => setAnchorEl(event.currentTarget),
      handleClose: () => setAnchorEl(null),
    };
  };
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  const notificationMenu = useMenuState();
  const accountMenu = useMenuState();
  const handleDialogOpen = () => {
    setOpenDialog(true);
    accountMenu.handleClose();
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleSearch = ()=>{
    if(!search){}
  }
  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation" >
      <Typography sx={{ p: 2, fontSize: "20px", fontWeight: 100 }}>
        Search Users
      </Typography>
      <Divider />
      <Box
        sx={{
          display: { xs: { flexDirection: "column" }, md: "flex" },
          gap: 2,
          mt: 1,
          mx: 1,
        }}
      >
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{
            bgcolor: "#e0ebff",
            color: "black",
            fontWeight: "700",
            py:1
          }}
          onClick={()=>handleSearch}
        >
          Go
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "white",
          width: "full",
          p: "5px 10px 5px 10px",
          borderWidth: "5px",
          borderStyle: "solid",
          borderColor: "lightgray",
        }}
      >
        <Tooltip title="serch user to chat" placement="bottom-end">
          <Button variant="text" onClick={() => setOpen(true)}>
            <i className="fa-solid fa-magnifying-glass"></i> &nbsp;
            <Typography sx={{ display: { xs: "none", md: "flex" }, px: "2" }}>
              Search User
            </Typography>
          </Button>
        </Tooltip>
        <Typography variant="h5" sx={{ fontFamily: "Work sans" }}>
          Talk-A-Tive
        </Typography>
        <div>
          {/* notification  */}
          <Tooltip title="notification">
            <IconButton onClick={notificationMenu.handleOpen}>
              <NotificationsIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={notificationMenu.anchorEl}
            open={notificationMenu.open}
            onClose={notificationMenu.handleClose}
          >
            <MenuItem onClick={notificationMenu.handleClose}>new one</MenuItem>
          </Menu>
          {/* account  */}
          <Tooltip title="Account Details">
            <IconButton
              onClick={accountMenu.handleOpen}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={accountMenu.open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={accountMenu.open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32, backgroundColor: "green" }}>
                D
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={accountMenu.anchorEl}
            open={accountMenu.open}
            onClose={accountMenu.handleClose}
          >
            <MenuItem
              onClose={accountMenu.handleClose}
              onClick={handleDialogOpen}
            >
              <Avatar sx={{ width: 24, height: 24 }}></Avatar>
              &nbsp; My profile
            </MenuItem>
            <Divider />
            <MenuItem onClose={accountMenu.handleClose} onClick={logoutHandler}>
              Logout &nbsp;
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </MenuItem>
          </Menu>
        </div>
      </Box>
      {/* profile model  */}
      <ProfileModel
        open={openDialog}
        handleClose={handleDialogClose}
        user={user}
      />
      {/* sidebar  */}
      <Drawer open={open} onClose={() => setOpen(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
};

export default SideBar;
