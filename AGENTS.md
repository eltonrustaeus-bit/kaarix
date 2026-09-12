# AGENTS.md — kontext för AI-assistenter som jobbar i det här repot

Det här är en teknisk kontextfil för AI-kodassistenter (Claude, Cursor, Copilot, Codex, etc.)
som jobbar vidare på Kaarix-sajten i en framtida session. Läs den här filen FÖRST innan du
gör ändringar — den beskriver arkitektur, medvetna designval och en riktig bugg som redan
är fixad en gång (så den inte råkar återinförs).

Affärskontext, öppna frågor till kunden och projektlogg (kronologisk) ligger i
`~/Desktop/Sajto x KSB Teknik/KAARIX_BRAND.md` på Elton-datorn — läs den också om du har
tillgång till den mappen, den förklarar VARFÖR projektet ser ut som det gör affärsmässigt.

## Vad det här är

Marknadsföringssajt (Next.js 14, App Router, TypeScript) för Kaarix — KSB Tekniks eget
varumärke för LED-industribelysning. Sajten visar produkter snyggt men hanterar ingen egen
checkout: "Beställ"-knappar länkar till produktens riktiga sida på ksbteknik.se (Starweb),
där själva köpet sker. Se README.md för produkt-/affärsdetaljer.

Live: https://kaarix.vercel.app · Repo: github.com/eltonrustaeus-bit/kaarix (branch `main`)

## Kommandon

```bash
npm install
npm run dev      # lokal utveckling, http://localhost:3000
npm run build    # produktionsbygge — kör alltid detta innan du säger att något är klart
npm run start    # kör produktionsbygget lokalt (för verklig testning, inte dev-servern)
```

Kör ALLTID `npm run build` efter ändringar och kontrollera att den går igenom rent innan
du levererar något. Testa gärna med Playwright mot `npm run start` (produktionsbygget) —
`npm run dev` döljer vissa produktionsspecifika buggar (t.ex. bildoptimeringsbeteende).

## Arkitektur & filstruktur

- `app/layout.tsx` — root layout, laddar självhostade typsnitt via `next/font/local`.
- `app/page.tsx` — hela sidans sektionsordning (Hero → strip → Featured → Sortiment → Om oss → Kontakt → Footer).
- `app/globals.css` — all styling, en enda fil, ingen CSS-modul/Tailwind. Använder CSS custom
  properties för färger (`--navy`, `--red`, etc.) och `clamp()` för flytande typografi.
- `components/` — en komponent per sektion/UI-bit, alla klientkomponenter (`"use client"`)
  som animerar med framer-motion.
- `lib/products.ts` — produktdata (namn, spec, bild, varianter, order-URL:er till ksbteknik.se).
  **Ingen automatisk synk mot Starweb** — uppdatera manuellt när KSB ändrar Kaarix-sortimentet.
- `lib/contact.ts` — kontaktinfo (Jesper Svenler), hämtad från den publika sidan
  ksbteknik.se/page/om-oss. Källa angiven i filen — hitta inte på nya kontaktuppgifter.

## Medvetna designval (och varför)

**Typsnitt är självhostade** (`public/fonts/*.woff2`), inte laddade via `next/font/google`.
Anledning: byggmiljön där det här projektet först skapades hade blockerad utgående trafik
mot fonts.googleapis.com/fonts.gstatic.com, så `next/font/google` failade vid build. Om du
byter typsnitt: ladda ner rätt `.woff2`-fil manuellt (Google Fonts CSS2-API, leta upp
`src: url(...)` för latin-varianten) och lägg i `public/fonts/`, peka `next/font/local` på
den. Nuvarande typsnitt: **Space Grotesk** (rubriker, `--font-display`, vikt 500–700 — det är
fontens FAKTISKA maxvikt, sätt aldrig `font-weight: 800` eller högre på den, det finns ingen
sådan instans) och **IBM Plex Sans** (brödtext, `--font-body`, vikt 400–600).

**Produktbilder använder `next/image` med `fill`**, aldrig CSS `background-image` och aldrig
hårdkodade `width`/`height` som tvingar en viss bildproportion. Anledning: en tidigare version
använde CSS-bakgrundsbild för hero + fasta pixelmått på produktbilder, vilket dels helt
kringgick Vercels automatiska bildoptimering (ingen responsiv storlek/WebP), dels gav
layouthopp eftersom inte alla produktbilder faktiskt har samma bildförhållande. Mönstret att
följa: en `position: relative` wrapper (`.imgwrap`) med en absolut-positionerad inner-div
(`.imgwrap-inner`) som har paddingen, och `<Image fill style={{objectFit:"contain"}}>` inuti.

**Global bakgrundstextur** (`body` i globals.css): ett subtilt "ritnings"-rutnät i hela
bakgrunden. Lades till för att undvika platta, tomma mörkblå ytor mellan sektioner —
ta inte bort det utan att ersätta det med något annat som löser samma problem.

## En riktig bugg som är fixad — undvik att återinföra den

`ProductGrid.tsx` filtrerar produkter per kategori. Ett tidigare mönster styrde ALLA
produktkorts synlighet via en engångsanimation (`whileInView` med `viewport={{once:true}}`)
på förälder-elementet, som via nedärvda `variants` propagerades ner till varje `ProductCard`.
Detta funkade vid första sidladdningen men gick sönder permanent så fort användaren bytte
kategorifilter: nya `ProductCard`-instanser som monterades EFTER att engångstriggern redan
avfyrats fick aldrig kommandot att bli synliga och fastnade på `opacity: 0` tills sidan
laddades om.

**Fixen (nuvarande kod):** varje `ProductCard` äger sin egen `initial`/`animate`/`exit`
(inte nedärvda `variants` från en `whileInView`-förälder), och `ProductGrid` wrappar listan i
`<AnimatePresence mode="popLayout">`. Det yttre rutnätet har fortfarande en engångs-
`whileInView` för den första scroll-in-reveal-effekten, men det styr bara SIG SJÄLVT (ren
opacity/y på den egna diven), inte barnens synlighet. Om du lägger till fler listor som
filtreras/omordnas dynamiskt (t.ex. sortering, sök, paginering): använd samma mönster —
varje item äger sin egen entry/exit-animation, aldrig en engångstrigger som barn förlitar
sig på för att bli synliga.

## Git / deploy — VIKTIGT

**Ingen AI-assistent i den här miljön har GitHub-inloggning eller push-access.** Commits kan
göras lokalt (`git add` + `git commit`), men `git push` måste köras av Elton själv i sitt
egna terminalfönster. Försök inte hitta workarounds för detta (personal access token,
`gh auth`, etc.) om inte Elton uttryckligen sätter upp det åt dig i den sessionen.

Vercel är kopplat till GitHub-repot och deployar automatiskt på push till `main`. Det finns
ingen separat staging-miljö — allt som pushas till `main` går live på kaarix.vercel.app.

## Testrutin som använts hittills

Inget automatiskt testverktyg (Jest/Playwright-testsvit) är uppsatt i repot. Verifiering har
gjorts manuellt per ändring:
1. `npm run build` — måste gå igenom rent.
2. Starta produktionsbygget (`npm run start`) och kör ett engångs-Playwright-skript (skrivs
   i farten, sparas inte i repot) som: kollar konsolfel/nätverksfel, klickar igenom
   kategorifilter och variant-väljare, och tar skärmdumpar vid flera skärmbredder
   (320px–2560px) för att leta efter horisontell overflow.
3. **Playwright-fälla att känna till:** `page.screenshot({fullPage:true})` ändrar bara
   viewportens storlek, den scrollar inte fysiskt genom sidan — så `whileInView`-animationer
   (IntersectionObserver-baserade) hinner aldrig trigga och sektioner kan se tomma ut i en
   sådan skärmdump trots att de fungerar helt normalt för en riktig användare som scrollar.
   Scrolla inkrementellt (`window.scrollTo` i en loop) INNAN du tar skärmdumpen.
4. En bakgrundad/dold webbläsarflik pausar också CSS/JS-animationer (requestAnimationFrame
   körs inte när `document.visibilityState === "hidden"`) — om något ser "fruset" ut mitt i
   en animation vid test i en sådan flik är det ett testartefakt, inte en riktig bugg.

## Öppna punkter (väntar på svar från Jesper/KSB)

Se README.md och KAARIX_BRAND.md för fullständig lista. Kortversion: riktiga
installationsbilder av Kaarix-produkter i verklig miljö, eventuella riktiga
KSB-siffror/statistik att använda som trust-signaler, samt om Kaarix-kunder ska ha samma
B2B-inloggningskrav som gäller på ksbteknik.se idag.
