
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const supervisorSchema = new Schema({
    sid: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    }
}, {
    timestamps: true,
});

const Supervisor = mongoose.model('Supervisor', supervisorSchema);

Supervisor.getSupervisorDetails = (sid) =>
    Supervisor.find({ sid: sid })
        .then(supervisor => supervisor[0]);

module.exports = Supervisor;