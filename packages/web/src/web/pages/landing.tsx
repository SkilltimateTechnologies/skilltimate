import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { C, FONT } from "../lib/theme";
import { CLIPS, INCLUDED, LANDING_QUOTES, LANDING_FAQS, TICKER } from "../lib/site-data";
import { Nav } from "../components/site/nav";
import { Footer } from "../components/site/footer";
import { Star } from "../components/site/icons";
import { Reveal, Eyebrow, RegisterButton, GhostButton, RiskRow } from "../components/site/primitives";
import { useOfferExpiry, useCountUp, cpad } from "../hooks/use-site";
import { usePricing } from "../hooks/use-pricing";

const NAV_LINKS = [
  { label: "Why now", href: "#news" },
  { label: "Courses", href: "#tracks" },
  { label: "What's included", href: "#included" },
  { label: "Results", href: "#proof" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "#faq" },
];

const COURSE_CARDS = [
  { slug: "ai-900", code: "AI-900", accent: "#2E8FFF", name: "Azure AI Fundamentals", body: "Understand AI, ML and generative AI on Azure. Zero coding — the starting point of every AI career." },
  { slug: "az-900", code: "AZ-900", accent: "#22C7E6", name: "Azure Fundamentals", body: "The proven entry into cloud careers — core Azure services, security and pricing, simply explained." },
  { slug: "dp-900", code: "DP-900", accent: "#9B7BFF", name: "Azure Data Fundamentals", body: "Every AI system runs on data. Core data concepts and analytics on Azure, from zero to exam-ready." },
];

function Stat({ to, suffix, label, plain, big }: { to: number; suffix?: string; label: string; plain?: React.ReactNode; big?: boolean }) {
  const { ref, val } = useCountUp(to);
  return (
    <div>
      <div
        className="st-statnum"
        style={{
          fontFamily: FONT.display,
          fontSize: big ? "2.55rem" : "1.75rem",
          fontWeight: 800,
          lineHeight: 1,
          height: "2.55rem",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          background: "linear-gradient(180deg,#FFF3D2,#E7B94C 70%,#C98F1E)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
        }}
      >
        {plain ?? <span ref={ref}>{val}</span>}
        {suffix && <em style={{ fontStyle: "normal" }}>{suffix}</em>}
      </div>
      <div style={{ fontSize: ".78rem", color: C.mute, marginTop: 10, textAlign: "center" }}>{label}</div>
    </div>
  );
}

function BigStat({ to, suffix, children }: { to: number; suffix: string; children: React.ReactNode }) {
  const { ref, val } = useCountUp(to);
  return (
    <Reveal
      style={{
        background: "linear-gradient(135deg,rgba(46,143,255,.1),rgba(231,185,76,.06))",
        border: `1px solid ${C.line}`,
        borderRadius: 16,
        padding: 24,
        display: "flex",
        gap: 16,
        alignItems: "center",
        boxShadow: "0 0 44px rgba(46,143,255,.09)",
      }}
    >
      <div
        className="st-statnum"
        style={{
          fontFamily: FONT.display,
          fontSize: "2.4rem",
          fontWeight: 800,
          letterSpacing: "-.03em",
          minWidth: "2.5em",
          background: "linear-gradient(180deg,#FFF3D2,#E7B94C 70%,#C98F1E)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
        }}
      >
        <span ref={ref}>{val}</span>
        {suffix}
      </div>
      <p style={{ fontSize: ".85rem", color: C.mute }}>{children}</p>
    </Reveal>
  );
}

const sectionHead = (color: string): React.CSSProperties => ({
  fontFamily: FONT.display,
  fontSize: "clamp(1.8rem,3.4vw,2.75rem)",
  fontWeight: 700,
  letterSpacing: "-.02em",
  margin: "16px 0 14px",
  lineHeight: 1.1,
  color,
});

export default function Landing() {
  const P = usePricing();
  const cd = useOfferExpiry(P.offerHours);
  const [fabShow, setFabShow] = useState(false);
  const tickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > innerHeight * 0.85;
      const finalSec = document.getElementById("cta");
      let overFinal = false;
      if (finalSec) {
        const r = finalSec.getBoundingClientRect();
        overFinal = r.top < innerHeight && r.bottom > 0;
      }
      setFabShow(past && !overFinal);
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-linked ticker: the strip glides horizontally as the page moves up/down,
  // with a gentle constant drift so it never sits fully still.
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const el = tickerRef.current;
      if (el) {
        const half = el.scrollWidth / 2 || 1;
        const drift = (now - start) * 0.028; // slow constant crawl
        const fromScroll = window.scrollY * 0.35; // reacts to page scroll
        const offset = ((drift + fromScroll) % half);
        el.style.transform = `translateX(${-offset}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const cdBar = `${cd.d}d ${cpad(cd.h)}h ${cpad(cd.m)}m ${cpad(cd.s)}s`;

  return (
    <div className="st-page" style={{ overflowX: "clip", minHeight: "100vh" }}>
      {/* URGENCY BAR */}
      {P.offerEnabled && (
        <div style={{ background: "linear-gradient(90deg,#3A1010,#4A1E06,#3A1010)", borderBottom: "1px solid rgba(255,107,107,.3)", textAlign: "center", padding: ".68em 1em", fontSize: ".8rem", color: C.paper }}>
          ⚡ <b style={{ color: C.goldHot }}>{P.discountPercent}% OFF · Limited time*</b> — every course <s style={{ color: C.mute, opacity: .8 }}>{P.orig}</s> <b style={{ color: C.paper }}>{P.deal}</b> + GST. Offer expires in{" "}
          <span style={{ fontFamily: FONT.mono, color: "#FFB4B4", fontWeight: 600 }}>{cdBar}</span>
        </div>
      )}

      <Nav links={NAV_LINKS} />

      {/* HERO */}
      <header id="top" style={{ position: "relative", padding: "80px 0 0" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <div style={{ position: "absolute", inset: "-20% -10%" }}>
            <span style={{ position: "absolute", borderRadius: "50%", filter: "blur(90px)", opacity: 0.55, width: 640, height: 640, background: "rgba(46,143,255,.22)", top: "-18%", right: "-6%", animation: "st_drift 14s ease-in-out infinite alternate" }} />
            <span style={{ position: "absolute", borderRadius: "50%", filter: "blur(90px)", opacity: 0.55, width: 460, height: 460, background: "rgba(231,185,76,.10)", bottom: "-24%", left: "-8%", animation: "st_drift 14s ease-in-out infinite alternate -5s" }} />
            <span style={{ position: "absolute", borderRadius: "50%", filter: "blur(90px)", opacity: 0.55, width: 340, height: 340, background: "rgba(46,143,255,.14)", top: "36%", left: "32%", animation: "st_drift 14s ease-in-out infinite alternate -9s" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(127,186,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(127,186,255,.045) 1px,transparent 1px)", backgroundSize: "56px 56px", WebkitMaskImage: "radial-gradient(800px 500px at 60% 10%,#000 30%,transparent 75%)", maskImage: "radial-gradient(800px 500px at 60% 10%,#000 30%,transparent 75%)" }} />
        </div>

        <div className="wrap st-hero-grid" style={{ position: "relative", zIndex: 1 }}>
          <div>
            <Reveal as="span"><Eyebrow>Microsoft AI · Azure · Copilot · Data Certifications</Eyebrow></Reveal>
            <Reveal delay={1}>
              <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(2.45rem,5.2vw,4.35rem)", lineHeight: 1.02, fontWeight: 700, letterSpacing: "-.028em", margin: "20px 0 22px" }}>
                The AI economy is hiring.
                <br />
                <span style={{ background: "linear-gradient(100deg,#F5D67E,#DCA92F 60%,#F5D67E)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent", backgroundSize: "200% 100%", animation: "st_sheen 5s linear infinite" }}>
                  Will it find you certified?
                </span>
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <p style={{ fontSize: "1.1rem", color: C.mute, maxWidth: "33em", marginBottom: 30, lineHeight: 1.6 }}>
                India needs <strong style={{ color: C.paper, fontWeight: 600 }}>a million more AI professionals</strong> — and recruiters have stopped believing résumés they can't verify. Skilltimate gets you a <strong style={{ color: C.paper, fontWeight: 600 }}>Microsoft certification</strong> in weeks: simple, easy-to-explain classes you take <strong style={{ color: C.paper, fontWeight: 600 }}>at your own pace</strong>, plus unlimited mock tests until you pass.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 14 }}>
                <RegisterButton big>Register Now</RegisterButton>
                <GhostButton href="#tracks">See the 4 courses</GhostButton>
              </div>
            </Reveal>
            <Reveal delay={3}>
              <RiskRow items={["100% free demo", "No card needed", "Takes 30 seconds"]} style={{ marginBottom: 34 }} />
            </Reveal>
          </div>

          <Reveal as="aside" delay={2} style={{ position: "sticky", top: 88, marginTop: 84, background: "linear-gradient(180deg,#0A1428,#0F1E3A)", border: `1px solid ${C.line}`, borderRadius: 22, padding: "28px 26px", boxShadow: "0 40px 100px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.05)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <span style={{ fontFamily: FONT.mono, fontSize: ".7rem", letterSpacing: ".2em", textTransform: "uppercase", color: C.gold, display: "inline-flex", alignItems: "center", gap: ".7em" }}>
                <Star size=".95em" />Your 90-day plan
              </span>
              <span style={{ fontFamily: FONT.mono, fontSize: ".68rem", color: C.mute }}>SELF-PACED</span>
            </div>
            {[
              { n: "01", accent: C.azure, soft: true, title: "AI-900 · Azure AI Fundamentals", body: "Understand AI, ML & generative AI. Zero coding needed." },
              { n: "02", accent: C.gold, soft: false, title: "AB-900 · Copilot & Agent Admin", badge: true, body: "Administer & secure Copilot — before everyone else does." },
              { n: "03", accent: C.azure, soft: true, title: "AZ-900 / DP-900 · Cloud & Data", body: "The cloud and data foundations every role now expects." },
            ].map((s, i) => (
              <div key={s.n} style={{ display: "flex", gap: 16, padding: "14px 0 18px", borderBottom: i < 2 ? `1px solid ${C.line}` : undefined }}>
                <div style={{ flex: "none", width: 36, height: 36, borderRadius: "50%", display: "grid", placeItems: "center", fontFamily: FONT.mono, fontSize: ".72rem", background: s.soft ? "rgba(46,143,255,.14)" : "rgba(231,185,76,.14)", border: `1px solid ${s.soft ? "rgba(46,143,255,.5)" : "rgba(231,185,76,.6)"}`, color: s.soft ? C.azureSoft : C.gold, boxShadow: s.soft ? undefined : "0 0 22px rgba(231,185,76,.25)" }}>
                  {s.n}
                </div>
                <div>
                  <h4 style={{ fontFamily: FONT.display, fontSize: ".98rem", fontWeight: 600, marginBottom: 2 }}>
                    {s.title}{" "}
                    {s.badge && <span style={{ fontFamily: FONT.mono, fontSize: ".6rem", letterSpacing: ".14em", padding: ".25em .7em", borderRadius: 100, background: "rgba(231,185,76,.16)", color: C.gold }}>NEW 2026</span>}
                  </h4>
                  <p style={{ fontSize: ".84rem", color: C.mute }}>{s.body}</p>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 8, paddingTop: 16, borderTop: `1px dashed ${C.line}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: ".78rem", color: C.mute, marginBottom: 10 }}>
                <span>{P.discountPercent}% off* · <s style={{ color: C.mute }}>{P.orig}</s> <b style={{ color: C.paper }}>{P.deal} + GST</b></span>
                <span style={{ fontFamily: FONT.mono, fontSize: ".66rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.red }}>Expires soon</span>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {[{ v: cpad(cd.d), u: "D" }, { v: cpad(cd.h), u: "H" }, { v: cpad(cd.m), u: "M" }, { v: cpad(cd.s), u: "S" }].map((x) => (
                  <div key={x.u} style={{ flex: 1, background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 8, padding: "8px 4px", textAlign: "center" }}>
                    <div style={{ fontFamily: FONT.mono, fontSize: "1.05rem", fontWeight: 700, color: C.goldHot, fontVariantNumeric: "tabular-nums" }}>{x.v}</div>
                    <div style={{ fontSize: ".52rem", color: C.mute, letterSpacing: ".14em" }}>{x.u}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div style={{ height: 1, marginTop: 56, background: "linear-gradient(90deg,transparent,rgba(127,186,255,.24) 16%,rgba(127,186,255,.24) 84%,transparent)" }} />
        <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
          <Reveal style={{ display: "flex", gap: 56, flexWrap: "wrap", padding: "52px 0", justifyContent: "center", textAlign: "center" }}>
            <Stat to={1200} suffix="+" label="Learners trained" />
            <Stat to={94} suffix="%" label="First-attempt pass rate" />
            <Stat to={4} label="Focused courses. Zero fluff" />
            <Stat to={0} big plain={<span>∞</span>} label="Mock tests on web" />
          </Reveal>
        </div>
      </header>

      {/* TICKER */}
      <div style={{ position: "relative", background: C.panel, padding: "13px 0", overflow: "hidden", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)", maskImage: "linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)" }} aria-hidden="true">
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(231,185,76,.7),rgba(46,143,255,.7),transparent)", backgroundSize: "200% 100%", animation: "st_railglow 4s linear infinite" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(46,143,255,.7),rgba(231,185,76,.7),transparent)", backgroundSize: "200% 100%", animation: "st_railglow 4s linear infinite reverse" }} />
        <div ref={tickerRef} style={{ display: "flex", alignItems: "center", lineHeight: 1, gap: "4rem", whiteSpace: "nowrap", width: "max-content", willChange: "transform", fontSize: ".85rem", color: C.mute }}>
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: ".55em" }}>
              <Star size=".75em" twinkle={false} style={{ flex: "none" }} />
              <span><b style={{ color: C.paper }}>{t.src}</b> {t.t}</span>
            </span>
          ))}
        </div>
      </div>

      {/* NEWS / EVIDENCE */}
      <section id="news" style={{ padding: "60px 0", background: "linear-gradient(180deg,#04091A,#070F22 40%,#04091A)" }}>
        <div className="wrap">
          <Reveal style={{ maxWidth: 660, margin: "0 auto 48px", textAlign: "center" }}>
            <Eyebrow center>In the headlines</Eyebrow>
            <h2 style={sectionHead(C.paper)}>
              The market has already moved.
              <br />
              <span style={{ color: C.red }}>The question is whether you have.</span>
            </h2>
            <p style={{ color: C.mute, fontSize: "1.03rem" }}>Don't take our word for it — this is what India's own hiring data is reporting right now.</p>
          </Reveal>

          <div className="st-news-grid" style={{ marginBottom: 40 }}>
            {CLIPS.map((c, i) => (
              <Reveal as="article" key={i} style={{ position: "relative", transform: `rotate(${c.rot})`, filter: "drop-shadow(0 16px 16px rgba(0,0,0,.42))" }}>
                <div style={{ position: "relative", color: "#241D12", padding: "38px 30px 32px", clipPath: "polygon(1.2% 2.8%,7% 0.6%,15% 2%,24% 0.4%,33% 2.2%,44% 0.8%,54% 2.4%,64% 0.6%,74% 2%,84% 0.6%,93% 2.2%,99% 1%,99.4% 10%,98.4% 20%,99.6% 31%,98.6% 42%,99.6% 53%,98.4% 64%,99.4% 75%,98.4% 86%,99.4% 96%,93% 99%,83% 97.4%,72% 99.4%,61% 97.8%,50% 99.6%,39% 97.8%,28% 99.4%,18% 97.6%,8% 99.4%,1% 98%,1.6% 88%,0.6% 77%,1.8% 66%,0.6% 55%,1.6% 44%,0.6% 33%,1.8% 22%,0.6% 11%)", background: "radial-gradient(150% 130% at 50% -10%,rgba(255,255,255,.4),transparent 55%),linear-gradient(158deg,#F6EFDB,#ECE0C5 70%,#E2D4B4)", boxShadow: "inset 0 0 34px rgba(120,85,25,.14),inset 0 0 0 1px rgba(120,85,25,.07)" }}>
                  {c.note && (
                    <svg viewBox="0 0 80 50" style={{ position: "absolute", left: -10, top: 12, width: 96, height: 56, overflow: "visible", pointerEvents: "none", zIndex: 2 }}>
                      <ellipse cx="40" cy="25" rx="35" ry="20" fill="none" stroke="#C0271B" strokeWidth="2.4" strokeLinecap="round" opacity=".82" transform="rotate(-4 40 25)" />
                    </svg>
                  )}
                  <span style={{ fontFamily: FONT.mono, fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase", color: "#6B5B36", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 0 .2em", marginBottom: 14, position: "relative", zIndex: 1 }}>
                    <span>{c.src}</span>
                    <span>{c.date}</span>
                  </span>
                  <h3 style={{ fontFamily: FONT.serif, fontSize: "1.32rem", fontWeight: 800, letterSpacing: "-.01em", lineHeight: 1.22, margin: "0 0 10px", color: "#17110A", position: "relative", zIndex: 1 }}>{c.head}</h3>
                  <p style={{ fontFamily: FONT.news, fontSize: ".82rem", lineHeight: 1.62, color: "#3A3120", textAlign: "justify", hyphens: "auto", borderTop: "1px dotted rgba(36,29,18,.4)", paddingTop: 10, position: "relative", zIndex: 1 }}>{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="st-statstrip">
            <BigStat to={14} suffix="M"><b style={{ color: C.paper }}>Cloud jobs projected in India</b> through 2026 — Nasscom &amp; Oliver Wyman. Azure dominates at Indian banks and insurers.</BigStat>
            <BigStat to={43} suffix="%"><b style={{ color: C.paper }}>Salary premium</b> for roles listing AI skills — Lightcast's analysis of a billion job postings worldwide.</BigStat>
            <BigStat to={300} suffix="%"><b style={{ color: C.paper }}>Surge in demand for AI specialists since 2024</b> — while India faces a ~53% AI skills deficit. Scarcity is the opportunity.</BigStat>
          </div>
          <Reveal style={{ marginTop: 30, fontSize: ".78rem", color: C.mute, fontStyle: "italic" }}>
            Sources: Reuters coverage of Naukri JobSpeak (2026), Nasscom, Wheebox India Skills Report 2026, Nasscom–Oliver Wyman cloud skills report, Lightcast job postings analysis.
          </Reveal>

          <Reveal className="st-window" style={{ marginTop: 44, background: "linear-gradient(135deg,#231303,#12162E)", border: "1px solid rgba(231,185,76,.35)", borderRadius: 20, padding: "40px 36px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: -80, top: -80, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle,rgba(231,185,76,.16),transparent 70%)" }} />
            <div style={{ position: "relative" }}>
              <h3 style={{ fontFamily: FONT.display, fontSize: "clamp(1.4rem,2.8vw,2.05rem)", fontWeight: 700, letterSpacing: "-.02em", lineHeight: 1.18, marginBottom: 14 }}>
                Every certification has a window when it's rare.
                <br />
                <em style={{ fontStyle: "normal", color: C.goldHot }}>AB-900's window is open right now.</em>
              </h3>
              <p style={{ color: C.mute, fontSize: ".96rem" }}>Microsoft launched the Copilot &amp; Agent Administration exam in 2026. Almost nobody in India holds it yet — but every company rolling out Copilot will soon be searching for people who do. In 18 months this badge will be common. Today, it makes you the only one in the room.</p>
            </div>
            <div style={{ background: "rgba(4,9,26,.65)", border: `1px solid ${C.line}`, borderRadius: 16, padding: 24, textAlign: "center", position: "relative", zIndex: 1 }}>
              <div style={{ fontFamily: FONT.mono, fontSize: ".64rem", letterSpacing: ".2em", color: C.mute, textTransform: "uppercase", marginBottom: 12 }}>Limited-time price expires in</div>
              <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                {[{ v: cpad(cd.d), u: "Days" }, { v: cpad(cd.h), u: "Hrs" }, { v: cpad(cd.m), u: "Min" }, { v: cpad(cd.s), u: "Sec" }].map((x) => (
                  <div key={x.u} style={{ background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 10, padding: "12px 8px", minWidth: 58, flex: 1, maxWidth: 72 }}>
                    <div style={{ fontFamily: FONT.display, fontSize: "1.6rem", fontWeight: 800, color: C.goldHot }}>{x.v}</div>
                    <div style={{ fontSize: ".6rem", color: C.mute, letterSpacing: ".12em", textTransform: "uppercase" }}>{x.u}</div>
                  </div>
                ))}
              </div>
              <RegisterButton full style={{ marginTop: 18 }}>Register Now</RegisterButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* COURSES */}
      <section id="tracks" style={{ padding: "60px 0" }}>
        <div className="wrap">
          <Reveal style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 60px" }}>
            <Eyebrow center>Four courses. By design.</Eyebrow>
            <h2 style={sectionHead(C.paper)}>The 4 certifications the market is actually paying for.</h2>
            <p style={{ color: C.mute, fontSize: "1.03rem" }}>Self-paced. Simply explained. Unlimited mock tests. Pick your door.</p>
          </Reveal>
          <div className="st-tracks">
            <Reveal as="div" className="st-flag st-card-hover" style={{ position: "relative", background: "linear-gradient(120deg,#1A1406 0%,#0F1E3A 55%,#0A1428 100%)", border: "1px solid rgba(231,185,76,.45)", borderRadius: 24, padding: "40px 36px", overflow: "hidden", color: C.paper }}>
              <Link to="/ab-900" style={{ position: "absolute", inset: 0, zIndex: 2 }} aria-label="AB-900 Copilot & Agent Administration" />
              <div style={{ position: "relative", zIndex: 1 }}>
                <span style={{ fontFamily: FONT.mono, fontSize: ".72rem", color: C.gold, letterSpacing: ".16em" }}>AB-900</span>
                <span style={{ fontFamily: FONT.mono, fontSize: ".58rem", letterSpacing: ".14em", background: "linear-gradient(135deg,#F2CB6B,#DCA92F)", color: "#171100", padding: ".5em 1em", borderRadius: 100, fontWeight: 600, marginLeft: ".9em", display: "inline-flex", alignItems: "center", gap: ".45em" }}>
                  <Star size=".85em" fill="#171100" twinkle={false} />NEW 2026 · BE FIRST IN INDIA
                </span>
                <h3 style={{ fontFamily: FONT.display, fontSize: "clamp(1.6rem,2.8vw,2.1rem)", fontWeight: 700, margin: "16px 0 12px", letterSpacing: "-.018em" }}>Copilot &amp; Agent Administration</h3>
                <p style={{ fontSize: ".93rem", color: C.mute, maxWidth: "26em", marginBottom: 26 }}>Administer, secure and govern Copilot and AI agents across Microsoft 365 — the newest Microsoft credential on Earth. The field is nearly empty. Walk in first.</p>
                <span style={{ fontSize: ".88rem", fontWeight: 600, color: C.gold, display: "inline-flex", alignItems: "center", gap: ".5em" }}>Learn more <span>→</span></span>
              </div>
              <div style={{ position: "relative", height: 220, display: "grid", placeItems: "center" }} aria-hidden="true">
                <div style={{ position: "absolute", border: "1px dashed rgba(231,185,76,.3)", borderRadius: "50%", width: 200, height: 200, animation: "st_orbit 22s linear infinite" }}>
                  <span style={{ position: "absolute", top: -5, left: "calc(50% - 5px)", width: 10, height: 10, borderRadius: "50%", background: C.gold, boxShadow: "0 0 14px rgba(231,185,76,.9)" }} />
                </div>
                <div style={{ position: "absolute", border: "1px dashed rgba(127,186,255,.25)", borderRadius: "50%", width: 140, height: 140, animation: "st_orbit 16s linear infinite reverse" }}>
                  <span style={{ position: "absolute", top: -5, left: "calc(50% - 5px)", width: 10, height: 10, borderRadius: "50%", background: C.azureSoft, boxShadow: "0 0 12px rgba(127,186,255,.9)" }} />
                </div>
                <div style={{ position: "relative", width: 92, height: 92, borderRadius: 26, background: "linear-gradient(145deg,rgba(231,185,76,.18),rgba(231,185,76,.05))", border: "1px solid rgba(231,185,76,.5)", display: "grid", placeItems: "center", animation: "st_core 3s ease-in-out infinite" }}>
                  <Star size={44} />
                </div>
              </div>
            </Reveal>

            {COURSE_CARDS.map((c, i) => (
              <Reveal as="div" key={c.slug} delay={i} className="st-card-hover" style={{ position: "relative", display: "flex", flexDirection: "column", background: "linear-gradient(165deg,#0A1428,#0F1E3A)", border: `1px solid ${C.line}`, borderRadius: 24, padding: "40px 36px", overflow: "hidden", color: C.paper }}>
                <Link to={`/${c.slug}`} style={{ position: "absolute", inset: 0, zIndex: 2 }} aria-label={c.code} />
                <span style={{ fontFamily: FONT.mono, fontSize: ".72rem", color: c.accent, letterSpacing: ".16em" }}>{c.code}</span>
                <h3 style={{ fontFamily: FONT.display, fontSize: "1.4rem", fontWeight: 700, margin: "16px 0 12px", letterSpacing: "-.018em" }}>{c.name}</h3>
                <p style={{ fontSize: ".93rem", color: C.mute, maxWidth: "26em", marginBottom: 26 }}>{c.body}</p>
                <span style={{ fontSize: ".88rem", fontWeight: 600, color: c.accent, display: "inline-flex", alignItems: "center", gap: ".5em", marginTop: "auto" }}>Learn more <span>→</span></span>
              </Reveal>
            ))}
          </div>

          <Reveal style={{ maxWidth: 560, margin: "56px auto 0", background: "linear-gradient(135deg,#231303,#12162E)", border: "1px solid rgba(231,185,76,.35)", borderRadius: 20, padding: "30px 32px", textAlign: "center", position: "relative", overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,.4)" }}>
            <div style={{ position: "absolute", right: -70, top: -70, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle,rgba(231,185,76,.14),transparent 70%)", pointerEvents: "none" }} />
            <span style={{ position: "relative", fontFamily: FONT.mono, fontSize: ".6rem", letterSpacing: ".18em", textTransform: "uppercase", color: "#FFB4B4", display: "inline-flex", alignItems: "center", gap: ".6em", padding: ".4em 1em", borderRadius: 100, background: "rgba(255,107,107,.12)", border: "1px solid rgba(255,107,107,.3)" }}>⚡ {P.discountPercent}% off · Limited time*</span>
            <div style={{ position: "relative", fontFamily: FONT.body, fontSize: "1.05rem", color: C.mute, marginTop: 14 }}>
              <s>{P.orig}</s>
            </div>
            <div style={{ position: "relative", fontFamily: FONT.display, fontWeight: 800, letterSpacing: "-.02em", margin: "2px 0 6px", lineHeight: 1 }}>
              <span style={{ fontSize: "1.4rem", color: C.mute, verticalAlign: "top", marginRight: ".15em" }}>{P.currency}</span>
              <span style={{ fontSize: "3.4rem", color: C.paper }}>{P.dealNum}</span>
              <span style={{ fontSize: "1.05rem", color: C.gold, marginLeft: ".4em", fontWeight: 600 }}>+ GST</span>
              <span style={{ display: "block", fontSize: ".82rem", color: C.mute, fontFamily: FONT.body, fontWeight: 500, letterSpacing: 0, marginTop: 6 }}>per certification · same price for all 4 courses</span>
            </div>
            <p style={{ position: "relative", fontSize: ".9rem", color: C.mute, marginBottom: 22 }}>Each certification course — AI-900, AB-900, AZ-900 or DP-900 — is one flat price: self-paced classes, unlimited mock tests, and access until you pass. No hidden add-ons.</p>
            <RegisterButton big full>Register Now</RegisterButton>
            <div style={{ position: "relative", marginTop: 14, fontSize: ".78rem", color: C.mute }}>Try a free demo first · No card needed · Pay only when you enroll</div>
          </Reveal>
        </div>
      </section>

      {/* INCLUDED */}
      <section id="included" style={{ padding: "60px 0", background: C.panel, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div className="wrap">
          <Reveal style={{ maxWidth: 660, margin: "0 auto 48px", textAlign: "center" }}>
            <Eyebrow center>Everything included</Eyebrow>
            <h2 style={sectionHead(C.paper)}>Built so that failing the exam is nearly impossible.</h2>
          </Reveal>
          <div className="st-incl">
            {INCLUDED.map((f, i) => (
              <Reveal key={i} className="st-card-hover" style={{ background: C.ink, border: `1px solid ${C.line}`, borderRadius: 16, padding: "28px 24px" }}>
                <div style={{ width: 56, height: 56, marginBottom: 18, borderRadius: 16, display: "grid", placeItems: "center", background: "linear-gradient(145deg,rgba(46,143,255,.16),rgba(231,185,76,.06))", border: "1px solid rgba(127,186,255,.2)", animation: "st_icfloat 4.5s ease-in-out infinite" }}>
                  <svg viewBox="0 0 24 24" style={{ width: 28, height: 28, fill: "none", stroke: C.azureSoft, strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" }}><path d={f.icon} /></svg>
                </div>
                <h3 style={{ fontFamily: FONT.display, fontSize: "1.05rem", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: ".87rem", color: C.mute }}>{f.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROMISE */}
      <section style={{ padding: "60px 0" }}>
        <div className="wrap">
          <Reveal style={{ background: "linear-gradient(135deg,rgba(46,143,255,.08),rgba(231,185,76,.07))", border: "1px solid rgba(231,185,76,.3)", borderRadius: 20, padding: "38px 36px", display: "flex", gap: 26, alignItems: "center", flexWrap: "wrap", boxShadow: "0 0 44px rgba(46,143,255,.09)" }}>
            <Star size={56} style={{ flex: "none", filter: "drop-shadow(0 0 18px rgba(231,185,76,.5))" }} />
            <div style={{ flex: 1, minWidth: 280 }}>
              <h3 style={{ fontFamily: FONT.display, fontSize: "1.45rem", fontWeight: 700, letterSpacing: "-.015em", marginBottom: 8 }}>The Skilltimate Promise: <em style={{ fontStyle: "normal", color: C.goldHot }}>we don't stop until you pass.</em></h3>
              <p style={{ color: C.mute, fontSize: ".95rem", maxWidth: "46em" }}>Didn't clear the exam on your first attempt? Keep your <b style={{ color: C.paper }}>full course access and unlimited mock tests, free,</b> until you do. Your only job is to show up and study — passing is on both of us.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROOF */}
      <section id="proof" style={{ padding: "60px 0" }}>
        <div className="wrap">
          <Reveal style={{ maxWidth: 660, margin: "0 auto 48px", textAlign: "center" }}>
            <Eyebrow center>Results</Eyebrow>
            <h2 style={sectionHead(C.paper)}>They didn't wait. Look where that got them.</h2>
          </Reveal>
          <div className="st-quotes">
            {LANDING_QUOTES.map((q, i) => (
              <Reveal key={i} className="st-card-hover" style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 16, padding: "28px 24px", display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: ".94rem", flex: 1, marginBottom: 20, lineHeight: 1.6 }}>{q.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#2E8FFF,#0B4FA0)", display: "grid", placeItems: "center", fontWeight: 700, fontFamily: FONT.display, flex: "none" }}>{q.initial}</div>
                  <div>
                    <div style={{ fontSize: ".9rem", fontWeight: 600 }}>{q.name}</div>
                    <div style={{ fontSize: ".78rem", color: C.mute }}>{q.role}</div>
                    <div style={{ fontFamily: FONT.mono, fontSize: ".6rem", color: C.gold, letterSpacing: ".14em", marginTop: 5 }}>{q.cert}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="cta" style={{ position: "relative", overflow: "hidden", textAlign: "center", padding: "72px 0" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(760px 420px at 50% 0%,rgba(46,143,255,.22),transparent 65%)" }} />
        <div className="wrap" style={{ position: "relative" }}>
          <Reveal>
            <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(1.9rem,4.6vw,3.5rem)", fontWeight: 700, letterSpacing: "-.026em", lineHeight: 1.06, marginBottom: 18 }}>
              Six months from now, someone in your role<br />will be certified. <span style={{ color: C.goldHot }}>Make sure it's you.</span>
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p style={{ color: C.mute, maxWidth: "36em", margin: "0 auto 34px", fontSize: "1.06rem", lineHeight: 1.6 }}>Try a free demo lesson and a free mock test. Get a personal roadmap across AI, Azure, Copilot and Data. Then decide — but decide before the limited-time price expires.</p>
          </Reveal>
          <Reveal delay={2}>
            <RegisterButton big style={{ fontSize: "1.08rem", padding: "1.15em 2.4em" }}>Register Now</RegisterButton>
          </Reveal>
          <Reveal delay={3}>
            <div style={{ marginTop: 16, fontSize: ".8rem", color: C.mute }}>100% free demo · No card needed · <b style={{ color: C.red }}>Price locked in only while the timer runs.</b></div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "60px 0" }}>
        <div className="wrap">
          <Reveal style={{ textAlign: "center", maxWidth: 660, margin: "0 auto 48px" }}>
            <Eyebrow center>FAQ</Eyebrow>
            <h2 style={sectionHead(C.paper)}>Questions, answered.</h2>
          </Reveal>
          <Reveal style={{ maxWidth: 760, margin: "0 auto" }}>
            {LANDING_FAQS.map((fq, i) => (
              <details key={i} style={{ border: `1px solid ${C.line}`, borderRadius: 12, padding: "18px 22px", marginBottom: 12, background: C.panel }}>
                <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: ".96rem", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, minHeight: 32 }}>
                  {fq.q}
                  <span style={{ fontFamily: FONT.mono, color: C.gold, fontSize: "1.1rem", flex: "none" }}>+</span>
                </summary>
                <p style={{ marginTop: 14, color: C.mute, fontSize: ".9rem", lineHeight: 1.6 }}>{fq.a}</p>
              </details>
            ))}
          </Reveal>
        </div>
      </section>

      <Footer />

      {/* FLOATING BOTTOM CTA */}
      <div className="st-fab" style={{ opacity: fabShow ? 1 : 0, transform: fabShow ? "none" : "translateY(16px)", pointerEvents: fabShow ? "auto" : "none" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: ".92rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Free demo lesson + free mock test</div>
          <div style={{ fontSize: ".72rem", color: C.mute, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Offer price expires in <b style={{ color: C.red }}>{`${cd.d}d ${cpad(cd.h)}h ${cpad(cd.m)}m ${cpad(cd.s)}s`}</b></div>
        </div>
        <RegisterButton style={{ flex: "none" }}>Register Now</RegisterButton>
      </div>
    </div>
  );
}
