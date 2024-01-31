import { isGeneratorFunction } from "util/types";
import connectDB from "../connectDB";
import User from "../models/User";
import { ProjectActions } from "./ProjectActions";
import { UserActions, UserDB, UserTeamItemType } from "./UserActions";

type StoreMemberType = {
    role: string,
    userId: string
};

type TeamItemType = UserTeamItemType & { isAdmin: boolean }

export const TeamActions = {
    async storeMember(targetProjectId: string, sessionId: string, member: StoreMemberType): Promise<{ success: boolean }> {
        await connectDB();

        const project = await ProjectActions.getProjectBySessionAndId(targetProjectId, sessionId, { team: 1 });
        if (!project?._id)
            return { success: false };

        const targetUser = await User.findOne({ _id: member.userId }, { name: 1 });

        if (!targetUser?._id)
            return { success: false };

        project.team.push({
            id: targetUser._id,
            role: member.role
        });
        project.save();

        return { success: true };
    },

    async getTeam(targetProjectId: string, sessionId: string): Promise<TeamItemType[]> {
        await connectDB();
        const project = await ProjectActions.getProjectBySessionAndId(targetProjectId, sessionId, { team: 1, users: 1, admin_id: 1 });

        const userIdRoleMap = {} as any;
        const userIds = project.team.map((user: { id: string, role: string }) => {
            userIdRoleMap[user.id] = user.role
            return user.id
        });

        const users = await UserActions.getUsersByIds(userIds);

        const result = [] as TeamItemType[];

        users.forEach((user) => {
            const role = userIdRoleMap[user._id];

            role && result.push({
                name: user.name,
                _id: user._id,
                email: user.email,
                picture: user.picture,
                isAdmin: project.admin_id === user._id.toString(),
                role,
            })
        });

        return result;
    },

    async getTeamMember(projectId: string, sessionId: string, userId: string): Promise<string> {
        await connectDB();
        const project = await ProjectActions.getProjectBySessionAndId(projectId, sessionId, { team: 1 });

        const memeber = project?.team.find((user: { id: string, role: string }) => {
            if (userId === user.id) {
                return true;
            }
            return false;
        });

        if (memeber) {
            return memeber.role;
        }

        return '';
    },

    async updateTeamMember(projectId: string, sessionId: string, member: StoreMemberType): Promise<{ success: boolean }> {
        await connectDB();
        const project = await ProjectActions.getProjectBySessionAndId(projectId, sessionId, { team: 1 });

        if (!project?.team)
            return { success: false };

        project.team.forEach((user: { id: string, role: string }) => {
            console.log(user.id, member.userId)
            if (user.id !== member.userId)
                return;
            console.log('changed')
            user.role = member.role;
        });
        console.log(project.team)
        project.save();

        return { success: true };
    },

    async removeTeamMemeber(projectId: string, sessionId: string, memberId: string): Promise<{ success: boolean }> {
        await connectDB();
        const project = await ProjectActions.getProjectBySessionAndId(projectId, sessionId, { team: 1 });

        project.team = project.team.filter((member: { id: string }) => member.id !== memberId);
        project.save();

        return { success: true };
    },
}