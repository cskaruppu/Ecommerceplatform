import { getReviews } from "@/lib/reviews";
import { initials } from "@/components/ProductCard";
import MessageForm from "@/components/MessageForm";
import { STORE } from "@/lib/store";
import { getLang } from "@/lib/lang";
import { getT, fmt } from "@/lib/i18n";

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
  const lang = await getLang();
  const t = getT(lang);
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
  const displayName = lang === "ta" ? STORE.tamilName : STORE.name;

  return (
    <>
      <div className="hero slim">
        <div className="inner">
          <div className="eyebrow">{t.contactEyebrow}</div>
          <h1>{t.contactTitle}</h1>
          <p>{fmt(t.contactPara, { name: displayName })}</p>
        </div>
      </div>

      <section className="landing-section container">
        <div className="contact-grid">
          <div className="contact-card">
            <h2 className="section-title">{t.talkTitle}</h2>
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
                {t.msgWhatsApp}
              </a>
              <a className="btn" href={`tel:${STORE.phone.replace(/\s/g, "")}`}>
                {t.callShop}
              </a>
            </div>

            <h3 className="contact-sub">{t.addressSub}</h3>
            <p className="visit-line">{t.address}</p>
            <p className="visit-line">{t.landmark}</p>

            <h3 className="contact-sub">{t.deliverySub}</h3>
            <p className="visit-line">{t.deliveryNote}</p>

            <h3 className="contact-sub">{t.wholesaleSub}</h3>
            <p className="visit-line">{t.wholesaleNote}</p>

            <h3 className="contact-sub">{t.courierSub}</h3>
            <p className="visit-line">{t.courierNote}</p>

            <h3 className="contact-sub">{t.hoursSub}</h3>
            <table className="hours-table">
              <tbody>
                <tr>
                  <td>{t.monSat}</td>
                  <td>{t.hoursVal}</td>
                </tr>
                <tr>
                  <td>{t.sunday}</td>
                  <td>{t.hoursVal}</td>
                </tr>
                <tr>
                  <td>{t.festival}</td>
                  <td>{t.festivalVal}</td>
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
                {displayName} · {lang === "ta" ? "பெருந்துறை" : STORE.place}
              </span>
              <a className="btn primary" href={directionsUrl} target="_blank" rel="noopener noreferrer">
                {t.getDirections}
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
              <div className="avg-sub">{fmt(t.basedOn, { n: reviews.length })}</div>
            </div>
          </div>
          <a className="btn" href={reviewUrl} target="_blank" rel="noopener noreferrer">
            {t.writeReview}
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
          <h2 className="section-title">{t.msgTitle}</h2>
          <MessageForm lang={lang} />
        </div>
      </section>
    </>
  );
}
