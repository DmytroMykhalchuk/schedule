import { getCookieProjectId } from '@/app/Componnets/actions';
import { InvitingsActions } from '@/server/actions/InvitingsActions';
import { redirect } from 'next/navigation';

export const getInvitations = async (email: string) => {
    const projectId = getCookieProjectId();

    const invitations = await InvitingsActions.getInvitatons({projectId, email});

    return invitations;
};

export const removeInvite = async (formData: FormData) => {
    'use server';
    const projectId = getCookieProjectId();

    const invite = formData.get('invite') as string;
    const email = formData.get('auth_email') as string;

    const result = await InvitingsActions.removeInvitations({projectId, email}, invite);

    if (result.success) {
        redirect('/app/add/invitations');
    }
};

export const generateInvite = async (formData:FormData) => {
    'use server';
    const projectId = getCookieProjectId();
    const email = formData.get('auth_email') as string;

    const result = await InvitingsActions.generateInvite({projectId, email});

    if (result.success) {
        redirect('/app/add/invitations');
    }
};