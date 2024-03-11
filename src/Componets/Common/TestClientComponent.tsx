'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


type TestClientComponentType = {
};

export const TestClientComponent: React.FC<TestClientComponentType> = ({ }) => {
    const session = useSession();

    return (
        <>
            <Stack alignItems={'center'} justifyContent={'center'}>
                {
                    session?.data
                        ? <Button variant="contained" color="warning" onClick={() => signOut({ callbackUrl: '/' })}> Sign out </Button>
                        : <Button variant="contained" color="primary" onClick={() => signIn('google', {})}> Sign in </Button>
                }
            </Stack>
        </>
    );
};