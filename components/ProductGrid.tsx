"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { categories, products } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const [active, setActive] = useState<(typeof categories)[number]>("Alla");

  const filtered = useMemo(
    () => (active === "Alla" ? products : products.filter((p) => p.category === active)),
    [active]
  );

  return (
    <>
      <div className="filter-row" role="tablist" aria-label="Filtrera produkter">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={active === c}
            className={`filter-pill${active === c ? " active" : ""}`}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {/*
        Den yttre wrappern sköter bara EN engångsanimation: att hela rutnätet
        tonas in när man scrollar ner till det första gången. Varje kort
        äger sedan sin egen mount/unmount-animation (se ProductCard), så att
        ett kort som filtreras bort och sedan tillbaka alltid tonas in på
        nytt — istället för att förlita sig på förälderns engångstrigger,
        vilket tidigare gjorde att produkter kunde "försvinna" permanent
        efter ett filterbyte tills sidan laddades om.
      */}
      <motion.div
        className="grid"
        layout
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((p) => (
            <ProductCard product={p} key={p.slug} />
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
