const {
  successResponseWithData,
  validationErrorResponse,
} = require("../helpers/response");
const { messageNotFoundError } = require("../helpers/errors");

let Message = require("../models/message.model");

module.exports.getAllMessageController = [
  async (req, res) => {
    try {
      const message = await Message.getAllMessageDetails();
      if (message == undefined) {
        throw messageNotFoundError("400", "No Messages");
      }
      successResponseWithData(res, message);
    } catch (error) {
      validationErrorResponse(res, error);
    }
  },
];

module.exports.getMessageController = [
  async (req, res) => {
    try {
      const { messageID } = req.params;
      const message = await Message.getMessageDetails(messageID);
      if (message == undefined) {
        throw messageNotFoundError("400", "Message does not exist");
      }
      successResponseWithData(res, message);
    } catch (error) {
      validationErrorResponse(res, error);
    }
  },
];

module.exports.insertMessageController = [
  async (req, res) => {
    try {
      const { message } = req.body;
      const res_message = await Message.insertMessageDetails(message);
      if (res_message == undefined) {
        throw messageNotFoundError("400", "Message could not be inserted");
      }
      successResponseWithData(res, res_message);
    } catch (error) {
      validationErrorResponse(res, error);
    }
  },
];

module.exports.updateMessageController = [
  async (req, res) => {
    try {
      const { messageID } = req.params;
      const { label } = req.body;
      const message = await Message.updateMessageDetails(messageID, label);
      if (message == undefined) {
        throw messageNotFoundError(
          "MessageID_invalid",
          "Message does not exist"
        );
      }
      successResponseWithData(res, message);
    } catch (error) {
      validationErrorResponse(res, error);
    }
  },
];
