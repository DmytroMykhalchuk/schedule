import { NextResponse } from "next/server"

export const GET = (req: Request) => {
    const { searchParams } = new URL(req.url);
    console.log(searchParams);
    const response = searchParams.get('test');
    return NextResponse.json(response)
};