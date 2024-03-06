import { Button, Stack } from "@mui/material";
import { AuthButton } from "@/Componets/Auth/AuthButton";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authCookieKey, projectIdCookieKey } from "@/server/constants";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/configs/auth";
import { useTranslations } from "next-intl";

type PageType = {
    params: {
        locale: string;
    };
};

const Page: React.FC<PageType> = async ({ params }) => {
    const session = await getServerSession(nextAuthConfig);

    if (session?.user?.email) {
        cookies().get(projectIdCookieKey)?.value
            ? redirect(`/${params.locale}/app`)
            : redirect(`/${params.locale}/sign-in`);
    }

    return (
        <Stack alignItems={'center'} justifyContent={'center'} minHeight={'100vh'}>
            <div>
                <Content />
            </div>
        </Stack>
    );
};

type ContentType = {
};

export const Content: React.FC<ContentType> = ({ }) => {
    const translation = useTranslations('Auth');
    return (
        <>
            <AuthButton
                dictionary={{
                    loginByGoogle: translation('login_by_google')
                }}
                GOOGLE_CLIENT_ID={process.env.GOOGLE_CLIENT_ID!}
            />
        </>
    );
};


export default Page;