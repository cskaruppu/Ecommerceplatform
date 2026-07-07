import Link from "next/link";

export function initials(name) {
  return name
    .split(" ")
    .map((w) => w.replace(/[^\p{L}\p{N}]/gu, ""))
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export function money(v) {
  return `₹${Number(v).toLocaleString("en-IN")}`;
}

export default function ProductCard({ product }) {
  const p = product;
  return (
    <Link href={`/products/${p.id}`} className="card">
      <div
        className="card-img"
        style={{ background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})` }}
      >
        {initials(p.name)}
        {p.tag ? <span className="tag">{p.tag}</span> : null}
      </div>
      <div className="card-body">
        <div className="cat">{p.category}</div>
        <div className="name">{p.name}</div>
        {p.tamilName ? <div className="tamil">{p.tamilName}</div> : null}
        <div className="card-row">
          <div className="price">
            {money(p.price)} <span className="unit">/ {p.unit}</span>
          </div>
          {p.stock > 0 ? (
            <span className="pill in-stock">In stock</span>
          ) : (
            <span className="pill out-of-stock">Out of stock</span>
          )}
        </div>
      </div>
    </Link>
  );
}
