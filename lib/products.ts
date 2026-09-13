export type Spec = { label: string; value: string };

export type Variant = {
  label: string;
  sku: string;
  orderUrl: string;
  /** Vissa varianter har egen produktbild (t.ex. svart/vit tracklight). */
  image?: string;
  /**
   * Värden som skiljer sig mellan varianterna. Alla varianter i en produkt
   * använder samma etiketter i samma ordning, så att de kan ställas upp
   * bredvid varandra i en jämförelsetabell.
   */
  specs?: Spec[];
};

export type Product = {
  slug: string;
  category: Category;
  name: string;
  shortName: string;
  tagline: string;
  /** Kort teknisk sammanfattning på produktkortet. */
  summary: string;
  image: string;
  description: string[];
  highlights: string[];
  applications: string[];
  /** Gemensamma data för hela produktfamiljen. */
  specs: Spec[];
  /** Källhänvisning under tabellen. */
  specNote?: string;
  variantLabel: string;
  variants: Variant[];
};

export const categories = ["Alla", "Industriarmatur", "Strålkastare", "Tracklight"] as const;
export type Category = Exclude<(typeof categories)[number], "Alla">;

/*
 * KÄLLOR — läs detta innan du ändrar något här.
 *
 * Alla tekniska värden nedan är hämtade ur KSB Tekniks egna produktblad (PDF),
 * som är den mest formella källan de publicerar:
 *   AUSTIN      4000132961-austin.pdf
 *   Flood       datasheet-4000132791 / -792 / -793.pdf
 *   Tracklight  4000132892.pdf (20 W) och 4000132894.pdf (30 W)
 * Beskrivande text är hämtad från respektive produktsida på ksbteknik.se.
 *
 * HITTA ALDRIG PÅ SPECIFIKATIONER, och skriv inte heller ut ett värde för hela
 * sortimentet som bara är verifierat för en produkt. Tre exempel på sådant som
 * faktiskt var fel på sajten tidigare:
 *   - "160 lm/W" och "6400 lm" för AUSTIN (produktbladet anger 180 lm/W och
 *     7200 lm — se noteringen om ljusflöde längre ner)
 *   - "Förmonterad 6 m kabel" för hela Flood-familjen (gäller bara 50 W;
 *     150 W har 8 m och 300 W har 10 m)
 *   - "fem års garanti" som ett varumärkeslöfte (garanti är dokumenterad för
 *     AUSTIN och Tracklight, men anges inte alls i Flood-produktbladen)
 *
 * "BOSTON WORK LIGHT" dyker upp i Starwebs Kaarix-filter men är inte en
 * Kaarix-produkt. Exkluderad med flit.
 */
export const products: Product[] = [
  {
    slug: "industriarmatur-austin",
    category: "Industriarmatur",
    name: "Kaarix Industriarmatur AUSTIN",
    shortName: "Industriarmatur AUSTIN",
    tagline: "Robust industriarmatur med DALI-2 och justerbar färgtemperatur.",
    summary: "40 W · 7200 lm · CCT 3000–6000 K · IP65",
    image: "/images/austin.png",
    description: [
      "Kaarix AUSTIN är en robust och energieffektiv industriarmatur utvecklad för lager, verkstäder, produktionslokaler, garage och andra krävande miljöer. Med ett ljusflöde på 7200 lumen och en effekt på 40 W levererar armaturen kraftfull och jämn belysning samtidigt som energiförbrukningen hålls låg.",
      "Armaturen är utrustad med justerbar färgtemperatur (CCT 3000–6000 K) via DIP-switch, vilket gör det möjligt att anpassa ljuset efter lokalens behov. Den höga kapslingsklassen IP65 skyddar mot damm och vatten och säkerställer lång livslängd även i tuffa industriella miljöer.",
      "För moderna belysningsanläggningar är AUSTIN utrustad med DALI-2-styrning, vilket möjliggör individuell dimring och gruppstyrning. Armaturen levereras med tillbehör för både takmontage och nedpendling, och kan kopplas i serie tack vare 5P-anslutning i båda ändar.",
    ],
    highlights: [
      "7200 lm vid 40 W",
      "IP65 och IK08",
      "DALI-2-dimbar",
      "5 års garanti",
    ],
    applications: ["Lager", "Verkstäder", "Produktionslokaler", "Garage"],
    specs: [
      { label: "Effekt", value: "40 W" },
      { label: "Ljusflöde", value: "7200 lm" },
      { label: "Ljusutbyte", value: "180 lm/W" },
      { label: "Färgtemperatur (CCT)", value: "3000–6000 K, justerbar via DIP-switch" },
      { label: "Färgåtergivning (CRI)", value: "> 80" },
      { label: "Spridningsvinkel", value: "120°" },
      { label: "Dimbar", value: "DALI-2" },
      { label: "Matningsspänning", value: "AC 200–240 V, 50–60 Hz" },
      { label: "Anslutning", value: "5P-terminal i båda ändar" },
      { label: "Kapslingsklass", value: "IP65" },
      { label: "Slagtålighet", value: "IK08" },
      { label: "Material hölje", value: "Polykarbonat (PC), brandklass UL94 V-0" },
      { label: "Material kupa", value: "Polykarbonat (PC), opalt" },
      { label: "Mått", value: "1500 × 83 × 67 mm" },
      { label: "Arbetstemperatur", value: "−20 °C till +50 °C" },
      { label: "Certifieringar", value: "CE, RoHS, D-märkt" },
      { label: "EMC", value: "EN 55015, EN IEC 61000-3-2" },
      { label: "Elsäkerhet", value: "EN IEC 60598-2-1" },
      { label: "Teknisk livslängd", value: "50 000 timmar" },
      { label: "Garanti", value: "5 år" },
    ],
    specNote:
      "Enligt KSB Tekniks produktblad för artikelnummer 4000132961. Produktsidan på ksbteknik.se anger på ett ställe 6400 lm och 160 lm/W — vi följer produktbladet, som stämmer med produktnamnets 7200 lm.",
    variantLabel: "Utförande",
    variants: [
      {
        label: "40 W, vit",
        sku: "4000132961",
        orderUrl:
          "https://ksbteknik.se/product/tracklight-cob-led-30w-3-fas-3000k-fasdim-vit-kopia",
      },
    ],
  },
  {
    slug: "flood-light-houston",
    category: "Strålkastare",
    name: "Kaarix Flood Light Houston",
    shortName: "Flood Light Houston",
    tagline: "Kraftfull LED-strålkastare för inom- och utomhusbruk.",
    summary: "50–300 W · 7500–45 000 lm · 4000 K · IP65",
    image: "/images/kaarix-flood.png",
    description: [
      "Kaarix Flood Light Houston är en kraftfull och energieffektiv LED-strålkastare för allmän belysning både inomhus och utomhus. Armaturen passar för lastkajer, industrifastigheter, garageuppfarter, parkeringsytor, byggnader och arbetsområden där hög ljuskvalitet och driftsäkerhet krävs.",
      "Den slimmade konstruktionen kombinerar hög prestanda med lång livslängd. Armaturhus och monteringsbygel är tillverkade i korrosionsbeständigt aluminium och kompletteras med rostfria skruvar för optimalt skydd mot väder och vind, vilket gör armaturen särskilt lämpad för krävande utomhusmiljöer.",
      "Strålkastaren är utrustad med härdat säkerhetsglas och UV-beständig silikonpackning som säkerställer hög täthet och långvarig funktion. Den symmetriska ljusfördelningen ger jämn och effektiv belysning, och den justerbara monteringsbygeln möjliggör installation på vägg, tak eller stativ. Anslutningskabeln är förmonterad och blir längre med högre effekt.",
    ],
    highlights: [
      "Tre effektnivåer: 50, 150 och 300 W",
      "150 lm/W i samtliga effekter",
      "IP65 och IK10",
      "100 000 timmars teknisk livslängd",
    ],
    applications: [
      "Lastkajer",
      "Industrifastigheter",
      "Parkeringsytor",
      "Byggnader",
      "Arbetsområden",
    ],
    specs: [
      { label: "Färgtemperatur", value: "4000 K" },
      { label: "Ljusutbyte", value: "150 lm/W" },
      { label: "Färgåtergivning (CRI)", value: "80" },
      { label: "Matningsspänning", value: "AC 85–265 V, 50/60 Hz" },
      { label: "Ljusfördelning", value: "Symmetrisk" },
      { label: "Kapslingsklass", value: "IP65" },
      { label: "Slagtålighet", value: "IK10" },
      { label: "Material hölje", value: "Pressgjuten aluminium, svart" },
      { label: "Glas", value: "Härdat säkerhetsglas" },
      { label: "Packning", value: "UV-beständig silikon" },
      { label: "Montage", value: "Justerbar bygel för vägg, tak eller stativ" },
      { label: "Teknisk livslängd", value: "100 000 timmar" },
    ],
    specNote:
      "Enligt KSB Tekniks produktblad för artikelnummer 4000132791, 4000132792 och 4000132793. Garantitid anges inte i Flood-produktbladen — fråga KSB Teknik om du behöver den uppgiften.",
    variantLabel: "Effekt",
    variants: [
      {
        label: "50 W",
        sku: "4000132791",
        orderUrl: "https://ksbteknik.se/product/kaarix-flood-light-50w-4000k-stralkastare-",
        specs: [
          { label: "Ljusflöde", value: "7500 lm" },
          { label: "Kabellängd", value: "6 m" },
          { label: "Mått", value: "263 × 224 × 45 mm" },
          { label: "Vikt", value: "0,965 kg" },
        ],
      },
      {
        label: "150 W",
        sku: "4000132792",
        orderUrl:
          "https://ksbteknik.se/product/kaarix-flood-light-50w-4000k-stralkastare-houston-kopia",
        specs: [
          { label: "Ljusflöde", value: "22 500 lm" },
          { label: "Kabellängd", value: "8 m" },
          { label: "Mått", value: "370 × 322 × 56 mm" },
          { label: "Vikt", value: "2,42 kg" },
        ],
      },
      {
        label: "300 W",
        sku: "4000132793",
        orderUrl:
          "https://ksbteknik.se/product/kaarix-flood-light-150w-4000k-stralkastare-houston-kopia",
        specs: [
          { label: "Ljusflöde", value: "45 000 lm" },
          { label: "Kabellängd", value: "10 m" },
          { label: "Mått", value: "481 × 408 × 60 mm" },
          { label: "Vikt", value: "4,69 kg" },
        ],
      },
    ],
  },
  {
    slug: "tracklight-cob-led",
    category: "Tracklight",
    name: "Kaarix Tracklight COB LED",
    shortName: "Tracklight COB LED",
    tagline: "Fasdimbar spotlight för 3-fas skensystem.",
    summary: "20/30 W · 1800–2700 lm · 3000 K · IP65",
    image: "/images/kaarix-tracklight-svart.png",
    description: [
      "Kaarix Tracklight COB LED är utvecklad för professionella belysningsinstallationer där hög ljuskvalitet, energieffektivitet och lång livslängd står i fokus. Armaturen finns i 20 W och 30 W och levererar ett ljusutbyte på upp till 90 lm/W.",
      "Armaturen är tillverkad i robust pressgjuten aluminium och har kapslingsklass IP65, vilket gör den lämplig även för miljöer där skydd mot damm och fukt är viktigt.",
      "Tracklighten monteras i 3-fas skena och är smidig att rotera och rikta för önskad ljusbild. Den finns i både svart och vitt utförande.",
    ],
    highlights: [
      "Monteras i 3-fas skena",
      "Fasdimbar (FAS-DIM)",
      "IP65 i pressgjuten aluminium",
      "5 års garanti",
    ],
    applications: ["Professionella belysningsinstallationer", "3-fas skensystem"],
    specs: [
      { label: "Ljusutbyte", value: "90 lm/W" },
      { label: "Färgtemperatur (CCT)", value: "3000 K" },
      { label: "Färgåtergivning (CRI)", value: "> 80" },
      { label: "Effektfaktor", value: "> 0,9" },
      { label: "Spridningsvinkel", value: "38°" },
      { label: "Dimbar", value: "Ja, FAS-DIM" },
      { label: "Matningsspänning", value: "AC 200–240 V" },
      { label: "Material", value: "Pressgjuten aluminium" },
      { label: "Kapslingsklass", value: "IP65" },
      { label: "Arbetstemperatur", value: "−20 °C till +40 °C" },
      { label: "Certifieringar", value: "CE, RoHS" },
      { label: "Teknisk livslängd", value: "50 000 timmar" },
      { label: "Garanti", value: "5 år" },
    ],
    specNote:
      "Enligt KSB Tekniks produktblad för artikelnummer 4000132892 (20 W) och 4000132894 (30 W).",
    variantLabel: "Effekt och kulör",
    variants: [
      {
        label: "20 W, svart",
        sku: "4000132892",
        orderUrl: "https://ksbteknik.se/product/spotlight-tracklight-3-fas-fasdim",
        image: "/images/kaarix-tracklight-svart.png",
        specs: [
          { label: "Effekt", value: "20 W" },
          { label: "Ljusflöde", value: "1800 lm" },
          { label: "Mått", value: "72 × 186 mm" },
        ],
      },
      {
        label: "20 W, vit",
        sku: "4000132893",
        orderUrl:
          "https://ksbteknik.se/product/tracklight-cob-led-20w-3-fas-3000k-fasdim-svart-kopia",
        image: "/images/kaarix-tracklight-vit.png",
        specs: [
          { label: "Effekt", value: "20 W" },
          { label: "Ljusflöde", value: "1800 lm" },
          { label: "Mått", value: "72 × 186 mm" },
        ],
      },
      {
        label: "30 W, svart",
        sku: "4000132894",
        orderUrl:
          "https://ksbteknik.se/product/tracklight-cob-led-20w-3-fas-3000k-fasdim-svart-kopia-2",
        image: "/images/kaarix-tracklight-svart.png",
        specs: [
          { label: "Effekt", value: "30 W" },
          { label: "Ljusflöde", value: "2700 lm" },
          { label: "Mått", value: "94 × 190 mm" },
        ],
      },
      {
        label: "30 W, vit",
        sku: "4000132895",
        orderUrl:
          "https://ksbteknik.se/product/tracklight-cob-led-20w-3-fas-3000k-fasdim-vit-kopia",
        image: "/images/kaarix-tracklight-vit.png",
        specs: [
          { label: "Effekt", value: "30 W" },
          { label: "Ljusflöde", value: "2700 lm" },
          { label: "Mått", value: "94 × 190 mm" },
        ],
      },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string): Product[] {
  return products.filter((p) => p.slug !== slug);
}

/**
 * Varianter som har egna specifikationer ställs upp i en jämförelsetabell.
 * Dubbletter slås ihop: tracklighten har fyra varianter men bara två
 * uppsättningar värden (20 W och 30 W), och då är en tabell med fyra
 * identiska kolumnpar bara brus.
 */
export function variantComparison(product: Product) {
  const withSpecs = product.variants.filter((v) => v.specs?.length);
  if (withSpecs.length < 2) return null;

  const seen = new Map<string, { label: string; specs: Spec[] }>();
  for (const v of withSpecs) {
    const key = v.specs!.map((s) => `${s.label}:${s.value}`).join("|");
    const existing = seen.get(key);
    if (existing) {
      // Samma värden som en tidigare variant — slå ihop etiketterna.
      const base = existing.label.split(" / ")[0];
      const extra = v.label.replace(/^[\d\s,W]+/, "").trim();
      existing.label = extra ? `${base} / ${extra}` : existing.label;
    } else {
      seen.set(key, { label: v.label, specs: v.specs! });
    }
  }

  const columns = [...seen.values()];
  if (columns.length < 2) return null;

  return { rows: columns[0].specs.map((s) => s.label), columns };
}

/** Länk till hela Kaarix-sortimentet i KSB:s webshop. */
export const storeUrl = "https://ksbteknik.se/search?m=Kaarix";
