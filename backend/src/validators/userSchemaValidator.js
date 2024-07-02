import Joi from "joi";

// schema for validation
const userSchemaValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export default userSchemaValidator;