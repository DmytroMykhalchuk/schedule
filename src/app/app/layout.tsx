import { Container, Stack } from "@mui/material";
import { ReactNode } from "react";
import { AppSideBar } from "../Componnets/Layouts/AppSideBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authCookieKey, projectIdCookieKey } from "@/server/constants";

type LayoutType = {
    children: ReactNode
};

const Layout: React.FC<LayoutType> = ({ children }) => {

    if (!cookies().get(authCookieKey)) {
        redirect('/auth');
    }

    if (!cookies().get(projectIdCookieKey)) {
        redirect('/enter');
    }

    return (
        <Stack direction={'row'}>
            <AppSideBar />
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
            </Stack>
        </Stack>
    );

};

export default Layout;