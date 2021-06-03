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

module.exports.getAllSupervisorController = [
  async (req, res) => {
    try {
      supervisor = await Supervisor.getAllSupervisorDetails();
      if (supervisor == undefined) {
        throw messageNotFoundError("400", "No Supervisors");
      }
      await supervisor.forEach((supervisor) => {
        supervisor.tokens = undefined;
        supervisor.password = undefined;
      });
      successResponseWithData(res, supervisor);
    } catch (error) {
      validationErrorResponse(res, error);
    }
  },
];

module.exports.getAllRepController = [
  async (req, res) => {
    try {
      rep = await CustRep.getAllCustRepDetails();
      if (rep == undefined) {
        throw messageNotFoundError("400", "No Customer Representatives");
      }
      await rep.forEach((rep) => {
        rep.tokens = undefined;
        rep.password = undefined;
      });
      successResponseWithData(res, rep);
    } catch (error) {
      validationErrorResponse(res, error);
    }
  },
];

module.exports.deleteRepController = [
  async (req, res) => {
    try {
      const { repID } = req.params;
      console.log(repID);
      rep = await CustRep.deleteCustRep(repID);
      successResponseWithData(res, rep);
    } catch (error) {
      validationErrorResponse(res, error);
    }
  },
];

module.exports.deleteSupervisorController = [
  async (req, res) => {
    try {
      const { supervisorID } = req.params;
      supervisor = await Supervisor.deleteSupervisor(supervisorID);
      successResponseWithData(res, supervisor);
    } catch (error) {
      validationErrorResponse(res, error);
    }
  },
];
