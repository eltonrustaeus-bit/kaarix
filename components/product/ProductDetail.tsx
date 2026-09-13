"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/lib/products";
import BuyPanel from "./BuyPanel";
import Eyebrow from "@/components/ui/Eyebrow";

/**
 * Produktsidans layout. På desktop ligger bilden kvar (sticky) medan allt
 * innehåll — köppanel, beskrivning och specifikation — rullar förbi i höger
 * spalt. Bilden är det man vill ha kvar i blickfånget medan man läser
 * specifikationer, och det utnyttjar desktopytan betydligt bättre än att
 * lägga en kort tvåspaltssektion överst och resten i fullbredd under.
 *
 * Innehållet skickas in som children och renderas på servern — den här
 * klientkomponenten äger bara det interaktiva (vald variant styr både bild,
 * artikelnummer och beställningslänk).
 */
export default function ProductDetail({
  product,
  children,
}: {
  product: Product;
  children?: ReactNode;
}) {
  const [variantIndex, setVariantIndex] = useState(0);
  const reduceMotion = useReducedMotion();

  const image = product.variants[variantIndex]?.image ?? product.image;

  return (
    <div className="product-layout">
      <div className="product-visual">
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
            sizes="(max-width: 1023px) 92vw, 46vw"
            style={{ objectFit: "contain" }}
          />
        </motion.div>

        {product.variants.length > 1 && (
          <p className="gallery-caption">{product.variants[variantIndex]?.label}</p>
        )}
      </div>

      <div className="product-main">
        <header className="product-head">
          <Eyebrow>{product.category}</Eyebrow>
          <h1>{product.name}</h1>
          <p className="lead">{product.tagline}</p>
        </header>

        <BuyPanel product={product} onVariantChange={setVariantIndex} />

        {children}
      </div>
    </div>
  );
}
