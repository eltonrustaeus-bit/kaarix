import type { Metadata } from "next";
import ProductCatalog from "@/components/product/ProductCatalog";
import CtaBand from "@/components/sections/CtaBand";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { Info } from "@/components/ui/Icon";
import { storeUrl } from "@/lib/products";

export const metadata: Metadata = {
  title: "Produkter",
  description:
    "Hela Kaarix-sortimentet: industriarmaturer, strålkastare och skenbelysning för verkstad, lager och industri.",
};

export default function ProductsPage() {
  return (
    <>
      <section className="section glow-top">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <Eyebrow>Sortiment</Eyebrow>
              <h1>Kaarix belysning</h1>
              <p className="lead">
                Alla produkter finns i KSB Tekniks webshop. Välj en produkt för fullständiga
                tekniska data, utföranden och artikelnummer.
              </p>
            </div>
          </Reveal>

          <div style={{ marginTop: "var(--space-8)" }}>
            <ProductCatalog />
          </div>

          <div className="notice" style={{ marginTop: "var(--space-9)" }}>
            <Info />
            <p>
              Sortimentet fylls på löpande. Den alltid aktuella listan finns hos{" "}
              <a
                href={storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--text)", fontWeight: 600 }}
              >
                KSB Teknik
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
