import { useState } from "react";
import { Link, Redirect, useParams } from "wouter";
import { C, FONT } from "../lib/theme";
import { COURSE_DATA, COURSE_ORDER, ARTICLE_SLUGS } from "../lib/site-data";
import { Footer, FloatingWA } from "../components/site/footer";
import { Star } from "../components/site/icons";
import { RegisterButton } from "../components/site/primitives";
import { useSubmitLead } from "../lib/use-lead";
import { usePricing } from "../hooks/use-pricing";
import { useCourseSeo } from "../lib/seo-config";

const mix = (accent: string, pct: number) => `color-mix(in oklab,${accent} ${pct}%,transparent)`;

function CourseNav({ activeKey }: { activeKey: string }) {
  const acc = C.azure;
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 60, backdropFilter: "blur(16px)", background: "rgba(4,9,26,.85)", borderBottom: `1px solid ${C.line}` }}>
      <div className="wrap-cp" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flex: "none" }}>
          <Link to="/" style={{ display: "flex", alignItems: "center" }}>
            <img src="/skilltimate-logo.png" alt="Skilltimate" style={{ height: 30, width: "auto", display: "block", imageRendering: "auto" }} />
          </Link>
          <Link to="/" style={{ display: "inline-flex", alignItems: "center", gap: ".45em", fontFamily: FONT.mono, fontSize: ".72rem", letterSpacing: ".06em", color: C.mute, padding: ".5em .9em", borderRadius: 100, border: `1px solid rgba(127,186,255,.16)` }}>
            <span style={{ fontSize: "1.1em" }}>←</span>Home
          </Link>
        </div>
        <div className="st-navlinks-desktop" style={{ display: "flex", gap: ".55rem", alignItems: "center" }}>
          {COURSE_ORDER.map((k) => {
            const c = COURSE_DATA[k];
            const active = k === activeKey;
            return (
              <Link key={k} to={`/${k}`} style={{ fontFamily: FONT.mono, fontSize: ".72rem", letterSpacing: ".08em", padding: ".5em .9em", borderRadius: 100, border: `1px solid ${active ? acc : "rgba(127,186,255,.16)"}`, background: active ? acc : "rgba(127,186,255,.05)", color: active ? "#04091A" : C.mute }}>
                {c.code}
              </Link>
            );
          })}
        </div>
        <RegisterButton style={{ flex: "none", padding: ".6em 1.2em", minHeight: 40, fontSize: ".82rem" }}>Register Now</RegisterButton>
      </div>
    </nav>
  );
}

export default function CoursePage() {
  const params = useParams();
  const P = usePricing();
  const submitLead = useSubmitLead();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formErr, setFormErr] = useState<string | null>(null);

  const key = (params.slug || "ai-900").toLowerCase();
  useCourseSeo(key);
  const d = COURSE_DATA[key];
  if (!d) return <Redirect to="/" />;
  const acc = C.azure; // unified brand accent across all courses (matches home page)

  const proofAvatars = d.quotes.map((q) => q.initial);
  const slugs = ARTICLE_SLUGS[key] || [];
  const articles = d.articles.map((a, i) => ({ ...a, link: slugs[i] ? `/blog/${slugs[i]}` : "/blog" }));

  const onEnroll = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErr(null);
    const nm = name.trim();
    const ph = phone.trim();
    const em = email.trim();
    if (!nm) return setFormErr("Please enter your full name.");
    if (!ph) return setFormErr("Please enter your contact number.");
    if (!em || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) return setFormErr("Please enter a valid email address.");
    try {
      await submitLead.mutateAsync({ name: nm, phone: ph, email: em, message: message.trim(), course: `${d.code} · ${d.name}`, source: "enroll" });
      setSubmitted(true);
    } catch {
      setFormErr("Something went wrong. Please try again.");
    }
  };

  const eyebrow = (label: string, center = false): React.ReactNode => (
    <span style={{ fontFamily: FONT.mono, fontSize: ".7rem", letterSpacing: ".2em", textTransform: "uppercase", color: acc, display: "inline-flex", alignItems: "center", gap: ".7em", justifyContent: center ? "center" : undefined }}>
      <Star size=".95em" />{label}
    </span>
  );
  const h2 = (children: React.ReactNode, extra?: React.CSSProperties) => (
    <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(1.7rem,3.2vw,2.5rem)", fontWeight: 700, letterSpacing: "-.02em", margin: "14px 0 12px", lineHeight: 1.12, ...extra }}>{children}</h2>
  );

  const included = [
    { icon: "M12 3a9 9 0 1 0 9 9M12 7v5l3 2", title: "Learn at your pace", body: "Short lessons, any device, any time. Pause, rewind, repeat — no fixed timings." },
    { icon: "M12 3a6 6 0 0 1 4 10.5c-1 .9-1.4 1.7-1.5 3h-5c-.1-1.3-.5-2.1-1.5-3A6 6 0 0 1 12 3ZM9.5 20h5M10.5 22h3", title: "Easy-to-explain classes", body: "Complex topics in plain language with real examples. If you can follow a video, you can learn this." },
    { icon: "M12 12c-2.5-3.5-4-4.5-6-4.5a4.5 4.5 0 0 0 0 9c2 0 3.5-1 6-4.5Zm0 0c2.5-3.5 4-4.5 6-4.5a4.5 4.5 0 0 1 0 9c-2 0-3.5-1-6-4.5Z", title: "Unlimited mock tests", body: "Full-length, timed practice exams on the web — attempt them until you're consistently passing." },
    { icon: "M12 4a8 8 0 1 0 8 8M9 12l2.5 2.5L20 6", title: "Exam-day support", body: "Doubt support, exam booking guidance, and résumé + LinkedIn positioning once you're certified." },
  ];

  return (
    <div style={{ overflowX: "clip", minHeight: "100vh", position: "relative", ["--acc" as string]: acc }}>
      <CourseNav activeKey={key} />

      {/* HERO */}
      <header style={{ position: "relative", padding: "56px 0 60px" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span style={{ position: "absolute", borderRadius: "50%", filter: "blur(90px)", opacity: 0.5, width: 560, height: 560, background: mix(acc, 30), top: "-24%", right: "-8%", animation: "st_drift 15s ease-in-out infinite alternate" }} />
          <span style={{ position: "absolute", borderRadius: "50%", filter: "blur(90px)", opacity: 0.4, width: 380, height: 380, background: "rgba(231,185,76,.1)", bottom: "-30%", left: "-6%", animation: "st_drift 15s ease-in-out infinite alternate -6s" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(127,186,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(127,186,255,.045) 1px,transparent 1px)", backgroundSize: "56px 56px", WebkitMaskImage: "radial-gradient(760px 460px at 55% 0%,#000 30%,transparent 75%)", maskImage: "radial-gradient(760px 460px at 55% 0%,#000 30%,transparent 75%)" }} />
        </div>
        <div className="wrap-cp" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: FONT.mono, fontSize: ".72rem", color: C.mute, marginBottom: 26 }}>
            <Link to="/" style={{ color: C.mute }}>Home</Link> <span style={{ opacity: 0.5 }}>/</span> <Link to="/#tracks" style={{ color: C.mute }}>Courses</Link> <span style={{ opacity: 0.5 }}>/</span> <span style={{ color: acc }}>{d.code}</span>
          </div>
          <div className="cp-herogrid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
                <span style={{ fontFamily: FONT.mono, fontSize: ".82rem", fontWeight: 600, letterSpacing: ".12em", color: acc, padding: ".4em 1em", borderRadius: 100, border: `1px solid ${mix(acc, 50)}`, background: mix(acc, 12) }}>{d.code}</span>
                <span style={{ fontFamily: FONT.mono, fontSize: ".68rem", letterSpacing: ".14em", textTransform: "uppercase", color: C.mute }}>{d.level}</span>
              </div>
              <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(2.2rem,4.6vw,3.5rem)", lineHeight: 1.03, fontWeight: 700, letterSpacing: "-.026em", marginBottom: 18 }}>{d.name}</h1>
              <p style={{ fontSize: "1.12rem", color: C.mute, maxWidth: "34em", lineHeight: 1.6, marginBottom: 26 }}>{d.tagline}</p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 16 }}>
                <RegisterButton big course={d.code}>Register Now</RegisterButton>
                <a href="#enroll" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: ".55em", padding: "1.02em 1.8em", borderRadius: 100, fontWeight: 700, fontSize: "1rem", minHeight: 52, background: "rgba(127,186,255,.06)", color: C.paper, border: `1px solid rgba(127,186,255,.16)` }}>Get the syllabus</a>
              </div>
              <div style={{ fontSize: ".8rem", color: C.mute, display: "flex", gap: "1.4em", flexWrap: "wrap" }}>
                {["100% free demo", "No card needed", "Unlimited mock tests"].map((t) => (
                  <span key={t}><span style={{ color: C.gold, marginRight: ".5em" }}>✓</span>{t}</span>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 24, paddingTop: 22, borderTop: "1px solid rgba(127,186,255,.1)", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", paddingLeft: 10 }}>
                  {proofAvatars.map((pa, i) => (
                    <div key={i} style={{ width: 38, height: 38, borderRadius: "50%", marginLeft: -10, border: "2px solid #04091A", background: `linear-gradient(135deg,${acc},#0B2A52)`, display: "grid", placeItems: "center", fontFamily: FONT.display, fontWeight: 700, fontSize: ".82rem", color: "#04091A" }}>{pa}</div>
                  ))}
                </div>
                <div>
                  <div style={{ display: "flex", gap: 3, marginBottom: 4 }}>
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} size=".9rem" twinkle={false} />)}
                  </div>
                  <div style={{ fontSize: ".82rem", color: C.mute }}>Loved by early <b style={{ color: C.paper }}>{d.code}</b> learners &amp; career switchers</div>
                </div>
              </div>
            </div>

            <aside style={{ background: "linear-gradient(180deg,#0A1428,#0F1E3A)", border: `1px solid ${C.line}`, borderRadius: 22, padding: "26px 24px", boxShadow: "0 40px 100px rgba(0,0,0,.5)" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: ".5em", marginBottom: 6, fontFamily: FONT.mono, fontSize: ".58rem", letterSpacing: ".16em", textTransform: "uppercase", color: "#FFB4B4", padding: ".35em .8em", borderRadius: 100, background: "rgba(255,107,107,.12)", border: "1px solid rgba(255,107,107,.3)" }}>⚡ {P.discountPercent}% off · Limited time*</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: ".35em", marginBottom: 4 }}>
                <span style={{ fontSize: "1.2rem", color: C.mute }}>{P.currency}</span>
                <span style={{ fontFamily: FONT.display, fontSize: "2.6rem", fontWeight: 800, letterSpacing: "-.02em" }}>{P.dealNum}</span>
                <span style={{ fontSize: ".95rem", color: C.gold, fontWeight: 600 }}>+ GST</span>
                <s style={{ fontSize: "1.05rem", color: C.mute, marginLeft: ".3em" }}>{P.orig}</s>
              </div>
              <div style={{ fontSize: ".78rem", color: C.mute, marginBottom: 18 }}>Save {P.discountPercent}% for a limited time* · access until you pass</div>
              <div className="cp-facts" style={{ gap: 1, background: C.line, border: `1px solid ${C.line}`, borderRadius: 14, overflow: "hidden" }}>
                {d.facts.map((ft) => (
                  <div key={ft.k} style={{ background: C.panel, padding: "14px 14px" }}>
                    <div style={{ fontFamily: FONT.mono, fontSize: ".58rem", letterSpacing: ".14em", textTransform: "uppercase", color: C.mute, marginBottom: 5 }}>{ft.k}</div>
                    <div style={{ fontSize: ".92rem", fontWeight: 600, color: C.paper }}>{ft.v}</div>
                  </div>
                ))}
              </div>
              <RegisterButton big course={d.code} style={{ width: "100%", marginTop: 16 }}>
                Register — start free
              </RegisterButton>
              <div style={{ textAlign: "center", fontSize: ".72rem", color: C.mute, marginTop: 10 }}>Official Microsoft exam · certificate never expires</div>
            </aside>
          </div>
        </div>
      </header>

      {/* WHY NOW */}
      <section style={{ padding: "56px 0", background: "linear-gradient(180deg,#04091A,#070F22 45%,#04091A)" }}>
        <div className="wrap-cp">
          <div style={{ maxWidth: 640, margin: "0 auto 42px", textAlign: "center" }}>
            {eyebrow("Why this course now", true)}
            {h2(d.whyHead)}
            <p style={{ color: C.mute, fontSize: "1rem" }}>{d.whySub}</p>
          </div>
          <div className="cp-3">
            {d.why.map((w, i) => (
              <div key={i} style={{ background: `linear-gradient(135deg,${mix(acc, 10)},rgba(231,185,76,.05))`, border: `1px solid ${C.line}`, borderRadius: 16, padding: "26px 24px" }}>
                <div style={{ fontFamily: FONT.display, fontSize: "1.9rem", fontWeight: 800, letterSpacing: "-.02em", color: acc, marginBottom: 8 }}>{w.stat}</div>
                <h3 style={{ fontFamily: FONT.display, fontSize: "1.05rem", marginBottom: 8 }}>{w.title}</h3>
                <p style={{ fontSize: ".88rem", color: C.mute, lineHeight: 1.6 }}>{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL LEARN */}
      <section style={{ padding: "56px 0" }}>
        <div className="wrap-cp">
          <div className="cp-2col">
            <div style={{ position: "sticky", top: 88 }}>
              {eyebrow("Skills measured")}
              {h2("What you'll learn")}
              <p style={{ color: C.mute, fontSize: "1rem", lineHeight: 1.65, marginBottom: 20 }}>Mapped directly to Microsoft's official <b style={{ color: C.paper }}>{d.code}</b> exam outline, with approximate weightings so you know where to focus. Every domain is taught in plain language and reinforced with mock questions.</p>
              <a href={d.officialUrl} target="_blank" rel="noopener" style={{ fontFamily: FONT.mono, fontSize: ".76rem", color: acc, display: "inline-flex", alignItems: "center", gap: ".5em" }}>View the official study guide <span>→</span></a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {d.domains.map((dm, i) => (
                <div key={i} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 14, padding: "20px 22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 14, marginBottom: 12 }}>
                    <h3 style={{ fontFamily: FONT.display, fontSize: "1.02rem", fontWeight: 600, lineHeight: 1.3 }}>{dm.name}</h3>
                    <span style={{ fontFamily: FONT.mono, fontSize: ".74rem", color: acc, flex: "none", fontWeight: 600 }}>{dm.weight}</span>
                  </div>
                  <div style={{ height: 6, background: "rgba(127,186,255,.12)", borderRadius: 100, overflow: "hidden" }}>
                    <i style={{ display: "block", height: "100%", width: dm.bar, borderRadius: 100, background: `linear-gradient(90deg,${mix(acc, 55)},${acc})` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section style={{ padding: "56px 0", background: C.panel, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 22px" }}>
          <div style={{ textAlign: "center", marginBottom: 38 }}>
            {eyebrow("Curriculum", true)}
            {h2("The full syllabus, module by module")}
            <p style={{ color: C.mute, fontSize: "1rem" }}>Short, on-demand video lessons. Watch anytime, pause, rewind, repeat.</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {d.modules.map((m) => (
              <details key={m.no} style={{ border: `1px solid ${C.line}`, borderRadius: 12, background: C.ink, overflow: "hidden" }}>
                <summary style={{ cursor: "pointer", listStyle: "none", display: "flex", alignItems: "center", gap: 16, padding: "18px 20px" }}>
                  <span style={{ flex: "none", width: 34, height: 34, borderRadius: 9, display: "grid", placeItems: "center", fontFamily: FONT.mono, fontSize: ".72rem", fontWeight: 600, background: mix(acc, 14), border: `1px solid ${mix(acc, 45)}`, color: acc }}>{m.no}</span>
                  <span style={{ flex: 1, fontFamily: FONT.display, fontWeight: 600, fontSize: "1.02rem" }}>{m.title}</span>
                  <span style={{ fontFamily: FONT.mono, color: acc, fontSize: "1.2rem", flex: "none" }}>+</span>
                </summary>
                <p style={{ padding: "0 20px 20px 70px", color: C.mute, fontSize: ".9rem", lineHeight: 1.6 }}>{m.body}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* INCLUDED */}
      <section style={{ padding: "56px 0" }}>
        <div className="wrap-cp">
          <div style={{ maxWidth: 640, margin: "0 auto 40px", textAlign: "center" }}>
            {eyebrow("Everything included", true)}
            {h2("One price. Everything you need to pass.")}
          </div>
          <div className="cp-4">
            {included.map((f, i) => (
              <div key={i} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 16, padding: "26px 22px" }}>
                <div style={{ width: 52, height: 52, marginBottom: 16, borderRadius: 14, display: "grid", placeItems: "center", background: mix(acc, 14), border: `1px solid ${mix(acc, 30)}` }}>
                  <svg viewBox="0 0 24 24" style={{ width: 26, height: 26, fill: "none", stroke: acc, strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" }}><path d={f.icon} /></svg>
                </div>
                <h3 style={{ fontFamily: FONT.display, fontSize: "1.02rem", marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: ".86rem", color: C.mute, lineHeight: 1.55 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAMPLE + GUARANTEE */}
      <section style={{ padding: "0 0 56px" }}>
        <div className="wrap-cp">
          <div className="cp-2col-b">
            <div style={{ background: "linear-gradient(135deg,#0A1428,#0F1E3A)", border: `1px solid ${C.line}`, borderRadius: 18, padding: "30px 30px" }}>
              <span style={{ fontFamily: FONT.mono, fontSize: ".66rem", letterSpacing: ".16em", textTransform: "uppercase", color: acc }}>Try a mock question</span>
              <h3 style={{ fontFamily: FONT.display, fontSize: "1.2rem", fontWeight: 600, margin: "12px 0 18px", lineHeight: 1.35 }}>{d.sample.q}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 18 }}>
                {d.sample.options.map((op) => (
                  <div key={op.k} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", border: `1px solid ${C.line}`, borderRadius: 10, fontSize: ".9rem", color: C.body }}>
                    <span style={{ flex: "none", width: 24, height: 24, borderRadius: 6, border: "1px solid rgba(127,186,255,.3)", display: "grid", placeItems: "center", fontFamily: FONT.mono, fontSize: ".7rem", color: C.mute }}>{op.k}</span>
                    {op.t}
                  </div>
                ))}
              </div>
              <details style={{ borderTop: "1px dashed rgba(127,186,255,.2)", paddingTop: 14 }}>
                <summary style={{ cursor: "pointer", listStyle: "none", fontFamily: FONT.mono, fontSize: ".78rem", color: acc, display: "inline-flex", alignItems: "center", gap: ".5em" }}>Reveal the answer <span>↓</span></summary>
                <p style={{ marginTop: 12, fontSize: ".9rem", color: C.body, lineHeight: 1.6 }}><b style={{ color: "#7CE0A3" }}>{d.sample.answer}</b> — {d.sample.explain}</p>
              </details>
            </div>
            <div style={{ background: `linear-gradient(135deg,rgba(231,185,76,.1),${mix(acc, 8)})`, border: "1px solid rgba(231,185,76,.32)", borderRadius: 18, padding: "30px 30px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Star size={46} style={{ filter: "drop-shadow(0 0 16px rgba(231,185,76,.45))", marginBottom: 16 }} />
              <h3 style={{ fontFamily: FONT.display, fontSize: "1.35rem", fontWeight: 700, letterSpacing: "-.015em", marginBottom: 10 }}>The Skilltimate Promise</h3>
              <p style={{ color: C.mute, fontSize: ".94rem", lineHeight: 1.6 }}>Didn't clear it on your first attempt? Keep your <b style={{ color: C.paper }}>full course access and unlimited mock tests, free,</b> until you pass. Your only job is to show up and study.</p>
            </div>
          </div>
        </div>
      </section>

      {/* INSTRUCTOR */}
      <section style={{ padding: "56px 0", background: "linear-gradient(180deg,#04091A,#070F22)" }}>
        <div className="wrap-cp">
          <div className="cp-instructor" style={{ background: "linear-gradient(135deg,#0A1428,#0F1E3A)", border: `1px solid ${C.line}`, borderRadius: 22, padding: "34px 34px" }}>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: -8, borderRadius: 22, background: `radial-gradient(circle,${mix(acc, 22)},transparent 70%)`, filter: "blur(14px)" }} />
              <div style={{ position: "relative", width: "100%", aspectRatio: "1", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(127,186,255,.2)", background: `linear-gradient(145deg,${mix(acc, 30)},#0B2A52)`, display: "grid", placeItems: "center" }}>
                <span style={{ fontFamily: FONT.display, fontWeight: 800, fontSize: "3.4rem", color: "#04091A" }}>HR</span>
              </div>
            </div>
            <div>
              <span style={{ fontFamily: FONT.mono, fontSize: ".7rem", letterSpacing: ".2em", textTransform: "uppercase", color: acc }}>Your instructor</span>
              <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(1.6rem,2.8vw,2.1rem)", fontWeight: 700, letterSpacing: "-.02em", margin: "12px 0 6px" }}>Hemalatha Reddy</h2>
              <div style={{ fontSize: ".9rem", color: acc, fontWeight: 600, marginBottom: 16 }}>Lead Instructor · Microsoft Certified Trainer</div>
              <p style={{ color: C.mute, fontSize: "1rem", lineHeight: 1.7, maxWidth: "44em", marginBottom: 18 }}>Hemalatha leads certification training at Skilltimate. She's known for turning dense Microsoft AI, Azure and Copilot material into plain, example-led lessons anyone can follow — the same simple teaching style that runs through every {d.code} class and mock test.</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["Microsoft Certified Trainer", "AI · Azure · Copilot · Data", "Plain-language teaching"].map((t) => (
                  <span key={t} style={{ fontFamily: FONT.mono, fontSize: ".68rem", letterSpacing: ".06em", padding: ".5em 1em", borderRadius: 100, background: "rgba(127,186,255,.08)", border: "1px solid rgba(127,186,255,.16)", color: C.body }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section style={{ padding: "56px 0" }}>
        <div className="wrap-cp">
          <div style={{ maxWidth: 640, margin: "0 auto 40px", textAlign: "center" }}>
            {eyebrow("Results", true)}
            {h2(`${d.code} learners, in their words`)}
          </div>
          <div className="cp-3">
            {d.quotes.map((q, i) => (
              <div key={i} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 16, padding: "26px 22px", display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: ".94rem", flex: 1, marginBottom: 18, lineHeight: 1.6 }}>{q.text}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg,${acc},#0B2A52)`, display: "grid", placeItems: "center", fontWeight: 700, fontFamily: FONT.display, flex: "none", color: "#04091A" }}>{q.initial}</div>
                  <div>
                    <div style={{ fontSize: ".9rem", fontWeight: 600 }}>{q.name}</div>
                    <div style={{ fontSize: ".78rem", color: C.mute }}>{q.role}</div>
                    <div style={{ fontFamily: FONT.mono, fontSize: ".6rem", color: C.gold, letterSpacing: ".14em", marginTop: 5 }}>{q.cert}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section style={{ padding: "56px 0", background: C.panel, borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div className="wrap-cp">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 16, marginBottom: 34 }}>
            <div>
              {eyebrow("Read up")}
              <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(1.6rem,3vw,2.3rem)", fontWeight: 700, letterSpacing: "-.02em", marginTop: 12, lineHeight: 1.12 }}>{d.code} articles &amp; career guides</h2>
            </div>
          </div>
          <div className="cp-4">
            {articles.map((a, i) => (
              <Link key={i} to={a.link} className="st-card-hover" style={{ display: "flex", flexDirection: "column", background: C.ink, border: `1px solid ${C.line}`, borderRadius: 16, overflow: "hidden", color: C.paper }}>
                <div style={{ height: 96, background: `linear-gradient(135deg,${mix(acc, 22)},rgba(231,185,76,.1))`, display: "flex", alignItems: "flex-end", padding: "12px 16px" }}>
                  <span style={{ fontFamily: FONT.mono, fontSize: ".6rem", letterSpacing: ".14em", textTransform: "uppercase", color: "#04091A", background: "rgba(255,255,255,.85)", padding: ".35em .8em", borderRadius: 100, fontWeight: 600 }}>{a.tag}</span>
                </div>
                <div style={{ padding: "18px 18px", display: "flex", flexDirection: "column", flex: 1 }}>
                  <h3 style={{ fontFamily: FONT.display, fontSize: "1rem", fontWeight: 600, lineHeight: 1.3, marginBottom: 8 }}>{a.title}</h3>
                  <p style={{ fontSize: ".82rem", color: C.mute, lineHeight: 1.5, flex: 1 }}>{a.blurb}</p>
                  <span style={{ fontFamily: FONT.mono, fontSize: ".7rem", color: acc, marginTop: 14, display: "inline-flex", alignItems: "center", gap: ".5em" }}>Read article <span>→</span></span>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/blog" style={{ marginTop: 22, fontFamily: FONT.mono, fontSize: ".78rem", color: acc, display: "inline-flex", alignItems: "center", gap: ".5em" }}>See all articles on the blog <span>→</span></Link>
        </div>
      </section>

      {/* ENROLL */}
      <section id="enroll" style={{ position: "relative", overflow: "hidden", padding: "64px 0", scrollMarginTop: 80 }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(720px 400px at 50% 0%,${mix(acc, 22)},transparent 65%)` }} />
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 22px", position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <h2 style={{ fontFamily: FONT.display, fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, letterSpacing: "-.024em", lineHeight: 1.08, marginBottom: 14 }}>Register for {d.code}</h2>
            <p style={{ color: C.mute, maxWidth: "34em", margin: "0 auto", fontSize: "1.04rem", lineHeight: 1.6 }}>Drop your details and our team will reach out — a free demo lesson, a free mock test, and a personal roadmap. No card, no commitment.</p>
          </div>
          {submitted ? (
            <div style={{ background: "linear-gradient(180deg,#0A1428,#0F1E3A)", border: "1px solid rgba(127,186,255,.16)", borderRadius: 20, padding: "44px 28px", textAlign: "center", boxShadow: "0 30px 80px rgba(0,0,0,.45)" }}>
              <div style={{ width: 60, height: 60, borderRadius: "50%", margin: "0 auto 18px", display: "grid", placeItems: "center", background: `linear-gradient(135deg,${C.gold},#B8860B)`, color: "#04091A", fontSize: "1.7rem", fontWeight: 700 }}>✓</div>
              <h3 style={{ fontFamily: FONT.display, fontSize: "1.4rem", fontWeight: 700, marginBottom: 10 }}>You're registered!</h3>
              <p style={{ color: C.mute, maxWidth: "30em", margin: "0 auto", fontSize: ".98rem", lineHeight: 1.6 }}>Thanks {name.trim().split(" ")[0]} — our team will contact you shortly about the {d.code} course.</p>
            </div>
          ) : (
          <form onSubmit={onEnroll} className="cp-form" style={{ background: "linear-gradient(180deg,#0A1428,#0F1E3A)", border: "1px solid rgba(127,186,255,.16)", borderRadius: 20, padding: "28px 28px", boxShadow: "0 30px 80px rgba(0,0,0,.45)" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontFamily: FONT.mono, fontSize: ".66rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.mute }}>Full name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Priya Sharma" style={inputStyle} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontFamily: FONT.mono, fontSize: ".66rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.mute }}>Contact number</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. 98765 43210" style={inputStyle} />
            </div>
            <div style={{ gridColumn: "1/-1", display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontFamily: FONT.mono, fontSize: ".66rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.mute }}>Email ID</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} />
            </div>
            <div style={{ gridColumn: "1/-1", display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontFamily: FONT.mono, fontSize: ".66rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.mute }}>Additional details <span style={{ textTransform: "none", letterSpacing: 0, opacity: .6 }}>(optional)</span></label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Anything you'd like us to know…" rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
            <div style={{ gridColumn: "1/-1", display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", border: `1px solid ${C.line}`, borderRadius: 10, background: C.ink, flexWrap: "wrap" }}>
              <span style={{ fontFamily: FONT.mono, fontSize: ".66rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.mute }}>Course</span>
              <span style={{ fontFamily: FONT.display, fontWeight: 600, fontSize: ".98rem" }}>{d.code} · {d.name}</span>
              <span style={{ marginLeft: "auto", fontSize: ".9rem", color: C.gold, fontWeight: 600 }}><s style={{ color: C.mute, fontWeight: 400, marginRight: ".35em" }}>{P.orig}</s>{P.deal} + GST</span>
            </div>
            {formErr && <div style={{ gridColumn: "1/-1", fontSize: ".82rem", color: "#FF8080", fontFamily: FONT.mono }}>{formErr}</div>}
            <button type="submit" disabled={submitLead.isPending} style={{ gridColumn: "1/-1", position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: ".6em", padding: "1.05em 1.8em", border: "none", borderRadius: 100, fontWeight: 700, fontSize: "1rem", minHeight: 54, cursor: submitLead.isPending ? "default" : "pointer", background: "linear-gradient(135deg,#25D366,#1EAE55)", color: C.ink, overflow: "hidden", boxShadow: "0 12px 34px rgba(37,211,102,.34)", fontFamily: FONT.body, opacity: submitLead.isPending ? 0.75 : 1 }}>
              {submitLead.isPending ? "Submitting…" : "Register Now"}
            </button>
            <div style={{ gridColumn: "1/-1", textAlign: "center", fontSize: ".76rem", color: C.mute }}>We save your enquiry so our team can follow up with your roadmap.</div>
          </form>
          )}
        </div>
      </section>

      <Footer accent={acc} showContact />
      <FloatingWA />
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: C.ink,
  border: `1px solid rgba(127,186,255,.18)`,
  borderRadius: 10,
  padding: ".85em 1em",
  color: C.paper,
  fontFamily: FONT.body,
  fontSize: ".95rem",
  outline: "none",
};
