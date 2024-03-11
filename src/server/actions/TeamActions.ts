import connectDB from "../connectDB";
import User from "../models/User";
import { ProjectActions } from "./ProjectActions";
import { UserActions } from "./UserActions";
import mongoose from "mongoose";
import Project from "../models/Project";
import { PopulatedProjectTeamItem, ProjectTeamItem, TeamItemType, ProccessStatusType, AuthType } from "./types";

type StoreMemberType = {
    role: string,
    userId: string
};


export const TeamActions = {
    async storeMember(authParams: AuthType, member: StoreMemberType): Promise<ProccessStatusType> {
        await connectDB();

        if (!member.userId) {
            return { success: false };
        }

        const project = await ProjectActions.getProjectByFilters(authParams, { team: 1 });
        if (!project?._id)
            return { success: false };

        const targetUser = await User.findOne({ _id: member.userId }, { name: 1 });

        if (!targetUser?._id || project.team.find((item: ProjectTeamItem) => item.userId.toString() === member.userId)) {
            return { success: false }
        }

        project.team.push({
            id: targetUser._id,
            role: member.role,
            userId: member.userId,
        });

        project.save();

        return { success: true };
    },

    async getTeam(authParams: AuthType): Promise<TeamItemType[]> {
        await connectDB();

        const user = await UserActions.getUserByEmail(authParams.email);
        const project = await Project.findOne({ _id: authParams.projectId, users: user._id }, { team: 1, users: 1, admin_id: 1 }).populate('team.userId', '_id name email picture')

        const team: TeamItemType[] = project.team.map((item: PopulatedProjectTeamItem) => ({
            role: item.role,
            user: item.userId,
            isAdmin: project.admin_id.toString() === item.userId._id.toString(),
        }));

        return team;
    },

    async getTeamMember(authParams: AuthType, userId: string): Promise<string> {
        await connectDB();
        const project = await ProjectActions.getProjectByFilters(authParams, { team: 1 });

        const memeber = project?.team.find((user: { userId: string, role: string }) => {
            return userId === user.userId.toString();
        });

        if (memeber) {
            return memeber.role;
        }

        return '';
    },

    async updateTeamMember(authParams: AuthType, member: StoreMemberType): Promise<{ success: boolean }> {
        await connectDB();
        const project = await ProjectActions.getProjectByFilters(authParams, { team: 1 });

        if (!project?.team)
            return { success: false };

        project.team.forEach((user: { userId: mongoose.Types.ObjectId, role: string }) => {
            if (user.userId.toString() !== member.userId)
                return;
            user.role = member.role;
        });
        project.save();

        return { success: true };
    },

    async removeTeamMemeber(authParams: AuthType, memberId: string): Promise<{ success: boolean }> {
        await connectDB();
        const project = await ProjectActions.getProjectByFilters(authParams, { team: 1 });

        project.team = project.team.filter((member: { userId: mongoose.Types.ObjectId }) => member.userId.toString() !== memberId);
        project.save();

        return { success: true };
    },
};
