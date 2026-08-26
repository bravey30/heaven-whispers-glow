export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: "cleansers" | "masks" | "serums" | "moisturizers";
  price: number;
  size: string;
  description: string;
  benefits: string[];
};

export const products: Product[] = [
  {
    slug: "lepata-rose-foaming-cleanser",
    name: "Rose Foaming Cleanser",
    brand: "Lepata",
    category: "cleansers",
    price: 45000,
    size: "150ml",
    description:
      "A gentle foaming cleanser formulated with botanical extracts, amino acid surfactants and hyaluronic acid — cleanses without stripping the skin barrier, while rose and raspberry extracts soothe and calm.",
    benefits: ["Gentle daily cleanse", "Barrier-safe surfactants", "Soothes & calms"],
  },
  {
    slug: "vitamin-veil-cleanser",
    name: "Vitamin Veil Oil Cleanser",
    brand: "Circadia",
    category: "cleansers",
    price: 60000,
    size: "120ml",
    description:
      "A lightweight oil cleanser that gently lifts impurities and prepares the skin for treatment, without disturbing its natural moisture balance.",
    benefits: ["Melts away impurities", "Preps skin for actives", "Non-stripping"],
  },
  {
    slug: "lipid-cleanser",
    name: "Lipid Cleanser",
    brand: "Circadia",
    category: "cleansers",
    price: 58000,
    size: "120ml",
    description:
      "A lipid-replenishing cleanser that clears the skin while reinforcing its natural protective layer, ideal as a first step in a layered routine.",
    benefits: ["Replenishes lipids", "First-cleanse step", "Suits sensitised skin"],
  },
  {
    slug: "amandola-milk-cleanser",
    name: "Amandola Milk Cleanser",
    brand: "Circadia",
    category: "cleansers",
    price: 62000,
    size: "150ml",
    description:
      "A creamy milk cleanser that softens and exfoliates as it cleanses, leaving the skin smooth and ready for targeted treatment.",
    benefits: ["Softens & exfoliates", "Creamy, non-drying finish", "Preps for enzyme masks"],
  },
  {
    slug: "lepata-spirulina-jelly-mask",
    name: "Spirulina Jelly Mask",
    brand: "Lepata",
    category: "masks",
    price: 65000,
    size: "100g",
    description:
      "Powered by spirulina, centella asiatica, portulaca and scutellaria root extracts to deeply hydrate, calm irritation and restore vitality with antioxidant and brightening support.",
    benefits: ["Deep hydration", "Calms irritation", "Antioxidant & brightening"],
  },
  {
    slug: "charcoal-milk-clarifying-mask",
    name: "Charcoal Milk Clarifying Mask",
    brand: "Circadia",
    category: "masks",
    price: 75000,
    size: "90g",
    description:
      "Transforms dry, congested skin through gentle exfoliation and detoxification using bamboo charcoal, lactobionic acid and kaolin clay, while olive squalane hydrates and helps prevent water loss.",
    benefits: ["Draws out impurities", "Brightens & hydrates", "Suits acne-prone skin"],
  },
  {
    slug: "snow-algae-spirulina-cooling-mask",
    name: "Snow Algae & Spirulina Cooling Mask",
    brand: "Circadia",
    category: "masks",
    price: 70000,
    size: "90g",
    description:
      "A cooling finishing mask that calms and hydrates after exfoliation or active treatment, leaving the skin settled and comfortable.",
    benefits: ["Cools & calms", "Post-treatment recovery", "Deeply hydrating"],
  },
  {
    slug: "lepata-six-peptides-ampoule",
    name: "Six Peptides Ampoule",
    brand: "Lepata",
    category: "serums",
    price: 120000,
    size: "30ml",
    description:
      "Formulated to repair sensitive skin, reduce acne and minimize scarring — stimulates collagen and elastin production, heals post-acne skin, and strengthens the skin barrier.",
    benefits: ["Anti-wrinkle & lifting", "Repairs post-acne skin", "Strengthens skin barrier"],
  },
  {
    slug: "dermafix-retinol-plus",
    name: "Retinol+",
    brand: "DermaFix ActiveCellCeuticals",
    category: "serums",
    price: 130000,
    size: "30ml",
    description:
      "Cylasphere micro-encapsulated retinol spheres deliver a slow, gentle release into the skin — stimulating fibroblasts to thicken the dermis, resurface texture and reduce hyperpigmentation.",
    benefits: ["Slow-release retinol", "Resurfaces texture", "Reduces hyperpigmentation"],
  },
  {
    slug: "dermafix-hyaluronic-gel",
    name: "Hyaluronic Gel",
    brand: "DermaFix ActiveCellCeuticals",
    category: "serums",
    price: 95000,
    size: "30ml",
    description:
      "A concentrated humectant that binds water into the skin to plump fine lines and wrinkles caused by dehydration, leaving skin smoother and deeply hydrated.",
    benefits: ["Concentrated hydration", "Plumps fine lines", "Pairs well with retinol"],
  },
  {
    slug: "circadia-spot-stop",
    name: "Spot Stop",
    brand: "Circadia",
    category: "serums",
    price: 40000,
    size: "15ml",
    description:
      "A targeted spot treatment for active breakouts, formulated to calm redness and support clearer-looking skin between visits.",
    benefits: ["Targets active breakouts", "Calms redness", "Fits any routine"],
  },
  {
    slug: "lepata-hydrating-moisturizer",
    name: "Hydrating Moisturizer",
    brand: "Lepata",
    category: "moisturizers",
    price: 55000,
    size: "50ml",
    description:
      "A daily moisturizer that locks in hydration and supports the skin barrier, formulated to complement every Heaven facial and home care routine.",
    benefits: ["Daily barrier support", "Lightweight finish", "Pairs with any routine"],
  },
];

export const productCategories = [
  { key: "cleansers", label: "Cleansers" },
  { key: "masks", label: "Masks" },
  { key: "serums", label: "Serums & Treatments" },
  { key: "moisturizers", label: "Moisturizers" },
] as const;

export function formatTzs(amount: number) {
  return `${amount.toLocaleString("en-US")} TZS`;
}
