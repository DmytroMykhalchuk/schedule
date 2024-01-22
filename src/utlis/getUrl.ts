import { IncomingMessage } from "http";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export type RequestURL = URL & {
    basePath: string;
};

const getFromMeta = (req: IncomingMessage) => {
    const meta = Object.getOwnPropertySymbols(req).find(
        ({ description }) => description === "NextRequestMeta"
    );

    return meta ? (req as any)[meta]?.__NEXT_INIT_URL ?? null : null;
};

export const getRequestURL = (req: IncomingMessage) => {
    const referer = req.headers.referer ?? getFromMeta(req);

    if (referer) {
        const url = new URL(referer);
        const matchBasePathPrefix =
            basePath.length && url.pathname.startsWith(basePath);
        const pathname = matchBasePathPrefix
            ? url.pathname.substring(0, basePath.length)
            : url.pathname;
        const href = req.url
            ? url.href.substring(0, url.href.lastIndexOf(pathname)) + req.url
            : url.href;

        return {
            href: href,
            origin: url.origin,
            protocol: url.protocol,
            username: url.username,
            password: url.password,
            host: url.host,
            basePath: matchBasePathPrefix ? basePath : "",
            hostname: url.hostname,
            port: url.port,
            pathname: req?.url ?? pathname,
            search: url.search,
            searchParams: url.searchParams,
            hash: url.hash,
        };
    } else {
        return null;
    }
};