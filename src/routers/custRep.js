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
router.get("/messages/:messageID", getMessageController);
router.put("/messages/:messageID", updateMessageController);
router.post("/messages/", insertMessageController);

router.get("/me", getCustRepController);

module.exports = router;
