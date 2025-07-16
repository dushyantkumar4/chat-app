const express = require("express");
const dotenv = require("dotenv").config();
const chats = require("./data/data.js");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware.js");

connectDB();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("messages");
});

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

// app.get("/api/chat",(req,res)=>{
//     res.send(chats);
// });
// app.get("/api/chat/:id",(req,res)=>{
//     const singleChat = chats.find((c)=>c._id === req.params.id);
//     res.send(singleChat);
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("server is running on 5000"));
