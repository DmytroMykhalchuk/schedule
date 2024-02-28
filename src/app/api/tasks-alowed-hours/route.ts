import { TaskActions } from "@/server/actions/TaskActions";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);

    const projectId = searchParams.get('project_id');
    const email = searchParams.get('email');
    const taskId = searchParams.get('task_id') || undefined;
    const userId = searchParams.get('user_id');
    const date = searchParams.get('date');

    if (!(projectId && email && date)) {
        return NextResponse.json({
            code: 500,
            message: 'Operation not allowed',
            status: 'error',
            data: [],
        });
    }

    const response = await TaskActions.getAllowedHours({ projectId, email }, date, userId, taskId);

    return NextResponse.json({
        code: 200,
        message: 'Success',
        status: 'success',
        data: response,
    });
};