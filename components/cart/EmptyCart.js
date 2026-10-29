import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EmptyCart() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-5">
      <div className="w-20 h-20 rounded-3xl bg-amber-50 border border-amber-100 flex items-center justify-center text-4xl mx-auto">
        🧺
      </div>
      <h2 className="text-2xl font-extrabold text-amber-950 font-heading">ยังไม่มีสินค้าในตะกร้า</h2>
      <p className="text-sm text-stone-500">
        เลือกชมแซนวิชไส้แน่น ขนมจีบซาลาเปานึ่งสด หรือเบเกอรีโฮมเมดอร่อยๆ ได้ที่หน้าเมนูครับ
      </p>
      <Link
        href="/#menu"
        className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3.5 rounded-2xl text-sm shadow-md transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>ไปเลือกดูเมนูความอร่อย</span>
      </Link>
    </div>
  );
}
