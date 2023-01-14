import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const connect = async () => {
    mongoose.set('strictQuery', false);

    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('Connected to MongoDB!');
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected!');
});

app.use(cors())
app.use(cookieParser())
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  connect();
  console.log(`Server running on port ${port}...`);
});
