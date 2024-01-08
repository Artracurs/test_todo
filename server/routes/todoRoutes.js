const express = require('express');
const toDo = require('../models/ToDo')

const router = express.Router();

// GET ALL TASKS
router.get('/', async (req, res) => {
    try {
        const todos = await toDo.find();    
        res.json(todos)
        // res.send('response success')
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

})

// CREATE A NEW TASK
router.post('/', async (req, res) => {
    const todo = new toDo({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    });

    try {
        const savedToDo = await todo.save();
        res.status(201).json(savedToDo)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;
