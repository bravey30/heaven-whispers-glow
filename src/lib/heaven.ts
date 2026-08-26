export type Treatment = {
  slug: string;
  name: string;
  signature: string;
  price: string;
  category: "skin" | "advanced" | "beauty" | "body";
  summary: string;
  includes: string[];
  idealFor: string[];
  goals: string[];
};

export const treatments: Treatment[] = [
  {
    slug: "basic-glow-facial",
    name: "Basic Glow Facial",
    signature: "The Glow",
    price: "85,000 TZS",
    category: "skin",
    summary:
      "A radiance ritual that resets dull, tired skin — deep cleanse, gentle extraction and dermaplaning, a Spirulina Jelly Mask to hydrate and calm, LED light therapy, and a nourishing sheet mask finish. Consultation included.",
    includes: ["Consultation", "Cleansing", "Extraction", "Dermaplaning", "Spirulina Jelly Mask", "LED Therapy", "Facial Sheet Mask"],
    idealFor: ["Dullness", "Everyday upkeep", "First visits", "Glow"],
    goals: ["glow", "relaxation", "unsure"],
  },
  {
    slug: "hydrofacial",
    name: "Hydrofacial",
    signature: "The Hydra",
    price: "120,000 TZS",
    category: "skin",
    summary:
      "A next-generation facial powered by the HydraFacial Advanced Machine — dermaplaning followed by vortex-suction cleansing, extraction and hydrating serum infusion for a clearer, plumper, visibly refreshed complexion with no downtime. Consultation included.",
    includes: ["Dermaplaning", "HydraFacial Machine Treatment", "Facial Sheet Mask"],
    idealFor: ["Hydration", "Dullness", "Congestion", "Skin refresh"],
    goals: ["hydration", "glow", "unsure"],
  },
  {
    slug: "firming-peptide-facial",
    name: "Firming Peptide Facial",
    signature: "The Luxe Lift",
    price: "200,000 TZS",
    category: "skin",
    summary:
      "A Circadia-protocol facial that instantly firms and brightens the skin, increasing elasticity and visibly reducing wrinkles — enzyme cleansers and masks paired with a Firming Peptide Enzyme Mask to stimulate collagen and elastin at the cellular level. 60 minutes, recommended monthly. Mandatory skin consultation required (30,000 TZS).",
    includes: ["Lipid & Vitamin Veil Oil Cleanse", "Amandola Milk Cleanser", "Raspberry Enzyme Mask & Activator", "Firming Peptide Enzyme Mask", "Snow Algae & Spirulina Cooling Mask"],
    idealFor: ["Aging skin", "Hyperpigmentation", "Fine lines & wrinkles", "Loss of elasticity"],
    goals: ["firmness", "rejuvenation"],
  },
  {
    slug: "c2o2-acne-facial",
    name: "C2O2 Acne Facial Treatment",
    signature: "C2O2",
    price: "280,000 TZS",
    category: "skin",
    summary:
      "A Circadia Oxygen Rx treatment that rejuvenates the skin through improved circulation, oxygen and nutrient delivery, and heightened cellular function. The Charcoal Milk Clarifying Mask exfoliates and detoxifies congested skin using bamboo charcoal, lactobionic acid and kaolin clay — suited to all skin types. 40 minutes, monthly or as needed. Mandatory skin consultation required (30,000 TZS). Not recommended within 12 months of Accutane use.",
    includes: ["Vitamin Veil Cleanser", "Cleansing Gel with Mandelic Acid", "Charcoal Milk Clarifying Mask & Activator", "Oxygen Rx Facial Mask", "Spot Stop"],
    idealFor: ["Acne", "Sensitive & congested skin", "Redness & inflammation", "Hormonal acne"],
    goals: ["glow", "rejuvenation", "hydration"],
  },
  {
    slug: "microneedling",
    name: "Microneedling with Retinol & Hyaluronic Acid",
    signature: "Retinol + HA",
    price: "300,000 TZS",
    category: "advanced",
    summary:
      "A collagen-stimulating renewal treatment using controlled micro-injury, paired with DermaFix ActiveCellCeuticals Retinol+ micro-encapsulated spheres and Hyaluronic Gel for deeper transdermal delivery — smoother, firmer, deeply hydrated skin. Mandatory skin consultation required (30,000 TZS).",
    includes: ["Microneedling", "Retinol+ Application", "Hyaluronic Gel Application"],
    idealFor: ["Aging skin", "Fine lines & wrinkles", "Dehydration", "Hyperpigmentation"],
    goals: ["texture", "rejuvenation", "firmness"],
  },
  {
    slug: "microneedling-six-peptides",
    name: "Microneedling with Six Peptides Ampoule",
    signature: "Six Peptides",
    price: "250,000 TZS",
    category: "advanced",
    summary:
      "A collagen-stimulating renewal treatment paired with the Lepata Six Peptides Ampoule to accelerate healing and maximize results — repairing sensitive skin, reducing acne, and strengthening the skin barrier for smoother texture and faded scarring. Mandatory skin consultation required (30,000 TZS).",
    includes: ["Microneedling", "Six Peptides Ampoule Application"],
    idealFor: ["Acne scarring", "Uneven texture", "Fine lines", "Weakened skin barrier"],
    goals: ["texture", "rejuvenation"],
  },
  {
    slug: "dermafrost-peel",
    name: "DermaFrost Salicylic Acid Peel",
    signature: "DermaFrost",
    price: "300,000 TZS",
    category: "advanced",
    summary:
      "A Circadia intelligent peel infused with anti-aging peptides, antioxidants, stem cells and botanicals, applied in layers and monitored under magnification for even, controlled results — leaving a firm, luminous glow. 30 minutes, every 2-3 months. Mandatory skin consultation required (30,000 TZS).",
    includes: ["Pre-Cleanse", "Cleanse", "Rebalance", "DermaFrost Peel Application"],
    idealFor: ["All skin types", "Aging", "Acne", "Hyperpigmentation", "Congestion"],
    goals: ["texture", "rejuvenation"],
  },
  {
    slug: "mandeliclear-peel",
    name: "MandeliClear with Vitamin A Accelerator Peel",
    signature: "MandeliClear",
    price: "350,000 TZS",
    category: "advanced",
    summary:
      "A deeper Circadia peel developed specifically for pigmentation in skin of color — the MandeliClear acid complex lightens pigmentation from acne, melasma or sun damage, accelerated by the Vitamin A Accelerator for a brighter, more even complexion. 15-35 minutes, every 2-3 months. Mandatory skin consultation required (30,000 TZS).",
    includes: ["Pre-Cleanse & Cleanse", "Prep", "MandeliClear Peel Application", "Vitamin A Accelerator"],
    idealFor: ["Hyperpigmentation", "Melasma", "Sun damage", "Acne"],
    goals: ["texture", "rejuvenation"],
  },
  {
    slug: "carbon-laser",
    name: "Carbon Peel Treatment",
    signature: "Carbon Laser Facial",
    price: "200,000 TZS",
    category: "advanced",
    summary:
      "A non-invasive laser treatment where a carbon-based gel binds with impurities and excess oil, then a specialized laser lifts out debris while stimulating collagen production — smoothing texture, softening acne scars, minimizing pores. No downtime, ideal for regular maintenance. Mandatory skin consultation required (30,000 TZS).",
    includes: ["Carbon Gel Application", "Laser Treatment"],
    idealFor: ["Post-acne marks", "Acne scarring", "Enlarged pores", "Uneven skin tone"],
    goals: ["texture", "glow"],
  },
  {
    slug: "swich-anti-aging",
    name: "SWICH Dermal Rejuvenation System",
    signature: "SWICH Anti-Aging Treatment",
    price: "300,000 TZS",
    category: "advanced",
    summary:
      "A unique Circadia alternative to chemical peels that switches on the skin's own repair mechanism to restore its optimum appearance without injury — exfoliated, brighter, visibly rejuvenated skin. Includes a full treatment session, home care package and aftercare card. 70 minutes, every 4 weeks for a series of 6+. Mandatory skin consultation required (30,000 TZS).",
    includes: ["Full Treatment Session", "Home Care Package", "Aftercare Card"],
    idealFor: ["Aging", "Hyperpigmentation", "Keratinized skin", "Dull, lackluster skin"],
    goals: ["rejuvenation", "firmness"],
  },
  {
    slug: "skin-consultation",
    name: "Mandatory Skin Consultation",
    signature: "Skin Consultation",
    price: "30,000 TZS",
    category: "skin",
    summary:
      "A facial-analyzer assessment of your skin's true condition, required before advanced treatments — tailored facial treatment recommendations, a home care product plan suited to your goals, and a confidentiality form to protect your privacy.",
    includes: ["Facial Skin Analysis", "Facial Treatment Recommendations", "Home Care Product Recommendations", "Confidentiality Form"],
    idealFor: ["Before any advanced treatment", "Personalized skin plan", "New clients"],
    goals: ["unsure"],
  },
  {
    slug: "classic-lashes",
    name: "Classic Lashes",
    signature: "The Classic Gaze",
    price: "45,000 TZS",
    category: "beauty",
    summary:
      "Individually applied lash extensions for a natural, elegant lash enhancement.",
    includes: ["Lash mapping", "Classic application", "Isolation & bonding", "Aftercare guide"],
    idealFor: ["Natural look", "Everyday definition", "First timers"],
    goals: ["glow", "unsure"],
  },
  {
    slug: "hybrid-lashes",
    name: "Hybrid Lashes",
    signature: "The Hybrid Gaze",
    price: "55,000 TZS",
    category: "beauty",
    summary:
      "A beautiful blend of classic and volume lash techniques for texture and soft fullness.",
    includes: ["Custom mapping", "Hybrid application", "Isolation & bonding", "Aftercare"],
    idealFor: ["Textured lashes", "Medium fullness", "Versatility"],
    goals: ["glow", "unsure"],
  },
  {
    slug: "volume-lashes",
    name: "Volume Lashes",
    signature: "The Volume Gaze",
    price: "70,000 TZS",
    category: "beauty",
    summary:
      "Multi-lash fans applied to each natural lash to create a fuller, denser, and more dramatic look.",
    includes: ["Volume fan styling", "Full density application", "Bonding", "Aftercare"],
    idealFor: ["Glamour", "Dense look", "Drama"],
    goals: ["glow", "unsure"],
  },
  {
    slug: "mega-volume-lashes",
    name: "Mega Volume Lashes",
    signature: "The Mega Gaze",
    price: "85,000 TZS",
    category: "beauty",
    summary:
      "The ultimate lash density using ultra-fine extensions for maximum fullness and a bold, dense effect.",
    includes: ["Ultra-fine mega fans", "Maximum density placement", "Bonding", "Aftercare"],
    idealFor: ["Maximum drama", "Bold eyes", "Thickest lash look"],
    goals: ["glow", "unsure"],
  },
  {
    slug: "volume-refill",
    name: "Volume Refill",
    signature: "Volume Refill",
    price: "35,000 TZS",
    category: "beauty",
    summary:
      "Maintain your volume lash set. Recommended every 2-3 weeks to replace shed lashes.",
    includes: ["Lash cleaning", "Grown-out lash removal", "Volume lash replacement"],
    idealFor: ["Lash upkeep", "Volume maintenance"],
    goals: ["glow", "unsure"],
  },
  {
    slug: "classic-hybrid-refill",
    name: "Classic & Hybrid Lash Refill",
    signature: "Classic/Hybrid Refill",
    price: "30,000 TZS",
    category: "beauty",
    summary:
      "Maintain your classic or hybrid lash set. Recommended every 2-3 weeks to keep them looking fresh.",
    includes: ["Lash cleaning", "Removal of loose extensions", "Classic/hybrid replacement"],
    idealFor: ["Lash upkeep", "Classic/hybrid maintenance"],
    goals: ["glow", "unsure"],
  },
  {
    slug: "mega-volume-refill",
    name: "Mega Volume Refill",
    signature: "Mega Refill",
    price: "45,000 TZS",
    category: "beauty",
    summary:
      "Keep your mega volume set in pristine, dense condition. Recommended every 2-3 weeks.",
    includes: ["Lash cleaning", "Outgrown extension removal", "Mega volume replacement"],
    idealFor: ["Lash upkeep", "Mega volume maintenance"],
    goals: ["glow", "unsure"],
  },
  {
    slug: "brow-lamination",
    name: "Brow Lamination",
    signature: "The Brow Sculpt",
    price: "35,000 TZS",
    category: "beauty",
    summary:
      "A brow-setting treatment that realigns and redirects brow hairs for a fuller, fluffier, and groomed appearance.",
    includes: ["Brow shaping", "Lamination solution", "Nourishing oil", "Grooming guide"],
    idealFor: ["Fuller brows", "Unruly brows", "Symmetry", "Definition"],
    goals: ["glow", "unsure"],
  },
  {
    slug: "full-bikini-wax",
    name: "Full Bikini Wax (For Women)",
    signature: "Bikini Wax",
    price: "20,000 TZS",
    category: "body",
    summary: "A complete, clean full bikini wax treatment for women, designed with care and hygiene.",
    includes: ["Warm wax application", "Hair removal", "Soothing oil finish"],
    idealFor: ["Smoothness", "Hair removal", "Hygiene"],
    goals: ["unsure"],
  },
  {
    slug: "underarm-wax",
    name: "Underarm Wax",
    signature: "Underarm Wax",
    price: "15,000 TZS",
    category: "body",
    summary: "A quick and gentle underarm waxing treatment to keep the area smooth and hair-free.",
    includes: ["Cleansing", "Gentle waxing", "Calming lotion"],
    idealFor: ["Smoothness", "Hygiene", "Everyday upkeep"],
    goals: ["unsure"],
  },
  {
    slug: "full-arm-wax",
    name: "Full Arm Wax",
    signature: "Full Arm Wax",
    price: "40,000 TZS",
    category: "body",
    summary: "Full arm waxing treatment for smooth, hair-free skin from shoulder to wrist.",
    includes: ["Skin preparation", "Waxing pass", "Nourishing post-wax treatment"],
    idealFor: ["Smoothness", "Texture"],
    goals: ["unsure"],
  },
  {
    slug: "half-arm-wax",
    name: "Half Arm Wax",
    signature: "Half Arm Wax",
    price: "30,000 TZS",
    category: "body",
    summary: "Waxing treatment for lower or upper arms, leaving skin feeling soft and smooth.",
    includes: ["Skin preparation", "Waxing pass", "Calming gel"],
    idealFor: ["Smoothness", "Everyday definition"],
    goals: ["unsure"],
  },
];

export const categories = [
  {
    key: "skin",
    label: "Skin",
    sub: "Facials & Skin Wellness",
  },
  {
    key: "advanced",
    label: "Advanced",
    sub: "Advanced Aesthetics",
  },
  {
    key: "beauty",
    label: "Beauty",
    sub: "Lashes & Brows",
  },
  {
    key: "body",
    label: "Body",
    sub: "Body Care",
  },
] as const;

export const goals = [
  { key: "glow", label: "Glow" },
  { key: "hydration", label: "Hydration" },
  { key: "texture", label: "Texture" },
  { key: "firmness", label: "Firmness" },
  { key: "rejuvenation", label: "Rejuvenation" },
  { key: "relaxation", label: "Relaxation" },
  { key: "unsure", label: "I'm not sure" },
] as const;

export function recommendFor(goal: string): Treatment {
  return treatments.find((t) => t.goals.includes(goal)) ?? treatments[1]!;
}
