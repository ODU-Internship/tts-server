const {
  successResponseWithData,
  validationErrorResponse,
} = require("../helpers/response");
const { createPermissionError } = require("../helpers/errors");
let CustRep = require("../models/custRep.model");
let Supervisor = require("../models/supervisor.model");

module.exports.supervisorSignupController = [
  async (req, res) => {
    try {
      const { name, sid, password, email, phone, gender } = req.body;
      const res_message = await Supervisor.addSupervisor(
        name,
        sid,
        password,
        email,
        phone,
        gender
      );
      if (res_message == undefined) {
        throw createPermissionError("400", "Supervisor could not be added");
      }
      successResponseWithData(res, res_message);
    } catch (error) {
      validationErrorResponse(res, error);
    }
  },
];

module.exports.repSignupController = [
  async (req, res) => {
    try {
      const { name, cid, password, email, phone, gender } = req.body;
      const res_message = await CustRep.addCustRep(
        name,
        cid,
        password,
        email,
        phone,
        gender
      );
      if (res_message == undefined) {
        throw createPermissionError("400", "CustRep could not be added");
      }
      successResponseWithData(res, res_message);
    } catch (error) {
      validationErrorResponse(res, error);
    }
  },
];
