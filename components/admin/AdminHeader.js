"use client";

import { Download, Store, Unlock } from "lucide-react";

export default function AdminHeader({ isOpen, onToggleStore, onExportData, onLogout }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-amber-100 shadow-xs">
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xl">🥐</span>
          <h1 className="text-2xl font-black text-amber-950">แผงควบคุมร้าน BuaBerry</h1>
        </div>
        <p className="text-xs text-stone-500 mt-0.5">
          จัดการสต็อกสินค้า ปรับราคา เปิด-ปิดร้าน และแก้ไขข้อมูลติดต่อ
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          onClick={onToggleStore}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            isOpen
              ? "bg-emerald-500 hover:bg-emerald-600 text-white"
              : "bg-rose-500 hover:bg-rose-600 text-white"
          }`}
        >
          <Store className="w-4 h-4" />
          <span>{isOpen ? "ร้านเปิดรับออเดอร์" : "ร้านปิดรับชั่วคราว"}</span>
        </button>

        <button
          type="button"
          onClick={onExportData}
          title="ดาวน์โหลดไฟล์ข้อมูล"
          className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-medium flex items-center gap-1"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">สำรองข้อมูล</span>
        </button>

        <button
          type="button"
          onClick={onLogout}
          className="p-2 bg-stone-100 hover:bg-rose-50 hover:text-rose-600 text-stone-600 rounded-xl text-xs font-medium"
          title="ออกจากระบบ"
        >
          <Unlock className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}