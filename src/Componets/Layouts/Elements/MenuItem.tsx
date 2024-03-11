import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

type MenuItemType = {
    path: string
    Icon: JSX.Element
};

export const MenuItem: React.FC<MenuItemType> = ({ path, Icon }) => {

    return (
        <Link href={path}>
            <Stack>
                {Icon}
            </Stack>
        </Link>
    );
};