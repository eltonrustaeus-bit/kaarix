export type Variant = {
  label: string;
  sku: string;
  orderUrl: string;
};

export type Product = {
  slug: string;
  category: string;
  name: string;
  spec: string;
  image: string;
  variantLabel: string; // e.g. "Effekt" or "Kulör"
  variants: Variant[];
};

// Källa: https://ksbteknik.se/search?m=Kaarix (live produktdata från KSB Tekniks Starweb-webshop).
// "BOSTON WORK LIGHT" är exkluderad — den är felaktigt taggad med Tillverkare=Kaarix i Starweb
// men är inte en Kaarix-produkt (se KAARIX_BRAND.md, datakvalitetsanteckning).
//
// Varianter (olika effekt/kulör av samma produktfamilj) är grupperade till ETT produktkort
// med en väljare, istället för separata nästan identiska kort — mindre repetitivt för besökaren.
export const products: Product[] = [
  {
    slug: "austin",
    category: "Industriarmatur",
    name: "Kaarix Industriarmatur AUSTIN",
    spec: "7200LM, CCT, IP65, DALI",
    image: "/images/austin.png",
    variantLabel: "Utförande",
    variants: [
      {
        label: "40W, VIT",
        sku: "4000132961",
        orderUrl:
          "https://ksbteknik.se/product/tracklight-cob-led-30w-3-fas-3000k-fasdim-vit-kopia",
      },
    ],
  },
  {
    slug: "flood-light-houston",
    category: "Strålkastare",
    name: "Kaarix Flood Light, 4000K, Houston",
    spec: "Kraftfull, energieffektiv LED-strålkastare för inom- och utomhusbruk.",
    image: "/images/kaarix-flood.png",
    variantLabel: "Effekt",
    variants: [
      {
        label: "50W",
        sku: "4000132791",
        orderUrl: "https://ksbteknik.se/product/kaarix-flood-light-50w-4000k-stralkastare-",
      },
      {
        label: "150W",
        sku: "4000132792",
        orderUrl:
          "https://ksbteknik.se/product/kaarix-flood-light-50w-4000k-stralkastare-houston-kopia",
      },
      {
        label: "300W",
        sku: "4000132793",
        orderUrl:
          "https://ksbteknik.se/product/kaarix-flood-light-150w-4000k-stralkastare-houston-kopia",
      },
    ],
  },
  {
    slug: "tracklight-cob-led",
    category: "Tracklight",
    name: "Tracklight COB LED, 3-fas, 3000K, FASDIM",
    spec: "Fasdimbar spotlight för skenbelysning.",
    image: "/images/kaarix-tracklight-svart.png",
    variantLabel: "Effekt & kulör",
    variants: [
      {
        label: "20W, SVART",
        sku: "4000132892",
        orderUrl: "https://ksbteknik.se/product/spotlight-tracklight-3-fas-fasdim",
      },
      {
        label: "20W, VIT",
        sku: "4000132893",
        orderUrl:
          "https://ksbteknik.se/product/tracklight-cob-led-20w-3-fas-3000k-fasdim-svart-kopia",
      },
      {
        label: "30W, SVART",
        sku: "4000132894",
        orderUrl:
          "https://ksbteknik.se/product/tracklight-cob-led-20w-3-fas-3000k-fasdim-svart-kopia-2",
      },
      {
        label: "30W, VIT",
        sku: "4000132895",
        orderUrl:
          "https://ksbteknik.se/product/tracklight-cob-led-20w-3-fas-3000k-fasdim-vit-kopia",
      },
    ],
  },
];

// Bild per kulör-variant för tracklighten (svart/vit ser olika ut).
export const tracklightImageByFinish: Record<string, string> = {
  SVART: "/images/kaarix-tracklight-svart.png",
  VIT: "/images/kaarix-tracklight-vit.png",
};

export const categories = ["Alla", "Industriarmatur", "Strålkastare", "Tracklight"] as const;
