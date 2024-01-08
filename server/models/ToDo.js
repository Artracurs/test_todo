const mongoose = require('mongoose');

const toDoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['pending', 'in progress', 'completed'],
        defauilt: 'pending'
    }
})

module.exports = mongoose.model('ToDo', toDoSchema)