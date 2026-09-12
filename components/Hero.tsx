"use client";

import { motion } from "framer-motion";

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
  return (
    <section className="hero" id="top">
      <div className="hero-bg" />
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
