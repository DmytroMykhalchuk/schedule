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