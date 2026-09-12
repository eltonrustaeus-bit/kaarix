export type Product = {
  sku: string;
  category: string;
  name: string;
  spec: string;
  image: string;
  orderUrl: string;
};

// Källa: https://ksbteknik.se/search?m=Kaarix (live produktdata från KSB Tekniks Starweb-webshop).
// "BOSTON WORK LIGHT" är exkluderad — den är felaktigt taggad med Tillverkare=Kaarix i Starweb
// men är inte en Kaarix-produkt (se KAARIX_BRAND.md, datakvalitetsanteckning).
export const products: Product[] = [
  {
    sku: "4000132961",
    category: "Industriarmatur",
    name: "Kaarix Industriarmatur AUSTIN",
    spec: "7200LM, 40W, CCT, IP65, DALI, VIT",
    image: "/images/austin.png",
    orderUrl:
      "https://ksbteknik.se/product/tracklight-cob-led-30w-3-fas-3000k-fasdim-vit-kopia",
  },
  {
    sku: "4000132791",
    category: "Strålkastare",
    name: "Kaarix Flood Light 50W, 4000K, Houston",
    spec: "Kraftfull, energieffektiv LED-strålkastare för inom- och utomhusbruk.",
    image: "/images/kaarix-flood.png",
    orderUrl: "https://ksbteknik.se/product/kaarix-flood-light-50w-4000k-stralkastare-",
  },
  {
    sku: "4000132792",
    category: "Strålkastare",
    name: "Kaarix Flood Light 150W, 4000K, Houston",
    spec: "Kraftfull, energieffektiv LED-strålkastare för inom- och utomhusbruk.",
    image: "/images/kaarix-flood.png",
    orderUrl:
      "https://ksbteknik.se/product/kaarix-flood-light-50w-4000k-stralkastare-houston-kopia",
  },
  {
    sku: "4000132793",
    category: "Strålkastare",
    name: "Kaarix Flood Light 300W, 4000K, Houston",
    spec: "Kraftfull, energieffektiv LED-strålkastare för inom- och utomhusbruk.",
    image: "/images/kaarix-flood.png",
    orderUrl:
      "https://ksbteknik.se/product/kaarix-flood-light-150w-4000k-stralkastare-houston-kopia",
  },
  {
    sku: "4000132892",
    category: "Tracklight",
    name: "Tracklight COB LED 20W, 3-fas, 3000K, SVART",
    spec: "Fasdimbar spotlight för skenbelysning, svart utförande.",
    image: "/images/kaarix-tracklight-svart.png",
    orderUrl: "https://ksbteknik.se/product/spotlight-tracklight-3-fas-fasdim",
  },
  {
    sku: "4000132893",
    category: "Tracklight",
    name: "Tracklight COB LED 20W, 3-fas, 3000K, VIT",
    spec: "Fasdimbar spotlight för skenbelysning, vitt utförande.",
    image: "/images/kaarix-tracklight-vit.png",
    orderUrl:
      "https://ksbteknik.se/product/tracklight-cob-led-20w-3-fas-3000k-fasdim-svart-kopia",
  },
  {
    sku: "4000132894",
    category: "Tracklight",
    name: "Tracklight COB LED 30W, 3-fas, 3000K, SVART",
    spec: "Fasdimbar spotlight för skenbelysning, svart utförande.",
    image: "/images/kaarix-tracklight-svart.png",
    orderUrl:
      "https://ksbteknik.se/product/tracklight-cob-led-20w-3-fas-3000k-fasdim-svart-kopia-2",
  },
  {
    sku: "4000132895",
    category: "Tracklight",
    name: "Tracklight COB LED 30W, 3-fas, 3000K, VIT",
    spec: "Fasdimbar spotlight för skenbelysning, vitt utförande.",
    image: "/images/kaarix-tracklight-vit.png",
    orderUrl:
      "https://ksbteknik.se/product/tracklight-cob-led-20w-3-fas-3000k-fasdim-vit-kopia",
  },
];
