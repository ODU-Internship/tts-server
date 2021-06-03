const express = require("express");

const {
  supervisorSignupController,
  repSignupController,
  getAllSupervisorController,
  getAllRepController,
  deleteSupervisorController,
  deleteRepController,
} = require("../controllers/AdminController");

const router = express.Router();

router.get("/supervisors", getAllSupervisorController);
router.get("/reps", getAllRepController);
// router.delete("/supervisors/:supervisorID", deleteSupervisorController);
// router.delete("/reps/:repID", deleteRepController);
router.post("/supervisors", supervisorSignupController);
router.post("/reps", repSignupController);

module.exports = router;
