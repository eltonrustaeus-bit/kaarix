type IconProps = { size?: number; className?: string };

/** Ikonerna är dekorativa — de sitter alltid bredvid text, aldrig ensamma. */
const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
});

export function ArrowRight({ size = 14, className }: IconProps) {
  return (
    <svg {...base(size)} className={`arrow ${className ?? ""}`}>
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function Check({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M13.5 4.5 6.5 11.5 3 8" />
    </svg>
  );
}

export function Phone({ size = 15, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5.5 2.5 7 5.5 5.5 7a7 7 0 0 0 3.5 3.5L10.5 9l3 1.5v2a1 1 0 0 1-1.1 1A11 11 0 0 1 2.5 3.6a1 1 0 0 1 1-1.1h2Z" />
    </svg>
  );
}

export function Mail({ size = 15, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" />
      <path d="m2 4.5 6 4 6-4" />
    </svg>
  );
}

export function Info({ size = 16, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="8" cy="8" r="6.25" />
      <path d="M8 7.25v4M8 5.1v.4" />
    </svg>
  );
}

export function External({ size = 13, className }: IconProps) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6.5 3.5h-3v9h9v-3M9.5 2.5h4v4M13 3l-6 6" />
    </svg>
  );
}
