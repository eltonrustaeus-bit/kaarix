"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import { ArrowRight } from "@/components/ui/Icon";

/** Verifierade siffror från KSB:s egna produktblad — inga påhittade nyckeltal. */
const facts = [
  { label: "Ljusutbyte", value: "160 lm/W" },
  { label: "Kapslingsklass", value: "IP65" },
  { label: "Garanti", value: "5 år" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 70]);

  /*
   * Vid reducerad rörelse sätts initial={false} — elementet renderas direkt
   * i sitt slutläge. Returnera ALDRIG ett tomt propsobjekt i stället: då
   * ligger den inline-satta opacity: 0 från första renderingen kvar och
   * innehållet blir permanent osynligt efter hydrering.
   */
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
            industri — byggda för kontinuerlig drift, med dokumenterad prestanda och fem års
            garanti.
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

        {/* Dekorativ — produkten presenteras med namn längre ner på sidan.
            Visas bara från 1120px och uppåt, se .hero-product i CSS. */}
        <motion.div
          className="hero-product"
          aria-hidden="true"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
          }
        >
          <Image
            src="/images/austin-cutout.png"
            alt=""
            fill
            priority
            sizes="(max-width: 1119px) 10px, 44vw"
            style={{ objectFit: "contain" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
