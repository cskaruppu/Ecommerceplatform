import Link from "next/link";

export function initials(name) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

export function money(v) {
  return `$${Number(v).toFixed(2)}`;
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
        <div className="rating">
          ★ {p.reviews > 0 ? p.rating : "—"} <span>({p.reviews})</span>
        </div>
        <div className="card-row">
          <div className="price">
            {money(p.price)}
            {p.oldPrice ? <s>{money(p.oldPrice)}</s> : null}
          </div>
          {p.stock > 0 ? (
            <span className="pill in-stock">In stock</span>
          ) : (
            <span className="pill out-of-stock">Sold out</span>
          )}
        </div>
      </div>
    </Link>
  );
}
