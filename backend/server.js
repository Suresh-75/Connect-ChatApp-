const app = require("./app");
const { Server } = require("socket.io");
const { configDotenv } = require("dotenv");
const { default: mongoose } = require("mongoose");
configDotenv({ path: "./.env" });

const port = process.env.PORT;
const DB = process.env.MongoDbURL.replace("<PASSWORD>", process.env.PASSWORD);
mongoose.connect(DB).then(() => {
  console.log("connected to database");
});
const server = app.listen(port, () => {
  console.log("Listening for requests on port", port);
});

const io = new Server(server, {
  cors: {
    origin: `${process.env.FRONTEND_URL}`,
  },
});

let usersConnected = [];
function getSocketID(recieverID) {
  const userI = usersConnected.find((user) => {
    return user.userID == recieverID;
  });
  return userI?.sID;
}
io.on("connection", (socket) => {
  socket.on("addUser", (userID) => {
    let index = -1;
    let isThere = usersConnected.some((users, i) => {
      if (users.userID == userID) {
        index = i;
        return false;
      }
    });

    if (index >= 0) usersConnected.splice(index, 1);
    usersConnected.push({ userID, sID: socket.id });

    const users = usersConnected.map((users) => {
      return users.userID;
    });
    // console.log(users);
    io.emit("OnlineUsers", users);
  });
  // socket.on("getOnline")
  socket.on("message", ({ senderID, recieverID, text }) => {
    if (!(senderID && recieverID && text)) {
      return;
    }
    const recieverIDsID = getSocketID(recieverID);
    if (recieverIDsID)
      socket.to(recieverIDsID).emit("getMessage", { senderID, text });
    socket.to(recieverIDsID).emit("lastMessage", { senderID, text });
    socket.to(recieverIDsID).emit("addToConvo", { senderID, text });
  });
  socket.on("Typing", (msg) => {
    const recieverID = msg.recieverID;
    const recieverIDsID = getSocketID(recieverID);
    socket
      .to(recieverIDsID)
      .emit("Typing", { isTyping: msg.isTyping, typer: msg.senderID });
  });
  // const lastChats=
  // socket.emit("lastChat",)
  socket.on("disconnect", () => {
    usersConnected = usersConnected.filter((user) => {
      return user.sID != socket.id;
    });
    const users = usersConnected.map((users) => {
      return users.userID;
    });
    io.emit("OnlineUsers", users);
  });
});
