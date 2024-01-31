import mongoose, { Schema } from "mongoose";

mongoose.Promise = global.Promise;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    admin_id: {
        type: String,
        required: true,
    },
    directories: {
        type: [String],
        default: [],
    },
    users: {
        type: [String],
        default: [],
    },
    team: {
        type: [{ id: String, role: String }],
        default: [],
    },
    tasks: {
        type: [{
            name: { type: String, required: true, },
            assignee: { type: String, default: '', },
            status: { type: String, required: true, },
            directory: { type: String, default: '', },
            dueDate: { type: String, default: '', },
            priority: { type: String, required: true, },
            description: { type: String, default: '', },
            subtasks: { type: [String], default: [], },
            comments: {
                type: [{
                    _id: { type: String, required: true },
                    name: { type: String, required: true },
                    picture: { type: String, required: true },
                    text: { type: String, required: true }
                }],
                default: [],
            }
        }]
    },
    invitations: {
        type: [String],
        default: [],
    }
});

export default mongoose.models.Project || mongoose.model('Project', projectSchema);