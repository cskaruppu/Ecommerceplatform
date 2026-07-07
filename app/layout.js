import "./globals.css";
import Header from "@/components/Header";
import { STORE } from "@/lib/store";
import { getLang } from "@/lib/lang";
import { getT } from "@/lib/i18n";

export const metadata = {
  title: `${STORE.name}, ${STORE.place} — today's stock and prices`,
  description: `${STORE.tagline}. Check what's in stock and today's prices, make your list, and send it on WhatsApp — we'll keep it ready. Doorstep delivery in Perundurai; courier across India and abroad.`,
};

export default async function RootLayout({ children }) {
  const lang = await getLang();
  const t = getT(lang);

  return (
    <html lang={lang}>
      <body>
        <Header lang={lang} />
        <main>{children}</main>
        <footer className="site-footer">
          <div className="footer-services">{t.footerServices}</div>
          {lang === "ta" ? STORE.tamilName : STORE.name} · {t.address} · {t.hours} · {STORE.phone}
        </footer>
      </body>
    </html>
  );
}
