import { AuthType } from './types';
import { createGuid } from "@/utlis/createGuid";
import connectDB from "../connectDB"
import { ProjectActions } from "./ProjectActions";
import Project from '../models/Project';
import { UserActions } from './UserActions';

export const InvitingsActions = {
    async getInvitatons(authParams: AuthType): Promise<string[]> {
        await connectDB();

        const project = await ProjectActions.getProjectByFilters(authParams, { invitations: 1 });
        return project.invitations;
    },

    async removeInvitations(authParams: AuthType, invite: string): Promise<{ success: boolean }> {
        await connectDB();
        const project = await ProjectActions.getProjectByFilters(authParams, { invitations: 1 });

        project.invitations = project.invitations.filter((item: string) => item !== invite);
        project.save();

        return { success: true };
    },

    async generateInvite(authParams: AuthType): Promise<{ success: true }> {
        await connectDB();
        const project = await ProjectActions.getProjectByFilters(authParams, { invitations: 1 });

        const uuid = createGuid();
        project.invitations.push(uuid);

        project.save();

        return { success: true };
    },

    async useCodeInvite(email: string, inviteCode: string): Promise<{ isAccepted: false } | { isAccepted: true, projectId: string }> {
        await connectDB();
        const user = await UserActions.getUserByEmail(email, { _id: 1 });

        if (!user) {
            return { isAccepted: false };
        }

        const project = await Project.findOneAndUpdate({ invitations: inviteCode }, {
            $push: {
                users: user._id
            }
        });

        return Boolean(project)
            ? {
                isAccepted: true,
                projectId: project._id.toString(),
            }
            : {
                isAccepted: false
            }
    },
}