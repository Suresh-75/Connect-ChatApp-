const mongoose = require("mongoose");

const userConvoSchema = new mongoose.Schema(
  {
    members: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserConv = new mongoose.model("UserConv", userConvoSchema);

module.exports = UserConv;
