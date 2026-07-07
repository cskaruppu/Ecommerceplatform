"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function ProductGrid({ products, initialCategory = "All" }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category))],
    [products]
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        (p.tamilName ?? "").includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [products, query, category]);

  return (
    <section className="shop-section container">
      <div className="toolrow">
        <div className="search">
          ⌕
          <input
            placeholder="Search — rice, பருப்பு, oil, soap…"
            aria-label="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {categories.map((c) => (
          <button
            key={c}
            className={`chip ${category === c ? "on" : ""}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <div className="cards">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="empty-note">
          No products match “{query}”. Try a different search or category.
        </p>
      )}
    </section>
  );
}
