import { ObjectId } from 'mongodb';
import mongoose, { Schema } from "mongoose";

mongoose.Promise = global.Promise;

const directorySchema = new Schema({
    _id: mongoose.Types.ObjectId,
    name: { type: String, required: true },
});

export default mongoose.models.Directory || mongoose.model('Directory', directorySchema);