"use client";

import { useState } from "react";
import {
  AlertCircle,
  Check,
  Copy,
  QrCode,
  Send,
  ShieldCheck,
} from "lucide-react";

export default function CheckoutForm({
  cart,
  orderType,
  getItemPrice,
  totalPrice,
  shopInfo,
  onSubmit,
}) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [locationNote, setLocationNote] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("promptpay");
  const [formError, setFormError] = useState("");
  const [copiedPromptPay, setCopiedPromptPay] = useState(false);

  const buildPlainMessage = () => {
    let orderTypeTitle = "🌅 สั่งรับหน้าร้านรอบเช้า";
    if (orderType === "preorder") orderTypeTitle = "📅 สั่ง Pre-order / จัดเบรก";
    if (orderType === "wholesale") orderTypeTitle = "📦 สั่งราคาส่ง (B2B)";

    let text = `🥐 *ออเดอร์ใหม่จาก BuaBerry Web*\n`;
    text += `📌 *ประเภท:* ${orderTypeTitle}\n`;
    text += `👤 *ลูกค้า:* ${customerName || "ไม่ระบุ"}\n`;
    text += `📞 *เบอร์โทร:* ${customerPhone || "ไม่ระบุ"}\n`;
    if (pickupTime) text += `⏰ *เวลารับ/วันที่:* ${pickupTime}\n`;
    if (locationNote) text += `📍 *จุดรับ/สถานที่:* ${locationNote}\n`;
    text += `\n🛒 *รายการสินค้า:*\n`;

    cart.forEach((item, index) => {
      const price = getItemPrice(item);
      text += `${index + 1}. ${item.name} x${item.quantity} = ${price * item.quantity}฿\n`;
    });

    text += `\n💰 *ยอดรวมทั้งหมด:* ${totalPrice} บาท\n`;
    text += `💳 *การชำระเงิน:* ${
      paymentMethod === "promptpay"
        ? "โอนผ่าน พร้อมเพย์ (PromptPay)"
        : "ชำระเงินสดตอนรับสินค้า"
    }\n`;
    if (notes) text += `📝 *หมายเหตุ:* ${notes}\n`;
    return text;
  };

  const handleSendToLine = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      setFormError("กรุณากรอกชื่อและเบอร์โทรศัพท์สำหรับติดต่อกลับด้วยนะครับ");
      return;
    }

    setFormError("");
    onSubmit(buildPlainMessage());
  };

  const handleCopyPromptPay = () => {
    try {
      navigator.clipboard.writeText(shopInfo.promptPayNumber);
      setCopiedPromptPay(true);
      setTimeout(() => setCopiedPromptPay(false), 1800);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-xs space-y-4">
        <h3 className="font-bold text-amber-950 text-base font-heading">ข้อมูลผู้สั่งซื้อ</h3>

        {formError && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">ชื่อของคุณ *</label>
          <input
            type="text"
            placeholder="เช่น คุณก้อง, น้องพลอย"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            เบอร์โทรศัพท์ติดต่อ *
          </label>
          <input
            type="tel"
            placeholder="เช่น 081-xxx-xxxx"
            value={customerPhone}
            onChange={(event) => setCustomerPhone(event.target.value)}
            className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            เวลานัดรับ / วันที่ต้องการ
          </label>
          <input
            type="text"
            placeholder="เช่น พรุ่งนี้ 07:30 น. หรือ วันที่ 15 ต.ค."
            value={pickupTime}
            onChange={(event) => setPickupTime(event.target.value)}
            className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
          />
          <div className="flex flex-wrap gap-1.5 mt-2">
            {["06:00 น.", "07:00 น.", "08:00 น.", "พรุ่งนี้เช้า"].map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setPickupTime(slot)}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/60 cursor-pointer"
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            จุดนัดรับ / ร้านค้า / มหาวิทยาลัย
          </label>
          <input
            type="text"
            placeholder="เช่น รับหน้าร้านข้างทาง / ร้านน้ำหน้า ม. / โรงเรียน"
            value={locationNote}
            onChange={(event) => setLocationNote(event.target.value)}
            className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-700 mb-1">
            หมายเหตุเพิ่มเติม (ถ้ามี)
          </label>
          <textarea
            rows={2}
            placeholder="เช่น ไม่ใส่มายองเนส, แยกจิ๊กโฉ่ว"
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="pt-2 border-t border-stone-100">
          <label className="block text-xs font-semibold text-stone-700 mb-2">
            วิธีชำระเงิน
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPaymentMethod("promptpay")}
              className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                paymentMethod === "promptpay"
                  ? "border-amber-500 bg-amber-50 text-amber-950"
                  : "border-stone-200 text-stone-600"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <QrCode className="w-3.5 h-3.5 text-amber-600" />
                <span>พร้อมเพย์</span>
              </div>
              <span className="text-[10px] text-stone-500 block font-normal">โอนสแกน QR Code</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("cod")}
              className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                paymentMethod === "cod"
                  ? "border-amber-500 bg-amber-50 text-amber-950"
                  : "border-stone-200 text-stone-600"
              }`}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <span>💵</span>
                <span>เงินสด</span>
              </div>
              <span className="text-[10px] text-stone-500 block font-normal">ชำระตอนรับของ</span>
            </button>
          </div>

          {paymentMethod === "promptpay" && (
            <div className="mt-3 p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200/70 text-xs space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <p className="font-bold text-amber-950">พร้อมเพย์: {shopInfo.promptPayNumber}</p>
                <button
                  type="button"
                  onClick={handleCopyPromptPay}
                  className="inline-flex items-center gap-1 text-[11px] font-bold bg-white hover:bg-amber-100 text-amber-800 px-2.5 py-1 rounded-lg border border-amber-200 cursor-pointer"
                >
                  {copiedPromptPay ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span>คัดลอกแล้ว</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>คัดลอกเลข</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-amber-800">ชื่อบัญชี: {shopInfo.promptPayName}</p>
              <p className="text-[10px] text-stone-500">* สแกนจ่ายแล้วแนบสลิปในแชท LINE ได้เลยครับ</p>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleSendToLine}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-2xl text-sm shadow-lg shadow-emerald-600/20 transition-all active:scale-95 flex items-center justify-center gap-2 mt-4 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span>ส่งออเดอร์เข้า LINE ร้านทันที</span>
        </button>
        <p className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>สรุปรายการอัตโนมัติ ส่งเข้าแชท LINE ร้าน ไม่ตกหล่น</span>
        </p>
      </div>
    </div>
  );
}
