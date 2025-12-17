import 'dotenv/config';
import express from 'express';

// import './migrate.js';

import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});