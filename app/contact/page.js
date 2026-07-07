import { getReviews } from "@/lib/reviews";
import { initials } from "@/components/ProductCard";
import MessageForm from "@/components/MessageForm";
import { STORE } from "@/lib/store";

export const metadata = {
  title: `Contact & visit us — ${STORE.name}, ${STORE.place}`,
  description: `Find ${STORE.name} on the map, see customer reviews, call or WhatsApp us. ${STORE.hours}.`,
};

const AVATAR_COLORS = [
  ["#0e6b52", "#3aa981"],
  ["#a16207", "#e5ad33"],
  ["#8a5a2b", "#c08a4e"],
  ["#2c6e8a", "#5fa3be"],
  ["#7a5c61", "#ad8a90"],
  ["#5f7161", "#93a796"],
];

function Stars({ rating }) {
  return (
    <span className="stars" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= rating ? "star" : "star dim"}>
          ★
        </span>
      ))}
    </span>
  );
}

export default async function ContactPage() {
  const reviews = await getReviews();
  const avg = reviews.length
    ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
    : 0;

  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(STORE.mapQuery)}&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    STORE.mapQuery
  )}`;
  const reviewUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    STORE.mapQuery
  )}`;

  return (
    <>
      <div className="hero slim">
        <div className="inner">
          <div className="eyebrow">We reply on WhatsApp within minutes</div>
          <h1>Contact &amp; visit us</h1>
          <p>
            {STORE.name} is on Main Road, {STORE.landmark.toLowerCase()}. Call, message, or just
            walk in — {STORE.hours.toLowerCase()}.
          </p>
        </div>
      </div>

      <section className="landing-section container">
        <div className="contact-grid">
          <div className="contact-card">
            <h2 className="section-title">Talk to us</h2>
            <a className="phone-big" href={`tel:${STORE.phone.replace(/\s/g, "")}`}>
              {STORE.phone}
            </a>
            <div className="visit-actions" style={{ marginTop: 14 }}>
              <a
                className="btn primary"
                href={`https://wa.me/${STORE.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Message on WhatsApp
              </a>
              <a className="btn" href={`tel:${STORE.phone.replace(/\s/g, "")}`}>
                Call the shop
              </a>
            </div>

            <h3 className="contact-sub">Address</h3>
            <p className="visit-line">{STORE.address}</p>
            <p className="visit-line">{STORE.landmark}</p>

            <h3 className="contact-sub">Doorstep delivery</h3>
            <p className="visit-line">{STORE.deliveryNote}</p>

            <h3 className="contact-sub">Wholesale orders</h3>
            <p className="visit-line">{STORE.wholesaleNote}</p>

            <h3 className="contact-sub">Shop hours</h3>
            <table className="hours-table">
              <tbody>
                <tr>
                  <td>Monday – Saturday</td>
                  <td>7.00 am – 9.00 pm</td>
                </tr>
                <tr>
                  <td>Sunday</td>
                  <td>7.00 am – 9.00 pm</td>
                </tr>
                <tr>
                  <td>Festival days</td>
                  <td>Open — call to confirm hours</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="map-card">
            <iframe
              className="map-frame"
              src={mapSrc}
              title={`Map showing ${STORE.name}, ${STORE.place}`}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="map-foot">
              <span>
                {STORE.name} · {STORE.place}
              </span>
              <a className="btn primary" href={directionsUrl} target="_blank" rel="noopener noreferrer">
                Get directions
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section container">
        <div className="reviews-summary">
          <div className="avg-box">
            <div className="avg-num">{avg}</div>
            <div>
              <Stars rating={Math.round(avg)} />
              <div className="avg-sub">Based on {reviews.length} customer reviews</div>
            </div>
          </div>
          <a className="btn" href={reviewUrl} target="_blank" rel="noopener noreferrer">
            Write a review on Google
          </a>
        </div>

        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <figure className="review-card" key={r.name}>
              <div className="review-head">
                <span
                  className="avatar"
                  style={{
                    background: `linear-gradient(135deg, ${AVATAR_COLORS[i % AVATAR_COLORS.length][0]}, ${
                      AVATAR_COLORS[i % AVATAR_COLORS.length][1]
                    })`,
                  }}
                  aria-hidden="true"
                >
                  {initials(r.name)}
                </span>
                <div>
                  <figcaption className="review-name">{r.name}</figcaption>
                  <div className="review-meta">
                    <Stars rating={r.rating} />
                    <span className="review-date">{r.date}</span>
                  </div>
                </div>
              </div>
              <blockquote className="review-text">“{r.text}”</blockquote>
            </figure>
          ))}
        </div>
      </section>

      <section className="landing-section container">
        <div className="panel">
          <h2 className="section-title">Send us a message</h2>
          <MessageForm />
        </div>
      </section>
    </>
  );
}
