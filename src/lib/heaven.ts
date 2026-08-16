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
      "A restorative cleanse and resurface designed to lift dullness and return a natural, healthy luminosity to the skin. Includes consultation fee.",
    includes: ["Deep cleanse", "Gentle exfoliation", "Massage", "Mask & finish"],
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
      "A rejuvenating treatment designed to cleanse, refresh, hydrate and reveal a brighter-looking complexion.",
    includes: ["Extraction", "Hydrafacial machine cleaning", "Dermaplaning", "LED light mask", "Facial sheet mask", "Toning"],
    idealFor: ["Hydration", "Dullness", "Congestion", "Skin refresh"],
    goals: ["hydration", "glow", "unsure"],
  },
  {
    slug: "enzyme-customized-facial",
    name: "Enzyme Customized Facial",
    signature: "The Custom Enzyme",
    price: "180,000 TZS",
    category: "skin",
    summary:
      "A personalized enzyme treatment customized precisely to your skin type and specific conditions.",
    includes: ["Skin type assessment", "Customized enzyme exfoliation", "Targeted mask", "Nutrient infusion"],
    idealFor: ["Customized care", "All skin types", "Sensitivity", "Texture"],
    goals: ["glow", "texture", "unsure"],
  },
  {
    slug: "firming-peptide-facial",
    name: "Firming Peptide Facial",
    signature: "The Luxe Lift",
    price: "200,000 TZS",
    category: "skin",
    summary:
      "A sculpting, peptide-rich facial focused on firmness, contour and a visibly lifted appearance.",
    includes: ["Peptide infusion", "Lifting massage", "Cooling globes", "Firming mask"],
    idealFor: ["Firmness", "Contour", "Fine lines", "Special occasions"],
    goals: ["firmness", "rejuvenation"],
  },
  {
    slug: "c2o2-oxygenating-facial",
    name: "C2O2 Oxygenating Facial Treatment",
    signature: "The Oxygen Glow",
    price: "280,000 TZS",
    category: "skin",
    summary:
      "An advanced oxygenating treatment designed to revive sluggish, dull, or tired skin by boosting cellular oxygenation.",
    includes: ["Oxygen infusion", "Deep cleansing", "Exfoliation", "Oxygenating mask", "Revitalizing serums"],
    idealFor: ["Dull skin", "Cellular renewal", "Anti-aging", "Skin brightening"],
    goals: ["glow", "rejuvenation", "hydration"],
  },
  {
    slug: "switch-anti-aging-facial",
    name: "Switch Anti Aging Facial",
    signature: "The Reset",
    price: "300,000 TZS",
    category: "skin",
    summary:
      "A tailored anti-aging treatment utilizing bio acid application and advanced cell renewal techniques. Home care products included.",
    includes: ["Cleansing", "Skin prep", "Bio acid application", "Home care products"],
    idealFor: ["Aged skin", "Fine lines", "Texture", "Hyperpigmentation"],
    goals: ["rejuvenation", "firmness"],
  },
  {
    slug: "microneedling",
    name: "Microneedling",
    signature: "The Renewal",
    price: "250,000 TZS",
    category: "advanced",
    summary:
      "A precise collagen-induction treatment for texture, tone and long-term skin renewal.",
    includes: ["Consultation", "Numbing & prep", "Controlled microneedling", "Recovery serum"],
    idealFor: ["Texture", "Scarring", "Tone", "Renewal"],
    goals: ["texture", "rejuvenation", "firmness"],
  },
  {
    slug: "carbon-laser",
    name: "Carbon Laser Treatment",
    signature: "The Mirror",
    price: "200,000 TZS",
    category: "advanced",
    summary:
      "A refining carbon treatment that clarifies pores and leaves the skin polished and even.",
    includes: ["Carbon application", "Laser pass", "Soothing mask", "SPF finish"],
    idealFor: ["Congestion", "Oiliness", "Uneven tone", "Polish"],
    goals: ["texture", "glow"],
  },
  {
    slug: "chemical-peel",
    name: "Chemical Peel",
    signature: "The Peel",
    price: "300,000 TZS",
    category: "advanced",
    summary:
      "A tailored resurfacing peel formulated to your skin's tolerance and goals.",
    includes: ["Skin assessment", "Tailored peel", "Neutralise", "Aftercare plan"],
    idealFor: ["Pigmentation", "Texture", "Dullness", "Renewal"],
    goals: ["texture", "rejuvenation"],
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
