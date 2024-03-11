'use client';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from './../styles.module.scss';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { projectIdCookieKey } from '@/server/constants';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type LogoutButtonType = {
    locale: string;
};

export const LogoutButton: React.FC<LogoutButtonType> = ({ locale }) => {
    const router = useRouter();
    const onLogout = async () => {
        Cookies.remove(projectIdCookieKey, { path: '/' })
        Cookies.remove('auth', { path: '/' });

        await signOut({
            redirect: false,
        });
        router.push(`/${locale}/auth`)
    };

    return (
        <Button type='submit' onClick={onLogout}>
            <LogoutIcon className={styles.menuIcon} />
        </Button>
    );
};