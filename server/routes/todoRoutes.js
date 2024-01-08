const express = require('express');
const toDo = require('../models/ToDo')
const { getTodo, createToDo, getAllTodos, updateTodo, deleteTodo } = require('../middlewares/todoMiddleware');
const { error } = require('console');

const router = express.Router();

// GET ALL TASKS
router.get('/', getAllTodos)

// CREATE A NEW TASK
router.post('/', createToDo)

// GET TASK BY ID
router.get('/:id', getTodo, (req, res) => {
    res.json(res.todo)
})

// UPDATE TASK BY ID
router.patch('/:id', getTodo, updateTodo);

// DELETE TODO BY ID
router.delete('/:id', getTodo, deleteTodo);

module.exports = router;
