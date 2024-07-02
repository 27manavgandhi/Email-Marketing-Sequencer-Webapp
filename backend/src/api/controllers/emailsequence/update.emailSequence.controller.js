import { StatusCodes } from "http-status-codes";

import EmailSequence from "../../../models/sequence.model.js";
import Node from "../../../models/node.model.js";
import Edge from "../../../models/edge.model.js";


const updateEmailSequence = async (req, res) => {
    try {
        const sequenceId = req.params.id;
        const { nodes, edges } = req.body;
        const sequence = await EmailSequence.findById(sequenceId);
        const idMap = {};
        // for (let val of nodes) {
        //     idMap[val["id"]] = ""
        // }



        for (const nodeData of nodes) {
            let node = null;

            // if the node already exists
            if (sequence.nodes.includes(nodeData.id)) {
                node = await Node.findByIdAndUpdate(nodeData.id, {
                    type: nodeData.type,
                    parameters: nodeData.parameters,
                    position: nodeData.position
                }, { new: true });
                idMap[nodeData.id] = node._id.toString()

            }
            else {
                // if there is no node create it

                node = await Node.create({
                    type: nodeData.type,
                    parameters: nodeData.parameters,
                    sequence: sequence._id,
                    position: nodeData.position
                });
                idMap[nodeData.id] = node._id.toString()
            }

            sequence.nodes.push(node._id)
        }


        for (const edgeData of edges) {
            let edge = null;
            // if the edge already exists
            if (sequence.edges.includes(edgeData.id)) {
                edge = await Edge.findByIdAndUpdate(edgeData.id, {
                    source: edgeData.source,
                    target: edgeData.target
                }, { new: true });
            }
            else {
                // if there is no edge create it
                edge = await Edge.create({
                    source: idMap[edgeData.source],
                    target: idMap[edgeData.target],
                    sequence: sequence._id,
                })
            }

            sequence.edges.push(edge._id)
        }

        await sequence.save();
        const emailSequence = await EmailSequence.findById(sequence._id).populate("nodes").populate("edges");

        return res.status(StatusCodes.CREATED).json({ status: 'success', msg: 'email sequence updated successfully', emailSequence: emailSequence })
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ status: 'error', msg: `Internal server error : ${error.message}` })
    }
}

export default updateEmailSequence