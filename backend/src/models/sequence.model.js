import mongoose from "mongoose";

// email sequence model
const emailSequenceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    nodes: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Node'
    }],
    edges: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Edge'
        }
    ],
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });


const EmailSequence = mongoose.model('EmailSequence', emailSequenceSchema);

export default EmailSequence;