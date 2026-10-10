"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [orderType, setOrderType] = useState("morning"); // "morning" (รับเช้า), "preorder" (พรีออเดอร์/จัดเบรก), "wholesale" (ขายส่ง)

  // โหลดตะกร้าจาก localStorage ตอนเปิดเว็บ
  useEffect(() => {
    try {
      const saved = localStorage.getItem("buaberry_cart");
      if (saved) setCart(JSON.parse(saved));
      const savedType = localStorage.getItem("buaberry_order_type");
      if (savedType) setOrderType(savedType);
    } catch (e) {
      console.error(e);
    }
  }, []);

  // บันทึกลง localStorage เมื่อตะกร้าเปลี่ยน
  useEffect(() => {
    try {
      localStorage.setItem("buaberry_cart", JSON.stringify(cart));
      localStorage.setItem("buaberry_order_type", orderType);
    } catch (e) {
      console.error(e);
    }
  }, [cart, orderType]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // คำนวณราคาตามโหมด (ขายปลีกปกติ vs ขายส่ง)
  const getItemPrice = (item) => {
    if (orderType === "wholesale") {
      return item.wholesalePrice || item.price;
    }
    return item.price;
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + getItemPrice(item) * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        orderType,
        setOrderType,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
        getItemPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}

