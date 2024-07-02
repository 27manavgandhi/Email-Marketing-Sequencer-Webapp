import mongoose from "mongoose";
import configEnv from "./configEnv.js";


export const mongoDBCon = async () => {
    return mongoose.connect(configEnv.db)
}