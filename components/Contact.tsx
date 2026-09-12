import { contact } from "@/lib/contact";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section className="contact" id="kontakt">
      <div className="wrap">
        <Reveal>
          <div className="contact-card">
            <div className="contact-info">
              <div className="eyebrow-text">Kontakt</div>
              <h2>Fråga om offert eller sortiment</h2>
              <p>
                Hör av dig direkt till oss på KSB Teknik så hjälper vi dig med pris, leveranstid
                eller anpassade lösningar för ert behov.
              </p>
            </div>
            <div className="contact-person">
              <div className="contact-name">{contact.name}</div>
              <div className="contact-role">{contact.role}</div>
              <a className="contact-link" href={contact.phoneHref}>
                {contact.phone}
              </a>
              <a className="contact-link" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
              <a className="btn btn-red" href={`mailto:${contact.email}`}>
                Skicka mejl
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
