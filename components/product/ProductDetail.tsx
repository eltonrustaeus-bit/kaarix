"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/lib/products";
import BuyPanel from "./BuyPanel";
import Eyebrow from "@/components/ui/Eyebrow";

export default function ProductDetail({ product }: { product: Product }) {
  const [variantIndex, setVariantIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  // Varianter kan ha egen bild (svart/vit tracklight). Faller tillbaka på
  // produktens standardbild när varianten inte har någon.
  const image = product.variants[variantIndex]?.image ?? product.image;

  return (
    <div className="product-layout">
      <motion.div
        className="product-gallery"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          key={image}
          src={image}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 900px) 92vw, 48vw"
          style={{ objectFit: "contain" }}
        />
      </motion.div>

      <div className="product-info">
        <Eyebrow>{product.category}</Eyebrow>
        <h1>{product.name}</h1>
        <p className="lead">{product.tagline}</p>

        <BuyPanel product={product} onVariantChange={setVariantIndex} />
      </div>
    </div>
  );
}
