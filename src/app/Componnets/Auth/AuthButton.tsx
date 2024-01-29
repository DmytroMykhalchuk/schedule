'use client';

import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import GoogleIcon from '@mui/icons-material/Google';
import Typography from '@mui/material/Typography';
import { authApi } from '@/api/authApi';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { UserActions } from '@/server/actions/UserActions';
import axios from 'axios';

type AuthButtonType = {
};

export const AuthButton: React.FC<AuthButtonType> = ({ }) => {

    return (
        <>
            <GoogleOAuthProvider clientId="136560295788-7kvlva7fsji2n1nciafvipgo6jd1hbmm.apps.googleusercontent.com">
                <GoogleButton></GoogleButton>
            </GoogleOAuthProvider>
        </>
    );
};

type GoogleButtonType = {
};

export const GoogleButton: React.FC<GoogleButtonType> = ({ }) => {
    const { push } = useRouter();

    const login = useGoogleLogin({
        onSuccess: async (credentialResponse) => {
            const user = await authApi.getGoogleUser(credentialResponse.access_token);
            const { email, locale, name, picture, sub } = user;
            //todo change locale

            axios.post('/api/auth', { ...user })
                .then((response) => {
                    const data = response.data;
                    Cookies.set('auth', JSON.stringify(user));
                    Cookies.set('auth_id', data.data.sessionId);
                    data.data.projectsIds
                        ? push('/app')
                        : push('/enter');
                });

        },
        onError: () => {
            console.warn('Login Failed');
        },
        flow: 'implicit',
    }) as () => void;

    return (
        <>
            <Button
                color='warning'
                variant="outlined"
                sx={{
                    textTransform: 'none',
                    gap: 2,
                    alignItems: 'center',
                }}
                onClick={login}
            >
                <>
                    <GoogleIcon />
                    <Typography variant="h6">
                        Увійти за допомогою гугл
                    </Typography>
                </>
            </Button>
        </>
    );
};