"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { getT, catName, fmt } from "@/lib/i18n";

export default function ProductGrid({ products, initialCategory = "All", lang = "en" }) {
  const t = getT(lang);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState("featured");

  const SORTS = {
    featured: { label: t.sortFeatured, fn: null },
    "price-asc": { label: t.sortPriceAsc, fn: (a, b) => a.price - b.price },
    "price-desc": { label: t.sortPriceDesc, fn: (a, b) => b.price - a.price },
    name: { label: t.sortName, fn: (a, b) => a.name.localeCompare(b.name) },
  };

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
    const sortFn = sort === "featured" ? null : SORTS[sort]?.fn;
    return sortFn ? [...filtered].sort(sortFn) : filtered;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, query, category, inStockOnly, sort]);

  const countText =
    category !== "All"
      ? fmt(t.itemsCountIn, { n: visible.length, cat: catName(category, lang) })
      : fmt(t.itemsCount, { n: visible.length });

  return (
    <section className="shop-section container">
      <div className="toolrow">
        <div className="search">
          ⌕
          <input
            placeholder={t.searchPlaceholder}
            aria-label="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <label className="sort-box">
          <span>{t.sortLabel}</span>
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
            {catName(c, lang)}
          </button>
        ))}
        <button
          className={`chip stock-chip ${inStockOnly ? "on" : ""}`}
          onClick={() => setInStockOnly(!inStockOnly)}
          aria-pressed={inStockOnly}
        >
          {t.inStockOnly}
        </button>
      </div>

      <p className="result-count">{countText}</p>

      {visible.length > 0 ? (
        <div className="cards">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} lang={lang} />
          ))}
        </div>
      ) : (
        <p className="empty-note">{t.emptyNote}</p>
      )}
    </section>
  );
}
