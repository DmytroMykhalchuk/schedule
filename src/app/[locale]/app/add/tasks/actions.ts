import { defaultFirstDirectory, defaultFirstUserId } from "@/Componets/Add/actions";
import { getCookieProjectId } from "@/Componets/actions";
import { TaskActions } from "@/server/actions/TaskActions";
import { defaultCategory, defaultDirectory } from "@/server/constants";
import { redirect } from "next/navigation";

export const createTask = async (formData: FormData) => {
    'use server';
    const projectId = getCookieProjectId();
    const assignee = formData.get('assignee') as string;
    const email = formData.get('auth_email') as string;
    const directory = formData.get('directory') as string || null;
    const categoryId = formData.get('category_id') as string || null;

    const newTask = {
        name: formData.get('task_name') as string,
        assignee: assignee === defaultFirstUserId ? null : assignee,
        status: formData.get('status') as string,
        dueDate: formData.get('due_date') as string,
        priority: formData.get('priority') as string,
        description: formData.get('description') as string,
        subtasks: formData.getAll('subtasks') as string[] | null,
        comment: formData.get('comment') as string | null,
        fromHour: parseInt(formData.get('from_hour') as string),
        toHour: parseInt(formData.get('to_hour') as string),
        directory: directory === defaultDirectory.value ? null : directory || null,
        categoryId: categoryId === defaultCategory._id ? null : categoryId || null,
    };

    if (!newTask.directory) {
        redirect('/app/add/tasks?task_directory_required=1');
    }

    const result = await TaskActions.storeTask({ projectId, email }, newTask);

    //todo message notify about success

    if (result?._id) {
        redirect(`/app/add/tasks/${result._id}`);
    }
};