'use server';

import { TeamActions } from "@/server/actions/TeamActions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const addMember = async (formDate: FormData) => {
    'use server';

    const projectId = cookies().get('target_project')?.value || '';
    const sessionId = cookies().get('auth_id')?.value || '';

    const role = formDate.get('role') as string;
    const user = formDate.get('user') as string;

    if (!role || !user) {
        return;
    };

    const result = await TeamActions.storeMember(
        projectId,
        sessionId,
        {
            userId: user,
            role,
        });
    if (result.success) {
        redirect('/app')
    }
};

export const updateMember = async (formDate: FormData) => {
    'use server';

    const projectId = cookies().get('target_project')?.value || '';
    const sessionId = cookies().get('auth_id')?.value || '';

    const role = formDate.get('role') as string;
    const userId = formDate.get('user') as string;

    const response = await TeamActions.updateTeamMember(projectId, sessionId, { role, userId });

    if(response.success)
    redirect('/app/add/team');

}