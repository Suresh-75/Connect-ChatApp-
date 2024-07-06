const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversationID: {
      type: String,
      required: true,
    },
    senderID: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = new mongoose.model("Message", messageSchema);

module.exports = Message;
