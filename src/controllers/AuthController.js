const {
    successResponseWithData, unauthorizedResponse,
} = require('../helpers/response');
const { createPermissionError } = require('../helpers/errors');
const { getAdminDetails } = require('../sql/admins');
const { getSupervisorDetails } = require('../sql/supervisors');

// admin section
module.exports.postAdminLoginController = [async (req, res) => {
    try {
        const {
            aid, password,
        } = req.body;
        const admin = await getAdminDetails(aid);
        if (admin.password !== password) {
            throw createPermissionError('admin_password_mismatch', 'Admin password does not match');
        }
        delete admin.password;
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
        const supervisor = await getSupervisorDetails(sid);
        if (supervisor.password !== password) {
            throw createPermissionError('supervisor_password_mismatch', 'Supervisor password does not match');
        }
        delete supervisor.password;
        successResponseWithData(res, supervisor);
    } catch (error) {
        unauthorizedResponse(res, error);
    }
}];
