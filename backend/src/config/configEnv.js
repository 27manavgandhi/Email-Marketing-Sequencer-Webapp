import dotenv from "dotenv";
dotenv.config();

const env = process.env.NODE_ENV || 'development'; // default to development if not set

const configEnv = {
    db: process.env.MONGODB_URL,
    port: process.env.PORT
};

export default configEnv;
