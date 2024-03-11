'use client';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import Typography from '@mui/material/Typography';
import { authApi } from '@/api/authApi';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { signIn } from 'next-auth/react';

type AuthButtonType = {
    dictionary: {
        loginByGoogle: string;
    };
    GOOGLE_CLIENT_ID: string;
};

export const AuthButton: React.FC<AuthButtonType> = ({ dictionary, GOOGLE_CLIENT_ID }) => {
    return (
        <>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <GoogleButton dictionary={dictionary} />
            </GoogleOAuthProvider>
        </>
    );
};

type GoogleButtonType = {
    dictionary: {
        loginByGoogle: string;
    };
};

export const GoogleButton: React.FC<GoogleButtonType> = ({ dictionary }) => {

    const login = useGoogleLogin({
        onSuccess: async (credentialResponse) => {
            const user = await authApi.getGoogleUser(credentialResponse.access_token);
            const { email, locale, name, picture, sub } = user;
            await signIn('credentials', { email, locale, name, picture, sub })
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
                        {dictionary.loginByGoogle}
                    </Typography>
                </>
            </Button>
        </>
    );
};