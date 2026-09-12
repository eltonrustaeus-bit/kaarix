"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const points = ["7200 lumen", "IP65-klassad", "DALI-dimbar", "Vitt utförande"];

export default function Featured() {
  return (
    <section className="featured">
      <div className="wrap featured-grid">
        <motion.div
          className="featured-image"
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/images/austin.png"
            alt="Kaarix Industriarmatur AUSTIN"
            fill
            sizes="(max-width: 900px) 90vw, 45vw"
            style={{ objectFit: "contain" }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <div className="eyebrow-text">Flaggskepp</div>
          <h2>Industriarmatur AUSTIN</h2>
          <p className="featured-copy">
            Vår mest mångsidiga armatur. Byggd för kontinuerlig drift i verkstad och lager, med
            hög ljusstyrka utan att kompromissa på hållbarhet.
          </p>
          <ul className="featured-points">
            {points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <a
            className="btn btn-red"
            href="https://ksbteknik.se/product/tracklight-cob-led-30w-3-fas-3000k-fasdim-vit-kopia"
            target="_blank"
            rel="noopener"
          >
            Se produkten
          </a>
        </motion.div>
      </div>
    </section>
  );
}
