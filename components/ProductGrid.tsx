"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
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

      <motion.div
        className="grid"
        layout
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {filtered.map((p) => (
          <ProductCard product={p} key={p.slug} />
        ))}
      </motion.div>
    </>
  );
}
