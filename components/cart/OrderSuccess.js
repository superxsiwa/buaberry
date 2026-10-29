"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, CheckCircle, Copy } from "lucide-react";

export default function OrderSuccess({ orderSummary }) {
  const [copiedSummary, setCopiedSummary] = useState(false);

  const handleCopySummary = () => {
    navigator.clipboard.writeText(orderSummary);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 1800);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-sm">
        <CheckCircle className="w-11 h-11" />
      </div>
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
          Order Prepared for LINE
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-heading">
          สร้างรายการสั่งซื้อสำเร็จแล้ว!
        </h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          ขอบพระคุณที่อุดหนุน BuaBerry ครับ ระบบได้เปิดหน้าต่าง LINE เพื่อส่งรายละเอียดออเดอร์ให้ทางร้านแล้ว
          ทางร้านจะรีบตอบกลับเพื่อยืนยันออเดอร์ทันทีครับ
        </p>
      </div>

      {orderSummary && (
        <div className="bg-white p-4 rounded-2xl border border-amber-100 text-left space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500">ข้อความสรุปออเดอร์ของคุณ</span>
            <button
              type="button"
              onClick={handleCopySummary}
              className="text-xs font-bold text-amber-700 hover:underline inline-flex items-center gap-1"
            >
              {copiedSummary ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedSummary ? "คัดลอกแล้ว" : "คัดลอกข้อความ"}</span>
            </button>
          </div>
          <pre className="text-[11px] text-stone-600 whitespace-pre-wrap font-sans bg-stone-50 p-3 rounded-xl">
            {orderSummary}
          </pre>
        </div>
      )}

      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3.5 rounded-2xl text-sm shadow-md transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>กลับสู่หน้าหลัก</span>
      </Link>
    </div>
  );
}
