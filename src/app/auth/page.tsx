import { Button, Stack } from "@mui/material";
import { AuthButton } from "../Componnets/Auth/AuthButton";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authCookieKey, projectIdCookieKey } from "@/server/constants";

type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {
    if (cookies().get(authCookieKey)) {
        cookies().get(projectIdCookieKey)
            ? redirect('/app')
            : redirect('/enter')
    }

    return (
        <Stack alignItems={'center'} justifyContent={'center'} minHeight={'100vh'}>
            <AuthButton />
        </Stack>
    );
};

export default Page;