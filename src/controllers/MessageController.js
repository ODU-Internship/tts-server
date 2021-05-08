const {
    successResponseWithData, validationErrorResponse
} = require('../helpers/response');
const { messageNotFoundError } = require('../helpers/errors');

let Message = require('../models/message.model');

module.exports.getMessageController = [async (req, res) => {
    try {
        const {
            mid
        } = req.body;
        const message = await Message.getMessageDetails(mid);
        if (message == undefined) {
            throw messageNotFoundError('400', 'Message does not exist');
        }
        successResponseWithData(res, message);
    } catch (error) {
        validationErrorResponse(res, error);
    }
}];

module.exports.updateMessageController = [async (req, res) => {
    try {
        const {
            id, label
        } = req.body;
        const message = await Message.updateMessageDetails(id, label);
        if (message == undefined) {
            throw messageNotFoundError('mid_invalid', 'Message does not exist');
        }
        successResponseWithData(res, message);
    } catch (error) {
        console.log(error);
        validationErrorResponse(res, error);
    }
}];