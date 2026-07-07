import "./globals.css";
import Header from "@/components/Header";
import { STORE } from "@/lib/store";

export const metadata = {
  title: `${STORE.name}, ${STORE.place} — today's stock and prices`,
  description: `${STORE.tagline}. Check what's in stock and today's prices, make your list, and send it on WhatsApp — we'll keep it ready.`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <footer className="site-footer">
          {STORE.name} · {STORE.address} · {STORE.hours} · {STORE.phone}
        </footer>
      </body>
    </html>
  );
}
