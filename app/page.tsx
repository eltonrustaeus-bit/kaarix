import Image from "next/image";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
import ProductGrid from "@/components/ProductGrid";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import PageLoader from "@/components/PageLoader";

export default function Home() {
  return (
    <>
      <PageLoader />
      <Header />
      <Hero />

      <div className="strip">
        <div className="wrap">
          <span>Snabb leverans</span>
          <span className="dot" />
          <span>Fasta B2B-priser vid inloggning</span>
          <span className="dot" />
          <span>Beställning hanteras via KSB Teknik</span>
        </div>
      </div>

      <Featured />

      <section className="products" id="produkter">
        <div className="wrap">
          <Reveal>
            <div className="head">
              <div className="eyebrow-text">Sortiment</div>
              <h2>Vår belysning</h2>
              <p>
                Ett urval av Kaarix armaturer och strålkastare. Välj utförande och klicka på en
                produkt för att beställa.
              </p>
            </div>
          </Reveal>
          <ProductGrid />
        </div>

        <div className="notice">
          <div className="inner">
            Produktbilder, artikelnummer och länkar hämtas löpande från ksbteknik.se. Priser visas
            endast för inloggade kunder på nuvarande webshop, vilket denna sida speglar.
            &quot;Beställ&quot;-knapparna leder till respektive produkts riktiga sida på
            ksbteknik.se, där själva köpet genomförs.
          </div>
        </div>
      </section>

      <section className="brandblock" id="om">
        <Reveal>
          <div className="wrap">
            <Image
              className="icon"
              src="/images/kaarix-icon-square.png"
              alt="Kaarix ikon"
              width={96}
              height={96}
            />
            <div>
              <h3>Om Kaarix</h3>
              <p>
                Kaarix är KSB Tekniks egna varumärke för LED-belysning till industri, verkstad och
                lager. Genom att kombinera KSB Tekniks erfarenhet av elmateriel med noga utvalda
                armaturer erbjuder Kaarix pålitlig belysning till konkurrenskraftiga priser, med
                samma trygga leverans och kundservice som KSB Teknik står för.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <Contact />
      <Footer />
    </>
  );
}
