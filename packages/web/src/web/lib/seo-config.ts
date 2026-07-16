// ============================================================================
//  SEO CONFIG  —  SINGLE SOURCE OF TRUTH FOR ALL SEO / METADATA
// ----------------------------------------------------------------------------
//  Edit THIS file to change page titles, descriptions, keywords, brand/org
//  info, contact details, social links, prices and structured data across the
//  whole site. Nothing else needs to change.
//
//  Optimised for India (en-IN, INR, Hyderabad geo, EducationalOrganization +
//  Course + FAQ + Breadcrumb structured data) per Google's guidelines.
//
//  👉  Items marked  EDIT ME  are placeholders — replace with real values.
// ============================================================================

import { useHead } from "./seo";
import { COURSE_DATA } from "./site-data";

// ---------------------------------------------------------------------------
// 1) BRAND / ORGANISATION
// ---------------------------------------------------------------------------
export const SITE = {
  name: "Skilltimate Technologies",
  legalName: "Skilltimate Technologies",
  shortName: "Skilltimate",

  // Production URL — NO trailing slash. Used for canonical, og:url & sitemap.
  // EDIT ME when you move to your real domain (e.g. https://skilltimate.com)
  url: "https://skilltimate-production.up.railway.app",

  logo: "/skilltimate-logo.png",
  ogImage: "/og-image.png",
  themeColor: "#04091A",

  // --- Contact (India) --- EDIT ME with real details ---
  phone: "+91 90000 00000",
  email: "hello@skilltimate.com",
  address: {
    street: "", // EDIT ME
    locality: "Hyderabad",
    region: "Telangana",
    regionCode: "IN-TG",
    postalCode: "500001", // EDIT ME
    country: "IN",
  },
  // Geo coordinates (Hyderabad city centre) — EDIT ME to your office location
  geo: { lat: 17.385044, lng: 78.486671 },

  // India-first locale settings
  locale: "en_IN",
  language: "en-IN",
  currency: "INR",
  areaServed: "India",
  foundingYear: "2024",
  priceRange: "₹₹",

  // --- Social profiles (used for JSON-LD sameAs) --- EDIT ME, leave "" if none
  social: {
    instagram: "",
    youtube: "",
    facebook: "",
    linkedin: "",
    twitter: "",
  },
  // Twitter/X handle incl. "@", e.g. "@skilltimate" — EDIT ME (or leave "")
  twitterHandle: "",
} as const;

// Base course price for Course structured data (INR). Keep roughly in sync
// with the admin pricing panel. EDIT ME if your headline price changes.
export const SEO_PRICE = { amount: 3691, currency: "INR" };

// Default keywords appended to every page (India-focused). EDIT ME freely.
export const DEFAULT_KEYWORDS = [
  "Microsoft certification India",
  "Azure certification training",
  "AI-900 course",
  "AZ-900 course",
  "DP-900 course",
  "AB-900 Copilot certification",
  "Microsoft Fundamentals certification",
  "online certification training India",
  "Azure training Hyderabad",
  "Microsoft certification for students",
];

// ---------------------------------------------------------------------------
// 2) PER-PAGE SEO  (static routes)
//    title: shown in the browser tab & search results
//    description: ~150–160 chars, compelling, includes keywords naturally
// ---------------------------------------------------------------------------
export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
}

// Titles here already include the brand. Keep under ~60 characters.
export const PAGE_SEO: Record<string, PageMeta> = {
  "/": {
    title: "Microsoft AI, Azure & Data Certifications in India | Skilltimate",
    description:
      "Get Microsoft certified in AI-900, AZ-900, DP-900 & AB-900. Self-paced online training, simply explained, with unlimited mock tests until you pass. Built for Indian students & professionals.",
    keywords: ["Microsoft certification course India", "Azure Fundamentals online", "AI certification for freshers"],
  },
  "/blog": {
    title: "Certification Guides & Exam Tips | Skilltimate Blog",
    description:
      "Free study guides, exam strategies and career tips for Microsoft AI-900, AZ-900, DP-900 and AB-900 certifications — written for Indian learners.",
    keywords: ["AZ-900 study guide", "AI-900 exam tips", "Microsoft certification blog India"],
  },
  "/about": {
    title: "About Skilltimate Technologies | Microsoft Certification Training",
    description:
      "Skilltimate Technologies helps Indian students, graduates and professionals earn Microsoft AI, Azure, Copilot and Data certifications with self-paced, simply explained training.",
    keywords: ["about Skilltimate", "Microsoft certification institute India"],
  },
  "/contact": {
    title: "Contact Skilltimate | Book a Free Certification Demo",
    description:
      "Talk to Skilltimate Technologies about Microsoft AI, Azure, Copilot and Data certification training. Book a free demo or get your questions answered.",
    keywords: ["contact Skilltimate", "book Microsoft certification demo India"],
  },
  "/faq": {
    title: "Certification FAQ | Skilltimate Technologies",
    description:
      "Answers to common questions about Microsoft certification training at Skilltimate — pricing, exam vouchers, mock tests, pass guarantee and more.",
    keywords: ["Microsoft certification FAQ", "Azure certification cost India"],
  },
  "/privacy": {
    title: "Privacy Policy | Skilltimate Technologies",
    description: "How Skilltimate Technologies collects, uses and protects your personal data.",
    keywords: [],
  },
  "/terms": {
    title: "Terms & Conditions | Skilltimate Technologies",
    description: "The terms governing use of Skilltimate Technologies' website and certification training services.",
    keywords: [],
  },
};

// ---------------------------------------------------------------------------
// 3) PER-COURSE SEO  (dynamic /:slug pages)
//    Falls back to a sensible auto-generated meta if a slug is missing here.
// ---------------------------------------------------------------------------
export const COURSE_SEO: Record<string, PageMeta> = {
  "ai-900": {
    title: "AI-900 Azure AI Fundamentals Training in India | Skilltimate",
    description:
      "Pass Microsoft AI-900 (Azure AI Fundamentals). Zero coding, self-paced online training with unlimited mock tests. The best-value AI certification for students & professionals in India.",
    keywords: ["AI-900 training India", "Azure AI Fundamentals course", "AI-900 online mock tests"],
  },
  "az-900": {
    title: "AZ-900 Azure Fundamentals Certification Course | Skilltimate",
    description:
      "Clear Microsoft AZ-900 (Azure Fundamentals) with simply explained lessons and unlimited mock tests. India's most affordable path into a cloud career.",
    keywords: ["AZ-900 course India", "Azure Fundamentals certification", "AZ-900 mock tests"],
  },
  "dp-900": {
    title: "DP-900 Azure Data Fundamentals Training | Skilltimate",
    description:
      "Get Microsoft DP-900 (Azure Data Fundamentals) certified. Core data concepts and analytics on Azure, from zero to exam-ready, with unlimited mock tests.",
    keywords: ["DP-900 training India", "Azure Data Fundamentals course", "DP-900 mock tests"],
  },
  "ab-900": {
    title: "AB-900 Copilot & Agent Administration Course | Skilltimate",
    description:
      "Be first to certify in Microsoft AB-900 (Copilot & Agent Administration). Self-paced training on Copilot, Microsoft 365 and Purview — the newest Microsoft Fundamentals certification.",
    keywords: ["AB-900 certification", "Microsoft Copilot certification India", "Copilot admin course"],
  },
};

// ---------------------------------------------------------------------------
// 4) STRUCTURED DATA BUILDERS  (JSON-LD — Google rich results)
//    You rarely need to touch these; they read from SITE / COURSE_DATA above.
// ---------------------------------------------------------------------------
const abs = (p: string) => (p.startsWith("http") ? p : SITE.url + p);
const sameAs = () => Object.values(SITE.social).filter(Boolean) as string[];

export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: abs(SITE.logo),
    image: abs(SITE.ogImage),
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: SITE.foundingYear,
    priceRange: SITE.priceRange,
    areaServed: { "@type": "Country", name: SITE.areaServed },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street || undefined,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: SITE.geo.lat, longitude: SITE.geo.lng },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      email: SITE.email,
      contactType: "customer support",
      areaServed: "IN",
      availableLanguage: ["en", "hi", "te"],
    },
    sameAs: sameAs(),
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    inLanguage: SITE.language,
    publisher: { "@id": `${SITE.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE.url}/blog?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function courseLd(slug: string) {
  const c = COURSE_DATA[slug];
  if (!c) return null;
  const meta = COURSE_SEO[slug];
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${c.code} — ${c.name}`,
    description: meta?.description ?? c.tagline,
    url: `${SITE.url}/${slug}`,
    provider: { "@id": `${SITE.url}/#organization` },
    inLanguage: SITE.language,
    educationalCredentialAwarded: `Microsoft Certified: ${c.name}`,
    offers: {
      "@type": "Offer",
      category: "Paid",
      price: SEO_PRICE.amount,
      priceCurrency: SEO_PRICE.currency,
      availability: "https://schema.org/InStock",
      url: `${SITE.url}/${slug}`,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "Self-paced",
      inLanguage: SITE.language,
    },
  };
}

// ---------------------------------------------------------------------------
// 5) HOOKS  —  call one of these at the top of each page component
// ---------------------------------------------------------------------------
const commonHead = {
  siteName: SITE.name,
  locale: SITE.locale,
  ogImage: SITE.ogImage,
  twitterHandle: SITE.twitterHandle || undefined,
  hreflang: SITE.language,
};

/** SEO for a static route (key = the route path, e.g. "/about"). */
export function usePageSeo(routeKey: string, extraJsonLd?: Record<string, unknown>[]) {
  const meta = PAGE_SEO[routeKey] ?? PAGE_SEO["/"];
  const isHome = routeKey === "/";
  const jsonLd = [organizationLd(), ...(isHome ? [websiteLd()] : []), ...(extraJsonLd ?? [])];
  useHead({
    ...commonHead,
    title: meta.title,
    description: meta.description,
    keywords: [...(meta.keywords ?? []), ...DEFAULT_KEYWORDS],
    path: routeKey,
    jsonLd,
  });
}

/** SEO for a course page. */
export function useCourseSeo(slug: string) {
  const meta =
    COURSE_SEO[slug] ??
    ({
      title: `${slug.toUpperCase()} Certification Training | ${SITE.name}`,
      description: `Get Microsoft ${slug.toUpperCase()} certified with self-paced online training and unlimited mock tests at ${SITE.name}.`,
      keywords: [],
    } satisfies PageMeta);
  const course = courseLd(slug);
  const jsonLd = [
    organizationLd(),
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Courses", path: "/#tracks" },
      { name: slug.toUpperCase(), path: `/${slug}` },
    ]),
    ...(course ? [course] : []),
  ];
  useHead({
    ...commonHead,
    title: meta.title,
    description: meta.description,
    keywords: [...(meta.keywords ?? []), ...DEFAULT_KEYWORDS],
    path: `/${slug}`,
    ogType: "article",
    jsonLd,
  });
}

/** SEO for a blog article. */
export function useArticleSeo(input: {
  slug: string;
  title: string;
  description: string;
  keywords?: string[];
  faqs?: { q: string; a: string }[];
}) {
  const jsonLd: Record<string, unknown>[] = [
    organizationLd(),
    breadcrumbLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: input.title, path: `/blog/${input.slug}` },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: input.title,
      description: input.description,
      inLanguage: SITE.language,
      image: abs(SITE.ogImage),
      author: { "@type": "Organization", name: SITE.name },
      publisher: { "@id": `${SITE.url}/#organization` },
      mainEntityOfPage: `${SITE.url}/blog/${input.slug}`,
    },
  ];
  if (input.faqs?.length) jsonLd.push(faqLd(input.faqs));
  useHead({
    ...commonHead,
    title: `${input.title} | ${SITE.shortName}`,
    description: input.description,
    keywords: [...(input.keywords ?? []), ...DEFAULT_KEYWORDS],
    path: `/blog/${input.slug}`,
    ogType: "article",
    jsonLd,
  });
}
