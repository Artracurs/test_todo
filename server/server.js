require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const toDoRoutes = require('./routes/todoRoutes');

const app = express();

// Загрузка файла Swagger
const swaggerDocument = YAML.load('./docs/swagger.yaml');

app.use(cors());
app.use(express.json());

// Настройка Swagger UI
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', toDoRoutes);

const PORT = process.env.SERVER_PORT || 4000;
const HOST = process.env.SERVER_HOST || '0.0.0.0';

mongoose.connect(`${process.env.DB_MONGO_URL}`)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error("Could not connect to DB", err));

app.listen(PORT, () => {
    console.log(`TODO Server has been started on: http://${HOST}:${PORT}`);
});
