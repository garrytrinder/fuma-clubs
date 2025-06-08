/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
    ],
  },
  transpilePackages: ["@premieroctet/next-admin"],
};

export default nextConfig;
