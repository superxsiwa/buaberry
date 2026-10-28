"use client";

import { useCart } from "@/lib/CartContext";
import { Clock, Calendar, Store, Sparkles, CheckCircle2 } from "lucide-react";

export default function OrderTypeSelector() {
  const { orderType, setOrderType } = useCart();

  const types = [
    {
      id: "morning",
      title: "สั่งรับหน้าร้านรอบเช้า",
      emoji: "🌅",
      badge: "รับด่วนไม่ต้องรอคิว",
      time: "05:00 - 09:10 น.",
      desc: "แซนวิชไส้ทะลัก ขนมจีบ ซาลาเปานึ่งสด แวะรับก่อนไปทำงาน/เรียนได้เลย",
      icon: Clock,
      activeStyle:
        "border-amber-500 bg-gradient-to-br from-amber-50/90 via-white to-orange-50/40 text-amber-950 shadow-md shadow-amber-500/10",
      badgeStyle: "bg-amber-100 text-amber-900",
    },
    {
      id: "preorder",
      title: "Pre-order / ขนมจัดเบรก",
      emoji: "📅",
      badge: "อบสดใหม่ตามออเดอร์",
      time: "สั่งล่วงหน้า 1-2 วัน",
      desc: "เค้กกล้วยหอมครีมชีส บราวนี่หน้าฟิล์ม เซ็ตของว่างงานประชุม/สัมมนา",
      icon: Calendar,
      activeStyle:
        "border-orange-500 bg-gradient-to-br from-orange-50/90 via-white to-amber-50/40 text-amber-950 shadow-md shadow-orange-500/10",
      badgeStyle: "bg-orange-100 text-orange-900",
    },
    {
      id: "wholesale",
      title: "สั่งราคาส่ง (B2B)",
      emoji: "📦",
      badge: "กำไรดี ขั้นต่ำน้อย",
      time: "ร้านค้า • มหาลัย • โรงเรียน",
      desc: "ปรับเป็นเรทราคาส่งอัตโนมัติ สำหรับร้านกาแฟ ร้านน้ำ และสหกรณ์",
      icon: Store,
      activeStyle:
        "border-emerald-600 bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/40 text-emerald-950 shadow-md shadow-emerald-600/10",
      badgeStyle: "bg-emerald-100 text-emerald-900",
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100/90 shadow-[0_8px_30px_rgb(120,53,15,0.06)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block">
              Step 1 • Choose Order Mode
            </span>
            <h2 className="text-lg sm:text-xl font-extrabold text-amber-950 font-heading">
              เลือกรูปแบบการสั่งซื้อของคุณวันนี้
            </h2>
          </div>
        </div>
        <span className="text-xs text-stone-500">
          ระบบจะคำนวณราคาและจำนวนขั้นต่ำตามโหมดที่คุณเลือกโดยอัตโนมัติ
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {types.map((t) => {
          const isSelected = orderType === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setOrderType(t.id)}
              className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer relative flex flex-col justify-between group ${
                isSelected
                  ? `${t.activeStyle} scale-[1.01]`
                  : "border-stone-200/80 bg-white hover:border-amber-300 hover:bg-amber-50/20 text-stone-700"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      isSelected ? t.badgeStyle : "bg-stone-100 text-stone-600"
                    }`}
                  >
                    {t.badge}
                  </span>
                  {isSelected ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                      เลือกอยู่
                    </span>
                  ) : (
                    <span className="w-4 h-4 rounded-full border-2 border-stone-300 group-hover:border-amber-400 transition-colors" />
                  )}
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{t.emoji}</span>
                  <h3 className="font-bold text-base text-amber-950 font-heading">
                    {t.title}
                  </h3>
                </div>

                <p className="text-xs font-bold text-amber-700 mb-2">{t.time}</p>
                <p className="text-xs text-stone-600 leading-relaxed">{t.desc}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}


