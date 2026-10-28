"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { useStore } from "@/lib/StoreContext";
import { ShoppingBag, Phone, Sparkles, Menu, X, MessageCircle, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const { totalItems, orderType } = useCart();
  const { shopInfo, isOpen } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const modeLabel =
    orderType === "wholesale" ? "เรทส่ง" : orderType === "preorder" ? "พรีออเดอร์" : "รอบเช้า";

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-amber-100/80 shadow-xs">
      <div className="bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-amber-50 text-xs py-2 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold shrink-0 ${
                isOpen
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                  : "bg-rose-500/20 text-rose-200 border border-rose-400/30"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? "bg-emerald-400 animate-pulse" : "bg-rose-400"}`} />
              {isOpen ? "เปิดรับออเดอร์" : "ปิดชั่วคราว"}
            </span>
            <span className="truncate font-medium text-amber-100/95">
              🌅 รอบเช้า {shopInfo.morningHours} • สั่งไว้ก่อนแวะรับได้ทันที
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 shrink-0 text-[11px] text-amber-200">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> โฮมเมดแท้ 100%
            </span>
            <a href={`tel:${shopInfo.phone}`} className="hover:text-white inline-flex items-center gap-1 font-semibold">
              <Phone className="w-3 h-3 text-amber-400" /> {shopInfo.phone}
            </a>
          </div>
        </div>
      </div>


      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-2xl shadow-md group-hover:scale-105 transition-transform">
            🥐
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-extrabold text-amber-950 tracking-tight leading-none group-hover:text-amber-700 transition-colors font-heading">
                BuaBerry
              </span>
              <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100/80 text-amber-800">
                Homemade
              </span>
            </div>
            <p className="text-xs text-stone-500 font-medium mt-0.5">แซนวิช • ติ่มซำ • เบเกอรีโฮมเมด</p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-stone-700">
          <Link href="/#menu" className="hover:text-amber-700 transition-colors">เมนูความอร่อย</Link>
          <Link href="/#quality" className="hover:text-amber-700 transition-colors">มาตรฐานโฮมเมด</Link>
          <Link
            href="/#wholesale"
            className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-200/60 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" /> เรทราคาส่ง B2B
          </Link>
          <Link href="/#reviews" className="hover:text-amber-700 transition-colors">รีวิวลูกค้า</Link>
          <Link href="/#contact" className="hover:text-amber-700 transition-colors">ติดต่อร้าน</Link>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={shopInfo.lineUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/70 transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>LINE ร้าน</span>
          </a>

          <Link
            href="/cart"
            className="relative flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-2xl text-sm font-bold shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ตะกร้า</span>
            <span className="hidden md:inline text-[11px] font-medium text-amber-100">({modeLabel})</span>
            {totalItems > 0 && (
              <span className="bg-white text-amber-800 text-xs font-extrabold rounded-full h-5 min-w-[20px] px-1.5 flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="เมนู"
            className="lg:hidden p-2.5 rounded-2xl border border-stone-200 text-stone-700 hover:bg-amber-50"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-amber-100 px-4 py-3 grid grid-cols-2 gap-2 text-xs font-bold shadow-lg">
          <Link href="/#menu" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-amber-50 text-amber-950">🥐 เมนูทั้งหมด</Link>
          <Link href="/#wholesale" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-emerald-50 text-emerald-950">📦 เรทราคาส่ง</Link>
          <Link href="/#quality" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-stone-50 text-stone-800">✨ ความใส่ใจ</Link>
          <Link href="/#reviews" onClick={() => setMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-stone-50 text-stone-800">⭐ รีวิวลูกค้า</Link>
        </div>
      )}
    </header>
  );
}

