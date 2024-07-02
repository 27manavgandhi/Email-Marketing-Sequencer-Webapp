import { StatusCodes } from "http-status-codes";

import EmailSequence from "../../../models/sequence.model.js";


const getEmailSequence = async (req, res) => {
    try {
        const sequenceId = req.params.id;
        const sequence = await EmailSequence.findOne({ _id: sequenceId, createdBy: req.user._id }).populate("nodes").populate("edges");

        if (!sequence) {
            return res.status(StatusCodes.NOT_FOUND).json({ status: 'error', msg: 'Email sequence not found' })
        }


        return res.status(StatusCodes.OK).json({ status: 'success', msg: 'fetched successfully', emailSequence: sequence })

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'error', msg: `Internal server error : ${error.message}` })
    }
}

export default getEmailSequence;