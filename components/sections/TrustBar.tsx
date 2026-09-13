import { Check } from "@/components/ui/Icon";

/*
 * Bara påståenden som går att belägga. Tidigare stod här "Fasta B2B-priser"
 * och "Teknisk rådgivning före köp" — inget av dem går att verifiera mot
 * KSB:s publicerade information, så de är utbytta mot sådant som gör det.
 */
const items = [
  "Beställning och leverans via KSB Teknik",
  "Produktblad med fullständiga tekniska data",
  "Priser visas för inloggade kunder",
];

export default function TrustBar() {
  return (
    <div className="trustbar">
      <div className="container trustbar-inner">
        {items.map((item) => (
          <p className="trustbar-item" key={item}>
            <Check />
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
