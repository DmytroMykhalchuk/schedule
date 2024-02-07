import { getAuthParams } from "@/app/Componnets/actions";
import { MemberActions } from "@/server/actions/MemberActions";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export const getMembers = async () => {
    const { projectId, sessionId } =  await getAuthParams();

    const users = MemberActions.getMembers(projectId, sessionId);

    return users;
};

export const removeUser = async (formData: FormData) => {
    'use server';
    const { projectId, sessionId } =  await getAuthParams();

    const userId = formData.get('user_id') as string;

    const result = await MemberActions.removeMember(projectId, sessionId, userId);

    if (result.success) {
        redirect('/app/add/members');
    }
}