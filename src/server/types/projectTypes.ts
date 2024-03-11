import mongoose from "mongoose";

export type ProjectListAvailableDB = {
    _id: mongoose.Types.ObjectId,
    name: string,
};

export type ProjectListAvailableRecord = {
    _id: string,
    name: string,
};