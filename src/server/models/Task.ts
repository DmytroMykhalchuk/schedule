import mongoose from "mongoose";
import { Schema, Model } from "mongoose";

mongoose.Promise = global.Promise;

const taskSchema = new Schema({
    projectId: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
    name: { type: String, required: true, },
    assignee: { type: mongoose.Types.ObjectId, ref: 'User', required: false, },
    status: { type: String, required: true, },
    directory: { type: mongoose.Types.ObjectId, ref: 'Directory', required: false, default: '', },
    dueDate: { type: String, default: '', },
    fromHour: { type: Number, required: true, },
    toHour: { type: Number, required: true },
    priority: { type: String, required: true, },
    description: { type: String, default: '', },
    subtasks: { type: [String], default: [], },
    categoryId: { type: String, default: '' },
    comments: [
        { type: mongoose.Types.ObjectId, required: true, ref: "Comment", default: [], onDelete: 'cascade' },
    ],
},
);

export default
    mongoose.models.Task || mongoose.model('Task', taskSchema);