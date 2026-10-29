"use client";

import { Check, Save } from "lucide-react";

export default function ShopSettingsForm({
  shopForm,
  setShopForm,
  saveSuccess,
  onSubmit,
}) {
  const updateField = (field, value) => {
    setShopForm({ ...shopForm, [field]: value });
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-xs max-w-2xl">
      <form onSubmit={onSubmit} className="space-y-5">
        <h2 className="text-lg font-bold text-amber-950">ข้อมูลหน้าร้าน & ช่องทางติดต่อ</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">ชื่อร้าน</label>
            <input
              type="text"
              value={shopForm.name}
              onChange={(event) => updateField("name", event.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">เบอร์โทรศัพท์</label>
            <input
              type="text"
              value={shopForm.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">เวลารอบเช้าตรู่</label>
          <input
            type="text"
            value={shopForm.morningHours}
            onChange={(event) => updateField("morningHours", event.target.value)}
            className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-700 mb-1">
            จุดนัดรับ / ที่ตั้งร้าน
          </label>
          <input
            type="text"
            value={shopForm.address}
            onChange={(event) => updateField("address", event.target.value)}
            className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">
              LINE ID / ลิงก์ LINE
            </label>
            <input
              type="text"
              value={shopForm.lineUrl}
              onChange={(event) => updateField("lineUrl", event.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">ลิงก์ร้าน Grab</label>
            <input
              type="text"
              value={shopForm.grabUrl}
              onChange={(event) => updateField("grabUrl", event.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-stone-100">
          <h3 className="text-sm font-bold text-amber-950 mb-3">
            ข้อมูลการชำระเงิน (PromptPay)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">เบอร์พร้อมเพย์</label>
              <input
                type="text"
                value={shopForm.promptPayNumber}
                onChange={(event) => updateField("promptPayNumber", event.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">ชื่อบัญชี</label>
              <input
                type="text"
                value={shopForm.promptPayName}
                onChange={(event) => updateField("promptPayName", event.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        <div className="pt-3 flex items-center gap-3">
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-6 rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <Save className="w-4 h-4" />
            <span>บันทึกการตั้งค่า</span>
          </button>
          {saveSuccess && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <Check className="w-4 h-4" /> บันทึกสำเร็จแล้ว!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}