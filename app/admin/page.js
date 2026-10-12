"use client";

import { useState } from "react";
import { useStore } from "@/lib/StoreContext";
import { CATEGORIES } from "@/lib/products";
import {
  Lock,
  Unlock,
  Store,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  RotateCcw,
  Save,
  Download,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const {
    products,
    shopInfo,
    isOpen,
    toggleProductStock,
    saveProduct,
    deleteProduct,
    updateShopInfo,
    toggleStoreOpen,
    resetToDefault,
  } = useStore();

  // รหัสผ่านเข้าหลังบ้าน (Default: 8888)
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);

  // แท็บปัจจุบัน (products หรือ settings)
  const [activeTab, setActiveTab] = useState("products");

  // State สำหรับ Modal เพิ่ม/แก้ไขสินค้า
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State สำหรับฟอร์มร้านค้า
  const [shopForm, setShopForm] = useState(shopInfo);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (pin === "8888" || pin === "1234") {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const openAddModal = () => {
    setEditingProduct({
      id: "item-" + Date.now(),
      name: "",
      category: "sandwich",
      price: 35,
      wholesalePrice: 25,
      minWholesale: 10,
      tags: ["รอบเช้า"],
      image: "🥐",
      desc: "",
      isMorningItem: true,
      isPreorder: true,
      isOutOfStock: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct({ ...product });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!editingProduct.name) return;
    saveProduct(editingProduct);
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveShopInfo = (e) => {
    e.preventDefault();
    updateShopInfo(shopForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  // ส่งออกไฟล์ JSON สำหรับเอาไปอัปเดตโค้ดถาวรได้
  const handleExportData = () => {
    const data = {
      SHOP_INFO: shopInfo,
      PRODUCTS: products,
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(data, null, 2)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", "buaberry_data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // 1. หน้ากรอก PIN เข้าสู่ระบบ
  if (!isAuthenticated) {
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

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                maxLength={6}
                placeholder="รหัส PIN (เริ่มต้น: 8888)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
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

  // 2. หน้า Dashboard หลังบ้าน
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header */}
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
          {/* ปุ่มสลับเปิด-ปิดร้าน */}
          <button
            onClick={toggleStoreOpen}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isOpen
                ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                : "bg-rose-500 hover:bg-rose-600 text-white"
            }`}
          >
            <Store className="w-4 h-4" />
            <span>{isOpen ? "ร้านเปิดรับออเดอร์" : "ร้านปิดรับชั่วคราว"}</span>
          </button>

          {/* ปุ่มดาวน์โหลด JSON Backup */}
          <button
            onClick={handleExportData}
            title="ดาวน์โหลดไฟล์ข้อมูล"
            className="p-2 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-medium flex items-center gap-1"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">สำรองข้อมูล</span>
          </button>

          <button
            onClick={() => setIsAuthenticated(false)}
            className="p-2 bg-stone-100 hover:bg-rose-50 hover:text-rose-600 text-stone-600 rounded-xl text-xs font-medium"
            title="ออกจากระบบ"
          >
            <Unlock className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 gap-2">
        <button
          onClick={() => setActiveTab("products")}
          className={`py-2.5 px-5 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "products"
              ? "border-amber-600 text-amber-900"
              : "border-transparent text-stone-500 hover:text-stone-700"
          }`}
        >
          จัดการสินค้า ({products.length})
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`py-2.5 px-5 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "settings"
              ? "border-amber-600 text-amber-900"
              : "border-transparent text-stone-500 hover:text-stone-700"
          }`}
        >
          ตั้งค่าร้าน & ชำระเงิน
        </button>
      </div>

      {/* Content Tab: จัดการสินค้า */}
      {activeTab === "products" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-stone-500">
              กดสลับสวิตช์เพื่อแจ้ง <strong>สินค้าหมด</strong> ได้ทันที
            </p>
            <button
              onClick={openAddModal}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>เพิ่มเมนูใหม่</span>
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-amber-100 shadow-xs divide-y divide-amber-50 overflow-hidden">
            {products.map((item) => (
              <div
                key={item.id}
                className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                  item.isOutOfStock ? "bg-stone-50/80 opacity-70" : "hover:bg-amber-50/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                    {item.image}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-amber-950">{item.name}</h3>
                      {item.isOutOfStock && (
                        <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-md">
                          หมดวันนี้
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">
                      ขายปลีก: <strong>฿{item.price}</strong> | ส่ง:{" "}
                      <strong>฿{item.wholesalePrice || "-"}</strong> (ขั้นต่ำ{" "}
                      {item.minWholesale || 10} ชิ้น)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {/* ปุ่มสลับ ของหมด / มีของ */}
                  <button
                    onClick={() => toggleProductStock(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      item.isOutOfStock
                        ? "bg-stone-200 text-stone-700 hover:bg-emerald-500 hover:text-white"
                        : "bg-emerald-100 text-emerald-800 hover:bg-rose-500 hover:text-white"
                    }`}
                  >
                    {item.isOutOfStock ? "❌ หมด (กดเปิดขาย)" : "✅ พร้อมขาย"}
                  </button>

                  {/* ปุ่มแก้ไข */}
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
                    title="แก้ไข"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  {/* ปุ่มลบ */}
                  <button
                    onClick={() => {
                      if (confirm(`ต้องการลบเมนู "${item.name}" ใช่หรือไม่?`)) {
                        deleteProduct(item.id);
                      }
                    }}
                    className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="ลบ"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-right">
            <button
              onClick={() => {
                if (confirm("ต้องการรีเซ็ตข้อมูลทั้งหมดกลับเป็นค่าเริ่มต้นใช่หรือไม่?")) {
                  resetToDefault();
                }
              }}
              className="text-xs text-stone-400 hover:text-rose-600 inline-flex items-center gap-1 font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>รีเซ็ตข้อมูลกลับเป็นค่าเริ่มต้น</span>
            </button>
          </div>
        </div>
      )}

      {/* Content Tab: ตั้งค่าร้าน */}
      {activeTab === "settings" && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-100 shadow-xs max-w-2xl">
          <form onSubmit={handleSaveShopInfo} className="space-y-5">
            <h2 className="text-lg font-bold text-amber-950">ข้อมูลหน้าร้าน & ช่องทางติดต่อ</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">ชื่อร้าน</label>
                <input
                  type="text"
                  value={shopForm.name}
                  onChange={(e) => setShopForm({ ...shopForm, name: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">เบอร์โทรศัพท์</label>
                <input
                  type="text"
                  value={shopForm.phone}
                  onChange={(e) => setShopForm({ ...shopForm, phone: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                เวลารอบเช้าตรู่
              </label>
              <input
                type="text"
                value={shopForm.morningHours}
                onChange={(e) => setShopForm({ ...shopForm, morningHours: e.target.value })}
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
                onChange={(e) => setShopForm({ ...shopForm, address: e.target.value })}
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
                  onChange={(e) => setShopForm({ ...shopForm, lineUrl: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  ลิงก์ร้าน Grab
                </label>
                <input
                  type="text"
                  value={shopForm.grabUrl}
                  onChange={(e) => setShopForm({ ...shopForm, grabUrl: e.target.value })}
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
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    เบอร์พร้อมเพย์
                  </label>
                  <input
                    type="text"
                    value={shopForm.promptPayNumber}
                    onChange={(e) =>
                      setShopForm({ ...shopForm, promptPayNumber: e.target.value })
                    }
                    className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ชื่อบัญชี
                  </label>
                  <input
                    type="text"
                    value={shopForm.promptPayName}
                    onChange={(e) =>
                      setShopForm({ ...shopForm, promptPayName: e.target.value })
                    }
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
      )}

      {/* Modal เพิ่ม / แก้ไขสินค้า */}
      {isModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
              <h3 className="font-bold text-base text-amber-950">
                {editingProduct.name ? "แก้ไขเมนู" : "เพิ่มเมนูใหม่"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div className="flex gap-3">
                <div className="w-20">
                  <label className="block text-xs font-bold text-stone-700 mb-1">ไอคอน/รูป</label>
                  <input
                    type="text"
                    value={editingProduct.image}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, image: e.target.value })
                    }
                    className="w-full text-center text-xl px-2 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    ชื่อสินค้า *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                    className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">หมวดหมู่</label>
                <select
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, category: e.target.value })
                  }
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 bg-white"
                >
                  {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">ราคาปลีก (฿)</label>
                  <input
                    type="number"
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full text-xs px-2 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">ราคาส่ง (฿)</label>
                  <input
                    type="number"
                    value={editingProduct.wholesalePrice || ""}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        wholesalePrice: Number(e.target.value),
                      })
                    }
                    className="w-full text-xs px-2 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">ขั้นต่ำส่ง</label>
                  <input
                    type="number"
                    value={editingProduct.minWholesale || 10}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        minWholesale: Number(e.target.value),
                      })
                    }
                    className="w-full text-xs px-2 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  คำอธิบายสินค้า
                </label>
                <textarea
                  rows={2}
                  value={editingProduct.desc}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, desc: e.target.value })
                  }
                  className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-100"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded-xl text-xs font-bold shadow-sm"
                >
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
