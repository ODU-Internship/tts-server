const {
  successResponseWithData,
  validationErrorResponse,
} = require("../helpers/response");
const { messageNotFoundError } = require("../helpers/errors");

let Message = require("../models/message.model");

module.exports.getAllMessageController = [
  async (req, res) => {
    try {
      const { company, category, type } = req.query;
      let message = undefined;
      if (typeof company != "undefined") {
        message = await Message.getMessageByType("company", company);
      } else if (typeof category != "undefined") {
        message = await Message.getMessageByType("category", category);
      } else if (typeof type != "undefined") {
        message = await Message.getMessageByType("type", type);
      } else {
        message = await Message.getAllMessageDetails();
      }
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
      const {
        custName,
        custDetails,
        message,
        label,
        company,
        category,
        type,
        prediction,
      } = req.body;
      const res_message = await Message.insertMessageDetails(
        custName,
        custDetails,
        message,
        label,
        company,
        category,
        type,
        prediction
      );
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
      const { message, category, label } = req.body;
      const mess = await Message.updateMessageDetails(
        messageID,
        message,
        category,
        label
      );
      if (mess == undefined) {
        throw messageNotFoundError(
          "MessageID_invalid",
          "Message does not exist"
        );
      }
      successResponseWithData(res, mess);
    } catch (error) {
      validationErrorResponse(res, error);
    }
  },
];
