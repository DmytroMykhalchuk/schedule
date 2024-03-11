import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import styles from './styles.module.scss';
import { Button, Stack } from '@mui/material';
import { logout } from './actions';
import { MenuItem } from './Elements/MenuItem';
import { LogoutButton } from './Elements/LogoutButton';

type SideBarFooterType = {
    locale: string
};

export const SideBarFooter: React.FC<SideBarFooterType> = ({ locale }) => {

    return (
        <Stack alignItems={'center'} spacing={2}>
            <MenuItem
                path={`/${locale}/app/settings`}
                Icon={<SettingsIcon className={styles.menuIcon} />}
            />
            <LogoutButton locale={locale}/>
        </Stack>
    );
};