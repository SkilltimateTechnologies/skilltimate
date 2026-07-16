import { useState } from "react";
import { C, FONT } from "../lib/theme";
import { Nav } from "../components/site/nav";
import { Footer, FloatingWA } from "../components/site/footer";
import { Star } from "../components/site/icons";
import { useSubmitLead } from "../lib/use-lead";
import { usePageSeo } from "../lib/seo-config";

const NAV_LINKS = [
  { label: "Courses", href: "/#tracks" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

const COURSE_OPTS = [
  "Not sure yet",
  "AI-900 · Azure AI Fundamentals",
  "AB-900 · Copilot & Agent Administration",
  "AZ-900 · Azure Fundamentals",
  "DP-900 · Azure Data Fundamentals",
];

const DETAILS = [
  { k: "Phone", v: "+91 90000 00000" },
  { k: "Email", v: "hello@skilltimate.com" },
  { k: "Location", v: "Hyderabad, India" },
  { k: "Support hours", v: "Mon–Sat · 9am–9pm IST" },
];

const inputStyle: React.CSSProperties = {
  background: C.ink,
  border: "1px solid rgba(127,186,255,.18)",
  borderRadius: 10,
  padding: ".85em 1em",
  color: C.paper,
  fontFamily: FONT.body,
  fontSize: ".95rem",
  outline: "none",
};

export default function Contact() {
  usePageSeo("/contact");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("Not sure yet");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const submitLead = useSubmitLead();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    const nm = name.trim();
    const ph = phone.trim();
    const em = email.trim();
    if (!nm) return setErr("Please enter your full name.");
    if (!ph) return setErr("Please enter your contact number.");
    if (!em || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) return setErr("Please enter a valid email address.");
    try {
      await submitLead.mutateAsync({ name: nm, phone: ph, email: em, course, message: message.trim(), source: "contact" });
      setSubmitted(true);
    } catch {
      setErr("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ overflowX: "clip", minHeight: "100vh" }}>
      <Nav links={NAV_LINKS} />

      <header style={{ position: "relative", padding: "56px 0 20px" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <span style={{ position: "absolute", borderRadius: "50%", filter: "blur(90px)", opacity: 0.4, width: 520, height: 520, background: "rgba(46,143,255,.2)", top: "-30%", right: "-4%" }} />
        </div>
        <div className="wrap-cp" style={{ position: "relative", zIndex: 1 }}>
          <span style={{ fontFamily: FONT.mono, fontSize: ".7rem", letterSpacing: ".2em", textTransform: "uppercase", color: C.azureSoft, display: "inline-flex", alignItems: "center", gap: ".7em" }}>
            <Star size=".95em" />Get in touch
          </span>
          <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(2rem,4.4vw,3.1rem)", lineHeight: 1.05, fontWeight: 700, letterSpacing: "-.026em", margin: "16px 0 14px" }}>
            Talk to a real person — usually within the hour.
          </h1>
          <p style={{ fontSize: "1.1rem", color: C.mute, maxWidth: "40em", lineHeight: 1.6 }}>
            Tell us which certification you're eyeing and we'll help you decide, set up a free demo lesson, and answer anything. Drop your details and our team will reach out.
          </p>
        </div>
      </header>

      <section style={{ padding: "30px 0 60px" }}>
        <div className="wrap-cp">
          <div className="ct-grid">
            {/* Details */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {DETAILS.map((d) => (
                <div key={d.k} style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 14, padding: "18px 20px" }}>
                  <div style={{ fontFamily: FONT.mono, fontSize: ".62rem", letterSpacing: ".16em", textTransform: "uppercase", color: C.azureSoft, marginBottom: 6 }}>{d.k}</div>
                  <div style={{ fontSize: "1rem", fontWeight: 600, color: C.paper }}>{d.v}</div>
                </div>
              ))}
            </div>

            {/* Form */}
            {submitted ? (
              <div style={{ background: "linear-gradient(180deg,#0A1428,#0F1E3A)", border: "1px solid rgba(127,186,255,.16)", borderRadius: 20, padding: "44px 28px", textAlign: "center", boxShadow: "0 30px 80px rgba(0,0,0,.45)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <div style={{ width: 60, height: 60, borderRadius: "50%", margin: "0 auto 18px", display: "grid", placeItems: "center", background: `linear-gradient(135deg,${C.gold},#B8860B)`, color: "#04091A", fontSize: "1.7rem", fontWeight: 700 }}>✓</div>
                <h3 style={{ fontFamily: FONT.display, fontSize: "1.4rem", fontWeight: 700, marginBottom: 10 }}>Message received!</h3>
                <p style={{ color: C.mute, fontSize: ".98rem", lineHeight: 1.6 }}>Thanks {name.trim().split(" ")[0]} — our team will get back to you shortly.</p>
              </div>
            ) : (
            <form onSubmit={onSubmit} style={{ background: "linear-gradient(180deg,#0A1428,#0F1E3A)", border: "1px solid rgba(127,186,255,.16)", borderRadius: 20, padding: "28px 28px", display: "flex", flexDirection: "column", gap: 16, boxShadow: "0 30px 80px rgba(0,0,0,.45)" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontFamily: FONT.mono, fontSize: ".66rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.mute }}>Full name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Priya Sharma" style={inputStyle} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontFamily: FONT.mono, fontSize: ".66rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.mute }}>Contact number</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. 98765 43210" style={inputStyle} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontFamily: FONT.mono, fontSize: ".66rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.mute }}>Email ID</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontFamily: FONT.mono, fontSize: ".66rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.mute }}>Interested in</label>
                <select value={course} onChange={(e) => setCourse(e.target.value)} style={{ ...inputStyle, appearance: "auto" }}>
                  {COURSE_OPTS.map((o) => (
                    <option key={o} value={o} style={{ background: C.ink }}>{o}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontFamily: FONT.mono, fontSize: ".66rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.mute }}>Additional details <span style={{ textTransform: "none", letterSpacing: 0, opacity: .6 }}>(optional)</span></label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us what you'd like to know…" rows={4} style={{ ...inputStyle, resize: "vertical" }} />
              </div>
              {err && <div style={{ fontSize: ".82rem", color: "#FF8080", fontFamily: FONT.mono }}>{err}</div>}
              <button type="submit" disabled={submitLead.isPending} style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: ".6em", padding: "1.05em 1.8em", border: "none", borderRadius: 100, fontWeight: 700, fontSize: "1rem", minHeight: 54, cursor: submitLead.isPending ? "default" : "pointer", background: `linear-gradient(135deg,${C.gold},${C.goldHot})`, color: "#04091A", boxShadow: "0 12px 34px rgba(231,185,76,.34)", fontFamily: FONT.body, opacity: submitLead.isPending ? 0.75 : 1 }}>
                {submitLead.isPending ? "Submitting…" : "Send message"}
              </button>
              <div style={{ textAlign: "center", fontSize: ".76rem", color: C.mute }}>We save your enquiry so our team can follow up with you.</div>
            </form>
            )}
          </div>
        </div>
      </section>

      <Footer showContact />
      <FloatingWA />
    </div>
  );
}
