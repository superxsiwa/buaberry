"use client";

import { useCart } from "@/lib/CartContext";
import { SHOP_INFO } from "@/lib/products";
import { Trash2, Plus, Minus, ArrowLeft, Send, CheckCircle, Clock, Calendar, Store, QrCode } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const { cart, orderType, updateQuantity, removeFromCart, clearCart, totalItems, totalPrice, getItemPrice } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [locationNote, setLocationNote] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("promptpay"); // promptpay or cod
  const [isSubmitted, setIsSubmitted] = useState(false);

  // สรุปข้อความสำหรับส่งผ่าน LINE
  const generateLineMessage = () => {
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
    text += `💳 *การชำระเงิน:* ${paymentMethod === "promptpay" ? "โอนผ่าน พร้อมเพย์ (PromptPay)" : "ชำระเงินสดตอนรับสินค้า"}\n`;
    if (notes) text += `📝 *หมายเหตุ:* ${notes}\n`;

    return encodeURIComponent(text);
  };

  const handleSendToLine = () => {
    if (!customerName || !customerPhone) {
      alert("กรุณากรอกชื่อและเบอร์โทรศัพท์สำหรับติดต่อกลับด้วยนะครับ");
      return;
    }
    const msg = generateLineMessage();
    // ลิงก์ไปยัง LINE ร้าน พร้อมใส่ข้อความส่งเลย
    const lineUrl = `https://line.me/R/msg/text/?${msg}`;
    window.open(lineUrl, "_blank");
    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-amber-950">ส่งข้อมูลออเดอร์เรียบร้อยแล้ว!</h2>
        <p className="text-sm text-stone-600 leading-relaxed">
          ขอบพระคุณที่อุดหนุน BuaBerry ครับ ระบบได้นำคุณไปยัง LINE ร้านเพื่อส่งรายละเอียดแล้ว 
          ทางร้านจะรีบตอบกลับเพื่อยืนยันออเดอร์และเตรียมความอร่อยให้ทันทีครับ
        </p>
        <Link
          href="/"
          className="inline-block bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-2xl text-sm transition-all"
        >
          กลับสู่หน้าหลัก
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="text-6xl">🧺</div>
        <h2 className="text-2xl font-bold text-amber-950">ยังไม่มีสินค้าในตะกร้า</h2>
        <p className="text-sm text-stone-500">เลือกดูแซนวิช ขนมจีบ ซาลาเปา หรือเบเกอรี่อร่อยๆ ได้เลย</p>
        <Link
          href="/#menu"
          className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-2xl text-sm transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ไปเลือกดูเมนู</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>เลือกสินค้าเพิ่ม</span>
        </Link>
        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" /> ล้างตะกร้า
        </button>
      </div>

      <h1 className="text-2xl sm:text-3xl font-black text-amber-950">ตะกร้าสินค้า & สั่งซื้อ</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {/* รายการสินค้า */}
        <div className="md:col-span-3 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-amber-100 shadow-xs divide-y divide-amber-50">
            {cart.map((item) => {
              const price = getItemPrice(item);
              return (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-4">
                  <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                    {item.image}
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
          <div className="bg-amber-50/60 rounded-2xl p-4 border border-amber-200/60 flex items-center justify-between">
            <div>
              <span className="text-xs text-amber-800">จำนวนทั้งหมด {totalItems} ชิ้น</span>
              <p className="text-base font-bold text-amber-950">ยอดชำระสุทธิ</p>
            </div>
            <span className="text-2xl font-black text-amber-700">฿{totalPrice}</span>
          </div>
        </div>

        {/* ฟอร์มข้อมูลลูกค้า & ช่องทางชำระเงิน */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-xs space-y-4">
            <h3 className="font-bold text-amber-950 text-base">ข้อมูลผู้สั่งซื้อ</h3>

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
                <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-xs space-y-1">
                  <p className="font-bold text-amber-900">พร้อมเพย์ร้าน: {SHOP_INFO.promptPayNumber}</p>
                  <p className="text-[11px] text-amber-800">ชื่อบัญชี: {SHOP_INFO.promptPayName}</p>
                  <p className="text-[10px] text-stone-500">* สแกนจ่ายแล้วแนบสลิปในแชท LINE ได้เลยครับ</p>
                </div>
              )}
            </div>

            {/* ปุ่มกดส่งออเดอร์เข้า LINE ร้าน */}
            <button
              onClick={handleSendToLine}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-2xl text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
            >
              <Send className="w-4 h-4" />
              <span>ส่งออเดอร์เข้า LINE ร้าน</span>
            </button>
            <p className="text-[11px] text-stone-400 text-center">
              กดแล้วระบบจะสรุปรายการส่งเข้าแชท LINE ของร้านทันที สะดวก รวดเร็ว ไม่ตกหล่น
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

