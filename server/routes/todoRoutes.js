const express = require('express');
const toDo = require('../models/ToDo')
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('response success')
})

module.exports = router;
