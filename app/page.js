"use client";

import { useState } from "react";
import OrderTypeSelector from "@/components/OrderTypeSelector";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES } from "@/lib/products";
import { useCart } from "@/lib/CartContext";
import { useStore } from "@/lib/StoreContext";
import {
  Phone,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Search,
  Star,
  ShieldCheck,
  Award,
  Clock,
  MapPin,
  X,
} from "lucide-react";
import Link from "next/link";

const REVIEWS = [
  {
    name: "คุณเมย์ (พนักงานออฟฟิศ)",
    role: "ลูกค้าประจำรอบเช้า",
    text: "แวะรับแซนวิชโบราณกับขนมจีบกุ้งตอน 6 โมงเช้าทุกวัน ไส้แน่นมาก น้ำสลัดกลมกล่อม สั่งไลน์ไว้ก่อนขับรถโฉบรับได้เลย ประหยัดเวลาสุดๆ ค่ะ",
    tag: "🌅 รอบเช้าตรู่",
  },
  {
    name: "คุณวิทยา (ฝ่ายจัดซื้อองค์กร)",
    role: "สั่งชุดจัดเบรกสัมมนา 120 กล่อง",
    text: "เค้กกล้วยหอมครีมชีสและบราวนี่ของ BuaBerry เนื้อฉ่ำ หอมเนยแท้ ไม่หวานเลี่ยน ผู้บริหารและผู้เข้าประชุมชมทุกครั้ง แพ็กเกจสะอาดดูดีมากครับ",
    tag: "📅 จัดเบรกประชุม",
  },
  {
    name: "ร้านละมุน คาเฟ่ (หน้ามหาวิทยาลัย)",
    role: "พาร์ทเนอร์รับราคาส่ง B2B",
    text: "รับมินิบราวนี่และเค้กกล้วยหอมมาวางคู่กาแฟที่ร้าน ขายหมดไวมาก ต้นทุนเรทส่งคุ้มค่า กำไรดี ขั้นต่ำไม่สูง เจ้าของร้านดูแลดีมากครับ",
    tag: "📦 ลูกค้าเรทส่ง",
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { orderType, setOrderType, totalItems, totalPrice } = useCart();
  const { products, shopInfo, isOpen } = useStore();

  const filteredProducts = products.filter((item) => {
    const matchCategory = selectedCategory === "all" || item.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchSearch =
      !q ||
      item.name.toLowerCase().includes(q) ||
      (item.desc && item.desc.toLowerCase().includes(q)) ||
      (item.tags && item.tags.some((t) => t.toLowerCase().includes(q)));
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      {!isOpen && (
        <div className="bg-rose-600 text-white text-xs sm:text-sm py-3 px-4 text-center font-bold flex items-center justify-center gap-2 shadow-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>ขณะนี้ร้านปิดรับออเดอร์ชั่วคราว แต่สามารถเลือกชมเมนูและสั่งล่วงหน้าได้ครับ</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-amber-100/50 via-amber-50/30 to-transparent pt-10 pb-6 sm:py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="lg:w-7/12 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/90 border border-amber-200/80 text-amber-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Artisan Homemade • อบและนึ่งสดใหม่ทุกเช้ามืด</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-amber-950 tracking-tight leading-tight font-heading">
              มื้อเช้าแสนอร่อย & <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">
                เบเกอรีโฮมเมดนุ่มฉ่ำ
              </span>{" "}
              ทำด้วยใจทุกชิ้น
            </h1>

            <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto lg:mx-0 leading-relaxed">
              เสิร์ฟความอร่อยรอบเช้าตรู่ <strong className="text-amber-950">{shopInfo.morningHours}</strong>{" "}
              ทั้งแซนวิชไส้ทะลัก ขนมจีบซาลาเปานึ่งสด เค้กกล้วยหอมทอง และฟัดจ์บราวนี่หน้าฟิล์ม
              พร้อมรับจัดเบรกสัมมนาและส่งร้านค้าราคาพิเศษ
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
                href={shopInfo.lineUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-sm transition-all active:scale-95 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>แอดไลน์ร้าน</span>
              </a>

              <a
                href={shopInfo.grabUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-stone-800 hover:bg-stone-900 text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-sm transition-all active:scale-95 flex items-center gap-2"
              >
                <span>🛵 สั่ง Grab</span>
              </a>
            </div>
            {/* Trust Metrics */}
            <div className="pt-4 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 border-t border-amber-200/60">
              <div>
                <div className="flex items-center justify-center lg:justify-start gap-1 text-amber-700 font-extrabold text-base sm:text-lg font-heading">
                  <span>4.9/5</span>
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                </div>
                <p className="text-[11px] text-stone-500 font-medium">ลูกค้าซื้อซ้ำสูงสุด</p>
              </div>
              <div>
                <p className="text-amber-950 font-extrabold text-base sm:text-lg font-heading">เนยสดแท้ 100%</p>
                <p className="text-[11px] text-stone-500 font-medium">ไร้สารกันบูด</p>
              </div>
              <div>
                <p className="text-emerald-700 font-extrabold text-base sm:text-lg font-heading">3 โหมดสะดวก</p>
                <p className="text-[11px] text-stone-500 font-medium">รอบเช้า • จัดเบรก • ส่ง</p>
              </div>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="lg:w-5/12 w-full max-w-md">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-100/90 shadow-[0_20px_50px_-15px_rgba(120,53,15,0.14)] space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                  BuaBerry Highlights
                </span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${
                    isOpen ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                  }`}
                >
                  {isOpen ? "เปิดรับออเดอร์" : "ปิดรับชั่วคราว"}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-amber-50/70 border border-amber-100/70">
                  <span className="text-2xl bg-white w-11 h-11 rounded-xl flex items-center justify-center shadow-2xs shrink-0">🥪</span>
                  <div className="text-xs">
                    <p className="font-bold text-amber-950">รอบหน้าร้าน {shopInfo.morningHours}</p>
                    <p className="text-stone-500">แซนวิชไส้ทะลัก ซาลาเปา ขนมจีบร้อนๆ</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-orange-50/70 border border-orange-100/70">
                  <span className="text-2xl bg-white w-11 h-11 rounded-xl flex items-center justify-center shadow-2xs shrink-0">🍌</span>
                  <div className="text-xs">
                    <p className="font-bold text-orange-950">เค้กกล้วยหอม & บราวนี่หน้าฟิล์ม</p>
                    <p className="text-stone-500">หวานน้อย เนื้อฉ่ำ จัดเบรกประชุมยอดฮิต</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100/70">
                  <span className="text-2xl bg-white w-11 h-11 rounded-xl flex items-center justify-center shadow-2xs shrink-0">🏪</span>
                  <div className="text-xs">
                    <p className="font-bold text-emerald-950">ราคาส่ง โรงเรียน / มหาลัย</p>
                    <p className="text-stone-500">ขั้นต่ำน้อย กำไรดี มีบริการส่งถึงที่</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 text-center border-t border-stone-100">
                <span className="text-xs text-stone-600 font-medium">📍 {shopInfo.address}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* กล่องเลือกโหมดการสั่งซื้อ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <OrderTypeSelector />
      </section>

      {/* เมนูอาหารและหมวดหมู่ */}
      <section id="menu" className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-600 tracking-wider uppercase">
              Freshly Prepared Menu
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-heading">
              เมนูความอร่อยของ {shopInfo.name}
            </h2>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาเมนู เช่น แซนวิช, บราวนี่..."
              className="w-full pl-9 pr-8 py-2.5 bg-white rounded-2xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 shadow-2xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
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

      {/* มาตรฐานโฮมเมด & ความน่าเชื่อถือ (Quality & Trust Signals) */}
      <section id="quality" className="max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-24">
        <div className="bg-gradient-to-br from-amber-50/90 via-white to-orange-50/50 rounded-3xl p-6 sm:p-10 border border-amber-100/90 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Our Homemade Promise
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-heading">
              ทำไมลูกค้าถึงมั่นใจในความอร่อยของ BuaBerry
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              เราใส่ใจในทุกขั้นตอนตั้งแต่การคัดเลือกวัตถุดิบจนถึงมือคุณ เพื่อให้ได้รสชาติโฮมเมดแท้ที่ทั้งอร่อยและดีต่อสุขภาพ
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="bg-white p-6 rounded-2xl border border-amber-100/80 shadow-2xs space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-amber-950 font-heading">วัตถุดิบคัดเกรดพรีเมียม</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                ใช้เนยสดแท้ 100% ช็อกโกแลตเข้มข้น 70% และกล้วยหอมทองสุกธรรมชาติ ไม่ใช้มาการีนและไม่แต่งกลิ่นสังเคราะห์
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-amber-100/80 shadow-2xs space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-amber-950 font-heading">อบและนึ่งสดใหม่ทุกเช้ามืด</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                เตรียมวัตถุดิบและนึ่งขนมจีบ-ซาลาเปาสดใหม่ทุกวันตั้งแต่เช้ามืด เพื่อให้ลูกค้ารอบเช้าได้ทานของร้อนๆ ออกจากเตา
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-amber-100/80 shadow-2xs space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-base text-amber-950 font-heading">สะอาด ปลอดภัย พร้อมเสิร์ฟ</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                บรรจุในแพ็กเกจจิ้งสะอาด มิดชิด สวยงาม เหมาะทั้งถือทานบนรถ จัดชุดเบรกผู้บริหาร หรือวางขายหน้าร้านกาแฟ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ส่วนขายส่ง & แนะนำร้านค้า (B2B Section) */}
      <section id="wholesale" className="max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-24">
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <span className="inline-block bg-emerald-500/25 text-emerald-300 text-xs font-bold px-3.5 py-1 rounded-full border border-emerald-400/30">
                📦 พาร์ทเนอร์ร้านค้า & สหกรณ์ (B2B Wholesale)
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight text-white font-heading">
                รับส่งร้านค้าในมหาวิทยาลัย โรงเรียน และร้านกาแฟ
              </h3>
              <p className="text-emerald-100/85 text-sm leading-relaxed">
                {shopInfo.wholesaleNote}
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs sm:text-sm text-emerald-200 pt-1">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>ขั้นต่ำเริ่มเพียง 5-15 ชิ้น</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>กำไรต่อชิ้นคุ้มค่า ขายออกไว</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>แพ็กเกจพร้อมวางขายทันที</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <a
                href="#menu"
                onClick={() => setOrderType("wholesale")}
                className="bg-white hover:bg-amber-50 text-emerald-950 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>กดดูเมนูเรทราคาส่งทันที</span>
              </a>
              <a
                href={shopInfo.lineUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>ทักไลน์ปรึกษาเรทส่ง</span>
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* รีวิวจากลูกค้าจริง (Social Proof) */}
      <section id="reviews" className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Customer Love & Social Proof
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-heading">
            เสียงตอบรับจากลูกค้าและร้านค้าพันธมิตร
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            ความประทับใจจากลูกค้าที่แวะรับมื้อเช้า สั่งจัดเบรกประชุม และรับไปวางจำหน่ายหน้าร้าน
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((rv, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-amber-100/90 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-bold bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-100">
                    {rv.tag}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  &ldquo;{rv.text}&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-stone-100">
                <p className="font-bold text-sm text-amber-950 font-heading">{rv.name}</p>
                <p className="text-xs text-stone-400">{rv.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* จุดนัดรับ & ติดต่อร้าน (#contact) */}
      <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-24">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100/90 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Pickup & Contact
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-amber-950 font-heading">
              แวะรับความอร่อยรอบเช้า หรือสั่งล่วงหน้าได้ทุกวัน
            </h3>
            <p className="text-xs sm:text-sm text-stone-600">
              📍 {shopInfo.address} • เวลา {shopInfo.morningHours}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={shopInfo.lineUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>LINE: {shopInfo.lineId}</span>
            </a>
            <a
              href={`tel:${shopInfo.phone}`}
              className="bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-600" />
              <span>โทร: {shopInfo.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Floating Cart Bar บนมือถือ */}
      {totalItems > 0 && (
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
      )}
    </div>
  );
}
