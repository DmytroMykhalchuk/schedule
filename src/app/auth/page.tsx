import { Button, Stack } from "@mui/material";
import { AuthButton } from "../Componnets/Auth/AuthButton";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type PageType = {
};

const Page: React.FC<PageType> = ({ }) => {
    if (cookies().get('auth_id')) {
        cookies().get('target_project')
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