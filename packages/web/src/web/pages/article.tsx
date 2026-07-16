import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { C, FONT } from "../lib/theme";
import { ARTICLES, COURSES, bySlug } from "../lib/articles-data";
import { Nav } from "../components/site/nav";
import { Footer, FloatingWA } from "../components/site/footer";
import { Star } from "../components/site/icons";
import { RegisterButton } from "../components/site/primitives";

const NAV_LINKS = [
  { label: "Courses", href: "/#tracks" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

const mix = (accent: string, pct: number) => `color-mix(in oklab,${accent} ${pct}%,transparent)`;

export default function ArticlePage() {
  const P = usePricing();
  const params = useParams();
  const slug = params.slug || ARTICLES[0].slug;
  const a = bySlug(slug) || ARTICLES[0];
  const course = COURSES[a.course] || COURSES["ai-900"];
  const acc = course.accent;
  const courseSlug = a.course;

  useEffect(() => {
    document.title = `${a.title} · Skilltimate`;
    window.scrollTo(0, 0);
  }, [a.title]);

  const sections = a.sections.map((s, i) => ({ id: `sec-${i}`, h: s.h, blocks: s.blocks }));
  const toc = [...sections.map((s) => ({ label: s.h, href: `#${s.id}` })), { label: "Key takeaways", href: "#takeaways" }, { label: "FAQ", href: "#faq" }];
  const related = a.related
    .map((sl) => {
      const r = bySlug(sl);
      if (!r) return null;
      const rc = COURSES[r.course] || COURSES["ai-900"];
      return { title: r.title, blurb: r.blurb, tag: r.tag, courseCode: rc.code, accent: rc.accent, slug: r.slug };
    })
    .filter(Boolean) as { title: string; blurb: string; tag: string; courseCode: string; accent: string; slug: string }[];

  return (
    <div style={{ overflowX: "clip", minHeight: "100vh", position: "relative", ["--acc" as string]: acc }}>
      <Nav links={NAV_LINKS} />

      {/* HEADER */}
      <header style={{ position: "relative", padding: "52px 0 26px" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span style={{ position: "absolute", borderRadius: "50%", filter: "blur(90px)", opacity: 0.4, width: 520, height: 520, background: mix(acc, 26), top: "-40%", right: "-6%" }} />
        </div>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 22px", position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: FONT.mono, fontSize: ".72rem", color: C.mute, marginBottom: 24 }}>
            <Link to="/" style={{ color: C.mute }}>Home</Link> <span style={{ opacity: 0.5 }}>/</span> <Link to="/blog" style={{ color: C.mute }}>Blog</Link> <span style={{ opacity: 0.5 }}>/</span> <span style={{ color: acc }}>{course.code}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
            <Link to={`/${courseSlug}`} style={{ fontFamily: FONT.mono, fontSize: ".72rem", fontWeight: 600, letterSpacing: ".08em", color: acc, padding: ".4em .9em", borderRadius: 100, border: `1px solid ${mix(acc, 50)}`, background: mix(acc, 12) }}>{course.code}</Link>
            <span style={{ fontFamily: FONT.mono, fontSize: ".66rem", letterSpacing: ".14em", textTransform: "uppercase", color: C.mute }}>{a.tag}</span>
          </div>
          <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(2rem,4.4vw,3.1rem)", lineHeight: 1.06, fontWeight: 700, letterSpacing: "-.026em", marginBottom: 18 }}>{a.title}</h1>
          <p style={{ fontSize: "1.18rem", color: C.body, lineHeight: 1.6, marginBottom: 26 }}>{a.lead}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 0", borderTop: "1px solid rgba(127,186,255,.12)", borderBottom: "1px solid rgba(127,186,255,.12)" }}>
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg,${acc},#0B2A52)`, display: "grid", placeItems: "center", fontWeight: 800, fontFamily: FONT.display, color: "#04091A", flex: "none" }}>S</div>
            <div style={{ fontSize: ".86rem", lineHeight: 1.4 }}>
              <div style={{ fontWeight: 600, color: C.paper }}>Skilltimate Team</div>
              <div style={{ color: C.mute, fontFamily: FONT.mono, fontSize: ".72rem", letterSpacing: ".04em" }}>{a.dateLabel} · {a.readTime}</div>
            </div>
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="ap-grid" style={{ maxWidth: 1000, margin: "0 auto", padding: "30px 22px 20px" }}>
        <aside className="ap-toc" style={{ position: "sticky", top: 88 }}>
          <div style={{ fontFamily: FONT.mono, fontSize: ".62rem", letterSpacing: ".16em", textTransform: "uppercase", color: C.mute, marginBottom: 14 }}>On this page</div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 11, borderLeft: "1px solid rgba(127,186,255,.16)", paddingLeft: 16 }}>
            {toc.map((t) => (
              <a key={t.href} href={t.href} style={{ fontSize: ".82rem", color: C.mute, lineHeight: 1.4 }}>{t.label}</a>
            ))}
          </nav>
        </aside>

        <article style={{ minWidth: 0 }}>
          {sections.map((s) => (
            <section key={s.id} id={s.id} style={{ scrollMarginTop: 88, marginBottom: 34 }}>
              <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(1.4rem,2.6vw,1.85rem)", fontWeight: 700, letterSpacing: "-.018em", lineHeight: 1.2, marginBottom: 16 }}>{s.h}</h2>
              {s.blocks.map((b, bi) =>
                b.t === "p" ? (
                  <p key={bi} style={{ fontSize: "1.06rem", color: C.body, lineHeight: 1.75, marginBottom: 16 }}>{b.x}</p>
                ) : (
                  <ul key={bi} style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12, margin: "4px 0 20px" }}>
                    {(b.items || []).map((li, li2) => (
                      <li key={li2} style={{ position: "relative", paddingLeft: 28, fontSize: "1.02rem", color: C.body, lineHeight: 1.6 }}>
                        <Star size=".9rem" fill={acc} twinkle={false} style={{ position: "absolute", left: 0, top: ".28em" }} />
                        {li}
                      </li>
                    ))}
                  </ul>
                ),
              )}
            </section>
          ))}

          {/* TAKEAWAYS */}
          <div id="takeaways" style={{ scrollMarginTop: 88, background: `linear-gradient(135deg,${mix(acc, 12)},rgba(231,185,76,.05))`, border: `1px solid ${mix(acc, 30)}`, borderRadius: 16, padding: "26px 28px", margin: "14px 0 40px" }}>
            <div style={{ fontFamily: FONT.mono, fontSize: ".66rem", letterSpacing: ".16em", textTransform: "uppercase", color: acc, display: "inline-flex", alignItems: "center", gap: ".6em", marginBottom: 16 }}>
              <Star size=".95em" />Key takeaways
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {a.takeaways.map((k, i) => (
                <li key={i} style={{ position: "relative", paddingLeft: 28, fontSize: "1rem", color: C.paper, lineHeight: 1.55 }}>
                  <span style={{ position: "absolute", left: 0, top: ".05em", color: "#7CE0A3", fontWeight: 700 }}>✓</span>{k}
                </li>
              ))}
            </ul>
          </div>

          {/* INLINE CTA */}
          <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg,#0A1428,#0F1E3A)", border: "1px solid rgba(127,186,255,.16)", borderRadius: 18, padding: "30px 30px", marginBottom: 44 }}>
            <div style={{ position: "absolute", inset: 0, background: `radial-gradient(400px 200px at 100% 0%,${mix(acc, 22)},transparent 70%)`, pointerEvents: "none" }} />
            <div style={{ position: "relative" }}>
              <h3 style={{ fontFamily: FONT.display, fontSize: "1.4rem", fontWeight: 700, letterSpacing: "-.015em", marginBottom: 8 }}>Ready to sit {course.code}?</h3>
              <p style={{ color: C.mute, fontSize: ".98rem", lineHeight: 1.6, maxWidth: "40em", marginBottom: 20 }}>Self-paced classes, unlimited mock tests, and access until you pass — {P.discountPercent}% off* for a limited time, now {P.deal} + GST (from {P.orig}). Register for a free demo, no card needed.</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <RegisterButton>Register Now</RegisterButton>
                <Link to={`/${courseSlug}`} style={{ display: "inline-flex", alignItems: "center", gap: ".5em", padding: ".9em 1.5em", borderRadius: 100, fontWeight: 700, fontSize: ".95rem", minHeight: 48, background: "rgba(127,186,255,.06)", color: C.paper, border: "1px solid rgba(127,186,255,.16)" }}>See the {course.code} course →</Link>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <section id="faq" style={{ scrollMarginTop: 88, marginBottom: 20 }}>
            <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(1.4rem,2.6vw,1.85rem)", fontWeight: 700, letterSpacing: "-.018em", marginBottom: 18 }}>Frequently asked questions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {a.faq.map((f, i) => (
                <details key={i} style={{ border: `1px solid ${C.line}`, borderRadius: 12, background: C.panel, overflow: "hidden" }}>
                  <summary style={{ cursor: "pointer", listStyle: "none", display: "flex", alignItems: "center", gap: 14, padding: "18px 20px", fontFamily: FONT.display, fontWeight: 600, fontSize: "1.02rem" }}>
                    <span style={{ flex: 1 }}>{f.q}</span>
                    <span style={{ fontFamily: FONT.mono, color: acc, fontSize: "1.2rem", flex: "none" }}>+</span>
                  </summary>
                  <p style={{ padding: "0 20px 20px", color: C.mute, fontSize: ".96rem", lineHeight: 1.65 }}>{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        </article>
      </div>

      {/* RELATED */}
      {related.length > 0 && (
        <section style={{ padding: "52px 0", background: C.panel, borderTop: `1px solid ${C.line}`, marginTop: 30 }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".7em", marginBottom: 26 }}>
              <Star size=".95em" />
              <h2 style={{ fontFamily: FONT.display, fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-.015em" }}>Keep reading</h2>
            </div>
            <div className="ap-related">
              {related.map((r) => (
                <Link key={r.slug} to={`/blog/${r.slug}`} className="st-card-hover" style={{ display: "flex", flexDirection: "column", background: C.ink, border: `1px solid ${C.line}`, borderRadius: 16, overflow: "hidden", color: C.paper }}>
                  <div style={{ height: 8, background: `linear-gradient(90deg,${r.accent},rgba(231,185,76,.5))` }} />
                  <div style={{ padding: "20px 20px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <span style={{ fontFamily: FONT.mono, fontSize: ".62rem", letterSpacing: ".12em", textTransform: "uppercase", color: r.accent, marginBottom: 10 }}>{r.courseCode} · {r.tag}</span>
                    <h3 style={{ fontFamily: FONT.display, fontSize: "1.04rem", fontWeight: 600, lineHeight: 1.3, marginBottom: 8 }}>{r.title}</h3>
                    <p style={{ fontSize: ".84rem", color: C.mute, lineHeight: 1.5, flex: 1 }}>{r.blurb}</p>
                    <span style={{ fontFamily: FONT.mono, fontSize: ".7rem", color: r.accent, marginTop: 14, display: "inline-flex", alignItems: "center", gap: ".5em" }}>Read article <span>→</span></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer accent={acc} showContact />
      <FloatingWA />
    </div>
  );
}
