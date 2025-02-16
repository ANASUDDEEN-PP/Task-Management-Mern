const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const notifyModel = new Schema ({
    NotificationType: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    UserId:{
        type: String,
        // required: true
    },
    DateAndTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notification', notifyModel);