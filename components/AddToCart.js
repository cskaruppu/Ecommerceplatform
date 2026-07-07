"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cart";
import { getT, fmt } from "@/lib/i18n";

export default function AddToCart({ product, lang = "en" }) {
  const t = getT(lang);
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState("");

  const inStock = product.stock > 0;

  function handleAdd() {
    addToCart(product, qty);
    setToast(fmt(t.addedToList, { qty, name: product.name }));
    setTimeout(() => setToast(""), 2200);
  }

  return (
    <>
      <div className="buy-row">
        {inStock ? (
          <>
            <div className="qty" aria-label="Quantity">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">
                −
              </button>
              <span>{qty}</span>
              <button
                onClick={() => setQty(Math.min(product.stock, qty + 1))}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            <button className="btn primary" onClick={handleAdd}>
              {t.addToList}
            </button>
            {product.stock <= 10 ? (
              <span className="pill low-stock">{fmt(t.onlyLeft, { n: product.stock })}</span>
            ) : (
              <span className="pill in-stock">{t.inStock}</span>
            )}
          </>
        ) : (
          <>
            <button className="btn" disabled>
              {t.outOfStock}
            </button>
            <span className="pill out-of-stock">{t.askCounter}</span>
          </>
        )}
      </div>
      <div className={`toast ${toast ? "show" : ""}`} role="status">
        {toast}
      </div>
    </>
  );
}
