import { StatusCodes } from "http-status-codes";

const validateBody = (validateSchema) => {
    return (req, res, next) => {

        if (Object.keys(req.body).length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ status: 'error', msg: 'Request body cannot be empty' })
        }

        const { error } = validateSchema.validate(req.body, { abortEarly: false });

        if (error) {
            const errorMsgs = error.details.map(detail => detail.message).join(', ')
            return res.status(StatusCodes.BAD_REQUEST).json({ status: 'error', msg: errorMsgs })
        }

        next()
    }
}


export default validateBody;