const UserConv = require("../Models/UserConv");
const Message = require("../Models/Message");
exports.handleCreateConvo = async (req, res) => {
  const { senderID, recieverID } = req.body;
  // console.log(senderID, recieverID);
  try {
    const convoOld = await UserConv.find({
      members: { $all: [senderID, recieverID] },
    });
    // console.log(convoOld);
    if (convoOld.length != 0) throw new Error("Conversaiton already exists");
    const newConvo = await UserConv.create({ members: [senderID, recieverID] });
    res.json({
      status: "success",
      msg: newConvo,
    });
  } catch (err) {
    res.json({
      status: "err",
      msg: err.message,
    });
  }
};

exports.handleGetConvos = async (req, res) => {
  const { userID } = req.params;
  try {
    const userConvos = await UserConv.find({
      members: { $in: [userID] },
    });
    res.json({
      status: "success",
      msg: userConvos,
    });
  } catch (err) {
    res.json({
      status: "err",
      msg: err.message,
    });
  }
};

exports.handleGetConvoID = async (req, res) => {
  try {
    // console.log(senderID, recieverID);
    const { userid: senderID, frndid: recieverID } = req.headers;
    const data = await UserConv.find({
      members: { $all: [senderID, recieverID] },
    });
    // console.log(data);
    res.json({
      status: "Success",
      msg: data,
    });
  } catch (err) {
    res.json({
      status: "err",
      msg: err.message,
    });
  }
};
