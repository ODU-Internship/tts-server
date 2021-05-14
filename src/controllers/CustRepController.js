const axios = require("axios");
const {
  successResponseWithData,
  unauthorizedResponse,
  validationErrorResponse,
} = require("../helpers/response");
const { messageNotFoundError } = require("../helpers/errors");

let Message = require("../models/message.model");

module.exports.getCustRepController = [
  async (req, res) => {
    try {
      successResponseWithData(res, req.custRep);
    } catch (error) {
      unauthorizedResponse(res, error);
    }
  },
];

module.exports.insertMessageController = [
  async (req, res) => {
    try {
      const { message, company, category, type } = req.body;
      const { data } = await axios.post(
        "https://tts-model-alpha.herokuapp.com/predict",
        {
          emails: [message],
        }
      );
      label = data.sentiment[0];
      prediction = data.probability[0];
      const res_message = await Message.insertMessageDetails(
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
