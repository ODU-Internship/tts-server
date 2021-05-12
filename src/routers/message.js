const express = require("express");
const {
  getAllMessageController,
  getMessageController,
  updateMessageController,
  insertMessageController,
} = require("../controllers/MessageController");

const router = express.Router();

router.get("/", getAllMessageController);
router.get("/:messageID", getMessageController);
router.put("/update/:messageID", updateMessageController);
router.post("/insert", insertMessageController);

module.exports = router;
