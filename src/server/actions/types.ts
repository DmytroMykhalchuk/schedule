import { payment } from './../services/stripe';
import { Dayjs } from "dayjs";
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
    premium: {
        isActive: boolean,
        payment: {
            subscriptionId: string;
            sessionId: string;
            lastPayment: Date | null;
        };
    }
}

export type ProjectTeamItem = { userId: mongoose.Types.ObjectId, role: string }

export type UrgentTask = {
    _id: string,
    name: string,
    dueDate: string,
};

export type AuthType = {
    projectId: string,
    email: string,
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
    categoryId: string | null
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
    categoryId: string,
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
    assignee: string | null,
    directory?: string,
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
    categoryId: string | null
};

export type StoreCommentRequestType = {
    taskId: string,
    commentText: string,
    replyId: string,
};

export type CommentType = {
    _id: string;
    userId: string;
    name: string;
    picture: string;
    text: string;
    isOwner: boolean;
    replyId: string;
    createdAt: Date;
    taskId: string;
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
    _id: string,
    name: string,
};

export type DirectoryWithUsersType = {
    _id: mongoose.Types.ObjectId,
    name: string,
    users: { name: string, picture: string, email: string }[],
};

export type UpdateDirectoryType = {
    directoryId: string,
    directoryName: string,
};

export type StoreUser = {
    name: string;
    email: string;
    googleId: string;
    picture: string;
    locale: string;
};

export type UserDB = {
    googleId: string,
    name: string,
    picture: string,
    email: string
    _id: mongoose.Types.ObjectId,
    locale: string;
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

export type TaskFilters = {
    _id: mongoose.Types.ObjectId,
    assignee: mongoose.Types.ObjectId,
    fromHour: number,
    toHour: number,
    dueDate: Dayjs,
    categoryId: mongoose.Types.ObjectId
};

export type MonthProgressSubMonths = { [month: number]: number[] };
export type MonthProgressType = {
    [categoryId: string]: { from: number, to: number }[]
};
export type WorkHours = { [dateItem: string]: number };



export type MonthPercentage = { from: number, to: number };

export type RevenueStoreType = {
    cost: number,
    date: string,
    note: string,
};

export type UpdateRevenueType = RevenueStoreType & { id: string };

export type RevenueDBdType = {
    _id: mongoose.Types.ObjectId,
    projectId: mongoose.Types.ObjectId,
    author: mongoose.Types.ObjectId,
    cost: number,
    targetDate: Date,
    note: string,
    createdAt: Date,
};

export type RevenueRecordType = {
    _id: string,
    projectId: string,
    author: string,
    cost: number,
    targetDate: Date,
    note: string,
    createdAt: Date,
};

export type RevenueRecordPopulatedType = {
    _id: string,
    projectId: string,
    author: {
        _id: string,
        name: string,
        picture: string,
        email: string,
    },
    cost: number,
    targetDate: Date,
    note: string,
    createdAt: Date,
};

export type RevenueItemPopulatedDB = Omit<RevenueDBdType, 'author'> & { author: Pick<UserDB, '_id' | 'email' | 'picture' | 'name' | 'email'> };

export type RevenueChartType = { [monthNumber: number]: number };

export type ReportPageInfoType = {
    projectCount?: number,
    userCount?: number,
    progress?: MonthProgressType,
    monthWorkHours?: WorkHours,
    weekWorkHours?: WorkHours,
    categories: CategoryRecord[],
    revenue: RevenueChartType,
};

export type ByDirectoryOrCategoryIdTaskDB = Omit<TaskDB, 'assignee' | 'projectId' | 'directory' | 'dueDate' | 'description' | 'subtasks' | 'comments' | 'fromHour' | 'toHour'> & { assignee: { _id: mongoose.Types.ObjectId, name: string, email: string, picture: string }, category?: CategoryDB };

export type ByDirectoryOrCategoryTaskRecord = {
    assignee: {
        _id: string;
        name: string;
        email: string;
        picture: string;
    };
    category: CategoryDB | undefined;
    _id: string;
    name: string;
    status: StatusType;
    priority: PriorityType;
    categoryId: string;
}


export type TaskTree = {
    [id: string]: {
        tasks: TaskByUserRecord[];
        user: TaskByUserUser;
    }
};


