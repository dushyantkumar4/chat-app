const { Schema, model } = require("mongoose");
const User = require("./userModels.js");
const Chat = require("./chatModel.js");

const messageModel = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    message: { type: String, trim: true },
    chat: { type: Schema.Types.ObjectId, ref: "Chat" },
  },
  { timestamps: true }
);

const Message = model("Message", messageModel);
module.exports = Message;
