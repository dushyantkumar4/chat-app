const { Schema, model } = require("mongoose");
const User = require("./userModels.js");
const Message = require("./messageModel.js");

const chatModel = new Schema({
  chatName: { type: String, trim: true },
  isGroupChat: { type: Boolean, default: false },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
  latestMessage: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  groupAdmin: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
},
{timestamps:true}
);

const Chat = model("Chat",chatModel)
module.exports =Chat;
