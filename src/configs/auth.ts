import { AuthOptions, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { UserActions } from '@/server/actions/UserActions';

export const nextAuthConfig: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        Credentials({
            credentials: {
                email: { label: 'email', type: 'email', required: true },
                locale: { label: 'locale', type: 'string', required: true },
                name: { label: 'name', type: 'string', required: true },
                picture: { label: 'picture', type: 'string', required: true },
                sub: { label: 'sub', type: 'string', required: true },
            },
            async authorize(credentials) {
                if (!(credentials?.name || credentials?.sub || credentials?.locale || credentials?.picture)) {
                    console.log('empty credentials')
                    return null;
                }

                const loginParams = {
                    name: credentials?.name!,
                    googleId: credentials?.sub!,
                    email: credentials?.email!,
                    picture: credentials?.picture!,
                };
                const data = await UserActions.login(loginParams)

                return data as User || null;
            },
        })
    ],
    pages: {
        signIn: '/auth',
    },
};