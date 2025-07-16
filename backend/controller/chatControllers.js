const Chat = require("../models/chatModel.js");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModels.js");

const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("userId param not sent with request");
    return res
      .status(400)
      .json({ message: "userId param not sent with request" });
  }
  let isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    let chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [...new Set([req.user._id.toString(), userId])],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const fetchChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });

        res.status(200).json(results);
      });
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

const createGropChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send("please fill all details");
  }
  let users = JSON.parse(req.body.users);
  if (users.length < 2) {
    res
      .status(400)
      .send("more than 2 users are required to form the group chat");
  }
  users.push(req.user);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).send(fullGroupChat);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

const renameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  if (!chatId && !chatName) {
    res.status(400);
    throw new Error("provide all details ");
  }

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!updatedChat) {
    res.status(404);
    throw new Error("chat not found");
  } else {
    res.json(updatedChat);
  }
});

const addToGroup = asyncHandler(async (req, res) => {
  const { userId, chatId } = req.body;
  if (!userId || !chatId) {
    res.status(400);
    throw new Error("please provide the all details");
  }
  const added = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!added) {
    res.status(400);
    throw new Error("unable to update it ");
  } else {
    res.send(added);
  }
});

const removeFromGroup = asyncHandler(async (req, res) => {
  const { userId, chatId } = req.body;
  if (!userId || !chatId) {
    res.status(400);
    throw new Error("provide the details");
  }

  const remove = await Chat.findByIdAndUpdate(
    chatId,
    { $pull: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!remove) {
    res.status(400);
    throw new Error("can't remove the user");
  } else {
    res.send(remove);
  }
});

module.exports = {
  accessChat,
  fetchChats,
  createGropChat,
  renameGroup,
  addToGroup,
  removeFromGroup,
};
