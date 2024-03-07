import mongoose from 'mongoose';

export type DirectoryRecord = {
    _id: string,
    name: string,
};

export type DirectoryDB = {
    _id: mongoose.Types.ObjectId,
    name: string,
};