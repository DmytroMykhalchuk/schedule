import { Button, Stack } from "@mui/material";
import { AuthButton } from "../Componnets/Auth/AuthButton";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authCookieKey, projectIdCookieKey } from "@/server/constants";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/configs/auth";

type PageType = {
};

const Page: React.FC<PageType> = async ({ }) => {
    const session = await getServerSession(nextAuthConfig);

    if (session?.user?.email) {
        cookies().get(projectIdCookieKey)?.value
            ? redirect('/app')
            : redirect('/sign-in');
    }

    return (
        <Stack alignItems={'center'} justifyContent={'center'} minHeight={'100vh'}>
            <AuthButton />
        </Stack>
    );
};

export default Page;