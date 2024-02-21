import mongoose from "mongoose"

export type CategoryDB = {
    _id: mongoose.Types.ObjectId,
    name: string,
    color: string,
    textColor: string,
};

export type CategoryRecord = Omit<CategoryDB, '_id'> & { _id: string }

export type DBProjectType = {
    _id: mongoose.Types.ObjectId,
    name: string
    admin_id: String,
    directories: string[]
    users: string[],
    team: ProjectTeamItem[],
    invitations: string[],
    categories: CategoryDB[],
}

export type ProjectTeamItem = { userId: mongoose.Types.ObjectId, role: string }

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
    fromHour: number,
    toHour: number,
    categoryId: string
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
    createdAt: Date
};
export type LatestCommentType = Omit<CommentDB, 'taskId'> & { taskId: { _id: mongoose.Types.ObjectId, name: string } }

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
    fromHour: number,
    toHour: number,
    categoryId: mongoose.Types.ObjectId,
};

export type TaskShortType = {
    _id: string,
    taskId: string,
    name: string,
    dueDate: string,
    status: StatusType,
    directory: string,
    priority: PriorityType,
    fromHour: number,
    toHour: number,
};

export type TaskByUserDB = {
    _id: mongoose.Types.ObjectId
    name: string,
    assignee: string,
    status: StatusType,
    dueDate: string,
    priority: PriorityType,
};
export type TaskByUserRecord = Omit<TaskByUserDB, '_id'> & { _id: string }

export type ViewTaskType = {
    _id: string,
    name: string,
    description: string,
    dueDate: string,
    status: StatusType,
    priority: PriorityType,
    assignee: string,
    directory: string,
    subtasks: string[],
    fromHour: number,
    toHour: number,
    categoryId: string,
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
    fromHour: number,
    toHour: number,
    categoryId: string
};

export type StoreCommentRequestType = {
    taskId: string,
    commentText: string,
    replyId: string,
};

export type CommentType = {
    _id: string,
    userId: string
    name: string,
    picture: string,
    text: string
    isOwner: boolean
    replyId: string
    createdAt: Date
};

export type ProjectUsers = {
    _id: string,
    name: string,
    picture: string,
    email: string
};

export type ProccessStatusType = {
    success: boolean
};

export type DirectoryType = {
    _id: mongoose.Types.ObjectId,
    name: string,
};

export type UpdateDirectoryType = {
    directoryId: string,
    directoryName: string,
};

export type StoreUser = {
    name: string
    email: string
    google_id: string
    picture: string
};

export type UserDB = {
    sessions: string[],
    google_id: number,
    name: string,
    picture: string,
    email: string
    _id: string,
};

export type UserTeamItemType = Pick<UserDB, '_id' | 'email' | 'name' | 'picture'> & { role: string }

export type PopulatedProjectTeamItem = {
    userId: UserTeamItemType,
    role: string,
    _id: mongoose.Types.ObjectId,
};

export type TeamItemType = {
    user: UserTeamItemType,
    isAdmin: boolean,
    role: string,
};

export type TaskByUserUser = {
    _id: string,
    name: string,
    picture: string,
};

export type ThemeColor = 'warning' | 'primary' | 'secondary' | 'info';