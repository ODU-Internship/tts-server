const jwt = require("jsonwebtoken");
const Supervisor = require("../models/supervisor.model");
const CustRep = require("../models/custRep.model");
const Admin = require("../models/admin.model");
const response = require("../helpers/response");
const constants = require("../helpers/constants");
const tokens = require("../helpers/tokens");

const findSupervisor = async (req) => {
  const accessToken = req
    .header(constants.authorizatationHeaderName)
    .replace(constants.bearerTokenLabel, "");
  const { id } = tokens.decodeAccessToken(accessToken);
  return Supervisor.findOne({ sid: id, "tokens.accessToken": accessToken });
};

const findCustRep = async (req) => {
  const accessToken = req
    .header(constants.authorizatationHeaderName)
    .replace(constants.bearerTokenLabel, "");
  const { id } = tokens.decodeAccessToken(accessToken);
  return CustRep.findOne({ cid: id, "tokens.accessToken": accessToken });
};

const findAdmin = async (req) => {
  const accessToken = req
    .header(constants.authorizatationHeaderName)
    .replace(constants.bearerTokenLabel, "");
  const { id } = tokens.decodeAccessToken(accessToken);
  return Admin.findOne({ aid: id, "tokens.accessToken": accessToken });
};

// auth controller only for supervisor access
module.exports.supervisorAuth = async (req, res, next) => {
  try {
    const supervisor = await findSupervisor(req);
    if (!supervisor) {
      throw new Error("Supervisor not found");
    }
    supervisor.tokens = undefined;
    supervisor.password = undefined;
    req.supervisor = supervisor;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      response.unauthorizedResponse(res, error);
      return;
    }
    response.forbiddenResponse(res, error);
  }
};

module.exports.custRepAuth = async (req, res, next) => {
  try {
    const custRep = await findCustRep(req);
    if (!custRep) {
      throw new Error("CustRep not found");
    }
    custRep.tokens = undefined;
    custRep.password = undefined;
    req.custRep = custRep;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      response.unauthorizedResponse(res, error);
      return;
    }
    response.forbiddenResponse(res, error);
  }
};

module.exports.adminAuth = async (req, res, next) => {
  try {
    const admin = await findAdmin(req);
    if (!admin) {
      throw new Error("Admin not found");
    }
    admin.tokens = undefined;
    admin.password = undefined;
    req.admin = admin;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      response.unauthorizedResponse(res, error);
      return;
    }
    response.forbiddenResponse(res, error);
  }
};
