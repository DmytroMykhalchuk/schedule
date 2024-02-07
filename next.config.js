/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/app/calendar/day',
                destination: '/app/my-tasks',
                permanent: true,
            },
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '',
                pathname: '**',
            },
        ],
    },
}

module.exports = nextConfig
