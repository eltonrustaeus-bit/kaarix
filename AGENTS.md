# AGENTS.md — kontext för AI-assistenter som jobbar i det här repot

Teknisk kontextfil för AI-kodassistenter (Claude, Cursor, Copilot, Codex m.fl.) som jobbar
vidare på Kaarix-sajten i en framtida session. **Läs den här filen först.** Den beskriver
arkitektur, medvetna designval och flera riktiga buggar som redan är fixade — så att de
inte råkar återinföras.

Affärskontext, öppna frågor till kunden och kronologisk projektlogg ligger i
`~/Desktop/Sajto x KSB Teknik/KAARIX_BRAND.md` på Eltons dator.

## Vad det här är

Marknadsföringssajt (Next.js 14, App Router, TypeScript) för Kaarix — KSB Tekniks eget
varumärke för LED-industribelysning. Sajten visar produkter men hanterar ingen egen
checkout: "Beställ" länkar till produktens riktiga sida på ksbteknik.se (Starweb), där
köpet sker. Se README.md för affärsdetaljer.

Live: https://kaarix.vercel.app · Repo: github.com/eltonrustaeus-bit/kaarix (branch `main`)

## Kommandon

```bash
npm install
npm run dev      # utveckling
npm run build    # kör ALLTID detta innan något sägs vara klart
npm run start    # produktionsbygget lokalt — testa mot detta, inte dev-servern
```

## Arkitektur

Sajten är flersidig med delad layout. Lägg inte tillbaka allt på en sida.

```
app/
  layout.tsx            Root: typsnitt, metadata, Header + Footer, skip-länk
  template.tsx          Sidövergång (monteras om vid varje navigering)
  page.tsx              Start
  produkter/page.tsx    Sortiment med filter
  produkter/[slug]/     Produktsida (generateStaticParams + generateMetadata)
  om/, kontakt/         Innehållssidor
  not-found.tsx         404
  globals.css           Importerar styles/-lagren
  styles/
    tokens.css          ENDA källan för färg, typografi, avstånd, radier, rörelse
    base.css            Reset, typografi, hjälpklasser, tillgänglighet
    components.css      Komponentstilar
components/
  layout/               Header, Footer
  ui/                   Button, Eyebrow, Icon, Reveal  ← återanvändbara primitiver
  product/              ProductCard, ProductCatalog, ProductDetail, BuyPanel
  sections/             Hero, TrustBar, Spotlight, CtaBand
lib/
  products.ts           Produktdata + specifikationer (manuellt synkad mot Starweb)
  contact.ts            Kontaktuppgifter (källa angiven i filen)
```

**Konventioner:** styla via tokens i `tokens.css`, inte hårdkodade värden. Använd
`<Button>` i stället för att skriva `<a className="btn">`. Nya sidor får `metadata` och
exakt en `<h1>`.

## Medvetna designval (och varför)

**Typsnitt självhostas** (`public/fonts/*.woff2`), inte via `next/font/google` — byggmiljön
där projektet skapades hade blockerad trafik mot Google Fonts. Space Grotesk = rubriker,
IBM Plex Sans = brödtext. Space Grotesks faktiska maxvikt är **700** — sätt aldrig
`font-weight: 800` eller högre på den.

**Bilder använder `next/image` med `fill`**, aldrig CSS `background-image` och aldrig
hårdkodade `width`/`height` som tvingar fram fel bildförhållande. Mönster: en
`position: relative`-wrapper med en absolut inner-div som bär paddingen, och
`<Image fill style={{objectFit:"contain"}}>` inuti.

**Ingen page loader.** En tidigare version blockerade varje sidladdning i 900 ms med en
overlay. Det försämrar upplevd prestanda och blir värre med routing — den är borttagen med
flit. Återinför den inte.

## Buggar som redan är fixade — återinför dem inte

**1. Hela sajten renderades i Times.** `globals.css` definierade
`--font-display: var(--font-display), "Space Grotesk", sans-serif;` i `:root`. Men `:root`
ÄR `<html>`, samma element som next/font sätter variabeln på — variabeln refererade sig
själv, blev ogiltig, och `font-family` föll tillbaka på webbläsarens standardserif. Låg
live länge utan att upptäckas. **Regel:** next/font äger `--font-display-src` /
`--font-body-src`; CSS:en bygger den färdiga stacken under ett *annat* namn.

**2. Produkter försvann permanent vid filterbyte.** Rutnätet styrde korten via en
engångsanimation (`whileInView` + `once: true`) som ärvdes ner via `variants`. Kort som
monterades EFTER att triggern gått fick aldrig kommandot att bli synliga och fastnade på
`opacity: 0` tills sidan laddades om. **Regel:** varje element äger sin egen entry/exit —
ärv aldrig synlighet från en förälders engångstrigger.

**3. Sidan blev osynlig vid `prefers-reduced-motion`.** Komponenter bytte från `motion.div`
till vanlig `div` efter hydrering. React återanvände DOM-noden och den inline-satta
`opacity: 0` låg kvar för alltid — 15 element, inklusive `<h1>`, var osynliga för just de
användare som bett om mindre rörelse. **Regel:** rendera alltid samma elementtyp; stäng av
animationen med `initial={false}` i stället för att villkorligt byta komponent.

`Reveal` har dessutom en failsafe: syns elementet i vyn men observern inte har rapporterat
det, visas innehållet ändå. Ett innehållsblock som tyst blir kvar på `opacity: 0` är det
värsta felläget en scroll-animation kan ha.

## Data

`lib/products.ts` är **manuellt** synkad mot https://ksbteknik.se/search?m=Kaarix — ingen
automatisk synk. Beskrivningar och tekniska data är hämtade ordagrant från KSB:s egna
produktsidor. **Hitta aldrig på specifikationer.**

Att känna till:
- Produkt-URL:erna hos Starweb är missvisande. AUSTIN ligger på en slug som innehåller
  "tracklight" eftersom KSB skapade produkten genom att duplicera en tracklight. URL:en är
  ändå rätt — verifiera mot söksidan innan du "rättar" något.
- "BOSTON WORK LIGHT" är felaktigt taggad med Tillverkare=Kaarix i Starweb men är inte en
  Kaarix-produkt. Exkluderad med flit.
- **Öppen fråga:** KSB:s produktnamn anger "7200LM" för AUSTIN medan deras egen tekniska
  tabell anger 6400 lm. Vi publicerar tabellvärdet och undviker lumen som säljargument i
  rubriker tills Jesper bekräftat vilket som stämmer.

## Git / deploy — VIKTIGT

**Ingen AI-assistent i den här miljön har GitHub-inloggning eller push-access.** Commits
kan göras lokalt, men `git push` måste köras av Elton själv i hans egen terminal. Leta inte
efter workarounds (token, `gh auth`) om han inte uttryckligen sätter upp det.

Vercel deployar automatiskt vid push till `main`. Ingen staging — allt som pushas går live.

## Testrutin

Ingen testsvit i repot. Verifiering görs med engångsskript per ändring:

1. `npm run build` — måste gå igenom rent.
2. Kör produktionsbygget och testa med Playwright: konsolfel, HTTP-fel, alla routes, alla
   navigationslänkar, filter- och variantväljare, overflow på 320–2560px, `prefers-reduced-motion`.
3. Kontrollera att inga element ligger kvar på `opacity: 0` efter scroll — det fångar
   regressioner av bugg 2 och 3 ovan.

**Fallgropar i testningen som kostat tid:**
- `page.screenshot({fullPage:true})` ändrar bara viewporthöjden, den scrollar inte fysiskt
  — scroll-baserade animationer hinner aldrig trigga och sektioner ser tomma ut. Scrolla
  inkrementellt först.
- Använd `behavior: "instant"` vid programmatisk scroll. Mjuk scroll hinner inte fram
  mellan stegen och halva sidan ser oanimerad ut.
- En bakgrundad/dold flik pausar `requestAnimationFrame`. Ser något "fruset" ut mitt i en
  animation i en sådan flik är det ett testartefakt, inte en bugg.
- `waitForLoadState("networkidle")` returnerar direkt vid klientnavigering. Använd
  `waitForURL` när du verifierar routing.

## Öppna punkter (väntar på Jesper/KSB)

Riktiga installationsbilder av produkterna i verklig miljö, eventuella KSB-siffror att
använda som trust-signaler, lumen-frågan för AUSTIN ovan, samt om Kaarix-kunder ska ha
samma B2B-inloggningskrav som ksbteknik.se har idag.
