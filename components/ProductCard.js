"use client";

import { useCart } from "@/lib/CartContext";
import { Plus, Check, Sparkles, Ban, ShoppingBag } from "lucide-react";
import { useState } from "react";

export default function ProductCard({ product }) {
  const { cart, addToCart, orderType } = useCart();
  const [added, setAdded] = useState(false);

  const isWholesale = orderType === "wholesale";
  const displayPrice = isWholesale ? product.wholesalePrice || product.price : product.price;
  const isOutOfStock = product.isOutOfStock;
  const profitPerUnit =
    product.wholesalePrice && product.price > product.wholesalePrice
      ? product.price - product.wholesalePrice
      : 0;

  const cartItem = cart.find((item) => item.id === product.id);
  const inCartQty = cartItem ? cartItem.quantity : 0;

  const isImageSrc =
    product.image &&
    (product.image.startsWith("data:image") ||
      product.image.startsWith("http") ||
      product.image.startsWith("/"));

  const handleAdd = () => {
    if (isOutOfStock) return;
    const qty = isWholesale ? product.minWholesale || 5 : 1;
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1100);
  };

  return (
    <div
      className={`bg-white rounded-3xl p-4 sm:p-5 border border-amber-100/90 shadow-[0_4px_20px_-6px_rgba(120,53,15,0.06)] hover:shadow-[0_14px_30px_-8px_rgba(120,53,15,0.14)] hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between group overflow-hidden ${
        isOutOfStock ? "opacity-70" : ""
      }`}
    >
      <div>
        <div className="relative w-full aspect-square bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-amber-100/50 rounded-2xl flex items-center justify-center overflow-hidden select-none border border-amber-100/60">
          {isImageSrc ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <span className="text-6xl sm:text-7xl group-hover:scale-110 transition-transform duration-300">
              {product.image || "🥐"}
            </span>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 bg-stone-950/65 flex flex-col items-center justify-center text-white backdrop-blur-[2px] z-10">
              <Ban className="w-7 h-7 text-rose-400 mb-1" />
              <span className="text-[11px] font-bold uppercase bg-rose-600 px-3 py-1 rounded-full">
                สินค้าหมดวันนี้
              </span>
            </div>
          )}

          {!isOutOfStock && product.isMorningItem && (
            <span className="absolute top-2.5 left-2.5 bg-white/95 text-amber-900 border border-amber-200/80 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs z-10">
              🌅 รอบเช้า
            </span>
          )}

          {!isOutOfStock && isWholesale && profitPerUnit > 0 ? (
            <span className="absolute top-2.5 right-2.5 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-0.5 z-10">
              <Sparkles className="w-2.5 h-2.5" /> กำไร ฿{profitPerUnit}/ชิ้น
            </span>
          ) : (
            !isOutOfStock &&
            inCartQty > 0 && (
              <span className="absolute top-2.5 right-2.5 bg-amber-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1 z-10">
                <ShoppingBag className="w-2.5 h-2.5" /> ในตะกร้า {inCartQty}
              </span>
            )
          )}
        </div>


        {/* รายละเอียด */}
        <div className="mt-4">
          <h3 className="font-bold text-amber-950 text-sm sm:text-base leading-snug group-hover:text-amber-700 transition-colors line-clamp-2 font-heading min-h-[2.5rem]">
            {product.name}
          </h3>
          <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed min-h-[2.25rem]">
            {product.desc}
          </p>

          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {product.tags &&
              product.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-amber-50/90 text-amber-900/80 border border-amber-100 px-2 py-0.5 rounded-lg font-semibold"
                >
                  #{tag}
                </span>
              ))}
          </div>
        </div>
      </div>

      {/* ราคา & ปุ่มสั่งซื้อ */}
      <div className="mt-4 pt-3.5 border-t border-stone-100 flex items-end justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg sm:text-xl font-extrabold text-amber-800 font-heading">
              ฿{displayPrice}
            </span>
            {isWholesale && product.price > displayPrice && (
              <span className="text-xs text-stone-400 line-through">฿{product.price}</span>
            )}
          </div>
          {isWholesale ? (
            <p className="text-[10px] text-emerald-700 font-bold">
              ขั้นต่ำ {product.minWholesale || 5} ชิ้น
            </p>
          ) : (
            <p className="text-[10px] text-stone-400 font-medium">โฮมเมดสดใหม่</p>
          )}
        </div>

        {isOutOfStock ? (
          <span className="text-xs font-bold text-rose-500 bg-rose-50 px-3 py-2 rounded-xl border border-rose-200">
            หมดชั่วคราว
          </span>
        ) : (
          <button
            type="button"
            onClick={handleAdd}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-xs ${
              added
                ? "bg-emerald-600 text-white"
                : isWholesale
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "bg-amber-600 hover:bg-amber-700 text-white"
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>เพิ่มแล้ว!</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>{isWholesale ? `+${product.minWholesale || 5} ชิ้น` : "ใส่ตะกร้า"}</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
