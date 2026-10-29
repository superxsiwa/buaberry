import { Award, Clock, ShieldCheck } from "lucide-react";

export default function QualitySection() {
  return (
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
  );
}
