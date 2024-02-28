import { DirectoryActions } from "@/server/actions/DirectoryActions"
import { redirect } from "next/navigation";

export const getDirectory = async (directoryId: string) => {
    const directory = await DirectoryActions.getDirectory(directoryId);

    return directory;
};

export const updateDirectory = async (formData: FormData) => {
    'use server';

    const directoryId = formData.get('directory_id') as string;
    const directoryName = formData.get('directory_name') as string;

    const result = await DirectoryActions.updateDirectory({ directoryId, directoryName });

    if (result.success) {
        redirect('/app/add/directory');
    }
};

export const deleteDirectory = async (formData: FormData) => {
    'use server';

    const directoryId = formData.get('directory_id') as string;

    const result = await DirectoryActions.deleteDirectory(directoryId);

    if (result.success) {
        redirect('/app/add/directory');
    }
};

//todo protecting