import { getProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";

export const dynamic = "force-dynamic";

export default async function HomePage({ searchParams }) {
  const products = await getProducts();
  const { category } = await searchParams;

  return (
    <>
      <div className="hero">
        <div className="inner">
          <div className="eyebrow">The July edit</div>
          <h1>Everyday objects, built to outlast trends</h1>
          <p>
            Small-batch homeware and workspace goods from independent makers.
            Free carbon-neutral shipping over $60.
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
