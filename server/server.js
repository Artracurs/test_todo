import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import YAML from 'yamljs';
import { serve, setup } from 'swagger-ui-express';
import toDoRoutes from './routes/todoRoutes.js';

const app = express();

// Загрузка файла Swagger
const swaggerDocument = YAML.load('./docs/swagger.yaml');

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

app.use(cors());
app.use(express.json());

// Настройка Swagger UI
app.use('/api', serve, setup(swaggerDocument));
app.use('/', toDoRoutes);

const PORT = process.env.SERVER_PORT || 4000;
const HOST = process.env.SERVER_HOST || '192.168.43.216';

mongoose.connect(`${process.env.DB_MONGO_URL}`)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error("Could not connect to DB", err));

app.listen(PORT, () => {
    console.log(`TODO Server has been started on: http://${HOST}:${PORT}`);
});
