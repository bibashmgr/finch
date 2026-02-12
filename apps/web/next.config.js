/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["http://localhost:8080"],
  transpilePackages: ["@repo/ui"],
  images: {
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dhq62j2x0/image/upload/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
