import {
  AlertCircle,
  MessageCircle,
  ShoppingBag,
  Sparkles,
  Star,
} from "lucide-react";

export default function HeroSection({ shopInfo, isOpen }) {
  return (
    <>
      {!isOpen && (
        <div className="bg-rose-600 text-white text-xs sm:text-sm py-3 px-4 text-center font-bold flex items-center justify-center gap-2 shadow-xs">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>ขณะนี้ร้านปิดรับออเดอร์ชั่วคราว แต่สามารถเลือกชมเมนูและสั่งล่วงหน้าได้ครับ</span>
        </div>
      )}

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
              เสิร์ฟความอร่อยรอบเช้าตรู่{" "}
              <strong className="text-amber-950">{shopInfo.morningHours}</strong>{" "}
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
    </>
  );
}
