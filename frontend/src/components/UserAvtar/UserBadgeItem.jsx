import React from "react";
import { Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Box
      sx={{
        px: 2,
        borderRadius: 6,
        m: 1,  
        width:"fit-content",
        cursor: "pointer",
        display:"flex",
        alignItems:"center",
        backgroundColor: "purple !important",
        color: "white !important",
      }}
      onClick={handleFunction}
    >
      {user.name}
      <CloseIcon sx={{ color: "white" ,pl:1,width:"19px"}} />
    </Box>
  );
};

export default UserBadgeItem;
