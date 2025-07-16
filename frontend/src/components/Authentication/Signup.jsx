import React, { useState } from "react";
import Stack from "@mui/joy/Stack";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import IconButton from "@mui/joy/IconButton";
import axios from "axios";
import { Button, Snackbar, Alert } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confPassword, setConfPassword] = useState();
  const [pic, setPic] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errType, setErrType] = useState(false);

  const handleClick = () => setShowPassword(!showPassword);

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confPassword) {
      setErrorMessage("Please fill all the fields");
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }
    if (password !== confPassword) {
      setErrorMessage("Passwords do not match");
      setOpenSnackbar(true);
      setLoading(false);
      return;
    }
    

    let imgUrl = null;

    if (pic) {
      imgUrl = await postDetails(pic);
      if (!imgUrl) {
        setLoading(false);
        return;
      }
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic: imgUrl },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      setErrorMessage("Registration Successful");
      setErrType(true);
      setOpenSnackbar(true);

      navigate("/chats");
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Registration failed");
      setErrType(false);
      setOpenSnackbar(true);
      console.error(err);
    }
    setLoading(false);
  };

  const postDetails = async (pics) => {
    if (!pics) {
      setErrorMessage("Please select an image");
      setOpenSnackbar(true);
      return null;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dq0mvuuhd");
      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dq0mvuuhd/image/upload",
          data
        );
        const url = res.data.url.toString()
        setPic(url);
        console.log(url);
        return url;
      } catch (err) {
        console.error(err.message);
        setErrorMessage("Image upload failed");
        setOpenSnackbar(true);
        setLoading(false);
        return null;
      }
    } else {
      setErrorMessage("Only JPEG or PNG images allowed");
      setOpenSnackbar(true);
      setLoading(false);
      return null;
    }
  };

  return (
    <Stack spacing={2}>
      <FormControl id="first-name" required>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
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
          value={password}
          placeholder="Enter you password"
          onChange={(e) => setPassword(e.target.value)}
          endDecorator={
            <IconButton variant="plain" onClick={handleClick}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
        />
      </FormControl>
      <FormControl id="confPassword" required>
        <FormLabel>Confirm Password</FormLabel>
        <Input
          type={showPassword ? "text" : "password"}
          value={confPassword}
          placeholder="Enter you password"
          onChange={(e) => setConfPassword(e.target.value)}
          endDecorator={
            <IconButton variant="plain" onClick={handleClick}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          }
        />
      </FormControl>
      <FormControl id="pic" required>
        <FormLabel>Upload profile picture</FormLabel>
        <Input
          type="file"
          onChange={(e) => {
            console.log(e.target.files[0]);
            setPic(e.target.files[0]);
          }}
          sx={{ p: 1.5 }}
          accept="image/*"
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
        onClick={submitHandler}
        loading={loading}
      >
        Sign Up
      </Button>
    </Stack>
  );
};

export default Signup;
