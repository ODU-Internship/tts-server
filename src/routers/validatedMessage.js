const express = require("express");
const {
  getAllMessageController,
  insertMessageController,
  updateMessageController,
  getMessageController,
  deleteMessageController,
} = require("../controllers/ValidatedMessageController");

const router = express.Router();

router.get("/", getAllMessageController);
router.get("/:messageID", getMessageController);
router.put("/:messageID", updateMessageController);
router.post("/", insertMessageController);
router.delete("/:messageID", deleteMessageController);

module.exports = router;
