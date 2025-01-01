// import express from "express";

// NOTE
// use cors configs in vercel app and not in local server

const express = require("express");
const cors = require("cors");
const {
  handleGetAllUsers,
  handleGetUser,
  handleGetUserByid,
  handleUpdateProfile,
} = require("./Controllers/Users");
const {
  handleCreateConvo,
  handleGetConvos,
  handleGetConvoID,
} = require("./Controllers/Conversation");
const {
  handleApp,
  handleLogin,
  handleSignUp,
  isAuthenticated,
} = require("./Controllers/Auth");
const { handleCreateMsg, handleGetMsg } = require("./Controllers/Messages");
const app = express();
const path = require("path");
//multer
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./uploads/`);
  },
  filename: function (req, file, cb) {
    cb(null, `${req.params.userID + "." + file.mimetype.split("/")[1]}`);
  },
});
const upload = multer({ storage: storage });

app.use(
  cors({
    origin: [`${process.env.FRONTEND_URL}`],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/", (req, res) => {
  res.json({
    status: "Success",
  });
});
app.get("/app", isAuthenticated, handleApp);
app.post("/login", handleLogin);
app.post("/signUp", handleSignUp);

app.get("/users", isAuthenticated, handleGetAllUsers);
app.get("/users/:name", isAuthenticated, handleGetUser);
app.get("/app/users/:userID", isAuthenticated, handleGetUserByid);
app.post(
  "/app/UpdateProfile/:userID",
  isAuthenticated,
  upload.single("avatar"),
  handleUpdateProfile
);

app.post("/app/createConvo", isAuthenticated, handleCreateConvo);
app.get("/app/getConv/:userID", isAuthenticated, handleGetConvos);

app.post("/app/createMsg", isAuthenticated, handleCreateMsg);
app.get("/app/getConvoID", isAuthenticated, handleGetConvoID);
app.get("/app/getMsg/:conversationID", isAuthenticated, handleGetMsg);

app.all("*", (req, res) => {
  res.json({
    status: "invalid route",
  });
});
// app.use((err, req, res, next) => {
//   res.json({
//     status: "err",
//     msg: err.message,
//   });
// });
module.exports = app;
