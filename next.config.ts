
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "192.168.1.10",
//         port: "8005",
//         pathname: "/uploads/**",
//       },
//       {
//         protocol: "http",
//         hostname: "192.168.1.8",
//       },
//       {
//         protocol: "https",
//         hostname: "w0.peakpx.com",
//       },
//       {
//         protocol: "https",
//         hostname: "upload.wikimedia.org",
//       },
//       {
//         protocol: "https",
//         hostname: "cdn11.bigcommerce.com",
//       },
//       {
//         protocol: "https",
//         hostname: "images.pexels.com",
//       },
//       {
//         protocol: "https",
//         hostname: "hinduismsimplified.com",
//       },
//       {
//         protocol: "https",
//         hostname: "www.creativehatti.com",
//       },
//     ],
//   },
//   eslint: {
//     // ✅ Allow production builds to complete even if ESLint errors exist
//     ignoreDuringBuilds: true,
//   },
// };

// export default nextConfig;
// next.config.js or next.config.mjs
import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.10",
        port: "8005",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.8",
      },
      {
        protocol: "https",
        hostname: "w0.peakpx.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "cdn11.bigcommerce.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "hinduismsimplified.com",
      },
      {
        protocol: "https",
        hostname: "www.creativehatti.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // remove appDir (deprecated)
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);
