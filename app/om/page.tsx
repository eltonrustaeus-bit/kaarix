import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "@/components/sections/CtaBand";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icon";
import { storeUrl } from "@/lib/products";

export const metadata: Metadata = {
  title: "Om Kaarix",
  description:
    "Kaarix är KSB Tekniks eget varumärke för LED-belysning till industri, verkstad och lager.",
};

const principles = [
  {
    title: "Rätt ljus för uppgiften",
    body: "Ett lager behöver jämn allmänbelysning, en lastkaj behöver riktad effekt och ett showroom behöver kontroll över ljusbilden. Sortimentet är uppbyggt kring de behoven istället för att sälja en armatur till allt.",
  },
  {
    title: "Specifikationer som håller",
    body: "Varje produkt levereras med produktblad: ljusflöde, färgtemperatur, CRI, spridningsvinkel, kapslingsklass och certifieringar. Det som står i bladet är det du får.",
  },
  {
    title: "Byggt på KSB:s logistik",
    body: "Kaarix är inte ett fristående bolag med egen orderhantering. Produkterna ligger i KSB Tekniks ordinarie sortiment, med samma leveranser, priser och kundkontakt som resten av deras elmateriel.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="section glow-top">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <Eyebrow>Om Kaarix</Eyebrow>
              <h1>Ett belysningsvarumärke byggt inifrån elgrossisten</h1>
              <p className="lead">
                Kaarix är KSB Tekniks eget varumärke för LED-belysning. Idén är enkel: ta
                erfarenheten från att sälja elmateriel till svensk industri och använda den för
                att välja ut armaturer som faktiskt håller i de miljöerna.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container split">
          <Reveal>
            <div
              style={{
                position: "relative",
                aspectRatio: "4 / 3",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
              }}
            >
              <Image
                src="/images/hero-warehouse.jpg"
                alt="Industrilokal belyst med LED-armaturer i taket"
                fill
                sizes="(max-width: 860px) 92vw, 46vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Eyebrow>Bakgrund</Eyebrow>
            <h2 style={{ fontSize: "var(--text-h2)", marginBlock: "var(--space-4)" }}>
              Från grossistsortiment till eget varumärke
            </h2>
            <div className="product-prose">
              <p>
                KSB Teknik levererar elmateriel till verkstäder, industrier och installatörer.
                Belysning har alltid varit en del av sortimentet — men ofta som enskilda produkter
                från många olika tillverkare, med spretig kvalitet och dokumentation.
              </p>
              <p>
                Kaarix samlar belysningen under ett namn med gemensamma krav: dokumenterad
                prestanda, robust konstruktion och fem års garanti. Först ut är
                industriarmaturer, strålkastare och skenbelysning.
              </p>
            </div>
            <div style={{ marginTop: "var(--space-7)" }}>
              <Button href="/produkter">
                Se sortimentet
                <ArrowRight />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-divider grid-surface">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <Eyebrow>Så tänker vi</Eyebrow>
              <h2>Tre principer bakom sortimentet</h2>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="feature-grid" style={{ marginTop: "var(--space-8)" }}>
              {principles.map((p, i) => (
                <article className="feature" key={p.title}>
                  <p className="feature-index">{String(i + 1).padStart(2, "0")}</p>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div style={{ marginTop: "var(--space-8)" }}>
              <Button href={storeUrl} variant="secondary">
                Kaarix hos KSB Teknik
                <ArrowRight />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
