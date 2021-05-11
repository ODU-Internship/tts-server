const jwt = require('jsonwebtoken');
const Supervisor = require('../models/supervisor.model');
const response = require('../helpers/response');
const constants = require('../helpers/constants');
const tokens = require('../helpers/tokens');

const findSupervisor = async (req) => {
  const accessToken = req
    .header(constants.authorizatationHeaderName)
    .replace(constants.bearerTokenLabel, '');
  const { sid } = tokens.decodeAccessToken(accessToken);
  return Supervisor.findOne({ sid, 'tokens.accessToken': accessToken });
};

// auth controller only for supervisor access
module.exports.supervisorAuth = async (req, res, next) => {
  try {
    const supervisor = await findSupervisor(req);
    if (!supervisor) {
      throw new Error('Supervisor not found');
    }
    req.supervisor = supervisor;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      response.unauthorizedResponse(res, error);
      return;
    }
    response.forbiddenResponse(res, error);
  }
};

