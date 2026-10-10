"use client";

import { useCart } from "@/lib/CartContext";
import { Plus, Check, Sparkles } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { addToCart, orderType } = useCart();
  const [added, setAdded] = useState(false);

  const isWholesale = orderType === "wholesale";
  const displayPrice = isWholesale ? product.wholesalePrice : product.price;

  const handleAdd = () => {
    const qty = isWholesale ? (product.minWholesale || 5) : 1;
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div className="bg-white rounded-2xl p-4 border border-amber-100/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* รูปไอคอน / ภาพสินค้า */}
        <div className="relative w-full aspect-square bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-xl flex items-center justify-center text-6xl select-none group-hover:scale-105 transition-transform duration-300">
          <span>{product.image}</span>
          
          {/* Badge แสดงประเภท */}
          {product.isMorningItem && (
            <span className="absolute top-2 left-2 bg-amber-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              🌅 เช้าตรู่
            </span>
          )}
          {isWholesale && product.wholesalePrice && (
            <span className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" /> ราคาส่ง
            </span>
          )}
        </div>

        {/* รายละเอียด */}
        <div className="mt-3">
          <h3 className="font-bold text-amber-950 text-base leading-snug group-hover:text-amber-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-amber-900/60 line-clamp-2 mt-1 leading-relaxed">
            {product.desc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mt-2">
            {product.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[11px] bg-amber-50 text-amber-800/80 px-2 py-0.5 rounded-md font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ราคา & ปุ่มสั่งซื้อ */}
      <div className="mt-4 pt-3 border-t border-amber-50 flex items-center justify-between">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-amber-700">฿{displayPrice}</span>
            <span className="text-xs text-amber-800/60">
              {isWholesale ? "/ชิ้น" : ""}
            </span>
          </div>
          {isWholesale && (
            <p className="text-[10px] text-emerald-700 font-medium">
              ขั้นต่ำ {product.minWholesale} ชิ้น (ปกติ ฿{product.price})
            </p>
          )}
        </div>

        <button
          onClick={handleAdd}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all active:scale-90 ${
            added
              ? "bg-emerald-600 text-white"
              : "bg-amber-100 hover:bg-amber-500 text-amber-900 hover:text-white"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4" />
              <span>ใส่แล้ว!</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              <span>{isWholesale ? `สั่งส่ง (${product.minWholesale}+)` : "ใส่ตะกร้า"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

