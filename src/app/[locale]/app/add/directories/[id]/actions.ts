import { getCookieProjectId, getUserSessionAndEmail } from "@/Componets/actions";
import { DirectoryActions } from "@/server/actions/DirectoryActions"
import { redirect } from "next/navigation";

export const getDirectory = async (directoryId: string, email: string) => {
    const projectId = getCookieProjectId();

    const directory = await DirectoryActions.getDirectory({ email, projectId }, directoryId);

    return directory;
};

export const updateDirectory = async (formData: FormData) => {
    'use server';

    const directoryId = formData.get('directory_id') as string;
    const directoryName = formData.get('new_directory') as string;
    const email = formData.get('auth_email') as string;
    const projectId = getCookieProjectId();

    const result = await DirectoryActions.updateDirectory({ projectId, email }, { directoryId, directoryName });

    if (result.success) {
        redirect('/app/add/directories');
    }
};

export const deleteDirectory = async (formData: FormData) => {
    'use server';

    const directoryId = formData.get('directory_id') as string;
    const projectId = getCookieProjectId()
    const { authEmail: email } = await getUserSessionAndEmail()
    const result = await DirectoryActions.deleteDirectory({ email, projectId }, directoryId);

    if (result.success) {
        redirect('/app/add/directories');
    }
};