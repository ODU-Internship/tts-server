const express = require('express');
const { postAdminLoginController, postSupervisorLoginController } = require('../controllers/AuthController');

const router = express.Router();

/**
 * request  :  { aid, password }
 *
 * response :  200 OK RESPONSE-USER
*/
router.post('/admin/login', postAdminLoginController);

/**
  * request  :  { sid, password }
  *
  * response :  200 OK RESPONSE-USER
*/
router.post('/supervisor/login', postSupervisorLoginController);



module.exports = router;