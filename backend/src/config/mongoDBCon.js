import mongoose from "mongoose";
import configEnv from "./configEnv.js";

export const mongoDBCon = async () => {
    console.log('Attempting to connect to MongoDB...');
    try {
        await mongoose.connect(configEnv.db);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error; // Re-throw the error so it can be caught by the caller
    }
}
