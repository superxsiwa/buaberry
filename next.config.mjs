/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // ใช้ custom domain buaberry.com จึงไม่ต้องมี basePath
  basePath: "",
};

export default nextConfig;
