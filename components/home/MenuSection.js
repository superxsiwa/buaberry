"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES } from "@/lib/products";

export default function MenuSection({ products, shopInfo }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const query = searchQuery.trim().toLowerCase();
  const filteredProducts = products.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      !query ||
      item.name.toLowerCase().includes(query) ||
      (item.desc && item.desc.toLowerCase().includes(query)) ||
      (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(query)));

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6 scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-600 tracking-wider uppercase">
            Freshly Prepared Menu
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 font-heading">
            เมนูความอร่อยของ {shopInfo.name}
          </h2>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="ค้นหาเมนู เช่น แซนวิช, บราวนี่..."
            className="w-full pl-9 pr-8 py-2.5 bg-white rounded-2xl border border-stone-200 text-xs sm:text-sm focus:outline-none focus:border-amber-500 shadow-2xs"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === category.id
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-white text-stone-600 hover:bg-amber-50 border border-stone-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
