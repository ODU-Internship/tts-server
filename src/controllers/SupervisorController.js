const {
  successResponseWithData,
  unauthorizedResponse,
} = require("../helpers/response");
const auth = require("../middleware/auth");
let Supervisor = require("../models/supervisor.model");

module.exports.getSupervisorController = [
  async (req, res) => {
    try {
      successResponseWithData(res, req.supervisor);
    } catch (error) {
      unauthorizedResponse(res, error);
    }
  },
];
