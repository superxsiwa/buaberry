import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmartAssistant from "@/components/SmartAssistant";
import { CartProvider } from "@/lib/CartContext";
import { StoreProvider } from "@/lib/StoreContext";
import "./globals.css";

export const metadata = {
  title: "BuaBerry (บัวเบอร์รี่) | แซนวิช ติ่มซำ เบเกอรีโฮมเมด สดใหม่ทุกวัน",
  description:
    "แซนวิชไส้แน่น ขนมจีบซาลาเปานึ่งสด เค้กกล้วยหอม บราวนี่หนึบหนับ รอบเช้า 05:00-09:10 น. รับพรีออเดอร์จัดเบรกและส่งร้านค้าราคาส่ง",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" className="scroll-smooth">
      <head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anuphan:wght@400;500;600;700&family=Prompt:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased selection:bg-amber-200 selection:text-amber-950">
        <StoreProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <SmartAssistant />
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

