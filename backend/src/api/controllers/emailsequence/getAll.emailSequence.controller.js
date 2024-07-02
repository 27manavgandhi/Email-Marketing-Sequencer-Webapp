import { StatusCodes } from "http-status-codes";

import EmailSequence from "../../../models/sequence.model.js";


const getAllEmailSequence = async (req, res) => {
    try {
        const sequences = await EmailSequence.find({ createdBy: req.user._id });

        if (!sequences) {
            return res.status(StatusCodes.NOT_FOUND).json({ status: 'error', msg: 'Email sequence not found' })
        }


        return res.status(StatusCodes.OK).json({ status: 'success', msg: 'fetched successfully', emailSequences: sequences })

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'error', msg: `Internal server error : ${error.message}` })
    }
}

export default getAllEmailSequence;