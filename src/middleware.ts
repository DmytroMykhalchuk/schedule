// export { default } from 'next-auth/middleware';

// export const config = { matcher: ['/app/:pathName*'] };
import createMiddleware from 'next-intl/middleware';



export default createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'uk'],

    // Used when no locale matches
    defaultLocale: 'en'
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(uk|en)/:path*'],
    
};