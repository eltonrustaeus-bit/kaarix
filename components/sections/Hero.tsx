"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/ui/Icon";

/*
 * Nyckeltalen måste gälla HELA sortimentet, annars är de vilseledande.
 * Kontrollerat mot KSB:s tre produktblad:
 *   Ljusutbyte  AUSTIN 180, Flood 150, Tracklight 90 lm/W  → "upp till 180"
 *   IP65        samtliga tre                               → gäller rakt av
 *   Livslängd   AUSTIN 50 000, Tracklight 50 000, Flood 100 000 h → "från 50 000"
 *
 * Garanti stod här tidigare som "5 år". Den är dokumenterad för AUSTIN och
 * Tracklight men anges INTE i Flood-produktbladen, så den dög inte som
 * löfte för hela sortimentet. Garantin står kvar på de produktsidor där den
 * faktiskt är belagd.
 */
const facts = [
  { label: "Ljusutbyte", value: "Upp till 180 lm/W" },
  { label: "Kapslingsklass", value: "IP65" },
  { label: "Teknisk livslängd", value: "Från 50 000 h" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 70]);

  const fade = (delay: number) => ({
    initial: reduceMotion ? (false as const) : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: reduceMotion
      ? { duration: 0 }
      : { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay },
  });

  return (
    <section className="hero" ref={ref}>
      <div className="hero-media">
        <motion.div className="hero-media-inner" style={reduceMotion ? undefined : { y }}>
          <Image
            src="/images/hero-warehouse.jpg"
            alt=""
            fill
            priority
            quality={70}
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center 62%" }}
          />
        </motion.div>
      </div>
      <div className="hero-scrim" />

      <div className="container hero-inner">
        <div className="hero-content">
          <motion.div {...fade(0)}>
            <Eyebrow>Industribelysning från KSB Teknik</Eyebrow>
          </motion.div>

          <motion.h1 {...fade(0.08)}>
            Ljus som håller för <em>krävande miljöer</em>
          </motion.h1>

          <motion.p className="lead hero-lead" {...fade(0.16)}>
            Kaarix utvecklar LED-armaturer, strålkastare och skenbelysning för verkstad, lager och
            industri — byggda för kontinuerlig drift, med fullständiga produktblad för varje
            artikel.
          </motion.p>

          <motion.div className="hero-actions" {...fade(0.24)}>
            <Button href="/produkter" size="lg">
              Se sortimentet
              <ArrowRight />
            </Button>
            <Button href="/kontakt" variant="secondary" size="lg">
              Begär offert
            </Button>
          </motion.div>
        </div>

        <motion.dl className="hero-facts" {...fade(0.32)}>
          {facts.map((f) => (
            <div className="hero-fact" key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
