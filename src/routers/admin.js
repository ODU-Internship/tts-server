const express = require("express");

const {
  supervisorSignupController,
  repSignupController,
} = require("../controllers/AdminController");

const router = express.Router();

router.post("/supervisor", supervisorSignupController);
router.post("/rep", repSignupController);

module.exports = router;
