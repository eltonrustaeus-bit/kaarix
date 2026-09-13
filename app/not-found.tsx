import Button from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";

export const metadata = { title: "Sidan finns inte" };

export default function NotFound() {
  return (
    <div className="container notfound">
      <p className="notfound-code">404</p>
      <h1>Sidan kunde inte hittas</h1>
      <p className="lead">
        Länken kan vara gammal eller felstavad. Hela Kaarix-sortimentet finns kvar under
        produkter.
      </p>
      <Button href="/produkter">
        Till sortimentet
        <ArrowRight />
      </Button>
    </div>
  );
}
