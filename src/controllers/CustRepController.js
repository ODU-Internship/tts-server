const {
  successResponseWithData,
  unauthorizedResponse,
} = require("../helpers/response");

module.exports.getCustRepController = [
  async (req, res) => {
    try {
      successResponseWithData(res, req.custRep);
    } catch (error) {
      unauthorizedResponse(res, error);
    }
  },
];
