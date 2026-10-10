"use client";

import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { ShoppingBag, Clock, Phone, Sparkles } from "lucide-react";

export default function Navbar() {
  const { totalItems, orderType } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-xs">
      {/* Top Banner แจ้งเตือนรอบเช้า */}
      <div className="bg-amber-600 text-white text-xs sm:text-sm py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <Clock className="w-4 h-4 shrink-0 animate-pulse" />
        <span>รอบหน้าร้านสดใหม่: 05:00 - 09:10 น. สั่งไว้ก่อนขับรถแวะมารับได้เลย!</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* โลโก้ & ชื่อร้าน */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center text-white text-xl shadow-md group-hover:scale-105 transition-transform">
            🥐
          </div>
          <div>
            <h1 className="text-xl font-bold text-amber-950 tracking-tight leading-none group-hover:text-amber-700 transition-colors">
              BuaBerry
            </h1>
            <p className="text-xs text-amber-700/80 font-medium">แซนวิช • ติ่มซำ • เบเกอรี</p>
          </div>
        </Link>

        {/* เมนูลัด */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-amber-900">
          <Link href="/#menu" className="hover:text-amber-600 transition-colors">
            เมนูทั้งหมด
          </Link>
          <Link href="/#morning" className="hover:text-amber-600 transition-colors">
            รอบเช้า (05:00-09:10)
          </Link>
          <Link href="/#wholesale" className="hover:text-amber-600 transition-colors flex items-center gap-1 text-orange-600 font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> เรทราคาส่ง
          </Link>
          <Link href="/#contact" className="hover:text-amber-600 transition-colors">
            ติดต่อร้าน / Grab
          </Link>
        </nav>

        {/* ปุ่มตะกร้าสินค้า */}
        <div className="flex items-center gap-3">
          <Link
            href="/cart"
            className="relative flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-sm hover:shadow transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ตะกร้า</span>
            {totalItems > 0 && (
              <span className="bg-white text-amber-700 text-xs font-bold rounded-full h-5 min-w-[20px] px-1 flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

