import { mailer } from "@/server/services/mailer"
import { useTranslations } from "next-intl";
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {

    mailer('dimamuchalchuk@gmail.com', 'subject', '<a href="#">text</a>');
    return NextResponse.json('success')
}