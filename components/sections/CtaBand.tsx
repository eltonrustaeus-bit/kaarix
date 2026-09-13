import { contact } from "@/lib/contact";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight, Mail, Phone } from "@/components/ui/Icon";

export default function CtaBand() {
  return (
    <section className="cta-band glow-top">
      <div className="container cta-band-inner">
        <Reveal>
          <Eyebrow>Kontakt</Eyebrow>
          <h2>Osäker på vilken armatur som passar?</h2>
          <p>
            Hör av dig till {contact.name.split(" ")[0]} på KSB Teknik så går vi igenom behov,
            pris och leveranstid tillsammans.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
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
        </Reveal>
      </div>
    </section>
  );
}
