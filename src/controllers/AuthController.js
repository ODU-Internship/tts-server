const {
  successResponseWithData,
  unauthorizedResponse,
} = require("../helpers/response");
const { createPermissionError } = require("../helpers/errors");
let Admin = require("../models/admin.model");
let Supervisor = require("../models/supervisor.model");
let CustRep = require("../models/custRep.model");

// admin section
module.exports.postAdminLoginController = [
  async (req, res) => {
    try {
      const { aid, password } = req.body;
      const admin = await Admin.getAdminDetails(aid);
      if (admin.password !== password) {
        throw createPermissionError(
          "admin_password_mismatch",
          "Admin password does not match"
        );
      }
      const token = await admin.generateAuthToken();
      admin.password = undefined;
      admin.tokens = token;
      successResponseWithData(res, admin);
    } catch (error) {
      unauthorizedResponse(res, error);
    }
  },
];

// supervisor section
module.exports.postSupervisorLoginController = [
  async (req, res) => {
    try {
      const { sid, password } = req.body;
      const supervisor = await Supervisor.getSupervisorDetails(sid);
      if (supervisor.password !== password) {
        throw createPermissionError(
          "supervisor_password_mismatch",
          "Supervisor password does not match"
        );
      }
      const token = await supervisor.generateAuthToken();
      supervisor.password = undefined;
      supervisor.tokens = token;
      successResponseWithData(res, supervisor);
    } catch (error) {
      unauthorizedResponse(res, error);
    }
  },
];

// custRep section
module.exports.postCustRepLoginController = [
  async (req, res) => {
    try {
      const { cid, password } = req.body;
      const custRep = await CustRep.getCustRepDetails(cid);
      if (custRep == undefined || custRep.password !== password) {
        throw createPermissionError(
          "custRep_password_mismatch",
          "CustRep password does not match"
        );
      }
      const token = await custRep.generateAuthToken();
      custRep.password = undefined;
      custRep.tokens = token;
      successResponseWithData(res, custRep);
    } catch (error) {
      unauthorizedResponse(res, error);
    }
  },
];
