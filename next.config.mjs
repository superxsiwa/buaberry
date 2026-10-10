/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const repoName = "buaberry_web";

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // เมื่อรันบน GitHub Pages (URL จะมีชื่อ repo: /buaberry_web)
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || (isProd ? `/${repoName}` : ""),
};

export default nextConfig;
