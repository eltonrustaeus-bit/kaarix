import Image from "next/image";
import type { Product } from "@/lib/products";
import Button from "@/components/ui/Button";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icon";

export default function Spotlight({ product }: { product: Product }) {
  return (
    <section className="section-lg">
      <div className="container spotlight">
        <Reveal className="spotlight-media">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 900px) 92vw, 48vw"
            style={{ objectFit: "contain" }}
          />
        </Reveal>

        <Reveal className="spotlight-body" delay={0.08}>
          <Eyebrow>Flaggskepp</Eyebrow>
          <h2>{product.shortName}</h2>
          <p className="muted">{product.description[0]}</p>

          <ul className="spec-list">
            {product.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>

          <Button href={`/produkter/${product.slug}`}>
            Se specifikationer
            <ArrowRight />
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
