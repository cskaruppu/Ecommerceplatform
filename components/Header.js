"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cartCount } from "@/lib/cart";
import { STORE } from "@/lib/store";
import { getT } from "@/lib/i18n";
import LangToggle from "@/components/LangToggle";

export default function Header({ lang = "en" }) {
  const [count, setCount] = useState(0);
  const t = getT(lang);

  useEffect(() => {
    const update = () => setCount(cartCount());
    update();
    window.addEventListener("cart-updated", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("cart-updated", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return (
    <header className="site-header">
      <div className="announce">
        {t.announce} {STORE.since}
      </div>
      <div className="inner">
        <Link href="/" className="logo">
          {lang === "ta" ? STORE.tamilName : STORE.name} <em>· {lang === "ta" ? "பெருந்துறை" : STORE.place}</em>
        </Link>
        <nav className="site-nav">
          <Link href="/">{t.navHome}</Link>
          <Link href="/products">{t.navProducts}</Link>
          <Link href="/contact">{t.navContact}</Link>
          <Link href="/admin">{t.navAdmin}</Link>
        </nav>
        <LangToggle lang={lang} />
        <Link href="/list" className="cart-badge">
          {t.myList} · {count}
        </Link>
      </div>
    </header>
  );
}
