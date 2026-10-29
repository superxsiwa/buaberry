"use client";

import { Upload, X } from "lucide-react";
import { CATEGORIES } from "@/lib/products";

export default function ProductEditorModal({
  editingProduct,
  setEditingProduct,
  onClose,
  onSubmit,
}) {
  const updateProduct = (field, value) => {
    setEditingProduct({ ...editingProduct, [field]: value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxDim = 600;
          let width = img.width;
          let height = img.height;
          if (width > height && width > maxDim) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else if (height > maxDim) {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
          updateProduct("image", dataUrl);
        };
        img.src = loadEvent.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const hasImage =
    editingProduct.image &&
    (editingProduct.image.startsWith("data:image") ||
      editingProduct.image.startsWith("http") ||
      editingProduct.image.startsWith("/"));

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-amber-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-4">
          <h3 className="font-bold text-base text-amber-950">
            {editingProduct.name ? "แก้ไขเมนู" : "เพิ่มเมนูใหม่"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5">
              รูปภาพสินค้า / ขนม
            </label>
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-stone-200 flex items-center justify-center text-3xl overflow-hidden shrink-0 shadow-inner">
                {hasImage ? (
                  <img
                    src={editingProduct.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{editingProduct.image || "🥐"}</span>
                )}
              </div>

              <div className="flex-1 space-y-1.5">
                <label className="inline-flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors shadow-xs">
                  <Upload className="w-3.5 h-3.5" />
                  <span>เลือกรูปภาพจากเครื่อง</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-stone-400">หรือใช้อีโมจิ:</span>
                  <input
                    type="text"
                    value={editingProduct.image?.startsWith("data:image") ? "" : editingProduct.image}
                    placeholder="เช่น 🥪 🥟 🥐"
                    onChange={(event) => updateProduct("image", event.target.value)}
                    className="w-20 text-center text-xs px-2 py-1 rounded-lg border border-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">ชื่อสินค้า *</label>
            <input
              type="text"
              required
              value={editingProduct.name}
              onChange={(event) => updateProduct("name", event.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">หมวดหมู่</label>
            <select
              value={editingProduct.category}
              onChange={(event) => updateProduct("category", event.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 bg-white"
            >
              {CATEGORIES.filter((category) => category.id !== "all").map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
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
                onChange={(event) => updateProduct("price", Number(event.target.value))}
                className="w-full text-xs px-2 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">ราคาส่ง (฿)</label>
              <input
                type="number"
                value={editingProduct.wholesalePrice || ""}
                onChange={(event) => updateProduct("wholesalePrice", Number(event.target.value))}
                className="w-full text-xs px-2 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">ขั้นต่ำส่ง</label>
              <input
                type="number"
                value={editingProduct.minWholesale || 10}
                onChange={(event) => updateProduct("minWholesale", Number(event.target.value))}
                className="w-full text-xs px-2 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1">คำอธิบายสินค้า</label>
            <textarea
              rows={2}
              value={editingProduct.desc}
              onChange={(event) => updateProduct("desc", event.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
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
  );
}