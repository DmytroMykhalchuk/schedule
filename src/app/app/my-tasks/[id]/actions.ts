import { getAuthParams } from '@/app/Componnets/actions';
import { PriorityType, StatusType, TaskActions } from '@/server/actions/TaskActions';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const getTask = async (taskId: string) => {
    const { projectId, sessionId } =  await getAuthParams();

    const response = await TaskActions.getTaskAndCommentsById({ projectId, sessionId }, taskId);
    return response;
};

export const updateTask = async (formData: FormData) => {
    'use server';
    const { projectId, sessionId } =  await getAuthParams();

    const taskId = formData.get('task_id') as string;
    const name = formData.get('task_name') as string;
    const assignee = formData.get('assignee') as string;
    const status = formData.get('status') as StatusType;
    const directory = formData.get('directory') as string;
    const dueDate = formData.get('due_date') as string;
    const priority = formData.get('priority') as PriorityType;
    const description = formData.get('description') as string;
    const subtasks = formData.getAll('subtasks') as string[] | null;

    const result = await TaskActions.updateTask(
        { projectId, sessionId },
        { name, taskId, assignee, status, directory, dueDate, priority, description, subtasks }
    );

    if (result.success) {
        //todo add to params is-updated and change style button
        redirect('/app/my-tasks/' + taskId);
    }
}