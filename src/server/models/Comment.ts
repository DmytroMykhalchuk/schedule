import mongoose, { Schema } from "mongoose";

mongoose.Promise = global.Promise;

const commentSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
    userId: { type: String, required: true, ref: 'User' },
    name: { type: String, required: true },
    picture: { type: String, required: true },
    text: { type: String, required: true },
    replyId: { type: Schema.Types.ObjectId, default: '', ref: 'Comment' },
});

export default mongoose.models.Comment || mongoose.model('Comment', commentSchema);