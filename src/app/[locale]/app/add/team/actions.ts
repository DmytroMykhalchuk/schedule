'use server';
import { defaultFirstUserId } from "@/Componets/Add/actions";
import { getCookieProjectId } from "@/Componets/actions";
import { TeamActions } from "@/server/actions/TeamActions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const addMember = async (formData: FormData) => {
    'use server';
    const projectId = getCookieProjectId();

    const role = formData.get('role') as string;
    const user = formData.get('user') as string;
    const email = formData.get('auth_email') as string;

    if (user === defaultFirstUserId) {
        return;
    }

    if (!role || !user) {
        return;
    };

    const result = await TeamActions.storeMember(
        {
            projectId,
            email,
        },
        {
            userId: user,
            role,
        });

    if (result.success) {
        redirect('/app/add/team');
    }
};

export const updateMember = async (formData: FormData) => {
    'use server';

    const projectId = getCookieProjectId();
    const role = formData.get('role') as string;
    const userId = formData.get('user') as string;
    const email = formData.get('auth_email') as string;

    const response = await TeamActions.updateTeamMember({ projectId, email }, { role, userId });

    if (response.success)
        redirect('/app/add/team');
};

export const getTeam = async (email: string) => {
    const projectId = getCookieProjectId();

    const team = await TeamActions.getTeam({ projectId, email });
    return team;
};

export const getTeamUser = async (id: string, email: string) => {
    const projectId = getCookieProjectId();

    const role = await TeamActions.getTeamMember({ projectId, email }, id)

    return role;
};