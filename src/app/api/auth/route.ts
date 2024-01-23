import { UserActions } from "@/server/actions/UserActions";
import { NextResponse } from "next/server"

export const POST = async (req: Request) => {
    const params = await req.json()

    // const { email, locale, name, picture, sub } = user;
    const email = params.email as string;
    const name = params.name as string;
    const sub = params.sub as string;

    if (!email || !name || !sub) {
        return NextResponse.json({ code: 500 })
    }

    const data = await UserActions.login({ name, google_id: sub, email })

    return NextResponse.json(data);
};