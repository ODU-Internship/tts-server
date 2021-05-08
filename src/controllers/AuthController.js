const {
    successResponseWithData, unauthorizedResponse,
} = require('../helpers/response');
const { createPermissionError } = require('../helpers/errors');
let Admin = require('../models/admin.model');
let Supervisor = require('../models/supervisor.model');

// admin section
module.exports.postAdminLoginController = [async (req, res) => {
    try {
        const {
            aid, password,
        } = req.body;
        const admin = await Admin.getAdminDetails(aid);
        if (admin.password !== password) {
            throw createPermissionError('admin_password_mismatch', 'Admin password does not match');
        }
        admin.password = undefined;
        successResponseWithData(res, admin);
    } catch (error) {
        unauthorizedResponse(res, error);
    }
}];

// supervisor section
module.exports.postSupervisorLoginController = [async (req, res) => {
    try {
        const {
            sid, password,
        } = req.body;
        const supervisor = await Supervisor.getSupervisorDetails(sid);
        if (supervisor.password !== password) {
            throw createPermissionError('supervisor_password_mismatch', 'Supervisor password does not match');
        }
        supervisor.password = undefined;
        successResponseWithData(res, supervisor);
    } catch (error) {
        unauthorizedResponse(res, error);
    }
}];
