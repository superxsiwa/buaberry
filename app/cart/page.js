"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import CartItemsSection from "@/components/cart/CartItemsSection";
import CheckoutForm from "@/components/cart/CheckoutForm";
import EmptyCart from "@/components/cart/EmptyCart";
import OrderSuccess from "@/components/cart/OrderSuccess";
import { useCart } from "@/lib/CartContext";
import { useStore } from "@/lib/StoreContext";

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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastOrderSummary, setLastOrderSummary] = useState("");

  const retailTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savedAmount = retailTotal > totalPrice ? retailTotal - totalPrice : 0;

  const handleOrderSubmit = (orderSummary) => {
    setLastOrderSummary(orderSummary);
    const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(orderSummary)}`;

    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch (error) {
      // Confetti should not prevent the order from being sent.
    }

    window.open(lineUrl, "_blank");
    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    return <OrderSuccess orderSummary={lastOrderSummary} />;
  }

  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <CartItemsSection
          cart={cart}
          orderType={orderType}
          setOrderType={setOrderType}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          getItemPrice={getItemPrice}
          totalItems={totalItems}
          totalPrice={totalPrice}
          savedAmount={savedAmount}
        />
        <CheckoutForm
          cart={cart}
          orderType={orderType}
          getItemPrice={getItemPrice}
          totalPrice={totalPrice}
          shopInfo={shopInfo}
          onSubmit={handleOrderSubmit}
        />
      </div>
    </div>
  );
}
