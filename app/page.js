import { getProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import { STORE } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function HomePage({ searchParams }) {
  const products = await getProducts();
  const { category } = await searchParams;

  return (
    <>
      <div className="hero">
        <div className="inner">
          <div className="eyebrow">{STORE.hours}</div>
          <h1>
            {STORE.name}, {STORE.place}
          </h1>
          <p>
            Check what&rsquo;s in stock and today&rsquo;s prices before you come. Add items to your
            list and send it on WhatsApp — we&rsquo;ll keep your order packed and ready.
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
