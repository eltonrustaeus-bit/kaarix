"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import Button from "@/components/ui/Button";
import { ArrowRight, External } from "@/components/ui/Icon";

/**
 * Variantväljaren styr både artikelnummer och vilken produktsida
 * "Beställ"-knappen leder till hos KSB. Bilden uppdateras i förälder via
 * onVariantChange när varianten har en egen bild.
 */
export default function BuyPanel({
  product,
  onVariantChange,
}: {
  product: Product;
  onVariantChange?: (index: number) => void;
}) {
  const [selected, setSelected] = useState(0);
  const variant = product.variants[selected];

  const select = (i: number) => {
    setSelected(i);
    onVariantChange?.(i);
  };

  return (
    <div className="product-buy">
      {product.variants.length > 1 && (
        <>
          <span className="field-label" id="variant-label">
            {product.variantLabel}
          </span>
          <div className="variant-row" role="group" aria-labelledby="variant-label">
            {product.variants.map((v, i) => (
              <button
                key={v.sku}
                type="button"
                className="variant-pill"
                aria-pressed={i === selected}
                onClick={() => select(i)}
              >
                {v.label}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="buy-meta">
        <span className="buy-sku">
          Artikelnr <strong>{variant.sku}</strong>
        </span>
        <span className="buy-price">Logga in hos KSB för pris</span>
      </div>

      <div className="buy-actions">
        <Button href={variant.orderUrl}>
          Beställ
          <External />
        </Button>
        <Button href="/kontakt" variant="secondary">
          Begär offert
          <ArrowRight />
        </Button>
      </div>

      <p className="buy-note">
        Beställning genomförs i KSB Tekniks webshop, där priser visas för inloggade kunder.
      </p>
    </div>
  );
}
