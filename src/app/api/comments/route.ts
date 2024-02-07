import { CommentActions } from "@/server/actions/CommentActions";
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    const params = await req.json()

    const projectId = params.project_id;
    const sessionId = params.session_id;
    const commentText = params.comment;
    const replyId = params.reply_id;
    const taskId = params.task_id;

    if (!(projectId && sessionId && commentText && taskId)) {
        return NextResponse.json({
            code: 500,
            message: 'Operation not allowed',
            data: [],
        });
    }

    const response = await CommentActions.storeComment({ projectId, sessionId }, { taskId, commentText, replyId });

    return NextResponse.json({
        code: 200,
        message: 'Success',
        data: response,
    });
};

export const DELETE = async (req: Request) => {
    const { searchParams } = new URL(req.url);

    const projectId = searchParams.get('project_id') as string;
    const sessionId = searchParams.get('session_id') as string;
    const commentId = searchParams.get('comment_id') as string;
    const taskId = searchParams.get('task_id') as string;

    if (!(commentId && projectId && sessionId && taskId)) {
        return NextResponse.json({
            code: 500,
            message: 'Operation not allowed',
            data: [],
        });
    }

    const response = await CommentActions.removeComment({ projectId, sessionId }, taskId, commentId);

    if (response?.success) {
        return NextResponse.json({
            code: 200,
            message: 'Succefully deleted',
            data: [],
        });
    }

    return NextResponse.json({
        code: 500,
        message: 'Error',
        data: [],
    });

}