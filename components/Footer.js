"use client";

import { useStore } from "@/lib/StoreContext";
import { Phone, MessageCircle, MapPin, Clock, Heart } from "lucide-react";

export default function Footer() {
  const { shopInfo } = useStore();

  return (
    <footer className="bg-amber-950 text-amber-100 py-12 border-t border-amber-900 mt-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">🥐</span>
            <span className="text-xl font-bold text-amber-300">{shopInfo.name}</span>
          </div>
          <p className="text-sm text-amber-200/80 mb-4 leading-relaxed">
            {shopInfo.slogan} คัดสรรวัตถุดิบอย่างดี สะอาด ปลอดภัย ทำสดใหม่ทุกวัน
          </p>
          <div className="flex items-center gap-2 text-xs text-amber-300/80">
            <span>ทำด้วยใจ</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>เพื่อลูกค้าทุกท่าน</span>
          </div>
        </div>

        <div>
          <h3 className="text-base font-bold text-amber-300 mb-3">เวลาและสถานที่</h3>
          <ul className="space-y-2 text-sm text-amber-200/80">
            <li className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>หน้าร้าน: {shopInfo.morningHours}</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{shopInfo.address}</span>
            </li>
            <li className="text-xs text-amber-400 mt-2">
              * รับทำ Pre-order / ส่งร้านค้าในมหาลัยและโรงเรียนตลอดทั้งวัน
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-bold text-amber-300 mb-3">ช่องทางติดต่อ</h3>
          <div className="space-y-2.5 text-sm">
            <a
              href={`tel:${shopInfo.phone}`}
              className="flex items-center gap-2 text-amber-200/80 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>โทร: {shopInfo.phone}</span>
            </a>
            <a
              href={shopInfo.lineUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-amber-200/80 hover:text-amber-300 transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>LINE: {shopInfo.lineId}</span>
            </a>
            <a
              href={shopInfo.grabUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold mt-2 transition-colors"
            >
              <span>🛵 สั่งผ่าน Grab Delivery</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 pt-6 border-t border-amber-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-amber-400/60 gap-2">
        <p>© {new Date().getFullYear()} {shopInfo.name}. All rights reserved.</p>
        <a href="/admin" className="hover:text-amber-300 transition-colors flex items-center gap-1 opacity-70 hover:opacity-100">
          🔒 ระบบจัดการหลังบ้าน
        </a>
      </div>
    </footer>
  );
}

