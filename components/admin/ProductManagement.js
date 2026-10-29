import { Edit2, Plus, RotateCcw, Trash2 } from "lucide-react";

export default function ProductManagement({
  products,
  onAddProduct,
  onEditProduct,
  onToggleProductStock,
  onDeleteProduct,
  onReset,
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-stone-500">
          กดสลับสวิตช์เพื่อแจ้ง <strong>สินค้าหมด</strong> ได้ทันที
        </p>
        <button
          type="button"
          onClick={onAddProduct}
          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>เพิ่มเมนูใหม่</span>
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-amber-100 shadow-xs divide-y divide-amber-50 overflow-hidden">
        {products.map((item) => {
          const hasImage =
            item.image &&
            (item.image.startsWith("data:image") ||
              item.image.startsWith("http") ||
              item.image.startsWith("/"));

          return (
            <div
              key={item.id}
              className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                item.isOutOfStock ? "bg-stone-50/80 opacity-70" : "hover:bg-amber-50/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-2xl shrink-0 overflow-hidden">
                  {hasImage ? (
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  ) : (
                    <span>{item.image || "🥐"}</span>
                  )}
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
                <button
                  type="button"
                  onClick={() => onToggleProductStock(item.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    item.isOutOfStock
                      ? "bg-stone-200 text-stone-700 hover:bg-emerald-500 hover:text-white"
                      : "bg-emerald-100 text-emerald-800 hover:bg-rose-500 hover:text-white"
                  }`}
                >
                  {item.isOutOfStock ? "❌ หมด (กดเปิดขาย)" : "✅ พร้อมขาย"}
                </button>

                <button
                  type="button"
                  onClick={() => onEditProduct(item)}
                  className="p-2 text-stone-600 hover:bg-stone-100 rounded-xl transition-colors"
                  title="แก้ไข"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`ต้องการลบเมนู "${item.name}" ใช่หรือไม่?`)) {
                      onDeleteProduct(item.id);
                    }
                  }}
                  className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="ลบ"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-2 text-right">
        <button
          type="button"
          onClick={() => {
            if (confirm("ต้องการรีเซ็ตข้อมูลทั้งหมดกลับเป็นค่าเริ่มต้นใช่หรือไม่?")) {
              onReset();
            }
          }}
          className="text-xs text-stone-400 hover:text-rose-600 inline-flex items-center gap-1 font-medium"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>รีเซ็ตข้อมูลกลับเป็นค่าเริ่มต้น</span>
        </button>
      </div>
    </div>
  );
}