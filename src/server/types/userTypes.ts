import mongoose from "mongoose";

export type UserRecord = {
    googleId: string;
    name: string;
    picture: string;
    email: string;
    _id: string;
};

export type UserLoginResponse = {
    name: string;
    image: string;
    email: string;
    id: string;
    locale: string;
};

export type MemberRecord = {
    _id: string;
    name: string;
    email: string;
    picture: string;
    isAdmin: boolean;
};

export type UserInfoDB = {
    _id: mongoose.Types.ObjectId,
    name: string;
    email: string;
    picture: string;
};

export type UserInfoRecord = Omit<UserInfoDB, '_id'> & { _id: string; };