const express = require("express");

const {
  getAdminController,
  supervisorSignupController,
  repSignupController,
  getAllSupervisorController,
  getAllRepController,
  deleteSupervisorController,
  deleteRepController,
} = require("../controllers/AdminController");
const { adminAuth } = require("../middleware/auth");

const router = express.Router();
router.use(adminAuth);

router.get("/me", getAdminController);
router.get("/supervisors", getAllSupervisorController);
router.get("/reps", getAllRepController);
router.delete("/supervisors/:supervisorID", deleteSupervisorController);
router.delete("/reps/:repID", deleteRepController);
router.post("/supervisors", supervisorSignupController);
router.post("/reps", repSignupController);

module.exports = router;
