const mongoose = require("mongoose");

const Schema = mongoose.Schema;
mongoose.set("useFindAndModify", false);

const validatedMessageSchema = new Schema(
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
  },
  {
    timestamps: true,
  }
);

const ValidatedMessage = mongoose.model("retrains", validatedMessageSchema);

ValidatedMessage.getAllMessageDetails = () =>
  ValidatedMessage.find().then((message) => message);

ValidatedMessage.getMessageDetails = (messageID) =>
  ValidatedMessage.findById(messageID).then((message) => message);

ValidatedMessage.insertMessageDetails = (message, label) =>
  ValidatedMessage.create({
    message: message,
    label: label,
  }).then((message) => message);

ValidatedMessage.updateMessageDetails = (messageID, label) =>
  ValidatedMessage.findByIdAndUpdate(
    messageID,
    { label: label },
    { new: true }
  ).then((message) => message);

module.exports = ValidatedMessage;
