"use client";

import ContactSection from "@/components/home/ContactSection";
import FloatingCartBar from "@/components/home/FloatingCartBar";
import HeroSection from "@/components/home/HeroSection";
import MenuSection from "@/components/home/MenuSection";
import QualitySection from "@/components/home/QualitySection";
import ReviewsSection from "@/components/home/ReviewsSection";
import WholesaleSection from "@/components/home/WholesaleSection";
import OrderTypeSelector from "@/components/OrderTypeSelector";
import { useStore } from "@/lib/StoreContext";
import { useCart } from "@/lib/CartContext";

export default function Home() {
  const { products, shopInfo, isOpen } = useStore();
  const { setOrderType } = useCart();

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      <HeroSection shopInfo={shopInfo} isOpen={isOpen} />

      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <OrderTypeSelector />
      </section>

      <MenuSection products={products} shopInfo={shopInfo} />
      <QualitySection />
      <WholesaleSection shopInfo={shopInfo} setOrderType={setOrderType} />
      <ReviewsSection />
      <ContactSection shopInfo={shopInfo} />
      <FloatingCartBar />
    </div>
  );
}
