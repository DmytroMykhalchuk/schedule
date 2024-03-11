import { MiddlewareFactory } from './types';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { protectedAuthPaths } from './middlewaresConstants';

function getSearchParam(param: string, url: any) {
    return url.searchParams.get(param);
};

export const withUser: MiddlewareFactory = (next) => {
    return async (request: NextRequest, _next: NextFetchEvent) => {
        const pathname = request.nextUrl.pathname;

        if (protectedAuthPaths.some((path) => pathname.includes(path))) {
            const userId = request.cookies.get("next-auth.session-token");
            if (!userId) {
                const url = new URL(`/auth`, request.url);
                return NextResponse.redirect(url);
            }
        }
        return next(request, _next);
    };
};

// export { default } from 'next-auth/middleware';

// export const config = { matcher: ['/app/:pathName*'] };



