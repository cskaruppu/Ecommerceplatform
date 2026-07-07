import { getProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";
import { STORE } from "@/lib/store";
import { getLang } from "@/lib/lang";
import { getT } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export const metadata = {
  title: `Today's stock & prices — ${STORE.name}, ${STORE.place}`,
  description: `Everything available at ${STORE.name} today, with prices per unit. Search in English or Tamil and filter by category.`,
};

export default async function ProductsPage({ searchParams }) {
  const lang = await getLang();
  const t = getT(lang);
  const products = await getProducts();
  const { category } = await searchParams;

  return (
    <>
      <div className="hero slim">
        <div className="inner">
          <div className="eyebrow">{t.hours}</div>
          <h1>{t.productsTitle}</h1>
          <p>{t.productsPara}</p>
        </div>
      </div>
      <ProductGrid
        products={products}
        initialCategory={category || "All"}
        lang={lang}
        key={`${category || "All"}-${lang}`}
      />
    </>
  );
}
