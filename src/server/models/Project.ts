import mongoose, { Schema } from "mongoose";
import { DBProjectType } from "../actions/types";

mongoose.Promise = global.Promise;

const projectSchema = new Schema<DBProjectType>({
    name: {
        type: String,
        required: true,
    },
    admin_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    directories: [
        { type: mongoose.Types.ObjectId, required: true, ref: "Directory", default: [], },
    ],
    users: [{
        type: mongoose.Types.ObjectId, ref: 'User', default: [],
    }],
    team: {
        type: [{ userId: { type: Schema.Types.ObjectId, ref: 'User' }, role: String }],
        default: [],
    },
    invitations: {
        type: [String],
        default: [],
    },
    categories: {
        type: [{ _id: mongoose.Types.ObjectId, name: String, color: String, textColor: String }],
        default: [],
    },
});

export default mongoose.models.Project || mongoose.model<DBProjectType>('Project', projectSchema);