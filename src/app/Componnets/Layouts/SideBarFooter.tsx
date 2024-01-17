import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from './styles.module.scss';
import { Button, Stack } from '@mui/material';
import { logout } from './actions';
import { MenuItem } from './Elements/MenuItem';

type SideBarFooterType = {
};

export const SideBarFooter: React.FC<SideBarFooterType> = ({ }) => {

    return (
        <Stack alignItems={'center'} spacing={2}>
            <MenuItem
                path="/app/settings"
                Icon={<SettingsIcon className={styles.menuIcon} />}
            />
            <form action={logout}>
                <Button type='submit'>
                    <LogoutIcon className={styles.menuIcon} />
                </Button>
            </form>
        </Stack>
    );
};