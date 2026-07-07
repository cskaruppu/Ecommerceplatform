"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cartCount } from "@/lib/cart";

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
          terra<em>&amp;</em>tone
        </Link>
        <nav className="site-nav">
          <Link href="/">Shop</Link>
          <Link href="/?category=Kitchen">Kitchen</Link>
          <Link href="/?category=Living">Living</Link>
          <Link href="/?category=Workspace">Workspace</Link>
          <Link href="/admin">Admin</Link>
        </nav>
        <Link href="/cart" className="cart-badge">
          Cart · {count}
        </Link>
      </div>
    </header>
  );
}
