import { getCookieProjectId } from "@/app/Componnets/actions";
import { MemberActions } from "@/server/actions/MemberActions";
import { redirect } from "next/navigation";

export const getMembers = async (email: string) => {
    const projectId = getCookieProjectId();

    const users = MemberActions.getMembers({ projectId, email });

    return users;
};

export const removeUser = async (formData: FormData) => {
    'use server';
    const projectId = getCookieProjectId();
    const userId = formData.get('user_id') as string;
    const email = formData.get('auth_email') as string;

    const result = await MemberActions.removeMember({ projectId, email }, userId);

    if (result.success) {
        redirect('/app/add/members');
    }
}