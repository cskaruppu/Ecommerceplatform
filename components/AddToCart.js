"use client";

import { useState } from "react";
import { addToCart } from "@/lib/cart";

export default function AddToCart({ product }) {
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState("");

  const inStock = product.stock > 0;

  function handleAdd() {
    addToCart(product, qty);
    setToast(`Added ${qty} × ${product.name} to cart`);
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
              Add to cart
            </button>
            {product.stock <= 15 ? (
              <span className="pill low-stock">Only {product.stock} left</span>
            ) : (
              <span className="pill in-stock">{product.stock} in stock</span>
            )}
          </>
        ) : (
          <>
            <button className="btn" disabled>
              Sold out
            </button>
            <span className="pill out-of-stock">Out of stock</span>
          </>
        )}
      </div>
      <div className={`toast ${toast ? "show" : ""}`} role="status">
        {toast}
      </div>
    </>
  );
}
