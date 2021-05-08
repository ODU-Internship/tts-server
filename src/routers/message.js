const express = require('express');
const { getMessageController, updateMessageController } = require('../controllers/MessageController');

const router = express.Router();

router.post('/get', getMessageController);
router.post('/update', updateMessageController);

module.exports = router;