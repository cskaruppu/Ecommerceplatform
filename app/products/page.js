import { getProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import { STORE } from "@/lib/store";

export const dynamic = "force-dynamic";

export const metadata = {
  title: `Today's stock & prices — ${STORE.name}, ${STORE.place}`,
  description: `Everything available at ${STORE.name} today, with prices per unit. Search in English or Tamil and filter by category.`,
};

export default async function ProductsPage({ searchParams }) {
  const products = await getProducts();
  const { category } = await searchParams;

  return (
    <>
      <div className="hero slim">
        <div className="inner">
          <div className="eyebrow">{STORE.hours}</div>
          <h1>Today&rsquo;s stock &amp; prices</h1>
          <p>
            Search in English or Tamil, filter by category, and add items to your list — send it on
            WhatsApp and we&rsquo;ll keep your order ready.
          </p>
        </div>
      </div>
      <ProductGrid
        products={products}
        initialCategory={category || "All"}
        key={category || "All"}
      />
    </>
  );
}
