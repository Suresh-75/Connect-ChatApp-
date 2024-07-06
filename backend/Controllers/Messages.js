const Message = require("../Models/Message");
exports.handleCreateMsg = async (req, res) => {
  try {
    const { text, senderID, conversationID } = req.body;
    const tt = await Message.create({ text, senderID, conversationID });
    // console.log(tt);
    res.json({
      status: "success",
      msg: text,
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: "Fail",
      msg: err.message,
    });
  }
};

exports.handleGetMsg = async (req, res) => {
  try {
    const { conversationID } = req.params;
    const msg = await Message.find({ conversationID });
    // console.log(msg);
    res.json({
      statu: "success",
      msg,
    });
  } catch (err) {
    console.log(err);
    res.json({
      status: "Fail",
      msg: err.message,
    });
  }
};
