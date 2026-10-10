"use client";

import { useCart } from "@/lib/CartContext";
import { Clock, Calendar, Store, Sparkles } from "lucide-react";

export default function OrderTypeSelector() {
  const { orderType, setOrderType } = useCart();

  const types = [
    {
      id: "morning",
      title: "🌅 สั่งรับหน้าร้านรอบเช้า",
      time: "05:00 - 09:10 น.",
      desc: "แซนวิช ขนมจีบ ซาลาเปา นึ่งสดๆ แวะรับสะดวก",
      icon: Clock,
      color: "border-amber-400 bg-amber-50/60 text-amber-950",
    },
    {
      id: "preorder",
      title: "📅 Pre-order / จัดเบรก",
      time: "สั่งล่วงหน้า 1-2 วัน",
      desc: "เค้กกล้วยหอม บราวนี่ เซ็ตของว่างประชุม/สัมมนา",
      icon: Calendar,
      color: "border-orange-400 bg-orange-50/60 text-orange-950",
    },
    {
      id: "wholesale",
      title: "📦 สั่งราคาส่ง (B2B)",
      time: "ร้านค้า มหาลัย โรงเรียน",
      desc: "เรทส่งพิเศษ ขั้นต่ำน้อย รับไปขายกำไรดี",
      icon: Store,
      color: "border-emerald-500 bg-emerald-50/60 text-emerald-950",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-amber-600" />
        <h2 className="text-lg font-bold text-amber-950">
          คุณต้องการสั่งซื้อแบบไหนวันนี้?
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {types.map((t) => {
          const isSelected = orderType === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setOrderType(t.id)}
              className={`text-left p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                isSelected
                  ? `${t.color} shadow-sm ring-2 ring-amber-400/30 scale-[1.01]`
                  : "border-stone-200/80 bg-white hover:border-amber-200 hover:bg-stone-50/50 text-stone-700"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm sm:text-base">{t.title}</span>
                {isSelected && (
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                )}
              </div>
              <p className="text-xs font-semibold text-amber-800/80 mb-1">{t.time}</p>
              <p className="text-xs text-stone-600 leading-relaxed">{t.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

