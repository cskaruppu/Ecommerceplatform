"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCart, setQty, removeFromCart } from "@/lib/cart";
import { initials, money } from "@/components/ProductCard";
import { STORE } from "@/lib/store";
import { getT, fmt } from "@/lib/i18n";

function readLang() {
  if (typeof document === "undefined") return "en";
  return document.cookie.includes("lang=ta") ? "ta" : "en";
}

export default function ListPage() {
  const [items, setItems] = useState([]);
  const [lang, setLang] = useState("en");
  const t = getT(lang);

  useEffect(() => {
    setLang(readLang());
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
      <h1>{t.listTitle}</h1>
      {items.length === 0 ? (
        <>
          <p className="empty-note">{t.listEmpty}</p>
          <Link href="/products" className="btn primary">
            {t.browseProducts}
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
                  {money(i.price)} {i.unit ? `${t.per} ${i.unit}` : t.each}
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
                {t.remove}
              </button>
            </div>
          ))}
          <div className="cart-total">
            <span>{t.approxTotal}</span>
            <span className="num">{money(total)}</span>
          </div>
          <div className="buy-row">
            <a
              className="btn primary"
              href={`https://wa.me/${STORE.whatsapp}?text=${message}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t.sendOrder}
            </a>
            <a className="btn" href={`tel:${STORE.phone.replace(/\s/g, "")}`}>
              {t.orCall} {STORE.phone}
            </a>
          </div>
          <p className="form-note">{t.listNote}</p>
        </>
      )}
    </div>
  );
}
