import mongoose from "mongoose";
import { Schema } from "mongoose";

mongoose.Promise = global.Promise;

const revenueSchema = new Schema({
    projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
    cost: { type: Number, required: true },
    targetDate: { type: Date, default: Date.now, },
    note: { type: String, default: '' },
}, { timestamps: true, objectIdToString: true });

export default
    mongoose.models.Revenue || mongoose.model('Revenue', revenueSchema);