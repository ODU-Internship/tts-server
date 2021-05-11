const express = require('express');
const { getAllMessageController, getMessageController, updateMessageController, insertMessageController } = require('../controllers/MessageController');

const router = express.Router();

router.get('/all', getAllMessageController);
router.get('/:messageID', getMessageController);
router.post('/update', updateMessageController);
router.post('/insert', insertMessageController);

module.exports = router;