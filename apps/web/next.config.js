/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['http://localhost:8080'],
  transpilePackages: ['@repo/ui'],
};

export default nextConfig;
