import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Självhostade variabla typsnittsfiler (hämtade från Google Fonts, ligger i public/fonts).
// Självhostning = ingen extern request till Google vid sidladdning, snabbare och mer robust.
// Space Grotesk ersätter Archivo som rubriktypsnitt: mer distinkt/tekniskt uttryck (geometriska
// former med ett litet twist i "a"/"t"/"g") som passar ett industriellt LED-varumärke bättre.
const displayFont = localFont({
  src: "../public/fonts/SpaceGrotesk-Variable.woff2",
  weight: "500 700",
  variable: "--font-display",
  display: "swap",
});

const plexSans = localFont({
  src: "../public/fonts/IBMPlexSans-Variable.woff2",
  weight: "400 600",
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kaarix – Industribelysning",
  description:
    "Kaarix utvecklar LED-armaturer, strålkastare och tillbehör för verkstad, lager och industri.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" className={`${displayFont.variable} ${plexSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
