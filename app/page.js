"use client";

import { useState } from "react";
import OrderTypeSelector from "@/components/OrderTypeSelector";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS, SHOP_INFO } from "@/lib/products";
import { useCart } from "@/lib/CartContext";
import { Phone, MessageCircle, Clock, ShoppingBag, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { orderType } = useCart();

  // กรองสินค้าตามหมวดหมู่
  const filteredProducts = PRODUCTS.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-100/60 via-amber-50/40 to-transparent py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-3/5 text-center md:text-left space-y-5">
            <div className="inline-flex items-center gap-2 bg-amber-200/80 text-amber-900 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>โฮมเมด สดใหม่จากเตาทุกวัน</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-amber-950 tracking-tight leading-tight">
              มื้อเช้าอร่อยทันใจ <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                เบเกอรีนุ่มฉ่ำ
              </span>{" "}
              ส่งตรงถึงคุณ
            </h1>

            <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto md:mx-0 leading-relaxed">
              เสิร์ฟความอร่อยรอบเช้าตรู่ <strong>05:00 - 09:10 น.</strong> ทั้งแซนวิชไส้ทะลัก ซาลาเปา ขนมจีบนึ่งสด 
              และเบเกอรี่โฮมเมด เค้กกล้วยหอม บราวนี่ พร้อมรับออเดอร์จัดเบรก & ส่งร้านค้า
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <a
                href="#menu"
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>เลือกดูเมนู & สั่งซื้อ</span>
              </a>

              <a
                href={SHOP_INFO.lineUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-sm transition-all active:scale-95 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>แอดไลน์ร้าน</span>
              </a>

              <a
                href={SHOP_INFO.grabUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-stone-800 hover:bg-stone-900 text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-sm transition-all active:scale-95 flex items-center gap-2"
              >
                <span>🛵 สั่ง Grab</span>
              </a>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="md:w-2/5 w-full max-w-sm">
            <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-amber-50 pb-3">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  Highlights
                </span>
                <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                  เปิดรับออเดอร์
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-amber-50/50">
                  <span className="text-2xl">🥪</span>
                  <div className="text-xs">
                    <p className="font-bold text-amber-950">รอบหน้าร้าน 05:00 - 09:10</p>
                    <p className="text-stone-500">แซนวิชไส้ทะลัก ซาลาเปาร้อนๆ</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-orange-50/50">
                  <span className="text-2xl">🍌</span>
                  <div className="text-xs">
                    <p className="font-bold text-orange-950">เค้กกล้วยหอม & บราวนี่</p>
                    <p className="text-stone-500">หวานน้อย เนื้อฉ่ำ จัดเบรกยอดฮิต</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50/50">
                  <span className="text-2xl">🏪</span>
                  <div className="text-xs">
                    <p className="font-bold text-emerald-950">ราคาส่ง โรงเรียน / มหาลัย</p>
                    <p className="text-stone-500">ขั้นต่ำน้อย มีบริการส่งถึงที่</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center">
                <span className="text-[11px] text-stone-600">
                  📍 {SHOP_INFO.address}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* กล่องเลือกโหมดการสั่งซื้อ */}
      <section className="max-w-6xl mx-auto px-4">
        <OrderTypeSelector />
      </section>

      {/* เมนูอาหารและหมวดหมู่ */}
      <section id="menu" className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-600 tracking-wider uppercase">
              Menu & Bakery
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-amber-950">
              เมนูความอร่อยของ BuaBerry
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500">
            {orderType === "wholesale" ? "✨ กำลังแสดงราคาส่ง (B2B)" : "กดใส่ตะกร้าแล้วสั่งง่ายๆ ได้เลย"}
          </p>
        </div>

        {/* หมวดหมู่ Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-white text-stone-600 hover:bg-amber-50 border border-stone-200"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ส่วนขายส่ง & แนะนำร้านค้า (B2B Section) */}
      <section id="wholesale" className="max-w-6xl mx-auto px-4">
        <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-block bg-emerald-500/30 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/20">
              สำหรับร้านค้า & สหกรณ์
            </span>
            <h3 className="text-2xl sm:text-3xl font-black leading-tight text-white">
              รับส่งร้านค้าในมหาลัย โรงเรียน และร้านขายน้ำ
            </h3>
            <p className="text-emerald-100/80 text-sm leading-relaxed">
              เพิ่มรายได้ให้ร้านของคุณด้วยแซนวิชไส้แน่น ขนมจีบ ซาลาเปา และเบเกอรี่ขายง่าย 
              แพ็กเกจจิ้งสะอาด ป้ายชัดเจน ขั้นต่ำต่อครั้งไม่สูง มีรอบส่งตรงเวลา
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-200">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>เรทราคาส่งเริ่มต้นเพียง 10-15 ชิ้น</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>บริการจัดส่งตามรอบเช้าและบ่าย</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>ขนมสดใหม่ทุกวัน เก็บรักษาง่าย</span>
              </li>
            </ul>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={SHOP_INFO.lineUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>ทักไลน์ปรึกษาเรทราคาส่ง</span>
              </a>
              <a
                href={`tel:${SHOP_INFO.phone}`}
                className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>โทรคุย: {SHOP_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Cart Button บนมือถือ */}
      <div className="fixed bottom-4 right-4 z-30 md:hidden">
        <Link
          href="/cart"
          className="flex items-center gap-2 bg-amber-600 text-white px-5 py-3.5 rounded-full shadow-2xl font-bold text-sm active:scale-95 border-2 border-white"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>ดูตะกร้าสินค้า</span>
        </Link>
      </div>
    </div>
  );
}
