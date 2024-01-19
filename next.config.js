/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    reactStrictMode: true,
    // async redirects() {
    //   return [
    //     {
    //       source: "/about",
    //       destination: "/about",
    //       permanent: true,
    //     },
    //   ]
    // },
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
