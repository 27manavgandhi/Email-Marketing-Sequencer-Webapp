import dotenv from "dotenv";
dotenv.config();

const env = process.env.NODE_ENV; // development , production

let configEnv = null;

if (env === 'production') {
    configEnv = {
        db: process.env.MONGODB_URL,
        port: process.env.PORT
    }
}
else {
    configEnv = {
        db: 'mongodb://0.0.0.0/futureBlinkDB',
        port: process.env.PORT
    }
}

export default configEnv;
