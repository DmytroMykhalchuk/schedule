import { CalendarActions } from '@/server/actions/CalendarActions';
import { headers } from 'next/headers';
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    const headersList = headers();
    
    const email = headersList.get('x-user');
    const projectId = headersList.get('x-project');

    const date = searchParams.get('date') || '';
    
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

