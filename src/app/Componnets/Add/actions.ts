import { projectIdCookieKey } from '@/server/constants';
import { cookies } from 'next/headers';
import { DirectoryActions } from '@/server/actions/DirectoryActions';
import { getAuthParams } from './../actions';
import { ProjectActions } from '@/server/actions/ProjectActions';
import { redirect } from 'next/navigation';
import { TeamActions } from '@/server/actions/TeamActions';

export const defaultFirstDirectory = 'choose_directory'
export const defaultFirstUserId = '0'

export const getProjectUsers = async (isRequiredRolelessUsers: boolean) => {
    const targetProjectId = cookies().get(projectIdCookieKey)?.value || '';

    if (!targetProjectId) {
        return;
    }

    const users = await ProjectActions.getProjectUsers(targetProjectId, isRequiredRolelessUsers);

    return users;
};

export const getProjectDirectories = async () => {
    const authParams = await getAuthParams();

    const directories = await DirectoryActions.getDirectories(authParams);
    return directories;
};

export const deleteTeamMember = async (formData: FormData) => {
    'use server'

    const { projectId, sessionId } = await getAuthParams(); 9

    const userId = formData.get('user_id') as string;

    const result = await TeamActions.removeTeamMemeber(projectId, sessionId, userId);
    if (result.success) {
        redirect('/app/add/team');
    }
};
