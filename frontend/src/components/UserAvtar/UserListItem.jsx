import React from "react";
import { ChatState } from "../context/ChatProvider";
import { Avatar, Box, Typography } from "@mui/material";

const getInitials = (name) => {
  if (!name) return "";
  const parts = name.trim().split(" ");
  return parts.length === 1 ? parts[0][0] : parts[0][0] + parts[1][0];
};

const UserListItem = ({user, handleFunction }) => {
  
  return (
    <Box
      onClick={handleFunction}
      sx={{
        cursor: "pointer",
        bgcolor: "#E8E8E8",
        hover: { background: "#38B2AC", color: "white" },
        width: "full",
        display: "flex",
        alignItems: "center",
        color: "black",
        px: 1,
        py: 2,
        mb: 2,
        m:1,
        borderRadius: 2,
      }}
    >
      <Avatar
        sx={{ width: "24px", height: "24px", cursor: "pointer", mr: 1 }}
        src="frontend\src\assets\user image.jpg"
      >
        {getInitials(user.name)}
      </Avatar>
      <Box>
        <Typography>{user.name}</Typography>
        <Typography>
          <b>Email : </b>
          {user.email}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserListItem;
