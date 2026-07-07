import Link from "next/link";
import { getT, catName } from "@/lib/i18n";

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

export default function ProductCard({ product, lang = "en" }) {
  const p = product;
  const t = getT(lang);
  const primary = lang === "ta" && p.tamilName ? p.tamilName : p.name;
  const secondary = lang === "ta" && p.tamilName ? p.name : p.tamilName;

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
        <div className="cat">{catName(p.category, lang)}</div>
        <div className="name">{primary}</div>
        {secondary ? <div className="tamil">{secondary}</div> : null}
        <div className="card-row">
          <div className="price">
            {money(p.price)} <span className="unit">/ {p.unit}</span>
          </div>
          {p.stock > 0 ? (
            <span className="pill in-stock">{t.inStock}</span>
          ) : (
            <span className="pill out-of-stock">{t.soldOut}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
