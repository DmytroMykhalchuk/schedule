import { ProjectActions } from '@/server/actions/ProjectActions';
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    const { searchParams } = new URL(req.url);
    // console.log();
    const date = searchParams.get('date') || '';
    const projectId = searchParams.get('project_id') || '';
    const sessionId = searchParams.get('session_id') || '';
    if (!sessionId || !date || !projectId) {
        return NextResponse.json({error:'Did`n received all parameters'});
    }

    const response = await ProjectActions.getMonthTaskDays(projectId, sessionId, date);
    return NextResponse.json(response)
};

