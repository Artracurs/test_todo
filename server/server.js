require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const toDoRoutes = require('./routes/todoRoutes')

const cors = require('cors');
const app = express()

app.use(cors());
app.use(express.json());
app.use('/', toDoRoutes)

const PORT = process.env.SERVER_PORT || 4000;
const HOST = process.env.SERVER_HOST || '0.0.0.0';

mongoose.connect(`${process.env.DB_MONGO_URL}`)
    .then(() => console.log('Conndected to MongoDB'))
    .catch((err) => console.error("Could connect to DB", err))

app.listen(PORT, () => {
    console.log(`TODO Server has been started on: http://${HOST}:${PORT}`);
})