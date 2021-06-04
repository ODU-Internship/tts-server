const {
  successResponseWithData,
  validationErrorResponse,
} = require("../helpers/response");
const { messageNotFoundError } = require("../helpers/errors");

let TrainData = require("../models/train.model");

module.exports.insertDataController = [
  async (req, res) => {
    try {
      // const { data } = req.body;
      const clear_message = await TrainData.clearData();
      if (clear_message == undefined) {
        throw messageNotFoundError("400", "Data could not be deleted");
      }
      const res_message = await TrainData.insertData(req.body);
      if (res_message == undefined) {
        throw messageNotFoundError("400", "Data could not be inserted");
      }
      successResponseWithData(res, res_message);
    } catch (error) {
      validationErrorResponse(res, error);
    }
  },
];
