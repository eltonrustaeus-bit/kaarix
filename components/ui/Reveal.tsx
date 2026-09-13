"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  /** Hur långt elementet reser sig. 0 ger ren toning. */
  y?: number;
  className?: string;
};

/**
 * Scroll-reveal med tre medvetna säkerhetsspärrar:
 *
 * 1. Varje instans äger sin EGEN animation och triggas av sin egen
 *    synlighet. Ärv aldrig synlighet från en förälders engångstrigger —
 *    det var orsaken till att produktkort kunde fastna osynliga efter
 *    filterbyte (se AGENTS.md).
 *
 * 2. Failsafe: om elementet redan syns i vyn men observern inte har
 *    rapporterat det, visas innehållet ändå.
 *
 * 3. Vid reducerad rörelse renderas ALLTID samma motion-element, bara utan
 *    animation (initial={false}). Byter man i stället ut motion.div mot en
 *    vanlig div efter hydrering återanvänder React DOM-noden och den
 *    inline-satta opacity: 0 blir kvar för alltid — sidan blev osynlig för
 *    just de användare som bad om mindre rörelse.
 */
export default function Reveal({ children, delay = 0, y = 16, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [failsafe, setFailsafe] = useState(false);

  useEffect(() => {
    if (inView || failsafe) return;

    const check = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) setFailsafe(true);
    };

    const timer = window.setTimeout(check, 1200);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [inView, failsafe]);

  const show = inView || failsafe || !!reduceMotion;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }
      }
    >
      {children}
    </motion.div>
  );
}
