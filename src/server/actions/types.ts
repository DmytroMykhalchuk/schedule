import { UrgentTasks } from './../../app/Componnets/Home/Elements/UrgentTasks';
import mongoose from "mongoose"

export type DBProjectType = {
    _id: mongoose.Types.ObjectId,
    name: string
    admin_id: String,
    directories: string[]
    users: string[],
    team: ProjectTeamItem[],
    invitations: string[],
}

export type ProjectTeamItem = { id: string, role: string }

export type UrgentTask = {
    _id: string,
    name: string,
    dueDate: string,
};

export type AuthType = {
    projectId: string,
    sessionId: string,
};

export type StoreTaskType = {
    name: string,
    assignee: string | null,
    status: string,
    directory: string | null,
    dueDate: string,
    priority: string,
    description: string,
    subtasks: string[] | null,
    comment?: string | null
};

export type StoreCommentType = {
    _id?: mongoose.Types.ObjectId,
    userId: string
    name: string
    picture: string
    text: string
    replyId: string
    taskId: string,
    projectId: string
};

export type CommentDB = {
    _id: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    name: string,
    picture: string,
    text: string,
    replyId: string,
    taskId: mongoose.Types.ObjectId,
    projectId: mongoose.Types.ObjectId,
};

export type StatusType = 'not_started' | 'in_progress' | 'done';
export type PriorityType = 'low_priority' | 'medium_priority' | 'critical_prority';

export type TaskDB = {
    _id: mongoose.Types.ObjectId,
    projectId: mongoose.Types.ObjectId,
    name: string,
    assignee: mongoose.Types.ObjectId,
    status: StatusType,
    directory: string,
    dueDate: string,
    priority: PriorityType,
    description: string,
    subtasks: string[],
    comments: mongoose.Types.ObjectId[],
};

export type TaskShortType = {
    _id: string,
    taskId: string,
    name: string,
    dueDate: string,
    status: StatusType,
    directory: string,
    priority: PriorityType,
};

export type ViewTaskType = {
    _id: string,
    name: string,
    description: string,
    dueDate: string,
    status: StatusType,
    priority: PriorityType,
    assignee: string
    directory: string
    subtasks: string[]
};

export type TaskUpdateType = {
    taskId: string
    name: string,
    assignee: string | null,
    status: StatusType,
    directory: string | null,
    dueDate: string,
    priority: PriorityType,
    description: string,
    subtasks: string[] | null,
};

export type StoreCommentRequestType = {
    taskId: string,
    commentText: string,
    replyId: string,
};