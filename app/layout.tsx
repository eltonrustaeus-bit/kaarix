import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

/*
 * Självhostade variabla typsnitt (filerna ligger i public/fonts).
 *
 * VIKTIGT: variabelnamnen här måste skilja sig från de namn som CSS:en
 * definierar sina fallback-stackar under. next/font sätter variabeln på
 * <html>, vilket ÄR :root — så om CSS:en skriver
 *   --font-display: var(--font-display), "Space Grotesk", sans-serif;
 * refererar variabeln sig själv, blir ogiltig, och hela sajten faller
 * tillbaka på webbläsarens standardserif (Times). Den buggen låg live.
 * Därför: next/font äger *-src, CSS:en bygger den färdiga stacken.
 */
const displayFont = localFont({
  src: "../public/fonts/SpaceGrotesk-Variable.woff2",
  weight: "500 700",
  variable: "--font-display-src",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const bodyFont = localFont({
  src: "../public/fonts/IBMPlexSans-Variable.woff2",
  weight: "400 600",
  variable: "--font-body-src",
  display: "swap",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kaarix.vercel.app"),
  title: {
    default: "Kaarix — Industribelysning för krävande miljöer",
    template: "%s — Kaarix",
  },
  description:
    "Kaarix utvecklar LED-armaturer, strålkastare och skenbelysning för verkstad, lager och industri. Ett varumärke inom KSB Teknik.",
  openGraph: {
    type: "website",
    locale: "sv_SE",
    siteName: "Kaarix",
    title: "Kaarix — Industribelysning för krävande miljöer",
    description:
      "LED-armaturer, strålkastare och skenbelysning för verkstad, lager och industri. Ett varumärke inom KSB Teknik.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Hoppa till innehåll
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
