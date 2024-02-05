import { ProjectActions } from "@/server/actions/ProjectActions";
import { TeamActions } from "@/server/actions/TeamActions";
import { cookies } from "next/headers"
import { RedirectType, redirect } from "next/navigation";

export const defaultFirstDirectory = 'choose_directory'
export const defaultFirstUserId = '0'

export const getProjectUsers = async () => {
    const targetProjectId = cookies().get('target_project')?.value || '';

    if (!targetProjectId) {
        return;
    }

    const users = await ProjectActions.getProjectUsers(targetProjectId);

    return users;
};

export const getProjectDirectories = async (): Promise<string[] | void> => {
    const targetProjectId = cookies().get('target_project')?.value || '';

    if (!targetProjectId) {
        return;
    }

    const directories = await ProjectActions.getProjectDirectories(targetProjectId);
    return directories;
};

export const deleteTeamMember = async (formData: FormData) => {
    'use server'
    const localCookies = cookies();

    const projectId = localCookies.get('target_project')?.value || '';
    const serverId = localCookies.get('auth_id')?.value || '';

    const userId = formData.get('user_id') as string;

    const result = await TeamActions.removeTeamMemeber(projectId, serverId, userId);
    if (result.success) {
        redirect('/app/add/team');
    }
};

