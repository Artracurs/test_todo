const ToDo = require('../models/ToDo')

async function getAllTodos(req, res) {
try {
    let allTodos = await ToDo.find();
    res.json(allTodos)
} catch (error) {
    res.status(500).json({ message: error.message })
}
}

async function getTodo(req, res, next) {
    try {
        let todo = await ToDo.findById(req.params.id);
        if (todo === null) {
            return res.status(404).json({ message: "Can't find todo"})
        }
        res.todo = todo;
        next()
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function createToDo(req, res) {
    const todo = new ToDo({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    });

    try {
        const savedToDo = await todo.save();
        res.status(201).json(savedToDo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function updateTodo(req, res) {
    if (req.body.title != null) {
        res.todo.title = req.body.title;
    }
    if (req.body.description != null) {
        res.todo.description = req.body.description;
    }
    if (req.body.status != null) {
        res.todo.status = req.body.status;
    }

    try {
        const updatedTodo = await res.todo.save();
        res.json(updatedTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function deleteTodo(req, res) {
    try {
        await ToDo.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted Todo' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { getAllTodos, getTodo, createToDo, updateTodo, deleteTodo };