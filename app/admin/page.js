"use client";

import { useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminTabs from "@/components/admin/AdminTabs";
import ProductEditorModal from "@/components/admin/ProductEditorModal";
import ProductManagement from "@/components/admin/ProductManagement";
import ShopSettingsForm from "@/components/admin/ShopSettingsForm";
import { useStore } from "@/lib/StoreContext";

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

  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState("products");
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shopDraft, setShopDraft] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // แสดงค่าที่กำลังแก้ไข หรือใช้ shopInfo ล่าสุดเมื่อยังไม่ได้แก้
  const shopForm = shopDraft ?? shopInfo;

  const handleLogin = (event) => {
    event.preventDefault();
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

  const handleSaveModal = (event) => {
    event.preventDefault();
    if (!editingProduct.name) return;
    saveProduct(editingProduct);
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveShopInfo = (event) => {
    event.preventDefault();
    updateShopInfo(shopForm);
    setShopDraft(null);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

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

  if (!isAuthenticated) {
    return (
      <AdminLogin
        pin={pin}
        setPin={setPin}
        pinError={pinError}
        onSubmit={handleLogin}
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <AdminHeader
        isOpen={isOpen}
        onToggleStore={toggleStoreOpen}
        onExportData={handleExportData}
        onLogout={() => setIsAuthenticated(false)}
      />

      <AdminTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        productCount={products.length}
      />

      {activeTab === "products" && (
        <ProductManagement
          products={products}
          onAddProduct={openAddModal}
          onEditProduct={openEditModal}
          onToggleProductStock={toggleProductStock}
          onDeleteProduct={deleteProduct}
          onReset={resetToDefault}
        />
      )}

      {activeTab === "settings" && (
        <ShopSettingsForm
          shopForm={shopForm}
          setShopForm={setShopDraft}
          saveSuccess={saveSuccess}
          onSubmit={handleSaveShopInfo}
        />
      )}

      {isModalOpen && editingProduct && (
        <ProductEditorModal
          editingProduct={editingProduct}
          setEditingProduct={setEditingProduct}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSaveModal}
        />
      )}
    </div>
  );
}
