const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

const messageSchema = new Schema({
    messageID: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    message: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    label: {
        type: String,
        trim: true,
        minlength: 2
    }
}, {
    timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);

Message.getAllMessageDetails = () =>
    Message.find()
        .then(message => message);

Message.getMessageDetails = (messageID) =>
    Message.find({ messageID: messageID })
        .then(message => message[0]);

Message.updateMessageDetails = (id, label) =>
    Message.findByIdAndUpdate(id, { label: label }, { new: true })
        .then(message => message);

Message.insertMessageDetails = (messageID, message) =>
    Message.create({ messageID: messageID, message: message })
        .then(message => message);

module.exports = Message;