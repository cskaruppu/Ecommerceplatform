import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import { initials, money } from "@/components/ProductCard";
import AddToCart from "@/components/AddToCart";
import { STORE } from "@/lib/store";

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
  const product = await getProduct(id);
  if (!product) notFound();

  const p = product;
  return (
    <div className="container">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/products">Products</Link> /{" "}
        <Link href={`/products?category=${encodeURIComponent(p.category)}`}>{p.category}</Link> /{" "}
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
          {p.tamilName ? <div className="tamil-lg">{p.tamilName}</div> : null}

          <div className="price-row">
            <span className="price">{money(p.price)}</span>
            <span className="unit-lg">per {p.unit}</span>
          </div>

          <p className="desc">{p.description}</p>

          <AddToCart product={p} />

          <div className="spec">
            <h2>Details</h2>
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
                    <td>Brand / source</td>
                    <td>{p.brand}</td>
                  </tr>
                ) : null}
                <tr>
                  <td>Price</td>
                  <td>
                    {money(p.price)} per {p.unit}
                  </td>
                </tr>
                <tr>
                  <td>Availability</td>
                  <td>{p.stock > 0 ? "In stock at the shop today" : "Out of stock right now"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
