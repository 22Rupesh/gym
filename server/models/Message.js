const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    roomId: String,
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    text: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
