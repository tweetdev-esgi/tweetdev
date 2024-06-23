import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import codeRoutes from './routes/codeRoutes';

const app = express();

app.use(cors());
app.use(bodyParser.json());

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/codeEditor', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as mongoose.ConnectOptions);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
};

connectDB();

app.use('/api', codeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
