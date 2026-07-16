// Lightweight document <head> manager for SPA routes: title, meta description,
// canonical, Open Graph / Twitter tags and optional JSON-LD structured data.

import { useEffect } from "react";

function setMeta(attr: "name" | "property", key: string, content: string) {
  if (!content) return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  if (!href) return;
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export interface HeadInput {
  title: string;
  description?: string;
  ogImage?: string;
  path?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const JSONLD_ID = "st-jsonld";

export function useHead({ title, description, ogImage, path, jsonLd }: HeadInput) {
  useEffect(() => {
    if (title) document.title = title;
    const url = typeof window !== "undefined" ? window.location.origin + (path ?? window.location.pathname) : "";

    if (description) setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    if (description) setMeta("property", "og:description", description);
    setMeta("property", "og:type", "website");
    if (url) setMeta("property", "og:url", url);
    if (ogImage) setMeta("property", "og:image", ogImage);
    setMeta("name", "twitter:card", ogImage ? "summary_large_image" : "summary");
    setMeta("name", "twitter:title", title);
    if (description) setMeta("name", "twitter:description", description);
    if (ogImage) setMeta("name", "twitter:image", ogImage);
    if (url) setLink("canonical", url);

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
  }, [title, description, ogImage, path, JSON.stringify(jsonLd)]);
}
