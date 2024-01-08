const express = require('express');
const toDo = require('../models/ToDo')
const { getTodo, createToDo, getAllTodos } = require('../middlewares/todoMiddleware')

const router = express.Router();

// GET ALL TASKS
router.get('/', getAllTodos)

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
router.post('/', createToDo)

// GET TASK BI ID
router.get('/:id', getTodo, (req, res) => {
    res.json(res.todo)
})



module.exports = router;
