"use client";

import Link from "next/link";
import { useCart } from "@/lib/CartContext";

export default function FloatingCartBar() {
  const { totalItems, totalPrice } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-30 md:hidden">
      <Link
        href="/cart"
        className="flex items-center justify-between bg-amber-950 text-white px-4 py-3.5 rounded-2xl shadow-2xl border border-amber-700/50 active:scale-95 transition-transform"
      >
        <div className="flex items-center gap-2.5">
          <span className="bg-amber-500 text-amber-950 font-extrabold text-xs px-2.5 py-1 rounded-xl">
            {totalItems} ชิ้น
          </span>
          <span className="text-xs font-bold">ดูตะกร้า & สั่งซื้อ</span>
        </div>
        <span className="text-sm font-extrabold text-amber-300 font-heading">฿{totalPrice} →</span>
      </Link>
    </div>
  );
}
