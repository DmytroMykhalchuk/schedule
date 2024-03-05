import { authCookieKey, projectIdCookieKey } from '@/server/constants';
import { cookies } from 'next/headers';
import { ProjectActions } from '@/server/actions/ProjectActions';
import { redirect } from 'next/navigation';
import { InvitingsActions } from '@/server/actions/InvitingsActions';

export const createProject = async (formData: FormData) => {
    'use server';
    const projectName = formData.get('new_project_name') as string;
    const email = formData.get('auth_email') as string;

    const responseProjectId = await ProjectActions.storeProject({
        name: projectName,
    }, email);


    cookies().set(projectIdCookieKey, responseProjectId);
    redirect('/app');
};

export const useCodeInvite = async (formData: FormData) => {
    'use server';

    const inviteCode = formData.get('invite_id') as string;
    const email = formData.get('auth_email') as string;

    const result = await InvitingsActions.useCodeInvite(email, inviteCode);

    if(result?.isAccepted){
        cookies().set(projectIdCookieKey,result.projectId);
    }
}