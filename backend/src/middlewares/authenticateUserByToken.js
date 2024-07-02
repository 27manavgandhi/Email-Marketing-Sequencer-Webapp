import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";


// to verify and decode the token
const authenticateUserByToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization');

        // if no token is provided
        if (!token) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ status: 'error', msg: 'Unauthorized user , Invalid token' })
        }

        // decoding user 
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedUser.userId);

        req.user = user;
        next();


    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'error', msg: `Internal server error : ${error.message}` })
    }
}

export default authenticateUserByToken;