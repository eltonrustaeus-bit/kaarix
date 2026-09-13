/**
 * template.tsx monteras om vid varje navigering (till skillnad från layout),
 * vilket gör den till rätt ställe för en sidövergång. Övergången är gjord i
 * ren CSS istället för framer-motion: den får inte fördröja att innehållet
 * blir läsbart, och den respekterar prefers-reduced-motion via den globala
 * regeln i base.css.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="route-fade">{children}</div>;
}
