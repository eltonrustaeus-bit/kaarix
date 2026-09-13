export type Spec = { label: string; value: string };

export type Variant = {
  label: string;
  sku: string;
  orderUrl: string;
  /** Vissa varianter har egen produktbild (t.ex. svart/vit tracklight). */
  image?: string;
};

export type Product = {
  slug: string;
  category: Category;
  name: string;
  /** Kort namn för brödsmulor och kort. */
  shortName: string;
  /** En mening som sammanfattar produkten — används på kort och i metadata. */
  tagline: string;
  /** Kort teknisk sammanfattning, visas på produktkortet. */
  summary: string;
  image: string;
  /** Brödtext på produktsidan, ett stycke per element. */
  description: string[];
  /** 3–4 nyckelegenskaper, visas som punktlista. */
  highlights: string[];
  /** Typiska användningsområden. */
  applications: string[];
  specs: Spec[];
  /** Fotnot under specifikationstabellen, t.ex. vilken variant siffrorna avser. */
  specNote?: string;
  variantLabel: string;
  variants: Variant[];
};

export const categories = ["Alla", "Industriarmatur", "Strålkastare", "Tracklight"] as const;
export type Category = Exclude<(typeof categories)[number], "Alla">;

// Källa: https://ksbteknik.se/search?m=Kaarix samt respektive produktsida på ksbteknik.se
// (verifierat 2026-09-13). Beskrivningar och tekniska data är hämtade från KSB:s egna
// produktsidor — hitta inte på specifikationer, och lägg inte till siffror som inte står där.
//
// "BOSTON WORK LIGHT" är exkluderad — den är felaktigt taggad med Tillverkare=Kaarix i
// Starweb men är inte en Kaarix-produkt (se KAARIX_BRAND.md).
//
// OBS om AUSTIN: KSB:s produktnamn anger "7200LM" medan deras egen tekniska tabell anger
// ljusflöde 6400 lm. Vi publicerar tabellvärdet och undviker att göra lumen till ett
// säljargument i rubriker tills Jesper bekräftat vilket som stämmer.
export const products: Product[] = [
  {
    slug: "industriarmatur-austin",
    category: "Industriarmatur",
    name: "Kaarix Industriarmatur AUSTIN",
    shortName: "Industriarmatur AUSTIN",
    tagline: "Robust industriarmatur med DALI-2 och justerbar färgtemperatur.",
    summary: "40 W · CCT 3000–6000 K · IP65 · DALI-2",
    image: "/images/austin.png",
    description: [
      "Kaarix AUSTIN är en robust och energieffektiv industriarmatur utvecklad för lager, verkstäder, produktionslokaler, garage och andra krävande miljöer. Med en effekt på 40 W och ett ljusutbyte på 160 lm/W levererar armaturen kraftfull och jämn belysning samtidigt som energiförbrukningen hålls låg.",
      "Armaturen är utrustad med justerbar färgtemperatur (CCT 3000–6000 K) via DIP-switch, vilket gör det möjligt att anpassa ljuset efter lokalens behov. Den höga kapslingsklassen IP65 skyddar mot damm och vatten och säkerställer lång livslängd även i tuffa industriella miljöer.",
      "För moderna belysningsanläggningar är AUSTIN utrustad med DALI-2-styrning, vilket möjliggör individuell dimring och gruppstyrning. Armaturen levereras med tillbehör för både takmontage och nedpendling, och kan kopplas i serie tack vare 5P-anslutning i båda ändar.",
    ],
    highlights: [
      "160 lm/W ljusutbyte",
      "IP65 och IK08",
      "DALI-2-dimbar",
      "5 års garanti",
    ],
    applications: ["Lager", "Verkstad", "Produktionslokaler", "Garage"],
    specs: [
      { label: "Effekt", value: "40 W" },
      { label: "Ljusflöde", value: "6400 lm" },
      { label: "Ljusutbyte", value: "160 lm/W" },
      { label: "Färgtemperatur (CCT)", value: "3000–6000 K" },
      { label: "Färgåtergivning (CRI)", value: "> 80" },
      { label: "Spridningsvinkel", value: "120°" },
      { label: "Dimbar", value: "DALI-2" },
      { label: "Matningsspänning", value: "AC 200–240 V, 50–60 Hz" },
      { label: "Anslutning", value: "5P-terminal i båda ändar" },
      { label: "Kapslingsklass", value: "IP65" },
      { label: "Slagtålighet", value: "IK08" },
      { label: "Material hölje", value: "Polykarbonat (PC), brandklass UL94 V-0" },
      { label: "Material kupa", value: "Polykarbonat (PC), opalt" },
      { label: "Arbetstemperatur", value: "−20 °C till +50 °C" },
      { label: "Certifieringar", value: "CE, RoHS, D-märkt" },
      { label: "Teknisk livslängd", value: "50 000 timmar" },
      { label: "Garanti", value: "5 år" },
    ],
    specNote: "Tekniska data enligt KSB Tekniks produktblad för artikelnummer 4000132961.",
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
    summary: "50/150/300 W · 4000 K · Aluminium · Härdat glas",
    image: "/images/kaarix-flood.png",
    description: [
      "Kaarix Flood Light Houston är en kraftfull och energieffektiv LED-strålkastare för allmän belysning både inomhus och utomhus. Armaturen passar för lastkajer, industrifastigheter, garageuppfarter, parkeringsytor, byggnader och arbetsområden där hög ljuskvalitet och driftsäkerhet krävs.",
      "Den slimmade konstruktionen kombinerar hög prestanda med lång livslängd. Armaturhus och monteringsbygel är tillverkade i korrosionsbeständigt aluminium och kompletteras med rostfria skruvar för optimalt skydd mot väder och vind, vilket gör armaturen särskilt lämpad för krävande utomhusmiljöer.",
      "Strålkastaren är utrustad med härdat säkerhetsglas och UV-beständig silikonpackning som säkerställer hög täthet och långvarig funktion. Den symmetriska ljusfördelningen ger jämn och effektiv belysning, och den justerbara monteringsbygeln möjliggör installation på vägg, tak eller stativ. Armaturen levereras med förmonterad 6 m anslutningskabel.",
    ],
    highlights: [
      "Tre effektnivåer: 50, 150 och 300 W",
      "Korrosionsbeständigt aluminium",
      "Härdat säkerhetsglas",
      "Förmonterad 6 m kabel",
    ],
    applications: ["Lastkajer", "Parkeringsytor", "Fasadbelysning", "Arbetsområden"],
    specs: [
      { label: "Effekt", value: "50 W / 150 W / 300 W (beroende på variant)" },
      { label: "Färgtemperatur", value: "4000 K" },
      { label: "Ljusfördelning", value: "Symmetrisk" },
      { label: "Material hölje", value: "Korrosionsbeständigt aluminium" },
      { label: "Skruvar", value: "Rostfritt stål" },
      { label: "Glas", value: "Härdat säkerhetsglas" },
      { label: "Packning", value: "UV-beständig silikon" },
      { label: "Anslutning", value: "Förmonterad 6 m kabel" },
      { label: "Montage", value: "Justerbar bygel för vägg, tak eller stativ" },
    ],
    specNote:
      "Kompletta tekniska data per effektnivå finns i produktbladet på respektive produktsida hos KSB Teknik.",
    variantLabel: "Effekt",
    variants: [
      {
        label: "50 W",
        sku: "4000132791",
        orderUrl: "https://ksbteknik.se/product/kaarix-flood-light-50w-4000k-stralkastare-",
      },
      {
        label: "150 W",
        sku: "4000132792",
        orderUrl:
          "https://ksbteknik.se/product/kaarix-flood-light-50w-4000k-stralkastare-houston-kopia",
      },
      {
        label: "300 W",
        sku: "4000132793",
        orderUrl:
          "https://ksbteknik.se/product/kaarix-flood-light-150w-4000k-stralkastare-houston-kopia",
      },
    ],
  },
  {
    slug: "tracklight-cob-led",
    category: "Tracklight",
    name: "Kaarix Tracklight COB LED",
    shortName: "Tracklight COB LED",
    tagline: "Fasdimbar spotlight för 3-fas skensystem.",
    summary: "20/30 W · 3000 K · IP65 · FAS-DIM",
    image: "/images/kaarix-tracklight-svart.png",
    description: [
      "Kaarix Tracklight COB LED är utvecklad för professionella belysningsinstallationer där hög ljuskvalitet, energieffektivitet och lång livslängd står i fokus. Armaturen finns i 20 W och 30 W och levererar ett ljusutbyte på upp till 90 lm/W.",
      "Armaturen är tillverkad i robust pressgjuten aluminium och har kapslingsklass IP65, vilket gör den lämplig även för miljöer där skydd mot damm och fukt är viktigt.",
      "Tracklighten monteras enkelt i 3-fas skena och är smidig att rotera och rikta för önskad ljusbild. Den finns i både svart och vitt utförande.",
    ],
    highlights: [
      "3-fas skenmontage",
      "Fasdimbar (FAS-DIM)",
      "IP65 i pressgjuten aluminium",
      "Svart eller vitt utförande",
    ],
    applications: ["Butik", "Showroom", "Reception", "Utställningsytor"],
    specs: [
      { label: "Effekt", value: "20 W (även 30 W som variant)" },
      { label: "Ljusflöde", value: "1800 lm" },
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
      "Siffrorna avser 20 W-utförandet (artikelnummer 4000132892). Data för 30 W finns i produktbladet på respektive produktsida.",
    variantLabel: "Effekt och kulör",
    variants: [
      {
        label: "20 W, svart",
        sku: "4000132892",
        orderUrl: "https://ksbteknik.se/product/spotlight-tracklight-3-fas-fasdim",
        image: "/images/kaarix-tracklight-svart.png",
      },
      {
        label: "20 W, vit",
        sku: "4000132893",
        orderUrl:
          "https://ksbteknik.se/product/tracklight-cob-led-20w-3-fas-3000k-fasdim-svart-kopia",
        image: "/images/kaarix-tracklight-vit.png",
      },
      {
        label: "30 W, svart",
        sku: "4000132894",
        orderUrl:
          "https://ksbteknik.se/product/tracklight-cob-led-20w-3-fas-3000k-fasdim-svart-kopia-2",
        image: "/images/kaarix-tracklight-svart.png",
      },
      {
        label: "30 W, vit",
        sku: "4000132895",
        orderUrl:
          "https://ksbteknik.se/product/tracklight-cob-led-20w-3-fas-3000k-fasdim-vit-kopia",
        image: "/images/kaarix-tracklight-vit.png",
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

/** Länk till hela Kaarix-sortimentet i KSB:s webshop. */
export const storeUrl = "https://ksbteknik.se/search?m=Kaarix";
