"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cartCount } from "@/lib/cart";
import { STORE } from "@/lib/store";

export default function Header() {
  const [count, setCount] = useState(0);

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
      <div className="inner">
        <Link href="/" className="logo">
          {STORE.name} <em>· {STORE.place}</em>
        </Link>
        <nav className="site-nav">
          <Link href="/">Products</Link>
          <a href={`tel:${STORE.phone.replace(/\s/g, "")}`}>Call us</a>
          <Link href="/admin">Admin</Link>
        </nav>
        <Link href="/list" className="cart-badge">
          My list · {count}
        </Link>
      </div>
    </header>
  );
}
