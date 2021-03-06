const mongoose = require("mongoose");

const Schema = mongoose.Schema;
mongoose.set("useFindAndModify", false);

const messageSchema = new Schema(
  {
    custName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    custDetails: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },
    label: [
      {
        type: String,
        trim: true,
        minlength: 2,
      },
    ],
    company: {
      type: String,
      trim: true,
      minlength: 2,
    },
    category: [
      {
        type: String,
        trim: true,
        minlength: 2,
      },
    ],
    type: {
      type: String,
      trim: true,
      minlength: 2,
    },
    prediction: {
      type: Number,
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

Message.getMessageByType = (type, value) =>
  Message.find({ [type]: value }).then((message) => message);

Message.insertMessageDetails = (
  custName,
  custDetails,
  message,
  label,
  company,
  category,
  type,
  prediction
) =>
  Message.create({
    custName: custName,
    custDetails: custDetails,
    message: message,
    label: label,
    company: company,
    category: category,
    type: type,
    prediction: prediction,
  }).then((message) => message);

Message.updateMessageDetails = (messageID, message, category, label) =>
  Message.findByIdAndUpdate(
    messageID,
    { message: message, category: category, label: label },
    { new: true }
  ).then((message) => message);

module.exports = Message;
