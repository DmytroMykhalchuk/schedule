import { InvitingsActions } from '@/server/actions/InvitingsActions';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const getInvitations = async () => {
    const projectId = cookies().get('target_project')?.value || '';
    const sessionId = cookies().get('auth_id')?.value || '';

    const invitations = await InvitingsActions.getInvitatons(projectId, sessionId);

    return invitations;
};

export const removeInvite = async (formData: FormData) => {
    'use server';
    const projectId = cookies().get('target_project')?.value || '';
    const sessionId = cookies().get('auth_id')?.value || '';

    const invite = formData.get('invite') as string;

    const result = await InvitingsActions.removeInvitations(projectId, sessionId, invite);

    if (result.success) {
        redirect('/app/add/members');
    }
};

export const generateInvite = async () => {
    'use server';
    const projectId = cookies().get('target_project')?.value || '';
    const sessionId = cookies().get('auth_id')?.value || '';

    const result = await InvitingsActions.generateInvite(projectId, sessionId);

    if (result.success) {
        redirect('/app/add/members');
    }
};