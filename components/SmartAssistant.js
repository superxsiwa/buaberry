"use client";

import { useState, useRef, useEffect } from "react";
import { useStore } from "@/lib/StoreContext";
import { useCart } from "@/lib/CartContext";
import {
  MessageSquare,
  X,
  Sparkles,
  Send,
  Plus,
  Check,
  Phone,
  MessageCircle,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

export default function SmartAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const { products, shopInfo } = useStore();
  const { addToCart } = useCart();
  const [addedItem, setAddedItem] = useState(null);

  // ข้อความในแชทเริ่มต้น
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: `สวัสดีครับ! ผมคือ "น้องบัว" 🥐 ผู้ช่วยดูแลความอร่อยประจำร้าน วันนี้อยากทานอะไร หรืออยากให้ช่วยแนะนำเซ็ตไหน ถามผมได้เลยนะครับ!`,
    },
  ]);

  const chatEndRef = useRef(null);

  // เลื่อนหน้าต่างแชทลงล่างสุดอัตโนมัติ
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // ตัวเลือกคำถามยอดฮิต (Quick Prompts)
  const quickPrompts = [
    { label: "🥪 เช้าเร่งด่วน งบไม่เกิน 50.-", query: "เช้าเร่งด่วน งบ 50" },
    { label: "☕ ของหวานทานคู่กาแฟ", query: "ของหวาน กาแฟ" },
    { label: "🥟 ติ่มซำ ซาลาเปาร้อนๆ", query: "ติ่มซำ ซาลาเปา" },
    { label: "📦 อยากจัดเซ็ตเบรกประชุม", query: "จัดเบรก" },
    { label: "🏪 สนใจรับไปขายราคาส่ง", query: "ราคาส่ง" },
    { label: "⏰ รอบเช้าแวะรับกี่โมง?", query: "เวลาเปิด" },
  ];

  // ฟังก์ชันวิเคราะห์และตอบคำถามอย่างชาญฉลาด (Smart Matcher)
  const handleBotResponse = (userText) => {
    const text = userText.toLowerCase();
    let replyText = "";
    let recommendedProducts = [];

    // 1. งบไม่เกิน 50 หรือเช้าเร่งด่วน
    if (text.includes("50") || text.includes("งบ") || text.includes("เช้าเร่งด่วน") || text.includes("เช้า")) {
      recommendedProducts = products.filter(
        (p) => !p.isOutOfStock && p.price <= 50 && (p.isMorningItem || p.category === "sandwich" || p.category === "dimsum")
      );
      replyText = `สำหรับมื้อเช้าเร็วๆ งบสบายกระเป๋า น้องบัวขอแนะนำเมนูนี้เลยครับ ไส้แน่น นึ่งสด อิ่มคุ้มพร้อมเริ่มวันใหม่ทันที!`;
    }
    // 2. ของหวาน / กาแฟ / บราวนี่ / เค้กกล้วยหอม
    else if (text.includes("ของหวาน") || text.includes("กาแฟ") || text.includes("เค้ก") || text.includes("บราวนี่") || text.includes("กล้วย")) {
      recommendedProducts = products.filter(
        (p) => !p.isOutOfStock && (p.category === "banana-cake" || p.category === "brownie" || p.category === "bakery")
      );
      replyText = `ถ้าทานคู่กาแฟหรืออยากได้ของหวานยามบ่าย เมนูเบเกอรีโฮมเมดสูตรหวานน้อยของร้านเราเหมาะมากครับ นุ่มฉ่ำ ละมุนลิ้นสุดๆ!`;
    }
    // 3. ติ่มซำ / ซาลาเปา / ขนมจีบ
    else if (text.includes("ติ่มซำ") || text.includes("ซาลาเปา") || text.includes("ขนมจีบ")) {
      recommendedProducts = products.filter(
        (p) => !p.isOutOfStock && p.category === "dimsum"
      );
      replyText = `ติ่มซำนึ่งสดใหม่ๆ หมูแน่น กุ้งเด้ง แป้งนุ่มฟู แนะนำเมนูเหล่านี้เลยครับ:`;
    }
    // 4. แซนวิช
    else if (text.includes("แซนวิช") || text.includes("sandwich")) {
      recommendedProducts = products.filter(
        (p) => !p.isOutOfStock && p.category === "sandwich"
      );
      replyText = `แซนวิชโบราณน้ำสลัดฉ่ำๆ หรือแซนวิชไข่ดาวแฮมชีส ไส้แน่นสะใจทุกชิ้นครับ:`;
    }
    // 5. จัดเบรก / สัมมนา / ประชุม
    else if (text.includes("จัดเบรก") || text.includes("ประชุม") || text.includes("สัมมนา") || text.includes("เลี้ยง")) {
      recommendedProducts = products.filter(
        (p) => !p.isOutOfStock && (p.category === "banana-cake" || p.category === "brownie" || p.category === "bakery")
      );
      replyText = `สำหรับงานจัดเบรกหรือประชุม ทางร้านรับสั่งทำ Pre-order ล่วงหน้า 1-2 วันครับ นิยมจัดเป็นเซ็ตเค้กกล้วยหอม + บราวนี่ หรือแซนวิชครับ สามารถทัก LINE ร้านเพื่อคุยจัดกล่องพิเศษได้เลยนะครับ!`;
    }
    // 6. ราคาส่ง / B2B / รับไปขาย
    else if (text.includes("ส่ง") || text.includes("ราคาส่ง") || text.includes("โรงเรียน") || text.includes("มหาลัย") || text.includes("ร้านน้ำ")) {
      recommendedProducts = products.filter(
        (p) => !p.isOutOfStock && p.wholesalePrice
      ).slice(0, 3);
      replyText = `เรามีเรทราคาส่งพิเศษสำหรับโรงเรียน มหาวิทยาลัย และร้านค้า/ร้านขายน้ำครับ ขั้นต่ำเริ่มต้นเพียง 10-15 ชิ้นเท่านั้น มีรอบส่งตรงเวลา กำไรดีมากๆ เลยครับ!`;
    }
    // 7. เวลา / สถานที่ / ติดต่อ
    else if (text.includes("เวลา") || text.includes("กี่โมง") || text.includes("เปิด") || text.includes("ที่ไหน") || text.includes("อยู่ไหน")) {
      replyText = `ร้านเปิดรอบเช้าตรู่เวลา ${shopInfo.morningHours} ที่จุดนัดรับ: ${shopInfo.address} ครับ หรือถ้าเป็น Pre-order/จัดเบรก สั่งล่วงหน้าได้ตลอดเวลาเลยครับ`;
    }
    // กรณีอื่นๆ: ค้นหาจากชื่อสินค้าหรือคีย์เวิร์ด
    else {
      recommendedProducts = products.filter(
        (p) =>
          !p.isOutOfStock &&
          (p.name.toLowerCase().includes(text) ||
            p.desc.toLowerCase().includes(text) ||
            p.category.toLowerCase().includes(text))
      );

      if (recommendedProducts.length > 0) {
        replyText = `น้องบัวพบเมนูที่น่าจะตรงใจคุณลูกค้าตามนี้ครับ:`;
      } else {
        replyText = `น้องบัวยังไม่แน่ใจในเมนูนี้ แต่คุณลูกค้าสามารถเลือกดูเมนูทั้งหมด หรือแอดไลน์คุยกับพี่เจ้าของร้านโดยตรงได้เลยนะครับ 😊`;
      }
    }

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: "ai",
        text: replyText,
        products: recommendedProducts.slice(0, 3), // แนะนำสูงสุด 3 รายการ
      },
    ]);
  };

  const handleSend = (e) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setInput("");

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "user", text: userText },
    ]);

    setTimeout(() => {
      handleBotResponse(userText);
    }, 400);
  };

  const handleQuickClick = (query) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: "user", text: query },
    ]);
    setTimeout(() => {
      handleBotResponse(query);
    }, 400);
  };

  const handleAddToCartFromBot = (product) => {
    addToCart(product, 1);
    setAddedItem(product.id);
    setTimeout(() => setAddedItem(null), 1200);
  };

  return (
    <>
      {/* ปุ่มกดเปิดแชทมุมขวาล่าง */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 md:bottom-6 right-4 z-40 bg-gradient-to-tr from-amber-600 to-orange-500 hover:from-amber-700 hover:to-orange-600 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-2xl flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 group border-2 border-white/80 cursor-pointer"
        >
          <div className="relative">
            <span className="text-xl">🥐</span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full"></span>
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold leading-tight">น้องบัว 🥐</p>
            <p className="text-[10px] text-amber-100/90">แนะนำเมนู & จัดเบรก</p>
          </div>
        </button>
      )}

      {/* หน้าต่างกล่องแชท AI */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[92vw] sm:w-[380px] h-[540px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-amber-200/80 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-500 text-white p-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-xl shadow-inner">
                🥐
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight flex items-center gap-1.5">
                  น้องบัว
                  <span className="text-[10px] bg-emerald-500/80 text-white px-1.5 py-0.2 rounded-full font-normal">
                    ออนไลน์
                  </span>
                </h3>
                <p className="text-[11px] text-amber-100">AI ผู้ช่วยแนะนำความอร่อย</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 hover:bg-white/20 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* รายการข้อความในแชท */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-stone-50/50 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-amber-600 text-white rounded-br-xs shadow-xs"
                      : "bg-white text-stone-800 rounded-bl-xs border border-amber-100 shadow-xs"
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* การ์ดสินค้าแนะนำในแชท (ถ้ามี) */}
                  {msg.products && msg.products.length > 0 && (
                    <div className="mt-3 space-y-2 border-t border-amber-50 pt-2.5">
                      <p className="text-[11px] font-bold text-amber-900">
                        ✨ เมนูแนะนำสำหรับคุณ:
                      </p>
                      {msg.products.map((p) => (
                        <div
                          key={p.id}
                          className="bg-amber-50/60 rounded-xl p-2 flex items-center justify-between gap-2 border border-amber-200/50"
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 overflow-hidden border border-amber-200/60 shadow-2xs">
                              {p.image &&
                              (p.image.startsWith("data:image") ||
                                p.image.startsWith("http") ||
                                p.image.startsWith("/")) ? (
                                <img
                                  src={p.image}
                                  alt={p.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <span className="text-base">{p.image || "🥐"}</span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-amber-950 truncate text-[11px]">
                                {p.name}
                              </p>
                              <p className="text-[10px] text-amber-800 font-semibold">
                                ฿{p.price}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleAddToCartFromBot(p)}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 transition-all shrink-0 cursor-pointer ${
                              addedItem === p.id
                                ? "bg-emerald-600 text-white"
                                : "bg-amber-600 hover:bg-amber-700 text-white"
                            }`}
                          >
                            {addedItem === p.id ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>ใส่แล้ว</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3 h-3" />
                                <span>ใส่ตะกร้า</span>
                              </>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Prompts (ทางลัดยอดฮิต) */}
          <div className="p-2 bg-white border-t border-stone-100 overflow-x-auto whitespace-nowrap flex gap-1.5 scrollbar-none">
            {quickPrompts.map((qp, index) => (
              <button
                key={index}
                onClick={() => handleQuickClick(qp.query)}
                className="px-2.5 py-1 rounded-full text-[11px] bg-amber-50 hover:bg-amber-100 text-amber-900 font-medium border border-amber-200/60 transition-colors shrink-0 cursor-pointer"
              >
                {qp.label}
              </button>
            ))}
          </div>

          {/* ช่องพิมพ์ข้อความ */}
          <form
            onSubmit={handleSend}
            className="p-2.5 bg-white border-t border-stone-100 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="พิมพ์ถามน้องบัวเบอร์รี่ได้เลย..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 bg-stone-50/50"
            />
            <button
              type="submit"
              className="p-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl transition-all shadow-xs shrink-0 cursor-pointer active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}

