import { AuthType } from './types';
import connectDB from "../connectDB"
import User from "../models/User";
import { ProjectActions } from "./ProjectActions";
import { MemberType } from '../types/userTypes';

export const MemberActions = {
    async getMembers(authParams: AuthType): Promise<MemberType[]> {
        await connectDB();

        const project = await ProjectActions.getProjectByFilters(authParams, { users: 1, admin_id: 1 });

        const users = await User.find({ _id: { $in: project?.users } }, { name: 1, picture: 1, email: 1 });

        const formattedUsers = users.map((user: { _id: string, isAdmin: boolean }) => {
            if (user._id.toString() === project.admin_id) {
                user.isAdmin = true;
            } else {
                user.isAdmin = false;
            }
            return user;
        }) as MemberType[]

        return formattedUsers;
    },

    async removeMember(authParams: AuthType, userId: string): Promise<{ success: boolean }> {
        await connectDB();
        const project = await ProjectActions.getProjectByFilters(authParams, { users: 1, tasks: 1 });

        project.users = project.users.filter((id: string) => id !== userId);

        project.tasks = project.tasks.map((task: { assignee: string, comments: { userId: string }[] }) => {

            if (task.assignee === userId) {
                task.assignee = '';
            }
            task.comments = task.comments.filter((comment) => comment.userId !== userId);

            return task;
        });

        project.save();

        return { success: true };
    },
}