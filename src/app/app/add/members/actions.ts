import { MemberActions } from "@/server/actions/MemberActions";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export const getMembers = async () => {
    const projectId = cookies().get('target_project')?.value || '';
    const sessionid = cookies().get('auth_id')?.value || '';

    const users = MemberActions.getMembers(projectId, sessionid);

    return users;
};

export const removeUser = async (formData: FormData) => {
    'use server';
    const projectId = cookies().get('target_project')?.value || '';
    const sessionid = cookies().get('auth_id')?.value || '';

    const userId = formData.get('user_id') as string;

    const result = await MemberActions.removeMember(projectId, sessionid, userId);

    if (result.success) {
        redirect('/app/add/members');
    }
}