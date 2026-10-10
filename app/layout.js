import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/CartContext";
import "./globals.css";

export const metadata = {
  title: "BuaBerry (บัวเบอร์รี่) | แซนวิช ติ่มซำ เบเกอรีโฮมเมด",
  description: "แซนวิชไส้แน่น ขนมจีบซาลาเปานึ่งสด เค้กกล้วยหอม บราวนี่หนึบหนับ รอบเช้า 05:00-09:10 น. รับพรีออเดอร์และส่งร้านค้า",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className="min-h-screen flex flex-col antialiased">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
