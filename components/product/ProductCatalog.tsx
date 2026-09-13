"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { categories, products, type Category } from "@/lib/products";
import ProductCard from "./ProductCard";

type Filter = (typeof categories)[number];

export default function ProductCatalog() {
  const [active, setActive] = useState<Filter>("Alla");
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(
    () =>
      active === "Alla" ? products : products.filter((p) => p.category === (active as Category)),
    [active]
  );

  return (
    <>
      {/* Detta är en grupp växlingsknappar, inte en tabb-lista: innehållet
          nedanför är en filtrerad lista, inte separata tabbpaneler. Därför
          aria-pressed på en vanlig knappgrupp — fel ARIA är sämre än ingen. */}
      <div className="filter-row" role="group" aria-label="Filtrera på kategori">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            className="filter-pill"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="card-grid">
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((product) => (
            <motion.div
              key={product.slug}
              layout={!reduceMotion}
              initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <p className="visually-hidden" role="status">
        {filtered.length} produkter visas.
      </p>
    </>
  );
}
