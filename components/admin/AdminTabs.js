export default function AdminTabs({ activeTab, setActiveTab, productCount }) {
  return (
    <div className="flex border-b border-stone-200 gap-2">
      <button
        type="button"
        onClick={() => setActiveTab("products")}
        className={`py-2.5 px-5 text-sm font-bold border-b-2 transition-all cursor-pointer ${
          activeTab === "products"
            ? "border-amber-600 text-amber-900"
            : "border-transparent text-stone-500 hover:text-stone-700"
        }`}
      >
        จัดการสินค้า ({productCount})
      </button>
      <button
        type="button"
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
  );
}