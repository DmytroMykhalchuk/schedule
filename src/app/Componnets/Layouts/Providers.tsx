'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

type ProvidersType = {
    children: ReactNode,
};

export const Providers: React.FC<ProvidersType> = ({ children }) => {

    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};