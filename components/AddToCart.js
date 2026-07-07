"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cart";

export default function AddToCart({ product }) {
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState("");

  const inStock = product.stock > 0;

  function handleAdd() {
    addToCart(product, qty);
    setToast(`Added ${qty} × ${product.name} to your list`);
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
              Add to my list
            </button>
            {product.stock <= 10 ? (
              <span className="pill low-stock">Only {product.stock} left today</span>
            ) : (
              <span className="pill in-stock">In stock</span>
            )}
          </>
        ) : (
          <>
            <button className="btn" disabled>
              Out of stock
            </button>
            <span className="pill out-of-stock">Ask at the counter for arrival date</span>
          </>
        )}
      </div>
      <div className={`toast ${toast ? "show" : ""}`} role="status">
        {toast}
      </div>
    </>
  );
}
