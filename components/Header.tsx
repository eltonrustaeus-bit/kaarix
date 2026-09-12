"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { href: "#produkter", label: "Belysning" },
  { href: "#om", label: "Om Kaarix" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Stäng mobilmenyn automatiskt om fönstret blir tillräckligt brett för desktop-navigationen.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 720) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Lås bakgrundsscroll när mobilmenyn är öppen.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

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
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <a className="btn btn-red btn-small cta-desktop" href="#produkter">
          Se sortimentet
        </a>

        <button
          type="button"
          className={`menu-toggle${menuOpen ? " open" : ""}`}
          aria-label={menuOpen ? "Stäng meny" : "Öppna meny"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="wrap mobile-nav-inner">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={close}>
                  {l.label}
                </a>
              ))}
              <a className="btn btn-red" href="#produkter" onClick={close}>
                Se sortimentet
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
