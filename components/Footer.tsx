import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site">
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
          Kaarix är ett varumärke inom KSB Teknik. Beställningar hanteras via{" "}
          <a href="https://ksbteknik.se" target="_blank" rel="noopener">
            ksbteknik.se
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
