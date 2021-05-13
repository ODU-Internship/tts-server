const {
  successResponseWithData,
  unauthorizedResponse,
} = require("../helpers/response");

module.exports.getSupervisorController = [
  async (req, res) => {
    try {
      successResponseWithData(res, req.supervisor);
    } catch (error) {
      unauthorizedResponse(res, error);
    }
  },
];
