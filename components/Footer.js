"use client";

import Link from "next/link";
import { useStore } from "@/lib/StoreContext";
import { Phone, MessageCircle, MapPin, Clock, Heart, ShieldCheck, Award, Sparkles, Lock } from "lucide-react";

export default function Footer() {
  const { shopInfo } = useStore();

  return (
    <footer className="bg-stone-950 text-amber-50 pt-14 pb-12 border-t border-amber-900/40 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-10 mb-10 border-b border-stone-800/80">
          <div className="flex items-center gap-3 bg-stone-900/70 p-4 rounded-2xl border border-stone-800">
            <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">สะอาด ปลอดภัย 100%</p>
              <p className="text-xs text-stone-400">ทำสดใหม่ทุกเช้ามืด ไม่ใส่สารกันบูด</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-stone-900/70 p-4 rounded-2xl border border-stone-800">
            <Award className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">วัตถุดิบเกรดพรีเมียม</p>
              <p className="text-xs text-stone-400">เนยสดแท้ ช็อกโกแลตเข้มข้น ไส้แน่น</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-stone-900/70 p-4 rounded-2xl border border-stone-800">
            <Sparkles className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <p className="text-sm font-bold text-white">สั่งง่าย ส่งตรงเข้า LINE</p>
              <p className="text-xs text-stone-400">รับหน้าร้าน จัดเบรก และเรทส่งร้านค้า</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-2xl">🥐</span>
              <span className="text-xl font-bold text-white font-heading">{shopInfo.name}</span>
            </div>
            <p className="text-sm text-stone-300 mb-4 leading-relaxed">
              {shopInfo.slogan} คัดสรรวัตถุดิบอย่างดี สะอาด ปลอดภัย ทำสดใหม่ทุกวัน
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-amber-300 bg-stone-900 px-3 py-1.5 rounded-full border border-stone-800">
              <span>อบและนึ่งด้วยใจ</span>
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              <span>เพื่อลูกค้าทุกท่าน</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-3 font-heading">เวลาและสถานที่</h3>
            <ul className="space-y-2.5 text-sm text-stone-300">
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>หน้าร้าน: {shopInfo.morningHours}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{shopInfo.address}</span>
              </li>
              <li className="text-xs text-amber-300/90 mt-2">
                * รับทำ Pre-order จัดเบรก และส่งร้านค้าในมหาลัยและโรงเรียนตลอดทั้งวัน
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 mb-3 font-heading">ช่องทางติดต่อ</h3>
            <div className="space-y-2.5 text-sm">
              <a href={`tel:${shopInfo.phone}`} className="flex items-center gap-2 text-stone-200 hover:text-amber-300 transition-colors">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>โทร: {shopInfo.phone}</span>
              </a>
              <a href={shopInfo.lineUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-stone-200 hover:text-amber-300 transition-colors">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>LINE: {shopInfo.lineId}</span>
              </a>
              <a
                href={shopInfo.grabUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold mt-2 transition-colors"
              >
                <span>🛵 สั่งผ่าน Grab Delivery</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-2">
          <p>© {new Date().getFullYear()} {shopInfo.name}. All rights reserved.</p>
          <Link href="/admin" className="hover:text-amber-300 transition-colors inline-flex items-center gap-1 text-stone-400">
            <Lock className="w-3 h-3" /> ระบบจัดการหลังบ้าน
          </Link>
        </div>
      </div>
    </footer>
  );
}

