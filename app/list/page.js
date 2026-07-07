"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart, setQty, removeFromCart } from "@/lib/cart";
import { initials, money } from "@/components/ProductCard";
import { STORE } from "@/lib/store";

export default function ListPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const update = () => setItems(getCart());
    update();
    window.addEventListener("cart-updated", update);
    return () => window.removeEventListener("cart-updated", update);
  }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  const message = encodeURIComponent(
    `Vanakkam ${STORE.name}! My order:\n` +
      items.map((i) => `• ${i.name}${i.unit ? ` (${i.unit})` : ""} × ${i.qty}`).join("\n") +
      `\nApprox total: ${money(total)}\nPlease keep it ready. Nandri!`
  );

  return (
    <div className="cart-page container">
      <h1>My shopping list</h1>
      {items.length === 0 ? (
        <>
          <p className="empty-note">Your list is empty.</p>
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
                <div className="unit">
                  {money(i.price)}
                  {i.unit ? ` per ${i.unit}` : " each"}
                </div>
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
            <span>Approx. total</span>
            <span className="num">{money(total)}</span>
          </div>
          <div className="buy-row">
            <a
              className="btn primary"
              href={`https://wa.me/${STORE.whatsapp}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Send order on WhatsApp
            </a>
            <a className="btn" href={`tel:${STORE.phone.replace(/\s/g, "")}`}>
              Or call {STORE.phone}
            </a>
          </div>
          <p className="form-note">
            We&rsquo;ll pack your order and keep it ready for pickup — or mention your address in
            the WhatsApp message for doorstep delivery. {STORE.deliveryNote} Final billing is done
            at handover; prices for loose items may vary slightly by weight.
          </p>
        </>
      )}
    </div>
  );
}
