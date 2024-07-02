import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import User from "../../../models/user.model.js";
import hashPassword from "../../../services/hashPassword.js";


dotenv.config();

export const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });


        // if the user already exists
        if (existingUser) {
            return res.status(StatusCodes.CONFLICT).json({ status: 'error', msg: 'User already registered' })
        }

        // hashing password
        const hashedPassword = await hashPassword(password);

        const newUser = await User.create({ email, password: hashedPassword });

        return res.status(StatusCodes.CREATED).json({ status: 'success', msg: 'User created successfully' })




    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'error', msg: `Internal server error : ${error.message}` })
    }
}



export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        // user not found
        if (!user) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ status: 'error', msg: 'Invalid email or password' })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        // password doesn't match
        if (!isPasswordValid) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ status: 'error', msg: 'Invalid email or password' })
        }

        // signing with jwt token
        const authToken = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        const modifiedUser = {
            email: user.email

        }


        return res.status(StatusCodes.OK).json({ status: 'success', msg: 'User login successfull', token: authToken, user: modifiedUser })

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'error', msg: `Internal server error : ${error.message}` })
    }
}