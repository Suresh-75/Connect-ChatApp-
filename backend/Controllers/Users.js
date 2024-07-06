const User = require("../Models/User");
const fs = require("fs");
// console.log(__dirname);
exports.handleGetUserByid = async (req, res) => {
  try {
    const { userID } = req.params;
    const userData = await User.findById(userID).select({
      password: 0,
      __v: 0,
    });
    const avatarUrl = userData.Avatar
      ? `${req.protocol}://${req.get("host")}/${userData.Avatar}`
      : null;
    res.json({
      status: "success",
      userData,
      avatarUrl,
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: "fail",
    });
  }
};
exports.handleGetAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    console.log(users);
    res.json({
      users,
    });
  } catch (err) {
    // console.log(err);
    res.json({
      status: "fail",
    });
  }
};

exports.handleGetUser = async (req, res) => {
  try {
    const { name } = req.params;
    const { userid } = req.headers;
    const users = await User.find({ name: { $regex: name, $options: "i" } })
      .select({
        password: 0,
        __v: 0,
      })
      .sort({ name: 1 });
    const usersFinal = users.filter((user) => {
      return user.id != userid;
    });
    if (!usersFinal) throw new Error("Not found");
    res.json({
      users: usersFinal,
    });
  } catch (err) {
    res.json({
      status: "fail",
      message: "Not found",
    });
  }
};

//update user

exports.handleUpdateProfile = async (req, res) => {
  const path = req.file ? req.file.path : "";
  const { aboutMe, name, email, isChanged } = req.body;
  const { userID } = req.params;
  try {
    if (!isChanged) {
      var res1 = await User.findByIdAndUpdate(
        userID,
        { AboutMe: aboutMe, name, email },
        { new: true }
      );
    } else {
      var res1 = await User.findByIdAndUpdate(
        userID,
        { AboutMe: aboutMe, name, email, Avatar: path },
        { new: true }
      );
    }

    res.json({ status: "success", data: res1 });
  } catch (err) {
    console.log(err);
    res.json({ status: "fail", data: err.message });
  }
};
