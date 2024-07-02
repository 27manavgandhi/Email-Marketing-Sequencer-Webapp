import express from 'express';

import { registerUser, loginUser } from "../../controllers/auth/auth.controller.js";
import validateBody from '../../../middlewares/validateBody.js';
import userSchemaValidator from '../../../validators/userSchemaValidator.js';


const router = express.Router();

// for new user registration
router.route('/register').post(validateBody(userSchemaValidator), registerUser);

//  for user login
router.route('/login').post(validateBody(userSchemaValidator), loginUser)

export default router;