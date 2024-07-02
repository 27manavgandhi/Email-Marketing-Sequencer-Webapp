import { StatusCodes } from "http-status-codes";

import EmailSequence from "../../../models/sequence.model.js";
import Node from "../../../models/node.model.js";
import Edge from "../../../models/edge.model.js";


const deleteEmailSequence = async (req, res) => {
    try {
        const sequenceId = req.params.id;
        const emailSequence = await EmailSequence.findById(sequenceId);

        if (!emailSequence) {
            return res.status(StatusCodes.NOT_FOUND).json({ status: 'error', msg: 'Email sequence not found' })
        }

        // check whether the requested user created the sequence
        if (emailSequence.createdBy.toString() !== req.user._id.toString()) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ status: 'error', msg: 'Not an authorized user to delete this sequence' })
        }

        // delete nodes associated to that sequence
        await Node.deleteMany({ sequence: emailSequence._id });

        // delete edges associated to that sequence
        await Edge.deleteMany({ sequence: emailSequence._id });

        // delete sequence
        await emailSequence.deleteOne();

        return res.status(StatusCodes.OK).json({ status: 'success', msg: 'Email sequence deleted successfully' })

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'error', msg: `Internal server error : ${error.message}` })
    }
}

export default deleteEmailSequence;