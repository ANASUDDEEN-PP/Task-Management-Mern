const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskModel = new Schema({
    TaskName: {
        type: String,
        require: true
    },
    AssigneeName: {
        type: String,
        require: true
    },
    Status: {
        type: String,
        require: true
    },
    Date: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Tasks', taskModel);