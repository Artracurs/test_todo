import express from 'express';
// import toDo from '../models/ToDo.';
import { getTodo, createToDo, getAllTodos, updateTodo, deleteTodo } from '../middlewares/todoMiddleware.js';

const router = express.Router();

// GET ALL TASKS
router.get('/todos', getAllTodos)

// CREATE NEW TASK
router.post('/todos', createToDo)

// GET TASK BY ID
router.get('/todos/:id', getTodo, (req, res) => {
    res.json(res.todo)
})

// UPDATE TASK BY ID
router.patch('/todos/:id', getTodo, updateTodo);

// DELETE TODO BY ID
router.delete('/todos/:id', getTodo, deleteTodo);

export default router;
