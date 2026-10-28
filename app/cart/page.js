"use client";

import { useCart } from "@/lib/CartContext";
import { useStore } from "@/lib/StoreContext";
import {
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  Send,
  CheckCircle,
  QrCode,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import confetti from "canvas-confetti";

export default function CartPage() {
  const {
    cart,
    orderType,
    setOrderType,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    getItemPrice,
  } = useCart();
  const { shopInfo } = useStore();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [locationNote, setLocationNote] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("promptpay");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [copiedPromptPay, setCopiedPromptPay] = useState(false);
  const [lastOrderSummary, setLastOrderSummary] = useState("");
  const [copiedSummary, setCopiedSummary] = useState(false);

  const retailTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savedAmount = retailTotal > totalPrice ? retailTotal - totalPrice : 0;

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
    const plainText = buildPlainMessage();
    setLastOrderSummary(plainText);
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(plainText)}`;
    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (e) {
      // ignore confetti error
    }
    window.open(lineUrl, "_blank");
    setIsSubmitted(true);
    clearCart();
  };

  const handleCopyPromptPay = () => {
    try {
      navigator.clipboard.writeText(shopInfo.promptPayNumber);
      setCopiedPromptPay(true);
      setTimeout(() => setCopiedPromptPay(false), 1800);
    } catch (e) {
      console.error(e);
    }
  };


  if (isSubmitted) {
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

        {lastOrderSummary && (
          <div className="bg-white p-4 rounded-2xl border border-amber-100 text-left space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-500">ข้อความสรุปออเดอร์ของคุณ</span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(lastOrderSummary);
                  setCopiedSummary(true);
                  setTimeout(() => setCopiedSummary(false), 1800);
                }}
                className="text-xs font-bold text-amber-700 hover:underline inline-flex items-center gap-1"
              >
                {copiedSummary ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedSummary ? "คัดลอกแล้ว" : "คัดลอกข้อความ"}</span>
              </button>
            </div>
            <pre className="text-[11px] text-stone-600 whitespace-pre-wrap font-sans bg-stone-50 p-3 rounded-xl">
              {lastOrderSummary}
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

  if (cart.length === 0) {
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


  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <div className="flex items-center justify-between">
        <Link
          href="/#menu"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-900 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>เลือกเมนูเพิ่ม</span>
        </Link>
        <button
          type="button"
          onClick={clearCart}
          className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" /> ล้างตะกร้า
        </button>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            Checkout & Direct LINE Order
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-heading">
            ตะกร้าสินค้า & ยืนยันออเดอร์
          </h1>
        </div>

        <div className="inline-flex bg-white p-1 rounded-2xl border border-amber-100 shadow-2xs text-xs font-bold">
          {[
            { id: "morning", label: "🌅 รอบเช้า" },
            { id: "preorder", label: "📅 จัดเบรก" },
            { id: "wholesale", label: "📦 ราคาส่ง" },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setOrderType(m.id)}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                orderType === m.id
                  ? "bg-amber-600 text-white shadow-2xs"
                  : "text-stone-600 hover:text-amber-800"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* รายการสินค้า */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-amber-100 shadow-xs divide-y divide-stone-100">

            {cart.map((item) => {
              const price = getItemPrice(item);
              return (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                  <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                    {item.image && (item.image.startsWith("data:image") || item.image.startsWith("http") || item.image.startsWith("/")) ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <span>{item.image || "🥐"}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-amber-950 truncate">{item.name}</h4>
                    <p className="text-xs text-amber-800/80 font-medium">฿{price} / ชิ้น</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 rounded-lg border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-50"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 rounded-lg border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-50"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-stone-400 hover:text-rose-500 p-1 ml-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* สรุปยอดเงิน */}
          <div className="bg-gradient-to-r from-amber-50 via-orange-50/60 to-amber-50 rounded-3xl p-5 border border-amber-200/70 space-y-2">
            {savedAmount > 0 && (
              <div className="flex items-center justify-between text-xs font-bold text-emerald-700 bg-emerald-50/90 px-3 py-1.5 rounded-xl border border-emerald-200/60">
                <span className="inline-flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> ส่วนลดเรทราคาส่ง (B2B)
                </span>
                <span>ประหยัดไป ฿{savedAmount}</span>
              </div>
            )}
            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-xs text-stone-500 font-medium">จำนวนทั้งหมด {totalItems} ชิ้น</span>
                <p className="text-base font-extrabold text-amber-950 font-heading">ยอดชำระสุทธิ</p>
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-800 font-heading">฿{totalPrice}</span>
            </div>
          </div>
        </div>

        {/* ฟอร์มข้อมูลลูกค้า & ช่องทางชำระเงิน */}
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
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                ชื่อของคุณ *
              </label>
              <input
                type="text"
                placeholder="เช่น คุณก้อง, น้องพลอย"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
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
                onChange={(e) => setCustomerPhone(e.target.value)}
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
                onChange={(e) => setPickupTime(e.target.value)}
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
                onChange={(e) => setLocationNote(e.target.value)}
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
                onChange={(e) => setNotes(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            {/* วิธีการชำระเงิน */}
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

              {/* ข้อมูลโอน PromptPay */}
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

            {/* ปุ่มกดส่งออเดอร์เข้า LINE ร้าน */}
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
      </div>
    </div>
  );
}

