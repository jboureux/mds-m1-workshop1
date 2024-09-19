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
};

export default nextConfig;
