const express = require('express');

const router = express.Router();
const { getAllMessageController, getMessageController, updateMessageController, insertMessageController } = require('../controllers/MessageController');

router.get('/get', getAllMessageController);
router.post('/update', updateMessageController);
router.get('/:messageID', getMessageController);
router.post('/insert', insertMessageController);

module.exports = router;