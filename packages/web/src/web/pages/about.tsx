import { C, FONT } from "../lib/theme";
import { Nav } from "../components/site/nav";
import { Footer, FloatingWA } from "../components/site/footer";
import { Star } from "../components/site/icons";
import { RegisterButton } from "../components/site/primitives";
import { usePricing } from "../hooks/use-pricing";
import { usePageSeo } from "../lib/seo-config";

const NAV_LINKS = [
  { label: "Courses", href: "/#tracks" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

const VALUES = [
  { title: "Plain language, always", body: "No jargon dumps. Every concept is taught with a real example first, and the technical term second." },
  { title: "Your pace, your schedule", body: "Self-paced by design. Study before work, after college, on weekends — pause and rewind as often as you need." },
  { title: "Until you pass", body: "Didn't clear it the first time? Keep full access and unlimited mock tests, free. Your only job is to show up." },
];

export default function About() {
  usePageSeo("/about");
  const P = usePricing();
  const STATS = [
    { v: "4", label: "Microsoft fundamentals tracks" },
    { v: "∞", label: "Mock tests, until you pass" },
    { v: P.deal, label: `${P.discountPercent}% off* limited time, + GST, per track` },
  ];
  return (
    <div style={{ overflowX: "clip", minHeight: "100vh" }}>
      <Nav links={NAV_LINKS} />

      <header style={{ position: "relative", padding: "56px 0 40px" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span style={{ position: "absolute", borderRadius: "50%", filter: "blur(90px)", opacity: 0.4, width: 560, height: 560, background: "rgba(46,143,255,.2)", top: "-30%", right: "-6%", animation: "st_drift 15s ease-in-out infinite alternate" }} />
        </div>
        <div className="wrap-cp" style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
          <span style={{ fontFamily: FONT.mono, fontSize: ".7rem", letterSpacing: ".2em", textTransform: "uppercase", color: C.azureSoft, display: "inline-flex", alignItems: "center", gap: ".7em" }}>
            <Star size=".95em" />About Skilltimate
          </span>
          <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(2rem,4.6vw,3.3rem)", lineHeight: 1.05, fontWeight: 700, letterSpacing: "-.026em", margin: "16px 0 16px" }}>
            Microsoft certifications, finally explained in plain language.
          </h1>
          <p style={{ fontSize: "1.15rem", color: C.mute, maxWidth: "44em", lineHeight: 1.6 }}>
            Skilltimate is a self-paced certification school built around one belief: the exam isn't the hard part — bad teaching is. We turn dense Microsoft material into simple, example-led lessons, and we stay with you, with unlimited mock tests, until you pass.
          </p>
          <div className="ab-stats" style={{ marginTop: 40 }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 16, padding: "24px 24px" }}>
                <div style={{ fontFamily: FONT.display, fontSize: "2.2rem", fontWeight: 800, letterSpacing: "-.02em", color: C.gold }}>{s.v}</div>
                <div style={{ fontSize: ".85rem", color: C.mute, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* WHY WE EXIST */}
      <section style={{ padding: "40px 0", background: "linear-gradient(180deg,#04091A,#070F22 50%,#04091A)" }}>
        <div className="wrap-cp" style={{ maxWidth: 820 }}>
          <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(1.6rem,3vw,2.3rem)", fontWeight: 700, letterSpacing: "-.02em", marginBottom: 18 }}>Why we exist</h2>
          <p style={{ color: C.body, fontSize: "1.08rem", lineHeight: 1.75, marginBottom: 16 }}>
            Most people who want a Microsoft certification aren't short on ability — they're short on time, and stuck with material that reads like a manual. Working professionals, college students and career-switchers all hit the same wall: dense documentation, no clear plan, and nobody to ask when something doesn't click.
          </p>
          <p style={{ color: C.body, fontSize: "1.08rem", lineHeight: 1.75 }}>
            Skilltimate was built to remove that wall. Short lessons you can watch on any device, at any hour. Concepts explained the way you'd explain them to a friend. And a simple promise: you keep your access and mock tests, free, until you pass.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: "40px 0 20px" }}>
        <div className="wrap-cp">
          <div className="ab-vals">
            {VALUES.map((v) => (
              <div key={v.title} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 16, padding: "28px 26px" }}>
                <Star size={30} style={{ marginBottom: 14 }} />
                <h3 style={{ fontFamily: FONT.display, fontSize: "1.15rem", fontWeight: 600, marginBottom: 8 }}>{v.title}</h3>
                <p style={{ fontSize: ".92rem", color: C.mute, lineHeight: 1.6 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTRUCTOR */}
      <section style={{ padding: "40px 0" }}>
        <div className="wrap-cp">
          <div className="cp-instructor" style={{ background: "linear-gradient(135deg,#0A1428,#0F1E3A)", border: `1px solid ${C.line}`, borderRadius: 22, padding: "34px 34px" }}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: -8, borderRadius: 22, background: "radial-gradient(circle,rgba(46,143,255,.22),transparent 70%)", filter: "blur(14px)" }} />
              <div style={{ position: "relative", width: "100%", aspectRatio: "1", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(127,186,255,.2)", background: "linear-gradient(145deg,#2E8FFF,#0B2A52)", display: "grid", placeItems: "center" }}>
                <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: "3.4rem", color: "#04091A" }}>HR</span>
              </div>
            </div>
            <div>
              <span style={{ fontFamily: FONT.mono, fontSize: ".7rem", letterSpacing: ".2em", textTransform: "uppercase", color: C.azureSoft }}>Lead instructor</span>
              <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(1.6rem,2.8vw,2.1rem)", fontWeight: 700, letterSpacing: "-.02em", margin: "12px 0 6px" }}>Hemalatha Reddy</h2>
              <div style={{ fontSize: ".9rem", color: C.azureSoft, fontWeight: 600, marginBottom: 16 }}>Microsoft Certified Trainer</div>
              <p style={{ color: C.mute, fontSize: "1rem", lineHeight: 1.7, maxWidth: "44em" }}>
                Hemalatha leads certification training at Skilltimate across AI, Azure, Copilot and Data. She's known for turning dense Microsoft material into plain, example-led lessons anyone can follow — the teaching style that runs through every class and mock test.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", overflow: "hidden", textAlign: "center", padding: "56px 0" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(720px 400px at 50% 0%,rgba(46,143,255,.2),transparent 65%)" }} />
        <div className="wrap-cp" style={{ position: "relative", maxWidth: 720 }}>
          <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, letterSpacing: "-.024em", lineHeight: 1.08, marginBottom: 14 }}>See how we teach — for free.</h2>
          <p style={{ color: C.mute, maxWidth: "34em", margin: "0 auto 28px", fontSize: "1.04rem", lineHeight: 1.6 }}>Register your interest and get a free demo lesson plus a free mock test. No card, no commitment — just a taste of the classes.</p>
          <RegisterButton>Register Now</RegisterButton>
        </div>
      </section>

      <Footer showContact />
      <FloatingWA />
    </div>
  );
}
