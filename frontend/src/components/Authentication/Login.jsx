import React, { useState } from "react";
import Stack from "@mui/joy/Stack";
import {useNavigate} from "react-router-dom";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import { Button, Snackbar, Alert } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errType, setErrType] = useState(false);

  
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      setErrorMessage("Please fill all the fields");
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type":"application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      setErrorMessage("Login successful");
      setErrType(true);
      setOpenSnackbar(true);
      localStorage.setItem("userInfo",JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (err) {
      setErrorMessage("Login failed");
      setErrType(false);
      setOpenSnackbar(true);
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <Stack spacing={2}>
      <FormControl id="email" required>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter you email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" required>
        <FormLabel>Password</FormLabel>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Enter you password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          endDecorator={
            <IconButton
              variant="plain"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
        />
      </FormControl>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={errType ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <Button
        variant="contained"
        sx={{
          fontSize: "1.2rem",
          textTransform: "none",
        }}
        loading={loading}
        onClick={submitHandler}
      >
        Login
      </Button>
      <Button
        variant="contained"
        color="error"
        sx={{
          fontSize: "1.2rem",
          textTransform: "none",
        }}
        onClick={()=>{
          setEmail("guest@example.com");
          setPassword(1234);
        }}
      >
        Get Guest User Credentials
      </Button>
    </Stack>
  );
};

export default Login;
