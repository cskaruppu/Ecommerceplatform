import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import { initials, money } from "@/components/ProductCard";
import AddToCart from "@/components/AddToCart";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return { title: "Product not found — terra&tone" };
  return {
    title: `${product.name} — terra&tone`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const p = product;
  return (
    <div className="container">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Shop</Link> / <Link href={`/?category=${p.category}`}>{p.category}</Link> /{" "}
        {p.name}
      </nav>

      <div className="detail">
        <div
          className="detail-img"
          style={{ background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})` }}
        >
          {initials(p.name)}
        </div>

        <div>
          <div className="eyebrow">{p.category}</div>
          <h1>{p.name}</h1>
          <div className="rating">
            ★ {p.reviews > 0 ? p.rating : "No reviews yet"}{" "}
            {p.reviews > 0 ? <span>· {p.reviews} reviews</span> : null}
            <span className="mono"> · SKU {p.sku}</span>
          </div>

          <div className="price-row">
            <span className="price">{money(p.price)}</span>
            {p.oldPrice ? (
              <span className="price">
                <s>{money(p.oldPrice)}</s>
              </span>
            ) : null}
          </div>

          <p className="desc">{p.description}</p>

          <AddToCart product={p} />

          {Object.keys(p.details ?? {}).length > 0 ? (
            <div className="spec">
              <h2>Product details</h2>
              <table>
                <tbody>
                  {Object.entries(p.details).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                  <tr>
                    <td>SKU</td>
                    <td className="mono">{p.sku}</td>
                  </tr>
                  <tr>
                    <td>Availability</td>
                    <td>{p.stock > 0 ? `${p.stock} in stock — ships in 1–2 days` : "Out of stock"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
