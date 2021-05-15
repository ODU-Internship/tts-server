const express = require("express");
const { insertDataController } = require("../controllers/TrainController");

const router = express.Router();

router.post("/", insertDataController);

module.exports = router;
