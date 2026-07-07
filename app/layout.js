import "./globals.css";
import Header from "@/components/Header";

export const metadata = {
  title: "terra&tone — everyday objects, built to outlast trends",
  description:
    "Small-batch homeware and workspace goods from independent makers. Powered by Vendora.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <footer className="site-footer">
          terra&amp;tone · powered by Vendora — free carbon-neutral shipping over $60
        </footer>
      </body>
    </html>
  );
}
