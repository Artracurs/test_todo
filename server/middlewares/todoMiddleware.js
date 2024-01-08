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

async function createToDo(req, res, next) {
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

module.exports = { getAllTodos, getTodo, createToDo };