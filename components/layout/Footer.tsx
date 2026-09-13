import Image from "next/image";
import Link from "next/link";
import { contact } from "@/lib/contact";
import { products, storeUrl } from "@/lib/products";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image
              src="/images/kaarix-logo-original.png"
              alt="Kaarix"
              width={240}
              height={91}
              sizes="110px"
            />
            <p>
              Kaarix är KSB Tekniks eget varumärke för LED-belysning till industri, verkstad och
              lager. Beställning och leverans sker via KSB Teknik.
            </p>
          </div>

          <div className="footer-col">
            <h2>Produkter</h2>
            <ul>
              {products.map((p) => (
                <li key={p.slug}>
                  <Link href={`/produkter/${p.slug}`}>{p.shortName}</Link>
                </li>
              ))}
              <li>
                <Link href="/produkter">Hela sortimentet</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h2>Kaarix</h2>
            <ul>
              <li>
                <Link href="/om">Om Kaarix</Link>
              </li>
              <li>
                <Link href="/kontakt">Kontakt</Link>
              </li>
              <li>
                <a href={storeUrl} target="_blank" rel="noopener noreferrer">
                  Webshop hos KSB
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h2>Kontakt</h2>
            <ul>
              <li>
                <a href={contact.phoneHref}>{contact.phone}</a>
              </li>
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <a href="https://ksbteknik.se" target="_blank" rel="noopener noreferrer">
                  ksbteknik.se
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {year} Kaarix — ett varumärke inom KSB Teknik.</p>
          <p>Priser visas för inloggade kunder hos KSB Teknik.</p>
        </div>
      </div>
    </footer>
  );
}
