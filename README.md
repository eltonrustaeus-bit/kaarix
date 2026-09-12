# Kaarix

Marknadsföringssajt för Kaarix (KSB Tekniks LED-belysningsvarumärke). Byggd med Next.js (App Router), tänkt att hostas på Vercel.

## Vad sajten gör

Visar Kaarix produktsortiment (armaturer, strålkastare, tracklights) med bilder och specifikationer. Varje "Beställ"-knapp länkar direkt till produktens riktiga sida på `ksbteknik.se`, där själva beställningen genomförs via KSB Tekniks befintliga Starweb-webshop. Sajten hanterar alltså ingen egen kundvagn eller checkout — det var ett medvetet vägval eftersom Starwebs officiella API inte dokumenterar cart/checkout-funktioner, och ett direkt test av `?cart=<artikelnummer>`-tricket (som fungerar på vissa andra svenska e-handelsplattformar, t.ex. E37) gav negativt resultat på Starweb.

## Produktdata

Produkterna i `lib/products.ts` är hämtade manuellt från `https://ksbteknik.se/search?m=Kaarix` (Starwebs `Tillverkare`-filter). Uppdatera den filen när KSB lägger till eller ändrar Kaarix-produkter i Starweb — det finns ingen automatisk synk i nuläget.

Obs: "BOSTON WORK LIGHT" dyker upp i Starwebs Kaarix-filter men är felaktigt taggad (inte en riktig Kaarix-produkt) — exkluderad härifrån med flit.

## Utveckling

```bash
npm install
npm run dev
```

Öppna http://localhost:3000

## Deploy

Tänkt att kopplas till Vercel via detta GitHub-repo (importera repot i Vercel, inga extra miljövariabler krävs för nuvarande version).

## Öppna frågor till KSB Teknik / Jesper

- Ska Kaarix visa priser öppet, eller ska samma B2B-inloggningskrav som ksbteknik.se gälla här också?
- Vem äger domänen kaarix.se och kan DNS pekas mot Vercel?
- Ska Kaarix trademark-registreras?
