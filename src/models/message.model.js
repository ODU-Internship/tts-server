const mongoose = require('mongoose');

const Schema = mongoose.Schema;
mongoose.set('useFindAndModify', false);

const messageSchema = new Schema({
    mid: {
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
        required: false,
        trim: true,
        minlength: 2
    }
}, {
    timestamps: true,
});

const Message = mongoose.model('Message', messageSchema);

Message.getMessageDetails = (mid) =>
    Message.find({ mid: mid })
        .then(message => message[0]);

Message.updateMessageDetails = (id, label) =>
    Message.findByIdAndUpdate(id, { label: label }, { new: true })
        .then(message => message);

module.exports = Message;