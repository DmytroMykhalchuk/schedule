import { PageActions } from '@/server/actions/PageActions';
import { headers } from "next/headers"
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const headersList = headers();

    const projectId = headersList.get('x-project') as string;
    const email = headersList.get('x-user') as string;

    const searchText = searchParams.get('q');

    if (!projectId || !email || !searchText) {
        return NextResponse.json({
            code: 500,
            status: 'error',
            message: "Operation not allowed",
            data: [],
        });
    }

    const result = await PageActions.makeSearch({ projectId, email }, searchText)

    return NextResponse.json({
        code: 200,
        status: 'success',
        message: "Succfully searched",
        data: result,
    });
}