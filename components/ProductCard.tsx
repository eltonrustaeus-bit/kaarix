"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/products";
import { tracklightImageByFinish } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const [selected, setSelected] = useState(0);
  const variant = product.variants[selected];

  // Tracklighten byter produktbild beroende på vald kulör (svart/vit).
  let image = product.image;
  if (product.slug === "tracklight-cob-led") {
    if (variant.label.includes("VIT")) image = tracklightImageByFinish.VIT;
    else image = tracklightImageByFinish.SVART;
  }

  return (
    <motion.div
      className="card"
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
      layout
    >
      <div className="imgwrap">
        <motion.div
          key={image}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          style={{ height: "100%", width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Image
            src={image}
            alt={product.name}
            width={300}
            height={270}
            style={{ height: "100%", width: "auto" }}
          />
        </motion.div>
      </div>
      <div className="body">
        <div className="cat">{product.category}</div>
        <h3>{product.name}</h3>
        <div className="spec">{product.spec}</div>

        {product.variants.length > 1 && (
          <div className="variant-row" role="group" aria-label={product.variantLabel}>
            {product.variants.map((v, i) => (
              <button
                key={v.sku}
                type="button"
                className={`variant-pill${i === selected ? " active" : ""}`}
                onClick={() => setSelected(i)}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        <div className="foot">
          <span className="price">Logga in för pris</span>
        </div>
        <div className="cta-pair">
          <a
            className="btn btn-red btn-small order"
            href={variant.orderUrl}
            target="_blank"
            rel="noopener"
          >
            Beställ
          </a>
          <a className="btn btn-ghost btn-small" href="#kontakt">
            Fråga om offert
          </a>
        </div>
      </div>
    </motion.div>
  );
}
