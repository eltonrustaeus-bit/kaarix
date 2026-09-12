"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // Subtil parallax: bakgrunden rör sig långsammare än scrollen, max 60px.
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section className="hero" id="top" ref={ref}>
      <div className="hero-bg-wrap">
        <motion.div className="hero-bg-img" style={{ y }}>
          <Image
            src="/images/hero-warehouse.jpg"
            alt="Industrilokal belyst med LED-armaturer"
            fill
            priority
            quality={68}
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 65%" }}
          />
        </motion.div>
        <div className="hero-overlay" />
      </div>
      <motion.div
        className="wrap hero-content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1 variants={item}>
          Industribelysning för <span>krävande miljöer</span>
        </motion.h1>
        <motion.p variants={item}>
          Kaarix utvecklar LED-armaturer, strålkastare och tillbehör för verkstad, lager och
          industri. Hög ljusstyrka och robust konstruktion till konkurrenskraftigt pris.
        </motion.p>
        <motion.div className="cta-row" variants={item}>
          <a className="btn btn-red" href="#produkter">
            Utforska produkterna
          </a>
          <a className="btn btn-outline" href="#kontakt">
            Kontakta oss
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
