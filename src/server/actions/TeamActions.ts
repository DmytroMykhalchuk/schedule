import connectDB from "../connectDB";
import User from "../models/User";
import { ProjectActions } from "./ProjectActions";
import { UserActions } from "./UserActions";
import mongoose from "mongoose";
import Project from "../models/Project";
import { PopulatedProjectTeamItem, ProjectTeamItem, TeamItemType, ProccessStatusType } from "./types";

type StoreMemberType = {
    role: string,
    userId: string
};


export const TeamActions = {
    async storeMember(projectId: string, sessionId: string, member: StoreMemberType): Promise<ProccessStatusType> {
        await connectDB();

        if (!member.userId) {
            return { success: false };
        }

        const project = await ProjectActions.getProjectByFilters({ projectId, sessionId }, { team: 1 });
        if (!project?._id)
            return { success: false };

        const targetUser = await User.findOne({ _id: member.userId }, { name: 1 });

        if (!targetUser?._id || project.team.find((item: ProjectTeamItem) => item.userId.toString() === member.userId)) {
            return { success: false }
        }

        project.team.push({
            id: targetUser._id,
            role: member.role
        });

        project.save();

        return { success: true };
    },

    async getTeam(projectId: string, sessionId: string): Promise<TeamItemType[]> {
        await connectDB();

        const user = await UserActions.getUserBySessionId(sessionId);
        const project = await Project.findOne({ _id: projectId, users: user._id }, { team: 1, users: 1, admin_id: 1 }).populate('team.userId', '_id name email picture')

        const team: TeamItemType[] = project.team.map((item: PopulatedProjectTeamItem) => ({
            role: item.role,
            user: item.userId,
            isAdmin: project.admin_id.toString() === user._id.toString(),
        }));

        return team;
    },

    async getTeamMember(projectId: string, sessionId: string, userId: string): Promise<string> {
        await connectDB();
        const project = await ProjectActions.getProjectByFilters({ projectId, sessionId }, { team: 1 });

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
        const project = await ProjectActions.getProjectByFilters({ projectId, sessionId }, { team: 1 });

        if (!project?.team)
            return { success: false };

        project.team.forEach((user: { _id: mongoose.Types.ObjectId, role: string }) => {
            if (user._id.toString() !== member.userId)
                return;
            user.role = member.role;
        });
        project.save();

        return { success: true };
    },

    async removeTeamMemeber(projectId: string, sessionId: string, memberId: string): Promise<{ success: boolean }> {
        await connectDB();
        const project = await ProjectActions.getProjectByFilters({ projectId, sessionId }, { team: 1 });

        project.team = project.team.filter((member: { id: string }) => member.id !== memberId);
        project.save();

        return { success: true };
    },
}