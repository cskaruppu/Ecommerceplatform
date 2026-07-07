"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart, setQty, removeFromCart, clearCart } from "@/lib/cart";
import { initials, money } from "@/components/ProductCard";

export default function CartPage() {
  const [items, setItems] = useState([]);
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    const update = () => setItems(getCart());
    update();
    window.addEventListener("cart-updated", update);
    return () => window.removeEventListener("cart-updated", update);
  }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  function placeOrder() {
    clearCart();
    setPlaced(true);
  }

  if (placed) {
    return (
      <div className="cart-page container">
        <h1>Thanks — order received 🎉</h1>
        <p style={{ color: "var(--ink-2)" }}>
          This demo stops before payment. The next build step is Stripe checkout, which slots in
          right here.
        </p>
        <Link href="/" className="btn primary">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h1>Your cart</h1>
      {items.length === 0 ? (
        <>
          <p className="empty-note">Your cart is empty.</p>
          <Link href="/" className="btn primary">
            Browse products
          </Link>
        </>
      ) : (
        <>
          {items.map((i) => (
            <div className="cart-item" key={i.id}>
              <div
                className="cart-thumb"
                style={{
                  background: `linear-gradient(135deg, ${i.gradient?.[0] ?? "#0E7C66"}, ${
                    i.gradient?.[1] ?? "#3BAF94"
                  })`,
                }}
              >
                {initials(i.name)}
              </div>
              <div className="info">
                <div className="name">
                  <Link href={`/products/${i.id}`}>{i.name}</Link>
                </div>
                <div className="unit">{money(i.price)} each</div>
              </div>
              <div className="qty" aria-label={`Quantity of ${i.name}`}>
                <button onClick={() => setQty(i.id, i.qty - 1)} aria-label="Decrease">
                  −
                </button>
                <span>{i.qty}</span>
                <button onClick={() => setQty(i.id, i.qty + 1)} aria-label="Increase">
                  +
                </button>
              </div>
              <div className="price num">{money(i.price * i.qty)}</div>
              <button className="link-btn danger" onClick={() => removeFromCart(i.id)}>
                Remove
              </button>
            </div>
          ))}
          <div className="cart-total">
            <span>Total</span>
            <span className="num">{money(total)}</span>
          </div>
          <button className="btn primary" onClick={placeOrder}>
            Place order
          </button>
        </>
      )}
    </div>
  );
}
