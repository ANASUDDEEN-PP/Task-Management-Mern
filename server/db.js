require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/TaskManagement');

        console.log('Connected to MongoDB - Database: TaskManagement');

        await initializeDB();

    } catch (err) {
        console.error(`MongoDB connection error: ${err.message}`);
        process.exit(1); // Exit process with failure
    }
};

const initializeDB = async () => {
    try {
        const Task = mongoose.model('tasks', new mongoose.Schema({ name: String }));
        const taskCount = await Task.countDocuments();

        if (taskCount === 0) {
            await Task.create({ name: 'Initialize Database' });
            console.log('TaskManagement database initialized successfully!');
        }
    } catch (err) {
        console.error(`Error initializing database: ${err.message}`);
    }
};

module.exports = connectDB;
