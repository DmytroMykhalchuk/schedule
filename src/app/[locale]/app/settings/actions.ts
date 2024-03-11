import { getCookieProjectId, getUserSessionAndEmail } from "@/Componets/actions";
import { ProjectActions } from "@/server/actions/ProjectActions";
import { redirect } from "next/navigation";

export const initPayment = async () => {
    'use server';
    const { authEmail: email } = await getUserSessionAndEmail();
    const projectId = getCookieProjectId();

    const result = await ProjectActions.initPayment({ projectId, email });

    result && redirect(result)
};

export const cancelPremium = async () => {
    'use server';
    const { authEmail: email } = await getUserSessionAndEmail();
    const projectId = getCookieProjectId();

    const result = await ProjectActions.cancelPremium({ projectId, email });

    result?.success && redirect('/app/settings');
};

export const getHasPremium = async (email: string) => {
    const projectId = getCookieProjectId();

    const hasPremium = await ProjectActions.getHasPremium({ email, projectId });

    return hasPremium;
};