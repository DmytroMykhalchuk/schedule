import mongoose from "mongoose";
import { Schema, Model } from "mongoose";

mongoose.Promise = global.Promise;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    google_id: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    sessions: {
        type: [String],
        default: [],
    },
},
);

export default
    mongoose.models.User || mongoose.model('User', userSchema);