/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { dev }) => {
        if (dev) {
            config.watchOptions = {
                poll: 1000, // Vérifie les modifications toutes les secondes
                aggregateTimeout: 300, // Délai avant de recompiler
            };
        }
        return config;
    },
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "2424",
                pathname: "/images/**",
            },
            {
                protocol: process.env.NEXT_PUBLIC_API_URL.split("://")[0],
                hostname: process.env.NEXT_PUBLIC_API_URL.split("://")[1],
                pathname: "/images/**",
            },
        ],
    },
};

export default nextConfig;
