import { defaultFirstDirectory, defaultFirstUserId } from "@/Componets/Add/actions";
import { getCookieProjectId } from "@/Componets/actions";
import { TaskActions } from "@/server/actions/TaskActions";
import { redirect } from "next/navigation";

export const createTask = async (formData: FormData) => {
    'use server';
    const projectId = getCookieProjectId();
    const assignee = formData.get('assignee') as string;
    const directory = formData.get('directory') as string;
    const email = formData.get('auth_email') as string;

    const newTask = {
        name: formData.get('task_name') as string,
        assignee: assignee === defaultFirstUserId ? null : assignee,
        status: formData.get('status') as string,
        directory: directory === defaultFirstDirectory ? null : directory,
        dueDate: formData.get('due_date') as string,
        priority: formData.get('priority') as string,
        description: formData.get('description') as string,
        subtasks: formData.getAll('subtasks') as string[] | null,
        comment: formData.get('comment') as string | null,
        fromHour: parseInt(formData.get('from_hour') as string),
        toHour: parseInt(formData.get('to_hour') as string),
        categoryId: formData.get('categoryId') as string,
    };

    const result = await TaskActions.storeTask({ projectId, email }, newTask);

    //todo message notify about success
    redirect('/app/add/task');
};