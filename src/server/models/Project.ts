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
    directories: {
        type: [String],
        default: [],
    },
    users: [{
        type: mongoose.Types.ObjectId, ref: 'User', default: [],
    }],
    team: {
        type: [{ id: { type: Schema.Types.ObjectId, ref: 'User' }, role: String }],
        default: [],
    },
    invitations: {
        type: [String],
        default: [],
    }
});

export default mongoose.models.Project || mongoose.model<DBProjectType>('Project', projectSchema);