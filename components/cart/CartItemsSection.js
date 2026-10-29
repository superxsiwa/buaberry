import Link from "next/link";
import { ArrowLeft, Minus, Plus, Sparkles, Trash2 } from "lucide-react";

const ORDER_MODES = [
  { id: "morning", label: "🌅 รอบเช้า" },
  { id: "preorder", label: "📅 จัดเบรก" },
  { id: "wholesale", label: "📦 ราคาส่ง" },
];

export default function CartItemsSection({
  cart,
  orderType,
  setOrderType,
  updateQuantity,
  removeFromCart,
  clearCart,
  getItemPrice,
  totalItems,
  totalPrice,
  savedAmount,
}) {
  return (
    <div className="lg:col-span-3 space-y-4">
      <div className="flex items-center justify-between">
        <Link
          href="/#menu"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-900 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>เลือกเมนูเพิ่ม</span>
        </Link>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" /> ล้างตะกร้า
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Checkout & Direct LINE Order
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-heading">
            ตะกร้าสินค้า & ยืนยันออเดอร์
          </h1>
        </div>

        <div className="inline-flex bg-white p-1 rounded-2xl border border-amber-100 shadow-2xs text-xs font-bold">
          {ORDER_MODES.map((mode) => (
            <button
              key={mode.id}
              type="button"
              onClick={() => setOrderType(mode.id)}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                orderType === mode.id
                  ? "bg-amber-600 text-white shadow-2xs"
                  : "text-stone-600 hover:text-amber-800"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-5 border border-amber-100 shadow-xs divide-y divide-stone-100">
        {cart.map((item) => {
          const price = getItemPrice(item);
          const hasImage =
            item.image &&
            (item.image.startsWith("data:image") ||
              item.image.startsWith("http") ||
              item.image.startsWith("/"));

          return (
            <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
              <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                {hasImage ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <span>{item.image || "🥐"}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm text-amber-950 truncate">{item.name}</h4>
                <p className="text-xs text-amber-800/80 font-medium">฿{price} / ชิ้น</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-7 h-7 rounded-lg border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-50"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-7 h-7 rounded-lg border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-50"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="text-stone-400 hover:text-rose-500 p-1 ml-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-amber-50 via-orange-50/60 to-amber-50 rounded-3xl p-5 border border-amber-200/70 space-y-2">
        {savedAmount > 0 && (
          <div className="flex items-center justify-between text-xs font-bold text-emerald-700 bg-emerald-50/90 px-3 py-1.5 rounded-xl border border-emerald-200/60">
            <span className="inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> ส่วนลดเรทราคาส่ง (B2B)
            </span>
            <span>ประหยัดไป ฿{savedAmount}</span>
          </div>
        )}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-xs text-stone-500 font-medium">จำนวนทั้งหมด {totalItems} ชิ้น</span>
            <p className="text-base font-extrabold text-amber-950 font-heading">ยอดชำระสุทธิ</p>
          </div>
          <span className="text-2xl sm:text-3xl font-extrabold text-amber-800 font-heading">฿{totalPrice}</span>
        </div>
      </div>
    </div>
  );
}
