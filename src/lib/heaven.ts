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
    price: "50,000 TZS",
    category: "skin",
    summary:
      "A restorative cleanse and resurface designed to lift dullness and return a natural, healthy luminosity to the skin.",
    includes: ["Deep cleanse", "Gentle exfoliation", "Massage", "Mask & finish"],
    idealFor: ["Dullness", "Everyday upkeep", "First visits", "Glow"],
    goals: ["glow", "relaxation", "unsure"],
  },
  {
    slug: "hydrofacial",
    name: "Hydrofacial",
    signature: "The Hydra",
    price: "85,000 TZS",
    category: "skin",
    summary:
      "A rejuvenating treatment designed to cleanse, refresh, hydrate and reveal a brighter-looking complexion.",
    includes: ["Dermaplaning", "Extraction", "Hydration", "LED light therapy"],
    idealFor: ["Hydration", "Dullness", "Congestion", "Skin refresh"],
    goals: ["hydration", "glow", "unsure"],
  },
  {
    slug: "firming-peptide-facial",
    name: "Firming Peptide Facial",
    signature: "The Lift",
    price: "120,000 TZS",
    category: "skin",
    summary:
      "A sculpting, peptide-rich facial focused on firmness, contour and a visibly lifted appearance.",
    includes: ["Peptide infusion", "Lifting massage", "Cooling globes", "Firming mask"],
    idealFor: ["Firmness", "Contour", "Fine lines", "Special occasions"],
    goals: ["firmness", "rejuvenation"],
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
    name: "Carbon Laser",
    signature: "The Mirror",
    price: "180,000 TZS",
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
    signature: "The Reset",
    price: "150,000 TZS",
    category: "advanced",
    summary:
      "A tailored resurfacing peel formulated to your skin's tolerance and goals.",
    includes: ["Skin assessment", "Tailored peel", "Neutralise", "Aftercare plan"],
    idealFor: ["Pigmentation", "Texture", "Dullness", "Renewal"],
    goals: ["texture", "rejuvenation"],
  },
  {
    slug: "lash-extensions",
    name: "Lash Extensions",
    signature: "The Gaze",
    price: "70,000 TZS",
    category: "beauty",
    summary:
      "Hand-applied lash artistry, mapped to your eye shape for a soft or dramatic finish.",
    includes: ["Lash mapping", "Application", "Isolation & bonding", "Aftercare"],
    idealFor: ["Definition", "Events", "Everyday ease", "Photography"],
    goals: ["glow", "relaxation"],
  },
  {
    slug: "brow-sculpt",
    name: "Brow Sculpt",
    signature: "The Frame",
    price: "35,000 TZS",
    category: "beauty",
    summary:
      "Precision shaping, tinting and grooming that frames the face with quiet symmetry.",
    includes: ["Mapping", "Shaping", "Tint", "Finish"],
    idealFor: ["Definition", "Symmetry", "Grooming", "Events"],
    goals: ["glow", "unsure"],
  },
  {
    slug: "body-glow-ritual",
    name: "Body Glow Ritual",
    signature: "The Silk",
    price: "95,000 TZS",
    category: "body",
    summary:
      "A full-body exfoliation and nourishment ritual for skin that feels smooth and cared for.",
    includes: ["Dry brushing", "Body scrub", "Warm wrap", "Nourishing finish"],
    idealFor: ["Smoothness", "Dryness", "Relaxation", "Pre-event"],
    goals: ["hydration", "relaxation"],
  },
  {
    slug: "back-treatment",
    name: "Back Treatment",
    signature: "The Clarity",
    price: "80,000 TZS",
    category: "body",
    summary:
      "A clarifying back facial addressing congestion and texture in hard-to-reach areas.",
    includes: ["Steam", "Extraction", "Clay mask", "Soothing serum"],
    idealFor: ["Congestion", "Texture", "Backless dresses", "Comfort"],
    goals: ["texture", "hydration"],
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
