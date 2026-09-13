import type { Metadata } from "next";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { ArrowRight, Mail, Phone } from "@/components/ui/Icon";
import { contact } from "@/lib/contact";
import { storeUrl } from "@/lib/products";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Kontakta KSB Teknik för pris, leveranstid eller teknisk rådgivning om Kaarix belysning.",
};

const helpWith = [
  "Pris och offert på hela sortimentet",
  "Leveranstid och lagerstatus",
  "Val av armatur för en specifik lokal",
  "Produktblad och tekniska underlag",
];

export default function ContactPage() {
  return (
    <>
      <section className="section glow-top">
        <div className="container split">
          <Reveal>
            <Eyebrow>Kontakt</Eyebrow>
            <h1 style={{ fontSize: "var(--text-h2)", marginBlock: "var(--space-4)" }}>
              Prata med någon som kan belysning
            </h1>
            <p className="lead">
              Kaarix säljs och levereras av KSB Teknik. Hör av dig direkt så får du hjälp med pris,
              leveranstid eller vilken armatur som passar er lokal.
            </p>

            <p className="field-label" style={{ marginTop: "var(--space-8)" }}>
              Vi hjälper till med
            </p>
            <ul className="spec-list spec-list-single">
              {helpWith.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div>
              <div className="contact-card">
                <div>
                  <p className="contact-name">{contact.name}</p>
                  <p className="contact-role">{contact.role}</p>
                </div>
                <div className="contact-rows">
                  <a className="contact-row" href={contact.phoneHref}>
                    <Phone />
                    {contact.phone}
                  </a>
                  <a className="contact-row" href={`mailto:${contact.email}`}>
                    <Mail />
                    {contact.email}
                  </a>
                </div>
                <Button href={`mailto:${contact.email}`} block>
                  Skicka mejl
                  <ArrowRight />
                </Button>
              </div>

              <p
                className="subtle"
                style={{ marginTop: "var(--space-6)", fontSize: "var(--text-sm)" }}
              >
                Vill du beställa direkt finns hela sortimentet i{" "}
                <a
                  href={storeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--text)", fontWeight: 600 }}
                >
                  KSB Tekniks webshop
                </a>
                , där priser visas för inloggade kunder.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
