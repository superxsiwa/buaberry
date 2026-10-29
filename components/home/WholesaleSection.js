import { CheckCircle2, MessageCircle, Sparkles } from "lucide-react";

export default function WholesaleSection({ shopInfo, setOrderType }) {
  return (
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
            <p className="text-emerald-100/85 text-sm leading-relaxed">{shopInfo.wholesaleNote}</p>
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
  );
}
