import mongoose from "mongoose";


// Node model for Email Sequence
const nodeSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['SendMail', 'Wait', 'Decision'],
        required: true,
    },
    parameters: {
        type: String
    },
    sequence: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'EmailSequence',
        required: true
    },
    position: {
        x: {
            type: Number,
            required: true
        },
        y: {
            type: Number,
            required: true
        }
    }

}, { timestamps: true })

const Node = mongoose.model('Node', nodeSchema);

export default Node;