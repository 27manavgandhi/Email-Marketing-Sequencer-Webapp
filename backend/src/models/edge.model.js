import mongoose from "mongoose";


// Edge model for Email Sequence
const edgeSchema = new mongoose.Schema({
    source: String,
    target: String,
    sequence: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'EmailSequence',
        required: true
    },


}, { timestamps: true })

const Edge = mongoose.model('Edge', edgeSchema);

export default Edge;