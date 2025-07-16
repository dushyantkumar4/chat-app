import React, {useEffect } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";
import Login from "./components/Authentication/Login.jsx";
import Signup from "./components/Authentication/Signup.jsx";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    if (user) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          bgcolor: "white",
          width: "100%",
          m: "40px 0 15px 0",
          p: 2,
          borderRadius: 2,
          boxShadow: 5,
        }}
      >
        <Typography variant="h4">Talk-A-Tive</Typography>
      </Box>
      <Box
        sx={{
          bgcolor: "white",
          width: "100%",
          borderRadius: 2,
          p: 2,
          boxShadow: 5,
        }}
      >
        <Tabs
          aria-label="Basic tabs"
          defaultValue={0}
          TabIndicatorProps={{ style: { display: "none" } }}
          sx={{
            bgcolor: "white",
          }}
        >
          <TabList
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Tab
              disableIndicator
              sx={{
                width: "45%",
                borderRadius: "99px",
                marginBottom: "5px",
                py: "8px",

                "&.Mui-selected": {
                  px: "100px",
                  border: "2px solid #5eb1ff",
                  borderRadius: "99px",
                  backgroundColor: "#cee7ff",
                },
              }}
            >
              Login
            </Tab>
            <Tab
              disableIndicator
              sx={{
                width: "45%",
                borderRadius: "99px",
                marginBottom: "5px",
                py: "8px",

                "&.Mui-selected": {
                  px: "100px",
                  border: "2px solid #5eb1ff",
                  borderRadius: "99px",
                  backgroundColor: "#cee7ff",
                },
              }}
            >
              SignUp
            </Tab>
          </TabList>
          <TabPanel value={0}>
            <Login />
          </TabPanel>
          <TabPanel value={1}>
            <Signup />
          </TabPanel>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
