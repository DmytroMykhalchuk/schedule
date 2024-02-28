import { CommentActions } from "@/server/actions/CommentActions";
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    const params = await req.json()

    const projectId = params.project_id;
    const email = params.email;
    const commentText = params.comment;
    const replyId = params.reply_id;
    const taskId = params.task_id;

    if (!(projectId && email && commentText && taskId)) {
        return NextResponse.json({
            code: 500,
            message: 'Operation not allowed',
            data: [],
        });
    }

    const response = await CommentActions.storeComment({ projectId, email }, { taskId, commentText, replyId });

    return NextResponse.json({
        code: 200,
        message: 'Success',
        data: response,
    });
};

export const DELETE = async (req: Request) => {
    const { searchParams } = new URL(req.url);

    const projectId = searchParams.get('project_id') as string;
    const email = searchParams.get('email') as string;
    const commentId = searchParams.get('comment_id') as string;

    if (!(commentId && projectId && email)) {
        return NextResponse.json({
            code: 500,
            message: 'Operation not allowed',
            data: [],
        });
    }

    const response = await CommentActions.removeComment({ projectId, email }, commentId);

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