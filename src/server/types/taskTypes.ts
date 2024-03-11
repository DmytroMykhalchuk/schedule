import mongoose from "mongoose";
import { PriorityType, StatusType } from "../actions/types";

export type TaskInfoDB = {
    _id: mongoose.Types.ObjectId,
    name: string,
    status: StatusType,
    directory: string,
    priority: PriorityType,
    dueDate: string;
};
export type TaskInfoRecord = {
    taskId: string,
    name: string,
    status: StatusType,
    directory: string,
    priority: PriorityType,
    dueDate: string;
};