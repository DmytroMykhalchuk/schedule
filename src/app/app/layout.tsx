import { Stack } from "@mui/material";
import { ReactNode } from "react";
import { AppSideBar } from "../Componnets/Layouts/AppSideBar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

type LayoutType = {
    children: ReactNode
};

const Layout: React.FC<LayoutType> = ({ children }) => {

    if (!cookies().get('auth_id')) {
        redirect('/auth');
    }

    return (
        <Stack direction={'row'}>
            <AppSideBar />
            <Stack
                sx={{
                    width: '100%',
                    height: '100%',
                    p: 2,
                }}
            >
                {children}
            </Stack>
        </Stack>
    );

};

export default Layout;