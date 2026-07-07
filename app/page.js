import Link from "next/link";
import { getProducts } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { STORE } from "@/lib/store";

export const dynamic = "force-dynamic";

const FEATURES = [
  {
    title: "From our own paruppu mill",
    text: "Toor, urad and moong dal milled in-house — from the mill to the shelf in days, not months. You taste the freshness in every sambar.",
    icon: "M12 3v6m0 0c-3.5 0-6 2.2-6 5.5S8.5 20 12 20s6-2.2 6-5.5S15.5 9 12 9zM9 6l3 3 3-3",
  },
  {
    title: "Chekku oils",
    text: "Cold-pressed gingelly and groundnut oil from the marachekku — no refining, full taste.",
    icon: "M12 3c3 4 6 7 6 11a6 6 0 11-12 0c0-4 3-7 6-11z",
  },
  {
    title: "Erode turmeric & local sources",
    text: "Turmeric from Erode farms, jaggery from a nearby unit, murukku made fresh each morning by a local maker.",
    icon: "M4 20c4-1 6-3 7-7 1 4 3 6 7 7M12 13V4m0 0L8 8m4-4l4 4",
  },
  {
    title: "Loose items, fair weighing",
    text: "Buy exactly what you need — 100 g or 5 kg — weighed in front of you on a certified scale.",
    icon: "M12 4v3m0 0l-6 2 2 6a4 4 0 004 0M12 7l6 2-2 6a4 4 0 01-4 0m-6 5h12",
  },
  {
    title: "Order on WhatsApp",
    text: "Send your list before you leave home. We pack it and keep it ready — no waiting at the counter.",
    icon: "M21 12a8 8 0 01-11.6 7.2L4 21l1.8-5.4A8 8 0 1121 12z",
  },
  {
    title: "Prices you can check",
    text: "Today's rates for every item are on this site — what you see here is what you pay at the shop.",
    icon: "M7 8h10M7 12h6m-8 8V6a2 2 0 012-2h10a2 2 0 012 2v14l-3-2-2 2-3-2-2 2-3-2-1 .7",
  },
];

export default async function HomePage() {
  const products = await getProducts();
  const highlights = [
    ...products.filter((p) => p.tag && p.stock > 0),
    ...products.filter((p) => !p.tag && p.stock > 0),
  ].slice(0, 4);

  return (
    <>
      <div className="hero landing-hero">
        <div className="inner">
          <div className="eyebrow">
            Since {STORE.since} · {STORE.place}
          </div>
          <h1>{STORE.name}</h1>
          <div className="tamil-tagline">{STORE.tamilTagline}</div>
          <p>
            A family-run paruppu mill and provision store serving {STORE.place} since{" "}
            {STORE.since} — dals milled fresh in-house at direct mill prices, everyday provisions,
            chekku oils, and honest loose-item weighing.
          </p>
          <div className="cta-row">
            <Link href="/products" className="btn primary big">
              See today&rsquo;s stock &amp; prices
            </Link>
            <a
              className="btn big"
              href={`https://wa.me/${STORE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp us
            </a>
          </div>
          <div className="hero-badges">
            {STORE.services.map((s) => (
              <span className="hero-badge" key={s}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="stats-strip">
        <div className="inner">
          <div className="stat-item">
            <div className="stat-num">{new Date().getFullYear() - Number(STORE.since)}+</div>
            <div className="stat-label">years in {STORE.place}</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">{products.length}+</div>
            <div className="stat-label">items listed with today&rsquo;s price</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">7–9</div>
            <div className="stat-label">open every day, 7 am to 9 pm</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">2 min</div>
            <div className="stat-label">from the bus stand</div>
          </div>
        </div>
      </div>

      <section className="landing-section container">
        <h2 className="section-title">How we serve you</h2>
        <div className="service-cards">
          <div className="service-card">
            <div className="service-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6M9 11h.01M15 11h.01" />
              </svg>
            </div>
            <h3>Wholesale &amp; Retail</h3>
            <p>
              From a 100 g packet to bulk sacks at direct mill prices — one shop for households
              and businesses. {STORE.wholesaleNote}
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M3 7h11v10H3zM14 10h4l3 3v4h-7zM7.5 20a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </div>
            <h3>Doorstep Delivery</h3>
            <p>{STORE.deliveryNote} Send your list on WhatsApp and stay home — we&rsquo;ll come to you.</p>
          </div>
          <div className="service-card">
            <div className="service-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4zM9 12l2 2 4-4" />
              </svg>
            </div>
            <h3>Quality Matters Most</h3>
            <p>
              Every sack is hand-checked before it reaches the shelf — certified weighing, fresh
              grinding, and if anything isn&rsquo;t right, we replace it. No questions asked.
            </p>
          </div>
        </div>
      </section>

      <section className="landing-section container">
        <h2 className="section-title">Why {STORE.place} shops with us</h2>
        <div className="features-grid">
          {FEATURES.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d={f.icon} />
                </svg>
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section container">
        <div className="section-head">
          <h2 className="section-title">Today&rsquo;s highlights</h2>
          <Link href="/products" className="link-btn">
            See all items →
          </Link>
        </div>
        <div className="cards">
          {highlights.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="landing-section container">
        <div className="visit-card">
          <div>
            <h2 className="section-title">Visit us</h2>
            <p className="visit-line">{STORE.address}</p>
            <p className="visit-line">{STORE.landmark}</p>
            <p className="visit-line">
              <strong>{STORE.hours}</strong>
            </p>
          </div>
          <div className="visit-actions">
            <a className="btn primary" href={`tel:${STORE.phone.replace(/\s/g, "")}`}>
              Call {STORE.phone}
            </a>
            <a
              className="btn"
              href={`https://wa.me/${STORE.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
