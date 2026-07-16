import { useState } from "react";
import { Link } from "wouter";
import { C, FONT } from "../lib/theme";
import { ARTICLES, COURSES } from "../lib/articles-data";
import { Nav } from "../components/site/nav";
import { Footer, FloatingWA } from "../components/site/footer";
import { Star } from "../components/site/icons";
import { RegisterButton } from "../components/site/primitives";
import { usePageSeo } from "../lib/seo-config";

const NAV_LINKS = [
  { label: "Courses", href: "/#tracks" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

const mix = (accent: string, pct: number) => `color-mix(in oklab,${accent} ${pct}%,transparent)`;

function decorate(slug: string) {
  const a = ARTICLES.find((x) => x.slug === slug)!;
  const c = COURSES[a.course] || ({} as any);
  return { title: a.title, blurb: a.blurb, tag: a.tag, readTime: a.readTime, courseCode: c.code, accent: c.accent, slug: a.slug };
}

export default function Blog() {
  usePageSeo("/blog");
  const [filter, setFilter] = useState("all");
  const featured = decorate("ab-900-future-proof");

  const filterDefs = [{ key: "all", label: "All articles" }, ...Object.keys(COURSES).map((k) => ({ key: k, label: COURSES[k].code }))];

  let list = ARTICLES.slice();
  if (filter !== "all") list = list.filter((a) => a.course === filter);
  list.sort((a, b) => (a.date < b.date ? 1 : -1));
  const posts = list.map((a) => decorate(a.slug));

  return (
    <div style={{ overflowX: "clip", minHeight: "100vh" }}>
      <Nav links={NAV_LINKS} />

      <header style={{ position: "relative", padding: "56px 0 20px" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span style={{ position: "absolute", borderRadius: "50%", filter: "blur(90px)", opacity: 0.4, width: 520, height: 520, background: "rgba(46,143,255,.2)", top: "-30%", right: "-4%" }} />
        </div>
        <div className="wrap-cp" style={{ position: "relative", zIndex: 1 }}>
          <span style={{ fontFamily: FONT.mono, fontSize: ".7rem", letterSpacing: ".2em", textTransform: "uppercase", color: C.azureSoft, display: "inline-flex", alignItems: "center", gap: ".7em" }}>
            <Star size=".95em" />The Skilltimate blog
          </span>
          <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(2rem,4.4vw,3.1rem)", lineHeight: 1.06, fontWeight: 700, letterSpacing: "-.026em", margin: "16px 0 14px" }}>
            Plain-language guides to getting certified.
          </h1>
          <p style={{ fontSize: "1.1rem", color: C.mute, maxWidth: "40em", lineHeight: 1.6 }}>
            Career advice, exam breakdowns and study plans for AI-900, AB-900, AZ-900 and DP-900 — written the way we teach: simply.
          </p>
        </div>
      </header>

      {/* FEATURED */}
      <section style={{ padding: "24px 0 8px" }}>
        <div className="wrap-cp">
          <Link to={`/blog/${featured.slug}`} className="st-card-hover" style={{ display: "grid", gridTemplateColumns: "1fr", background: "linear-gradient(135deg,#0A1428,#0F1E3A)", border: `1px solid ${mix(featured.accent, 40)}`, borderRadius: 22, overflow: "hidden", color: C.paper }}>
            <div style={{ position: "relative", padding: "40px 40px" }}>
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(500px 260px at 90% 0%,${mix(featured.accent, 22)},transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <span style={{ fontFamily: FONT.mono, fontSize: ".64rem", letterSpacing: ".16em", textTransform: "uppercase", color: featured.accent }}>Featured · {featured.courseCode} · {featured.tag}</span>
                <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(1.5rem,3vw,2.2rem)", fontWeight: 700, letterSpacing: "-.02em", margin: "12px 0 10px", lineHeight: 1.15, maxWidth: "20em" }}>{featured.title}</h2>
                <p style={{ color: C.mute, fontSize: "1rem", lineHeight: 1.6, maxWidth: "40em", marginBottom: 16 }}>{featured.blurb}</p>
                <span style={{ fontFamily: FONT.mono, fontSize: ".74rem", color: featured.accent, display: "inline-flex", alignItems: "center", gap: ".5em" }}>Read the article <span>→</span></span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* FILTERS + GRID */}
      <section style={{ padding: "32px 0 60px" }}>
        <div className="wrap-cp">
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 30 }}>
            {filterDefs.map((fd) => {
              const active = fd.key === filter;
              const acc = fd.key === "all" ? C.azure : COURSES[fd.key].accent;
              return (
                <button key={fd.key} onClick={() => setFilter(fd.key)} style={{ cursor: "pointer", fontFamily: FONT.mono, fontSize: ".72rem", letterSpacing: ".08em", padding: ".55em 1.1em", borderRadius: 100, border: `1px solid ${active ? acc : "rgba(127,186,255,.16)"}`, background: active ? acc : "rgba(127,186,255,.05)", color: active ? "#04091A" : C.mute }}>
                  {fd.label}
                </button>
              );
            })}
          </div>
          <div className="g-3">
            {posts.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="st-card-hover" style={{ display: "flex", flexDirection: "column", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 16, overflow: "hidden", color: C.paper }}>
                <div style={{ height: 8, background: `linear-gradient(90deg,${p.accent},rgba(231,185,76,.5))` }} />
                <div style={{ padding: "22px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <span style={{ fontFamily: FONT.mono, fontSize: ".62rem", letterSpacing: ".12em", textTransform: "uppercase", color: p.accent, marginBottom: 10 }}>{p.courseCode} · {p.tag}</span>
                  <h3 style={{ fontFamily: FONT.display, fontSize: "1.1rem", fontWeight: 600, lineHeight: 1.3, marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ fontSize: ".86rem", color: C.mute, lineHeight: 1.5, flex: 1 }}>{p.blurb}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
                    <span style={{ fontFamily: FONT.mono, fontSize: ".68rem", color: C.mute }}>{p.readTime}</span>
                    <span style={{ fontFamily: FONT.mono, fontSize: ".7rem", color: p.accent, display: "inline-flex", alignItems: "center", gap: ".5em" }}>Read <span>→</span></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 48, textAlign: "center", background: "linear-gradient(135deg,#231303,#12162E)", border: "1px solid rgba(231,185,76,.3)", borderRadius: 20, padding: "36px 30px" }}>
            <h3 style={{ fontFamily: FONT.display, fontSize: "1.5rem", fontWeight: 700, marginBottom: 10 }}>Ready to get certified?</h3>
            <p style={{ color: C.mute, maxWidth: "34em", margin: "0 auto 20px" }}>Register your interest and get a free demo lesson plus a free mock test — no card, no commitment.</p>
            <RegisterButton big>Register Now</RegisterButton>
          </div>
        </div>
      </section>

      <Footer showContact />
      <FloatingWA />
    </div>
  );
}
