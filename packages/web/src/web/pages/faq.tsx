import { C, FONT } from "../lib/theme";
import { Nav } from "../components/site/nav";
import { Footer, FloatingWA } from "../components/site/footer";
import { Star } from "../components/site/icons";
import { RegisterButton } from "../components/site/primitives";
import { usePricing } from "../hooks/use-pricing";
import { usePageSeo, faqLd } from "../lib/seo-config";

const NAV_LINKS = [
  { label: "Courses", href: "/#tracks" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

const groupsFor = (P: ReturnType<typeof usePricing>) => [
  {
    id: "courses",
    title: "Courses & access",
    items: [
      { q: "Which certifications do you offer?", a: "Four Microsoft fundamentals tracks: AI-900 (Azure AI), AB-900 (Copilot & Agent Administration), AZ-900 (Azure), and DP-900 (Azure Data). Each is a complete, self-paced course with unlimited mock tests." },
      { q: "How long do I have access?", a: "Until you pass. If you don't clear the exam on your first attempt, you keep full course access and unlimited mock tests, free, until you do." },
      { q: "Do I need any background or prerequisites?", a: "None. These are fundamentals courses designed for complete beginners — students, working professionals and career-switchers. No coding is required." },
      { q: "Which course should I start with?", a: "If AI is your goal, start with AI-900. For a broad cloud foundation, start with AZ-900. Our blog has a full comparison, and a free demo call can help you decide." },
    ],
  },
  {
    id: "exam",
    title: "The exam",
    items: [
      { q: "Is the exam included in the price?", a: `The ${P.deal} + GST (${P.discountPercent}% off* for a limited time, from ${P.orig}) covers the Skilltimate course and mock tests. The official Microsoft exam fee is paid separately to Microsoft. We guide you through booking it.` },
      { q: "What's the passing score?", a: "700 out of 1000 for all Microsoft fundamentals exams. There's no negative marking, so never leave a question blank." },
      { q: "Do the certifications expire?", a: "No. Microsoft fundamentals certifications do not expire once earned — the certificate is yours for life." },
      { q: "How do I book and take the exam?", a: "You book directly with Microsoft, and can take it online (proctored from home) or at a test center. We help you register and prepare for exam-day logistics." },
    ],
  },
  {
    id: "pricing",
    title: "Pricing & payment",
    items: [
      { q: "How much does a course cost?", a: `${P.deal} + GST per track — a limited-time ${P.discountPercent}% discount off the standard ${P.orig}. That's a one-time price covering all lessons, unlimited mock tests, and access until you pass.` },
      { q: "Is the demo really free?", a: "Yes. The demo lesson and a sample mock test are completely free, with no card required and no commitment. It's simply how you see whether our style works for you." },
      { q: "How do I pay and enroll?", a: "Register your interest and our team reaches out. Try a free demo, and once you're ready we'll share enrollment and payment details." },
    ],
  },
  {
    id: "learning",
    title: "How learning works",
    items: [
      { q: "Are classes live or self-paced?", a: "Self-paced. Lessons are short on-demand videos you can watch on any device, at any time — pause, rewind and repeat as much as you need." },
      { q: "How many mock tests do I get?", a: "Unlimited. Full-length, timed practice exams modelled on the real thing — attempt them as many times as you like until you're consistently passing." },
      { q: "What if I get stuck on a topic?", a: "You get doubt support from our team. Ask a question, get a plain-language answer — you're never stuck on your own." },
      { q: "How long does it take to get certified?", a: "Most learners are exam-ready in three to five weeks at around 45 minutes a day. Motivated full-time learners often finish faster." },
    ],
  },
];

export default function FAQ() {
  const P = usePricing();
  const GROUPS = groupsFor(P);
  usePageSeo("/faq", [faqLd(GROUPS.flatMap((g) => g.items))]);
  return (
    <div style={{ overflowX: "clip", minHeight: "100vh" }}>
      <Nav links={NAV_LINKS} />

      <header style={{ position: "relative", padding: "56px 0 30px" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span style={{ position: "absolute", borderRadius: "50%", filter: "blur(90px)", opacity: 0.4, width: 520, height: 520, background: "rgba(46,143,255,.2)", top: "-30%", right: "-4%" }} />
        </div>
        <div className="wrap-cp" style={{ position: "relative", zIndex: 1 }}>
          <span style={{ fontFamily: FONT.mono, fontSize: ".7rem", letterSpacing: ".2em", textTransform: "uppercase", color: C.azureSoft, display: "inline-flex", alignItems: "center", gap: ".7em" }}>
            <Star size=".95em" />Frequently asked questions
          </span>
          <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(2rem,4.4vw,3.1rem)", lineHeight: 1.05, fontWeight: 700, letterSpacing: "-.026em", margin: "16px 0 14px" }}>
            Everything you're wondering, answered.
          </h1>
          <p style={{ fontSize: "1.1rem", color: C.mute, maxWidth: "40em", lineHeight: 1.6 }}>
            Still not sure? Register your interest — a real person replies, usually within the hour.
          </p>
        </div>
      </header>

      <section style={{ padding: "20px 0 60px" }}>
        <div className="wrap-cp">
          <div className="fq-grid">
            <aside className="fq-toc" style={{ position: "sticky", top: 88 }}>
              <div style={{ fontFamily: FONT.mono, fontSize: ".62rem", letterSpacing: ".16em", textTransform: "uppercase", color: C.mute, marginBottom: 14 }}>Topics</div>
              <nav style={{ display: "flex", flexDirection: "column", gap: 11, borderLeft: "1px solid rgba(127,186,255,.16)", paddingLeft: 16 }}>
                {GROUPS.map((g) => (
                  <a key={g.id} href={`#${g.id}`} style={{ fontSize: ".85rem", color: C.mute, lineHeight: 1.4 }}>{g.title}</a>
                ))}
              </nav>
            </aside>

            <div style={{ minWidth: 0 }}>
              {GROUPS.map((g) => (
                <section key={g.id} id={g.id} style={{ scrollMarginTop: 88, marginBottom: 36 }}>
                  <h2 style={{ fontFamily: FONT.display, fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-.015em", marginBottom: 16 }}>{g.title}</h2>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {g.items.map((f, i) => (
                      <details key={i} style={{ border: `1px solid ${C.line}`, borderRadius: 12, background: C.panel, overflow: "hidden" }}>
                        <summary style={{ cursor: "pointer", listStyle: "none", display: "flex", alignItems: "center", gap: 14, padding: "18px 20px", fontFamily: FONT.display, fontWeight: 600, fontSize: "1rem" }}>
                          <span style={{ flex: 1 }}>{f.q}</span>
                          <span style={{ fontFamily: FONT.mono, color: C.gold, fontSize: "1.2rem", flex: "none" }}>+</span>
                        </summary>
                        <p style={{ padding: "0 20px 20px", color: C.mute, fontSize: ".94rem", lineHeight: 1.65 }}>{f.a}</p>
                      </details>
                    ))}
                  </div>
                </section>
              ))}

              <div style={{ marginTop: 20, background: "linear-gradient(135deg,#231303,#12162E)", border: "1px solid rgba(231,185,76,.3)", borderRadius: 20, padding: "32px 30px", textAlign: "center" }}>
                <h3 style={{ fontFamily: FONT.display, fontSize: "1.4rem", fontWeight: 700, marginBottom: 10 }}>Still have a question?</h3>
                <p style={{ color: C.mute, maxWidth: "34em", margin: "0 auto 20px" }}>Register your interest — a real person will help you pick a course and answer anything that's on your mind.</p>
                <RegisterButton>Register Now</RegisterButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer showContact />
      <FloatingWA />
    </div>
  );
}
