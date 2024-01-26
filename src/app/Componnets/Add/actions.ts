import { ProjectActions } from "@/server/actions/ProjectActions";
import { cookies } from "next/headers"

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


