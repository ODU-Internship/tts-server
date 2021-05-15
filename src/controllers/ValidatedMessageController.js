const {
  successResponseWithData,
  validationErrorResponse,
} = require("../helpers/response");
const { messageNotFoundError } = require("../helpers/errors");

let ValidatedMessage = require("../models/validated.model");

module.exports.getAllMessageController = [
  async (req, res) => {
    try {
      message = await ValidatedMessage.getAllMessageDetails();
      if (message == undefined) {
        throw messageNotFoundError("400", "No Validated Messages");
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
      const message = await ValidatedMessage.getMessageDetails(messageID);
      if (message == undefined) {
        throw messageNotFoundError("400", "Validated Message does not exist");
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
      const { message, label } = req.body;
      const res_message = await ValidatedMessage.insertMessageDetails(
        message,
        label
      );
      if (res_message == undefined) {
        throw messageNotFoundError(
          "400",
          "Validated Message could not be inserted"
        );
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
      const message = await ValidatedMessage.updateMessageDetails(
        messageID,
        label
      );
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
