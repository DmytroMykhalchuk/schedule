import { authCookieKey, projectIdCookieKey } from '@/server/constants';
import { cookies } from 'next/headers';
import { ProjectActions } from '@/server/actions/ProjectActions';
import { redirect } from 'next/navigation';

export const createProject = async (formData: FormData) => {
    'use server';
    const projectName = formData.get('new_project_name') as string;
    const email = formData.get('auth_email') as string;

    const responseProjectId = await ProjectActions.storeProject({
        name: projectName,
    }, email);


    cookies().set(projectIdCookieKey, responseProjectId);
    redirect('/app');
}