const express = require('express');
const toDo = require('../models/ToDo')

const router = express.Router();

// GET ALL TASKS
router.get('/', async (req, res) => {
    try {
        const todos = await toDo.find();
        res.json(todos)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
    res.send('response success')
})

// CREATE A NEW TASK
router.post('/', async (req, res) => {
    const todo = new toDo({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    })
})

module.exports = router;
