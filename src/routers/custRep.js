const express = require("express");

const router = express.Router();
const {
  getAllMessageController,
  getMessageController,
  updateMessageController,
  insertMessageController,
} = require("../controllers/MessageController");
const { getCustRepController } = require("../controllers/CustRepController");
const { custRepAuth } = require("../middleware/auth");

router.use(custRepAuth);

router.get("/messages", getAllMessageController);
router.put("/messages/:messageID", updateMessageController);
router.get("/messages/:messageID", getMessageController);
router.post("/messages/", insertMessageController);

module.exports = router;
