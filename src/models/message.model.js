const mongoose = require("mongoose");

const Schema = mongoose.Schema;
mongoose.set("useFindAndModify", false);

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    label: {
      type: String,
      trim: true,
      minlength: 2,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model("Message", messageSchema);

Message.getAllMessageDetails = () => Message.find().then((message) => message);

Message.getMessageDetails = (messageID) =>
  Message.findById(messageID).then((message) => message);

Message.updateMessageDetails = (messageID, label) =>
  Message.findByIdAndUpdate(messageID, { label: label }, { new: true }).then(
    (message) => message
  );

Message.insertMessageDetails = (message) =>
  Message.create({ message: message }).then((message) => message);

module.exports = Message;
