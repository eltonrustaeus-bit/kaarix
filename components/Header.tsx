"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site${scrolled ? " scrolled" : ""}`}>
      <div className="bar wrap">
        <a className="logo" href="#top">
          <Image
            src="/images/kaarix-logo-original.png"
            alt="Kaarix"
            width={240}
            height={91}
            style={{ height: 30, width: "auto" }}
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
  );
}
