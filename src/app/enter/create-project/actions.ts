import { authCookieKey, projectIdCookieKey } from '@/server/constants';
import { cookies } from 'next/headers';
import { getAuthParams } from '@/app/Componnets/actions';
import { ProjectActions } from '@/server/actions/ProjectActions';
import { redirect } from 'next/navigation';

export const createProject = async (formData: FormData) => {
    'use server';
    const projectName = formData.get('new_project_name') as string;
    const { sessionId } = await getAuthParams();
    if (!sessionId) {
        throw new Error('User isnt logined');
    }

    const responseProjectId = await ProjectActions.storeProject({
        name: projectName,
    }, sessionId);

    console.log(responseProjectId);
    cookies().set(projectIdCookieKey, responseProjectId);
    redirect('/app');
}