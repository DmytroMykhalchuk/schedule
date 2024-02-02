import connectDB from "../connectDB"
import User from "../models/User";
import { ProjectActions } from "./ProjectActions";

type MemberType = {
    _id: string,
    name: string,
    email: string,
    picture: string,
    isAdmin: boolean
}

export const MemberActions = {
    async getMembers(projectId: string, sessionId: string): Promise<MemberType[]> {
        await connectDB();

        const project = await ProjectActions.getProjectByFilters({projectId, sessionId}, { users: 1, admin_id: 1 });

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

    async removeMember(projectId: string, sessionId: string, userId: string): Promise<{ success: boolean }> {
        await connectDB();
        const project = await ProjectActions.getProjectByFilters({projectId, sessionId}, { users: 1, tasks: 1 });

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