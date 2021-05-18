const express = require("express");

const {
  supervisorSignupController,
  repSignupController,
} = require("../controllers/AdminController");

const router = express.Router();

router.post("/supervisors", supervisorSignupController);
router.post("/reps", repSignupController);

module.exports = router;
