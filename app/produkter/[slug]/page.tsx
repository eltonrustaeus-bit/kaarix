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
  const half = Math.ceil(product.specs.length / 2);
  const specColumns = [product.specs.slice(0, half), product.specs.slice(half)];

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
      </div>

      <section style={{ paddingBottom: "var(--section-y)" }}>
        <div className="container">
          <ProductDetail product={product} />
        </div>
      </section>

      <section className="section section-divider">
        <div className="container split">
          <Reveal>
            <Eyebrow>Om produkten</Eyebrow>
            <h2 style={{ fontSize: "var(--text-h2)", marginBlock: "var(--space-4)" }}>
              Konstruktion och användning
            </h2>
            <div className="product-prose">
              {product.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="panel">
              <p className="field-label">Typiska användningsområden</p>
              <ul className="chip-row">
                {product.applications.map((a) => (
                  <li className="chip" key={a}>
                    {a}
                  </li>
                ))}
              </ul>

              <p className="field-label" style={{ marginTop: "var(--space-7)" }}>
                Nyckelegenskaper
              </p>
              <ul className="spec-list" style={{ margin: 0, gridTemplateColumns: "1fr" }}>
                {product.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section-divider">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <Eyebrow>Tekniska data</Eyebrow>
              <h2>Specifikation</h2>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="spec-columns" style={{ marginTop: "var(--space-7)" }}>
              {specColumns.map((column, i) => (
                <table className="spec-table" key={i}>
                  <caption className="visually-hidden">
                    Tekniska data för {product.name}, del {i + 1} av 2
                  </caption>
                  <tbody>
                    {column.map((spec) => (
                      <tr key={spec.label}>
                        <th scope="row">{spec.label}</th>
                        <td>{spec.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}
            </div>
            {product.specNote && (
              <p className="subtle" style={{ marginTop: "var(--space-5)", fontSize: "var(--text-xs)" }}>
                {product.specNote}
              </p>
            )}
          </Reveal>
        </div>
      </section>

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
