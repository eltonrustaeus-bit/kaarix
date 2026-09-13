import Link from "next/link";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import Spotlight from "@/components/sections/Spotlight";
import CtaBand from "@/components/sections/CtaBand";
import ProductCard from "@/components/product/ProductCard";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight, Info } from "@/components/ui/Icon";
import { getProduct, products } from "@/lib/products";

/*
 * Varje påstående här ska gå att belägga mot KSB:s produktblad.
 * IP65 och teknisk livslängd är kontrollerade för samtliga tre
 * produktfamiljer. Skriv inte "varje produkt har X" utan att ha läst X i
 * alla tre bladen — det var så en tidigare version kom att lova
 * spridningsvinkel och certifieringar även för Flood, där de inte anges.
 */
const reasons = [
  {
    title: "Byggt för drift dygnet runt",
    body: "Hela sortimentet är IP65-klassat och konstruerat för kontinuerlig drift i verkstad, lager och produktion, med en teknisk livslängd på minst 50 000 timmar.",
  },
  {
    title: "Dokumenterad prestanda",
    body: "Varje artikel har ett produktblad med effekt, ljusflöde, färgtemperatur, färgåtergivning och kapslingsklass. Siffrorna på den här sidan är hämtade därifrån.",
  },
  {
    title: "Samma leverans som KSB",
    body: "Kaarix ligger i KSB Tekniks ordinarie sortiment. Du beställer, får leverans och sköter fakturering precis som med övrigt elmateriel.",
  },
];

export default function HomePage() {
  const flagship = getProduct("industriarmatur-austin");

  return (
    <>
      <Hero />
      <TrustBar />

      {flagship && <Spotlight product={flagship} />}

      <section className="section section-divider">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <Eyebrow>Sortiment</Eyebrow>
              <h2>Tre produktfamiljer för olika behov</h2>
              <p className="lead">
                Från allmänbelysning i lagerhallen till riktad skenbelysning i butik. Välj
                produkt för specifikationer och utföranden.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="card-grid" style={{ marginTop: "var(--space-8)" }}>
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div style={{ marginTop: "var(--space-7)" }}>
              <Button href="/produkter" variant="secondary">
                Hela sortimentet
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
              <Eyebrow>Varför Kaarix</Eyebrow>
              <h2>Industrikvalitet utan industripris</h2>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="feature-grid" style={{ marginTop: "var(--space-8)" }}>
              {reasons.map((r, i) => (
                <article className="feature" key={r.title}>
                  <p className="feature-index">{String(i + 1).padStart(2, "0")}</p>
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="notice" style={{ marginTop: "var(--space-9)" }}>
              <Info />
              <p>
                Produktbilder, artikelnummer och länkar speglar KSB Tekniks webshop. Priser visas
                för inloggade kunder på{" "}
                <Link href="/kontakt" style={{ color: "var(--text)", fontWeight: 600 }}>
                  ksbteknik.se
                </Link>
                , och beställningen genomförs där.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
