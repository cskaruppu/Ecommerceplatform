import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import { initials, money } from "@/components/ProductCard";
import AddToCart from "@/components/AddToCart";
import { STORE } from "@/lib/store";
import { getLang } from "@/lib/lang";
import { getT, catName } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: `Product not found — ${STORE.name}` };
  return {
    title: `${product.name} — ${STORE.name}, ${STORE.place}`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const lang = await getLang();
  const t = getT(lang);
  const product = await getProduct(id);
  if (!product) notFound();

  const p = product;
  const primary = lang === "ta" && p.tamilName ? p.tamilName : p.name;
  const secondary = lang === "ta" && p.tamilName ? p.name : p.tamilName;

  return (
    <div className="container">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/products">{t.navProducts}</Link> /{" "}
        <Link href={`/products?category=${encodeURIComponent(p.category)}`}>
          {catName(p.category, lang)}
        </Link>{" "}
        / {primary}
      </nav>

      <div className="detail">
        <div
          className="detail-img"
          style={{ background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})` }}
        >
          {initials(p.name)}
        </div>

        <div>
          <div className="eyebrow">{catName(p.category, lang)}</div>
          <h1>{primary}</h1>
          {secondary ? <div className="tamil-lg">{secondary}</div> : null}

          <div className="price-row">
            <span className="price">{money(p.price)}</span>
            <span className="unit-lg">
              {t.perUnit} {p.unit}
            </span>
          </div>

          <p className="desc">{p.description}</p>

          <AddToCart product={p} lang={lang} />

          <div className="spec">
            <h2>{t.detailsTitle}</h2>
            <table>
              <tbody>
                {Object.entries(p.details ?? {}).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
                {p.brand ? (
                  <tr>
                    <td>{t.brandSource}</td>
                    <td>{p.brand}</td>
                  </tr>
                ) : null}
                <tr>
                  <td>{t.priceLabel}</td>
                  <td>
                    {money(p.price)} {t.perUnit} {p.unit}
                  </td>
                </tr>
                <tr>
                  <td>{t.availability}</td>
                  <td>{p.stock > 0 ? t.availIn : t.availOut}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
