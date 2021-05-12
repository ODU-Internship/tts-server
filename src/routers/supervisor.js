const express = require("express");

const router = express.Router();

const {
  getAllMessageController,
  getMessageController,
  updateMessageController,
  insertMessageController,
} = require("../controllers/MessageController");
const {
  getSupervisorController,
} = require("../controllers/SupervisorController");
const { supervisorAuth } = require("../middleware/auth");
router.use(supervisorAuth);

router.get("/messages/", getAllMessageController);
router.get("/messages/:messageID", getMessageController);
router.put("/messages/:messageID", updateMessageController);
router.post("/messages/", insertMessageController);

router.get("/me", getSupervisorController);

module.exports = router;
