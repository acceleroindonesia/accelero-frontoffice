/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  serverExternalPackages: ["pdfkit"],
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://localhost",
    "http://localhost:80",
    "https://accelero.vercel.app"
  ],
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config, { dev }) {
    if (dev) {
      config.devtool = 'source-map';
    }
    return config;
  },
};

export default nextConfig;
