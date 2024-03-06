import connectDB from '../connectDB';
import mongoose from 'mongoose';
import Task from '../models/Task';
import User from '../models/User';
import { AuthType, UserDB } from './types';
import { MemberRecord } from '../types/userTypes';
import { ProjectActions } from './ProjectActions';

export const MemberActions = {
    async getMembers(authParams: AuthType): Promise<MemberRecord[]> {
        await connectDB();

        const project = await ProjectActions.getProjectByFilters(authParams, { users: 1, admin_id: 1 });

        const users = await User.find({ _id: { $in: project?.users } }, { name: 1, picture: 1, email: 1 }).lean() as UserDB[];

        const formattedUsers = users.map((user => {

            return {
                ...user,
                _id: user._id.toString(),
                isAdmin: user._id.toString() === project.admin_id.toString(),
            };
        })) as MemberRecord[]

        return formattedUsers;
    },

    async removeMember(authParams: AuthType, userId: string): Promise<{ success: boolean }> {
        await connectDB();
        const project = await ProjectActions.getProjectByFilters(authParams, { users: 1, tasks: 1 });

        project.users = project.users.filter((id: mongoose.Types.ObjectId) => id.toString() !== userId);

        project.save();
        await Task.updateMany({ projectId: project?._id, assignee: userId }, { assignee: null });

        return { success: true };
    },
}