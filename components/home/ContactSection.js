import { MessageCircle, Phone } from "lucide-react";

export default function ContactSection({ shopInfo }) {
  return (
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
  );
}
