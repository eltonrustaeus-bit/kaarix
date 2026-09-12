import Image from "next/image";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <>
      <header className="site">
        <div className="bar wrap">
          <a className="logo" href="#top">
            <Image
              src="/images/kaarix-logo-original.png"
              alt="Kaarix"
              width={240}
              height={91}
              style={{ height: 34, width: "auto" }}
              priority
            />
          </a>
          <nav className="main">
            <a href="#produkter">Belysning</a>
            <a href="#om">Om Kaarix</a>
            <a href="#kontakt">Kontakt</a>
          </nav>
          <a className="btn btn-red btn-small" href="#produkter">
            Se sortimentet
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="wrap">
          <div className="tag">Kaarix — industribelysning</div>
          <h1>
            Belysning byggd för <span>krävande industrimiljöer</span>
          </h1>
          <p>
            Kaarix utvecklar LED-armaturer, strålkastare och tillbehör för
            verkstad, lager och industri — hög ljusstyrka, lång livslängd och
            robust konstruktion till konkurrenskraftigt pris.
          </p>
          <div className="cta-row">
            <a className="btn btn-red" href="#produkter">
              Utforska produkterna
            </a>
            <a className="btn btn-outline" href="#kontakt">
              Kontakta oss
            </a>
          </div>
        </div>
      </section>

      <div className="strip">
        <div className="wrap">
          <span>Snabb leverans</span>
          <span className="dot" />
          <span>Fasta B2B-priser vid inloggning</span>
          <span className="dot" />
          <span>Beställning hanteras via KSB Teknik</span>
        </div>
      </div>

      <section className="products" id="produkter">
        <div className="wrap">
          <div className="head">
            <div className="eyebrow">Sortiment</div>
            <h2>Vår belysning</h2>
            <p>
              Ett urval av Kaarix armaturer och strålkastare. Klicka på en
              produkt för specifikationer, pris och beställning.
            </p>
          </div>
          <div className="grid">
            {products.map((p) => (
              <div className="card" key={p.sku}>
                <div className="imgwrap">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={300}
                    height={270}
                    style={{ height: "100%", width: "auto" }}
                  />
                </div>
                <div className="body">
                  <div className="cat">{p.category}</div>
                  <h3>{p.name}</h3>
                  <div className="spec">{p.spec}</div>
                  <div className="foot">
                    <span className="price">Logga in för pris</span>
                    <a
                      className="btn btn-red btn-small order"
                      href={p.orderUrl}
                      target="_blank"
                      rel="noopener"
                    >
                      Beställ
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="notice">
          <div className="inner">
            Produktbilder, artikelnummer och länkar hämtas löpande från
            ksbteknik.se. Priser visas endast för inloggade kunder på
            nuvarande webshop, vilket denna sida speglar.
            &quot;Beställ&quot;-knapparna leder till respektive produkts
            riktiga sida på ksbteknik.se, där själva köpet genomförs.
          </div>
        </div>
      </section>

      <section className="brandblock" id="om">
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
              Kaarix är KSB Tekniks egna varumärke för LED-belysning till
              industri, verkstad och lager. Genom att kombinera KSB Tekniks
              erfarenhet av elmateriel med noga utvalda armaturer erbjuder
              Kaarix pålitlig belysning till konkurrenskraftiga priser — med
              samma trygga leverans och kundservice som KSB Teknik står för.
            </p>
          </div>
        </div>
      </section>

      <footer className="site" id="kontakt">
        <div className="wrap">
          <a className="logo" href="#top">
            <Image
              src="/images/kaarix-logo-original.png"
              alt="Kaarix"
              width={180}
              height={68}
              style={{ height: 26, width: "auto" }}
            />
          </a>
          <div className="meta">
            Kaarix är ett varumärke inom KSB Teknik &middot; Beställningar
            hanteras via{" "}
            <a href="https://ksbteknik.se" target="_blank" rel="noopener">
              ksbteknik.se
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
