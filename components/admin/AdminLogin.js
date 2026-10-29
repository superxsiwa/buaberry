"use client";

import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

export default function AdminLogin({ pin, setPin, pinError, onSubmit }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-3xl border border-amber-100 shadow-xl max-w-sm w-full text-center space-y-6">
        <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto text-2xl shadow-inner">
          <Lock className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-xl font-black text-amber-950">ระบบจัดการหลังบ้าน</h1>
          <p className="text-xs text-stone-500 mt-1">
            BuaBerry Admin (ใส่รหัส PIN เพื่อเข้าใช้งาน)
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              maxLength={6}
              placeholder="รหัส PIN (เริ่มต้น: 8888)"
              value={pin}
              onChange={(event) => setPin(event.target.value)}
              className="w-full text-center text-lg tracking-widest font-bold py-3 px-4 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
            />
            {pinError && (
              <p className="text-xs text-rose-500 font-semibold mt-2">
                รหัส PIN ไม่ถูกต้อง (ลองใส่ 8888)
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-md active:scale-95"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-600"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>กลับสู่หน้าเว็บหลัก</span>
        </Link>
      </div>
    </div>
  );
}