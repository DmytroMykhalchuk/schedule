'use client';
import Stack from "@mui/material/Stack";
import styles from './styles.module.scss';
import { menuList } from "@/app/constants";
import { usePathname } from 'next/navigation'
import { MenuItem } from "./Elements/MenuItem";
import { SideBarFooter } from "./SideBarFooter";

type AppSideBarType = {
};

export const AppSideBar: React.FC<AppSideBarType> = ({ }) => {
    const router = usePathname();

    return (
        <Stack className={styles.sideBarWrapper} sx={{ pb: 2 }}>
            <Stack flex={1} className={styles.sideBarWrapper__menu} spacing={2} justifyContent={'center'}>
                {
                    menuList.map((item, index) => (
                        <>
                            <MenuItem
                                key={index}
                                Icon={<item.Icon className={`${styles.menuIcon} ${router === item.path && styles.active}`}></item.Icon>}
                                path={item.path}
                            />
                        </>
                    ))
                }
            </Stack>
            <SideBarFooter />
        </Stack>
    );
};