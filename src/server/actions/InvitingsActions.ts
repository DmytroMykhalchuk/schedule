import { createGuid } from "@/utlis/createGuid";
import connectDB from "../connectDB"
import { ProjectActions } from "./ProjectActions";

export const InvitingsActions = {
    async getInvitatons(projectId: string, sessionId: string): Promise<string[]> {
        await connectDB();

        const project = await ProjectActions.getProjectBySessionAndId(projectId, sessionId, { invitations: 1 });
        return project.invitations;
    },

    async removeInvitations(projectId: string, sessionId: string, invite: string): Promise<{ success: boolean }> {
        await connectDB();
        const project = await ProjectActions.getProjectBySessionAndId(projectId, sessionId, { invitations: 1 });

        project.invitations = project.invitations.filter((item: string) => item !== invite);
        project.save();

        return { success: true };
    },

    async generateInvite(projectId: string, sessionId: string): Promise<{ success: true }> {
        await connectDB();
        const project = await ProjectActions.getProjectBySessionAndId(projectId, sessionId, { invitations: 1 });

        const uuid = createGuid();
        console.log(project);
        project.invitations.push(uuid);

        project.save();

        return { success: true };
    },
}