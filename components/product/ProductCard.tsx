import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { ArrowRight } from "@/components/ui/Icon";

export default function ProductCard({ product }: { product: Product }) {
  const variantText =
    product.variants.length > 1 ? `${product.variants.length} utföranden` : "1 utförande";

  return (
    <article className="product-card">
      <div className="product-card-media">
        <div className="product-card-media-inner">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      <div className="product-card-body">
        <span className="tag">{product.category}</span>
        <h3>
          {/* Länken täcker hela kortet via ::after, men bara denna länk
              ligger i tabbordningen — ett klickbart kort ska inte ge
              tangentbordsanvändare tre stopp för samma mål. */}
          <Link href={`/produkter/${product.slug}`}>{product.shortName}</Link>
        </h3>
        <p className="product-card-summary">{product.summary}</p>

        <div className="product-card-foot">
          <span className="variant-count">{variantText}</span>
          <span className="link-arrow" aria-hidden="true">
            Läs mer
            <ArrowRight />
          </span>
        </div>
      </div>
    </article>
  );
}
