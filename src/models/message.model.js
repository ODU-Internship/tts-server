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

Message.updateMessageDetails = (messageID, label) =>
  Message.findByIdAndUpdate(messageID, { label: label }, { new: true }).then(
    (message) => message
  );

Message.insertMessageDetails = (
  message,
  label,
  company,
  category,
  type,
  prediction
) =>
  Message.create({
    message: message,
    label: label,
    company: company,
    category: category,
    type: type,
    prediction: prediction,
  }).then((message) => message);

module.exports = Message;
