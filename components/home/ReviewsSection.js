import { Star } from "lucide-react";

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

export default function ReviewsSection() {
  return (
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
        {REVIEWS.map((review) => (
          <div
            key={review.name}
            className="bg-white rounded-3xl p-6 border border-amber-100/90 shadow-xs flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, index) => (
                    <Star key={index} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] font-bold bg-amber-50 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-100">
                  {review.tag}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
            </div>
            <div className="pt-3 border-t border-stone-100">
              <p className="font-bold text-sm text-amber-950 font-heading">{review.name}</p>
              <p className="text-xs text-stone-400">{review.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
