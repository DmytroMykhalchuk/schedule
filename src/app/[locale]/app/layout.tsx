import { Container, Stack } from "@mui/material";
import { ReactNode } from "react";
import { AppSideBar } from "@/Componets/Layouts/AppSideBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authCookieKey, projectIdCookieKey } from "@/server/constants";
import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/configs/auth";

type LayoutType = {
    children: ReactNode;
    params: { locale: string };
    modal?: ReactNode;
};

const Layout: React.FC<LayoutType> = async ({ children, params, modal }) => {
    const locale = params.locale;

    const session = await getServerSession(nextAuthConfig);


    if (!session?.user?.email) {
        if (!cookies().get(authCookieKey)) {
            redirect('/auth');
        }
    }

    if (!cookies().get(projectIdCookieKey)) {
        redirect('/sign-in');
    }


    return (
        <Stack direction={'row'}>
            <AppSideBar locale={locale} />
            <Stack
                sx={{
                    width: '100%',
                    height: '100%',
                    minHeight: '100vh',
                    p: 2,
                }}
            >
                <Container>
                    {children}
                </Container>
                {modal && modal}
            </Stack>
        </Stack>
    );

};

export default Layout;