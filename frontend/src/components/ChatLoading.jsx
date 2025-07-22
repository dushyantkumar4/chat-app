import React from "react";
import { Stack, Paper, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#000000ff",
  }),
}));

const ChatLoading = ({ data }) => {
  // if(data){
  //     console.log(data);
  // }
  return (
    <Box sx={{ width: "auto", mt: 2, px: 1 }}>
      <Stack spacing={2}>
        <Item>Item 1</Item>
        <Item>Item 2</Item>
        <Item>Item 3</Item>
      </Stack>
    </Box>
  );
};

export default ChatLoading;
