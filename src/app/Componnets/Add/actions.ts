import { getAuthParams } from './../actions';
import { ProjectActions } from "@/server/actions/ProjectActions";
import { TeamActions } from "@/server/actions/TeamActions";
import { cookies } from "next/headers"
import { RedirectType, redirect } from "next/navigation";
import { authCookieKey, projectIdCookieKey } from "@/server/constants";
import { Dayjs } from "dayjs";
import { getCookieValue } from "@/utlis/getCookieValue";
import axios from "axios";
import { DirectoryActions } from "@/server/actions/DirectoryActions";

export const defaultFirstDirectory = 'choose_directory'
export const defaultFirstUserId = '0'

export const getProjectUsers = async () => {
    const targetProjectId = cookies().get(projectIdCookieKey)?.value || '';

    if (!targetProjectId) {
        return;
    }

    const users = await ProjectActions.getProjectUsers(targetProjectId);

    return users;
};

export const getProjectDirectories = async () => {
    const authParams = await getAuthParams();

    const directories = await DirectoryActions.getDirectories(authParams);
    return directories;
};

export const deleteTeamMember = async (formData: FormData) => {
    'use server'

    const { projectId, sessionId } = await getAuthParams();

    const userId = formData.get('user_id') as string;

    const result = await TeamActions.removeTeamMemeber(projectId, sessionId, userId);
    if (result.success) {
        redirect('/app/add/team');
    }
};
