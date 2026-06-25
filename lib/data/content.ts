export interface HeroContent {
  badge: string;
  h1: string;
  h1Gradient: string;
  subhead: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

export interface ProblemCard {
  num: string;
  title: string;
  body: string;
}

export interface SolutionCard {
  tag: string;
  title: string;
  body: string;
}

export interface ValueItem {
  metric: string;
  title: string;
  body: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initial: string;
}

export interface Office {
  flag: string;
  country: string;
  city: string;
  address: string;
}

export const heroMesh: HeroContent = {
  badge: "Google Cloud Premier Partner · Since 2012",
  h1: "The cloud, engineered to ",
  h1Gradient: "never hold you back",
  subhead:
    "For over a decade we've helped enterprises across India & UAE modernize IT — simplifying operations, reducing risk, and avoiding costly mistakes. 200+ successful cloud migrations.",
  ctaPrimary: { label: "Book a Free Assessment →", href: "#contact" },
  ctaSecondary: { label: "Explore Our Solutions", href: "#solutions" },
};

export const heroOrb: HeroContent = {
  badge: "Google Cloud Premier Partner · Since 2012",
  h1: "Trusted Google Cloud ",
  h1Gradient: "Premier Partner",
  subhead:
    "We design and run enterprise Google Cloud systems with advanced automation, security governance, and intelligent operations — eliminating complexity and reducing risk.",
  ctaPrimary: { label: "Book a Free Assessment →", href: "#contact" },
  ctaSecondary: { label: "Explore Our Solutions", href: "#solutions" },
};

export const marqueeLabel =
  "Trusted by leading organizations across BFSI, Healthcare & Education";

export const clients = [
  "MedGenome",
  "Muthoot Finance",
  "Synthite",
  "Toyota",
  "Asianet News",
  "Duroflex",
  "Malabar Gold & Diamonds",
  "Mathrubhumi",
];

export const stats: StatItem[] = [
  { value: 200, suffix: "+", label: "Cloud Migrations" },
  { value: 14, suffix: " yrs", label: "Trusted Since 2012" },
  { value: 5, suffix: "", label: "Global Offices" },
  { value: 24, suffix: "/7", label: "Expert Support" },
];

export const problemsH2 =
  "When you're growing fast, your old IT setup can hold you back";

export const problems: ProblemCard[] = [
  {
    num: "01",
    title: "Growing Friction",
    body: "Your teams are growing, but systems stay slow, scattered, and increasingly risky.",
  },
  {
    num: "02",
    title: "Rising Costs",
    body: "You're spending more on IT, yet still doing manual data entry across systems that don't talk to each other.",
  },
  {
    num: "03",
    title: "Migration Risk",
    body: "You want to move to the cloud — without downtime, delays, or budget overruns.",
  },
];

export const solutionsH2 =
  "End-to-end Google Cloud, intelligently delivered";

export const solutions: SolutionCard[] = [
  {
    tag: "Built on Google Cloud",
    title: "Cloud Migration & Infrastructure",
    body: "Enterprise-grade migration with zero downtime, advanced security governance, and optimized performance.",
  },
  {
    tag: "BigQuery · Vertex AI",
    title: "Data & AI Analytics",
    body: "Transform data into intelligent automation and predictive insights that drive business decisions.",
  },
  {
    tag: "Cloud-native",
    title: "Application Modernization",
    body: "Cloud-native transformation with automated deployment pipelines and performance optimization.",
  },
  {
    tag: "ISO 27001",
    title: "Security & Compliance",
    body: "Comprehensive security governance with unified threat management and audit-ready frameworks.",
  },
  {
    tag: "Workspace",
    title: "Google Workspace",
    body: "AI-enhanced collaboration with enterprise-scale migrations and centralized endpoint management.",
  },
];

export const industriesLine =
  "Across Banking & Financial Services · Healthcare · Education · Manufacturing · Retail & E-commerce";

export const valuesH2 = "Outcomes you can put a number on";
export const valuesIntro =
  "A decade of enterprise migrations distilled into three promises — reliability, speed, and predictability.";

export const values: ValueItem[] = [
  {
    metric: "99.9%",
    title: "Reliable Infrastructure",
    body: "Google Cloud Partner certified — fewer late-night alerts, enterprise-grade security baked in.",
  },
  {
    metric: "200+",
    title: "Faster Launches",
    body: "Migrations completed with transparent ROI tracking and battle-tested processes.",
  },
  {
    metric: "0",
    title: "Predictable Budgets",
    body: "Compliance-ready frameworks — no hidden cloud costs, every requirement mapped.",
  },
];

export const testimonialsH2 = "Partnerships that outlast projects";

export const testimonials: Testimonial[] = [
  {
    quote:
      "Almost a decade later, I don't worry about IT services. They've been our one stop for anything tech — people who get things done without noise.",
    name: "Jay",
    role: "Wisdom Toolz Learning Solutions",
    initial: "J",
  },
  {
    quote:
      "Their expertise and support deploying Google Workspace have been commendable. The fastest, most reliable turnaround we have seen.",
    name: "Krishnateja Penamakuru",
    role: "COO, Dhruva Space",
    initial: "K",
  },
  {
    quote:
      "All issues were resolved in reasonable time, allowing us to function without downtime. A truly professional approach throughout.",
    name: "Joshy Jose",
    role: "Sevenseas Express",
    initial: "J",
  },
  {
    quote:
      "The support team is excellent and provides solutions very fast. Their coordination and renewal support are much appreciated.",
    name: "P. Centhil Kumar",
    role: "IT Business Support, The Residency Towers",
    initial: "P",
  },
  {
    quote:
      "Professional, responsive, and attentive to our needs. We felt supported throughout and are extremely satisfied with the results.",
    name: "MD. Shahid",
    role: "Zenith Manufacturing",
    initial: "M",
  },
];

export const partners = [
  "Google Cloud",
  "Acronis",
  "ASUS",
  "Cloud Codes",
  "CloudM",
  "Jamf",
];

export const ctaBannerH2 = "Let's map your move to the cloud";
export const ctaBannerBody =
  "Get a free assessment from a Google Cloud Premier Partner — no downtime, no surprises, a decade of expertise behind every step.";
export const ctaBannerCta = { label: "Book a Free Assessment →", href: "#contact" };

export const scrollZoom = {
  outerHeading: "Engineered to scale",
  eyebrow: "Inside every migration",
  heading: "Zero downtime. Enterprise security. A decade of Google Cloud.",
  body: "We zoom in on the details most miss — mapping every workload, cost, and compliance requirement — so the big move to the cloud lands without surprises. 200+ migrations across India, UAE & UK, all on Google Cloud.",
  chips: ["Cloud Migration", "Data & AI", "Security & Compliance", "Google Workspace"],
  cta: { label: "Explore our solutions →", href: "#solutions" },
} as const;

export const footerBlurb =
  "Premier Google Cloud Partner since 2012. 200+ successful migrations across India, UAE & UK.";
export const footerCert = "ISO/IEC 27001:2022 Certified";
export const footerCopyright = "© 2026 econz. All rights reserved.";
export const footerLegal = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export const offices: Office[] = [
  {
    flag: "🇮🇳",
    country: "India",
    city: "Bengaluru (HQ)",
    address: "No. 58, HM Towers, Brigade Road, Bengaluru 560001",
  },
  {
    flag: "🇮🇳",
    country: "India",
    city: "Mumbai",
    address: "WeWork Oberoi Commerz II, 20th Floor, Mumbai 400063",
  },
  {
    flag: "🇮🇳",
    country: "India",
    city: "Kochi",
    address: "Mayur Business Center, 3rd Floor, Kochi 682035",
  },
  {
    flag: "🇦🇪",
    country: "UAE",
    city: "Dubai",
    address: "1804, Burjuman Business Tower, Dubai",
  },
  {
    flag: "🇬🇧",
    country: "UK",
    city: "Cardiff",
    address: "9 Sherborne Avenue, Cardiff, Wales CF23 6SJ",
  },
];
