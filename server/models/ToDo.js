import mongoose from 'mongoose';

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

export default mongoose.model('ToDo', toDoSchema);