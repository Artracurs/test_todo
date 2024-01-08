const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['pending', 'in progress', 'completed'],
        default: 'pending'
    }
});

module.exports = mongoose.model('ToDo', toDoSchema);
