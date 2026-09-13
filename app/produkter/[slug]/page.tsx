import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductDetail from "@/components/product/ProductDetail";
import ProductCard from "@/components/product/ProductCard";
import CtaBand from "@/components/sections/CtaBand";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import { getProduct, products, relatedProducts } from "@/lib/products";

type Params = { params: { slug: string } };

/** Alla produktsidor förrenderas vid build — inget klientanrop vid besök. */
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const product = getProduct(params.slug);
  if (!product) return { title: "Produkten finns inte" };

  return {
    title: product.shortName,
    description: product.tagline,
    openGraph: {
      title: `${product.name} — Kaarix`,
      description: product.tagline,
      images: [{ url: product.image }],
    },
  };
}

export default function ProductPage({ params }: Params) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = relatedProducts(product.slug);

  return (
    <>
      <div className="container">
        <nav className="breadcrumb" aria-label="Brödsmulor">
          <Link href="/">Start</Link>
          <span className="breadcrumb-sep" aria-hidden="true">
            /
          </span>
          <Link href="/produkter">Produkter</Link>
          <span className="breadcrumb-sep" aria-hidden="true">
            /
          </span>
          <span aria-current="page">{product.shortName}</span>
        </nav>

        <ProductDetail product={product}>
          <section className="product-block">
            <h2>Konstruktion och användning</h2>
            <div className="product-prose">
              {product.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <div className="product-subgrid">
              <div>
                <p className="field-label">Typiska användningsområden</p>
                <ul className="chip-row">
                  {product.applications.map((a) => (
                    <li className="chip" key={a}>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="field-label">Nyckelegenskaper</p>
                <ul className="spec-list spec-list-single">
                  {product.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="product-block">
            <h2>Tekniska data</h2>
            <table className="spec-table">
              <caption className="visually-hidden">Tekniska data för {product.name}</caption>
              <tbody>
                {product.specs.map((spec) => (
                  <tr key={spec.label}>
                    <th scope="row">{spec.label}</th>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {product.specNote && <p className="spec-note">{product.specNote}</p>}
          </section>
        </ProductDetail>
      </div>

      {related.length > 0 && (
        <section className="section section-divider">
          <div className="container">
            <Reveal>
              <div className="section-head">
                <Eyebrow>Mer från Kaarix</Eyebrow>
                <h2>Andra produkter</h2>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="card-grid card-grid-pair" style={{ marginTop: "var(--space-7)" }}>
                {related.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
