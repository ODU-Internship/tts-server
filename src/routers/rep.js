const express = require("express");

const router = express.Router();
const {
  getAllMessageController,
  getMessageController,
  updateMessageController,
} = require("../controllers/MessageController");
const {
  getCustRepController,
  insertMessageController,
} = require("../controllers/CustRepController");
const { custRepAuth } = require("../middleware/auth");

router.use(custRepAuth);

router.get("/messages", getAllMessageController);
router.get("/messages/:messageID", getMessageController);
router.put("/messages/:messageID", updateMessageController);
router.post("/messages/", insertMessageController);

router.get("/me", getCustRepController);

module.exports = router;
