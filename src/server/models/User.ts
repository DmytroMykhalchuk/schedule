import mongoose from "mongoose";
import { Schema, Model } from "mongoose";

mongoose.Promise = global.Promise;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        googleId: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: true,
        },
    },
);

export default
    mongoose.models.User || mongoose.model('User', userSchema);