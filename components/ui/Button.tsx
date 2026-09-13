import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

type BaseProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  block?: boolean;
  className?: string;
};

type ButtonProps = BaseProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
};

type LinkProps = BaseProps & {
  href: string;
  /** Sätts automatiskt för externa länkar. */
  external?: boolean;
  "aria-label"?: string;
};

function classes({ variant = "primary", size = "md", block, className }: BaseProps) {
  return [
    "btn",
    `btn-${variant}`,
    size !== "md" ? `btn-${size}` : "",
    block ? "btn-block" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");
}

/**
 * En knapp som renderar rätt element för sitt syfte:
 * next/link för interna vägar, <a> för externa, <button> för handlingar.
 * Det håller semantik och tangentbordsbeteende korrekt utan att varje
 * anropsplats behöver tänka på det.
 */
export default function Button(props: ButtonProps | LinkProps) {
  const { children } = props;

  if ("href" in props && props.href) {
    const isExternal = props.external ?? /^https?:\/\//.test(props.href);

    if (isExternal) {
      return (
        <a
          className={classes(props)}
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={props["aria-label"]}
        >
          {children}
        </a>
      );
    }

    return (
      <Link className={classes(props)} href={props.href} aria-label={props["aria-label"]}>
        {children}
      </Link>
    );
  }

  const { onClick, type = "button" } = props as ButtonProps;
  return (
    <button
      className={classes(props)}
      type={type}
      onClick={onClick}
      aria-label={props["aria-label"]}
    >
      {children}
    </button>
  );
}
