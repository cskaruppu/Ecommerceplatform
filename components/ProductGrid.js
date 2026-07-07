"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";

const SORTS = {
  featured: { label: "Featured", fn: null },
  "price-asc": { label: "Price: low to high", fn: (a, b) => a.price - b.price },
  "price-desc": { label: "Price: high to low", fn: (a, b) => b.price - a.price },
  name: { label: "Name A–Z", fn: (a, b) => a.name.localeCompare(b.name) },
};

export default function ProductGrid({ products, initialCategory = "All" }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState("featured");

  const categories = useMemo(
    () => ["All", ...new Set(products.map((p) => p.category))],
    [products]
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = products.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (inStockOnly && p.stock <= 0) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        (p.tamilName ?? "").includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
    const sortFn = SORTS[sort]?.fn;
    return sortFn ? [...filtered].sort(sortFn) : filtered;
  }, [products, query, category, inStockOnly, sort]);

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
        <label className="sort-box">
          <span>Sort</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort products">
            {Object.entries(SORTS).map(([key, s]) => (
              <option key={key} value={key}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="toolrow">
        {categories.map((c) => (
          <button
            key={c}
            className={`chip ${category === c ? "on" : ""}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
        <button
          className={`chip stock-chip ${inStockOnly ? "on" : ""}`}
          onClick={() => setInStockOnly(!inStockOnly)}
          aria-pressed={inStockOnly}
        >
          ● In stock only
        </button>
      </div>

      <p className="result-count">
        {visible.length} item{visible.length === 1 ? "" : "s"}
        {category !== "All" ? ` in ${category}` : ""}
      </p>

      {visible.length > 0 ? (
        <div className="cards">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="empty-note">
          Nothing matches{query ? ` “${query}”` : " these filters"}. Try a different search or
          category.
        </p>
      )}
    </section>
  );
}
