import mongoose from 'mongoose';

const connectDB = async () => {
    if (!process.env.MONGODB_URI) {
        throw new Error("MONGODB_URI is not defined in the environment variables");
    }
    
    console.log("Connecting to MongoDB at", process.env.MONGODB_URI);

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
            socketTimeoutMS: 10000,
            retryWrites: true,
            retryReads: true,
        });
        console.log('MongoDB connected');

        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

export default connectDB;