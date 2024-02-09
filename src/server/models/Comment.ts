import { ObjectId } from 'mongodb';
import mongoose, { Schema } from "mongoose";

mongoose.Promise = global.Promise;

const commentSchema = new Schema({
    userId: { type: String, required: true, ref: 'User' },
    name: { type: String, required: true },
    picture: { type: String, required: true },
    text: { type: String, required: true },
    replyId: { type: String, default: '',},
    taskId: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
});

export default mongoose.models.Comment || mongoose.model('Comment', commentSchema);