import { AuthType } from './types';
import { createGuid } from "@/utlis/createGuid";
import connectDB from "../connectDB"
import { ProjectActions } from "./ProjectActions";

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
}