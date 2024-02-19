import { getAuthParams } from '@/app/Componnets/actions';
import { TaskActions } from '@/server/actions/TaskActions';
import { PriorityType, StatusType } from '@/server/actions/types';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const getTask = async (taskId: string) => {
    const { projectId, sessionId } = await getAuthParams();

    const response = await TaskActions.getTaskAndCommentsById({ projectId, sessionId }, taskId);
    return response;
};

export const updateTask = async (formData: FormData) => {
    'use server';
    const { projectId, sessionId } = await getAuthParams();

    const taskId = formData.get('task_id') as string;
    const name = formData.get('task_name') as string;
    const assignee = formData.get('assignee') as string;
    const status = formData.get('status') as StatusType;
    const directory = formData.get('directory') as string;
    const dueDate = formData.get('due_date') as string;
    const priority = formData.get('priority') as PriorityType;
    const description = formData.get('description') as string;
    const fromHour = formData.get('from_hour') as string;
    const toHour = formData.get('to_hour') as string;
    const subtasks = formData.getAll('subtasks') as string[] | null;
    const categoryId = formData.get('category_id') as string;

    const result = await TaskActions.updateTask(
        { projectId, sessionId },
        {
            name, taskId, assignee, status, directory, dueDate, priority, description, subtasks, categoryId,
            toHour: +toHour,
            fromHour: +fromHour,
        }
    );

    if (result.success) {
        //todo add to params is-updated and change style button
        redirect('/app/my-tasks/' + taskId);
    }
};

export const deleteTask = async (formData: FormData) => {
    'use server';
    const authParams = await getAuthParams();

    const taskId = formData.get('task_id') as string;

    const result = await TaskActions.deleteTask(authParams, taskId);

    if (result.success) {
        redirect('/app/my-tasks');
    }
};