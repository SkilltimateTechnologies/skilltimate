// Lightweight document <head> manager for SPA routes: title, meta description,
// keywords, robots, canonical, Open Graph / Twitter tags and JSON-LD.
//
// You normally DON'T edit this file — change copy/keywords/org info in
// `seo-config.ts` instead. This is just the engine that applies them.

import { useEffect } from "react";

function setMeta(attr: "name" | "property", key: string, content?: string) {
  if (!content) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string, hreflang?: string) {
  if (!href) return;
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export interface HeadInput {
  title: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  /** Canonical/OG path or absolute URL. Defaults to current path. */
  path?: string;
  canonical?: string;
  ogType?: string;
  robots?: string;
  locale?: string;
  siteName?: string;
  twitterHandle?: string;
  hreflang?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const JSONLD_ID = "st-jsonld";

export function useHead({
  title,
  description,
  keywords,
  ogImage,
  path,
  canonical,
  ogType = "website",
  robots = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
  locale,
  siteName,
  twitterHandle,
  hreflang,
  jsonLd,
}: HeadInput) {
  useEffect(() => {
    if (title) document.title = title;
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const pathname = typeof window !== "undefined" ? window.location.pathname : "";
    const url = canonical ?? origin + (path ?? pathname);

    if (description) setMeta("name", "description", description);
    if (keywords?.length) setMeta("name", "keywords", keywords.join(", "));
    setMeta("name", "robots", robots);

    // Open Graph
    setMeta("property", "og:title", title);
    if (description) setMeta("property", "og:description", description);
    setMeta("property", "og:type", ogType);
    if (url) setMeta("property", "og:url", url);
    if (ogImage) setMeta("property", "og:image", ogImage.startsWith("http") ? ogImage : origin + ogImage);
    if (siteName) setMeta("property", "og:site_name", siteName);
    if (locale) setMeta("property", "og:locale", locale);

    // Twitter
    setMeta("name", "twitter:card", ogImage ? "summary_large_image" : "summary");
    setMeta("name", "twitter:title", title);
    if (description) setMeta("name", "twitter:description", description);
    if (ogImage) setMeta("name", "twitter:image", ogImage.startsWith("http") ? ogImage : origin + ogImage);
    if (twitterHandle) {
      setMeta("name", "twitter:site", twitterHandle);
      setMeta("name", "twitter:creator", twitterHandle);
    }

    if (url) {
      setLink("canonical", url);
      if (hreflang) {
        setLink("alternate", url, hreflang);
        setLink("alternate", url, "x-default");
      }
    }

    // JSON-LD structured data
    const existing = document.getElementById(JSONLD_ID);
    if (existing) existing.remove();
    if (jsonLd) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.id = JSONLD_ID;
      s.text = JSON.stringify(jsonLd);
      document.head.appendChild(s);
    }
    return () => {
      const j = document.getElementById(JSONLD_ID);
      if (j) j.remove();
    };
  }, [title, description, keywords?.join(","), ogImage, path, canonical, ogType, robots, locale, siteName, twitterHandle, hreflang, JSON.stringify(jsonLd)]);
}
