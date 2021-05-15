const express = require("express");
const {
  getAllMessageController,
  insertMessageController,
  updateMessageController,
  getMessageController,
} = require("../controllers/ValidatedMessageController");

const router = express.Router();

router.get("/", getAllMessageController);
router.get("/:messageID", getMessageController);
router.put("/:messageID", updateMessageController);
router.post("/", insertMessageController);

module.exports = router;
