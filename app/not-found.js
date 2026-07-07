import Link from "next/link";

export default function NotFound() {
  return (
    <div className="cart-page container">
      <h1>Page not found</h1>
      <p style={{ color: "var(--ink-2)" }}>
        That product may have been removed or the link is wrong.
      </p>
      <Link href="/" className="btn primary">
        Back to the shop
      </Link>
    </div>
  );
}
