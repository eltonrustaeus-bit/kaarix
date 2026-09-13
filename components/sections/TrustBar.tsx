import { Check } from "@/components/ui/Icon";

const items = [
  "Beställning och leverans via KSB Teknik",
  "Fasta B2B-priser vid inloggning",
  "Teknisk rådgivning före köp",
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
