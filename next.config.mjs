/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // ส่งออกเป็น Static HTML รันบน GitHub Pages ได้ 100%
  images: {
    unoptimized: true, // ปิด image optimization server เพื่อให้ deploy บน GitHub Pages ได้
  },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default nextConfig;
