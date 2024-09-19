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
  //   async headers() {
  //     return [
  //         {
  //             // matching all API routes
  //             source: "/api/:path*",
  //             headers: [
  //                 { key: "Access-Control-Allow-Credentials", value: "true" },
  //                 { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
  //                 { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
  //                 { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
  //             ]
  //         }
  //     ]
  // },
  };
  
  export default nextConfig;