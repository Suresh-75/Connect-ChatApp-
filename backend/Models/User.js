const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user name is required"],
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    validate: [validator.isEmail, "please enter a valid EmailID"],
  },
  password: {
    type: String,
    required: [true, "A passord is required"],
  },
  AboutMe: {
    type: String,
  },
  Tags: {
    type: [String],
  },
  Avatar: { type: String, default: "" },
});
userSchema.pre("save", async function (next) {
  // console.log(this.name.split(" ")[0]);
  this.AboutMe = "Hey all ,this is " + this.name.split(" ")[0];
  next();
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
