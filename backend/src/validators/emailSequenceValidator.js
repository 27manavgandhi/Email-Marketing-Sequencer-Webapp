import Joi from "joi";

const emailSequenceSchemaValidator = Joi.object({
    name: Joi.string().required(),
    nodes: Joi.array().items(
        Joi.object({
            type: Joi.string().valid('SendMail', 'Wait', 'Decision').required(),
            parameters: Joi.string(),
            sequence: Joi.string()
        })
    ).required()
});


export default emailSequenceSchemaValidator;