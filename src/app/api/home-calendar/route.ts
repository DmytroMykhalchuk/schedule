import { CalendarActions } from '@/server/actions/CalendarActions';
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);

    const date = searchParams.get('date') || '';
    const projectId = searchParams.get('project_id') || '';
    const email = searchParams.get('email') || '';
    if (!email || !date || !projectId) {
        return NextResponse.json({ error: 'Did`n received all parameters' });
    }

    const response = await CalendarActions.getMonthTaskDays({ projectId, email }, date);

    if (Array.isArray(response)) {
        return NextResponse.json({
            code: 200,
            messege: 'Successfully got',
            data: { days: response }
        });
    }
    return NextResponse.json({
        code: 500,
        messege: 'Error',
        data: [],
    })
};

