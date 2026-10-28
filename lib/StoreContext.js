"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS, SHOP_INFO } from "./products";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(PRODUCTS);
  const [shopInfo, setShopInfo] = useState(SHOP_INFO);
  const [isOpen, setIsOpen] = useState(true);

  // โหลดข้อมูลที่แก้ไขจาก localStorage ถ้ามี และดักจับการเปลี่ยนแปลงข้ามแท็บ
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        const savedProducts = localStorage.getItem("buaberry_admin_products");
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        }
        const savedShopInfo = localStorage.getItem("buaberry_admin_shop_info");
        if (savedShopInfo) {
          const parsed = JSON.parse(savedShopInfo);
          setShopInfo((prev) => ({ ...prev, ...parsed }));
        }
        const savedIsOpen = localStorage.getItem("buaberry_admin_is_open");
        if (savedIsOpen !== null) {
          setIsOpen(JSON.parse(savedIsOpen));
        }
      } catch (e) {
        console.error(e);
      }
    };

    loadFromStorage();

    // ฟัง event storage (เมื่อแก้ไขจากแท็บอื่น เช่น เปิด /admin อีกแท็บ)
    const handleStorage = (e) => {
      if (!e.key || e.key.startsWith("buaberry_admin_")) {
        loadFromStorage();
      }
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("buaberry_store_update", loadFromStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("buaberry_store_update", loadFromStorage);
    };
  }, []);

  // ฟังก์ชันสลับสถานะสินค้า (ของหมด / มีของ)
  const toggleProductStock = (id) => {
    setProducts((prev) => {
      const updated = prev.map((p) =>
        p.id === id ? { ...p, isOutOfStock: !p.isOutOfStock } : p
      );
      localStorage.setItem("buaberry_admin_products", JSON.stringify(updated));
      window.dispatchEvent(new Event("buaberry_store_update"));
      return updated;
    });
  };

  // แก้ไขหรือเพิ่มสินค้า
  const saveProduct = (productData) => {
    setProducts((prev) => {
      const index = prev.findIndex((p) => p.id === productData.id);
      let updated;
      if (index >= 0) {
        updated = [...prev];
        updated[index] = productData;
      } else {
        updated = [productData, ...prev];
      }
      localStorage.setItem("buaberry_admin_products", JSON.stringify(updated));
      window.dispatchEvent(new Event("buaberry_store_update"));
      return updated;
    });
  };

  // ลบสินค้า
  const deleteProduct = (id) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      localStorage.setItem("buaberry_admin_products", JSON.stringify(updated));
      window.dispatchEvent(new Event("buaberry_store_update"));
      return updated;
    });
  };

  // อัปเดตข้อมูลร้าน
  const updateShopInfo = (newInfo) => {
    setShopInfo((prev) => {
      const merged = { ...prev, ...newInfo };
      localStorage.setItem("buaberry_admin_shop_info", JSON.stringify(merged));
      window.dispatchEvent(new Event("buaberry_store_update"));
      return merged;
    });
  };

  // สลับสถานะเปิด-ปิดร้าน
  const toggleStoreOpen = () => {
    setIsOpen((prev) => {
      const next = !prev;
      localStorage.setItem("buaberry_admin_is_open", JSON.stringify(next));
      return next;
    });
  };

  // รีเซ็ตข้อมูลกลับเป็นค่าเริ่มต้น
  const resetToDefault = () => {
    localStorage.removeItem("buaberry_admin_products");
    localStorage.removeItem("buaberry_admin_shop_info");
    localStorage.removeItem("buaberry_admin_is_open");
    setProducts(PRODUCTS);
    setShopInfo(SHOP_INFO);
    setIsOpen(true);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        shopInfo,
        isOpen,
        toggleProductStock,
        saveProduct,
        deleteProduct,
        updateShopInfo,
        toggleStoreOpen,
        resetToDefault,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}

