import { Link } from "wouter";
import { C, FONT } from "../../lib/theme";
import { RegisterButton } from "./primitives";
import { useRegister } from "./register-modal";

const courseLinks = [
  { label: "AB-900 · Copilot", href: "/ab-900" },
  { label: "AI-900 · Azure AI", href: "/ai-900" },
  { label: "AZ-900 · Azure", href: "/az-900" },
  { label: "DP-900 · Data", href: "/dp-900" },
];
const companyLinks = [
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
];
const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

function Col({ title, links, accent }: { title: string; links: { label: string; href: string }[]; accent: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div
        style={{
          fontFamily: FONT.mono,
          fontSize: ".64rem",
          letterSpacing: ".18em",
          textTransform: "uppercase",
          color: accent,
          marginBottom: 2,
        }}
      >
        {title}
      </div>
      {links.map((l) => (
        <Link key={l.label} to={l.href} style={{ color: C.mute }}>
          {l.label}
        </Link>
      ))}
    </div>
  );
}

export function Footer({ accent = C.azureSoft, showContact = false }: { accent?: string; showContact?: boolean }) {
  return (
    <footer
      className="st-foot"
      style={{ borderTop: `1px solid ${C.line}`, padding: "56px 0 36px", color: C.mute, fontSize: ".85rem", background: C.footer }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 22px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: "48px 40px", flexWrap: "wrap", paddingBottom: 40 }}>
          <div style={{ maxWidth: 320 }}>
            <Link to="/" style={{ display: "inline-flex", alignItems: "center" }}>
              <img src="/skilltimate-logo.png" alt="Skilltimate" style={{ height: 30, width: "auto", display: "block", imageRendering: "auto" }} />
            </Link>
            <p style={{ marginTop: 16, fontSize: ".86rem", color: C.mute, lineHeight: 1.65 }}>
              Microsoft AI, Azure, Copilot &amp; Data certifications — self-paced, simply explained, with unlimited mock
              tests until you pass.
            </p>
            {showContact && (
              <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6, fontSize: ".82rem" }}>
                <span style={{ color: C.body }}>+91 90000 00000</span>
                <span style={{ color: C.mute }}>hello@skilltimate.com · Hyderabad, India</span>
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: "52px 68px", flexWrap: "wrap" }}>
            <Col title="Courses" links={courseLinks} accent={accent} />
            <Col title="Company" links={companyLinks} accent={accent} />
            <Col title="Legal" links={legalLinks} accent={accent} />
            {!showContact && (
              <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
                <div style={{ fontFamily: FONT.mono, fontSize: ".64rem", letterSpacing: ".18em", textTransform: "uppercase", color: accent, marginBottom: 2 }}>
                  Get started
                </div>
                <RegisterButton style={{ padding: ".7em 1.4em", minHeight: 0, fontSize: ".85rem" }}>Register Now</RegisterButton>
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid rgba(127,186,255,.1)",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "8px 24px",
            fontSize: ".78rem",
            color: C.dim,
          }}
        >
          <div>
            © 2026 Skilltimate Technologies. All rights reserved. ·{" "}
            <Link to="/privacy" style={{ color: C.dim }}>Privacy</Link> ·{" "}
            <Link to="/terms" style={{ color: C.dim }}>Terms</Link>
          </div>
          <div>Microsoft, Azure and Copilot are trademarks of Microsoft Corporation.</div>
        </div>
      </div>
    </footer>
  );
}

/** Floating "Register" pill — opens the register popup. */
export function FloatingWA(_props?: { href?: string }) {
  const { open } = useRegister();
  return (
    <button
      type="button"
      onClick={() => open()}
      aria-label="Register your interest"
      className="st-fab-reg"
      style={{
        position: "fixed",
        right: 22,
        bottom: 22,
        zIndex: 90,
        display: "inline-flex",
        alignItems: "center",
        gap: ".55em",
        padding: ".9em 1.4em",
        borderRadius: 100,
        border: "none",
        cursor: "pointer",
        fontFamily: FONT.body,
        fontWeight: 700,
        fontSize: ".9rem",
        background: "linear-gradient(135deg, #25D366, #1EAE55)",
        color: C.ink,
        boxShadow: "0 12px 34px rgba(37,211,102,.42)",
        animation: "st_pulse 2.6s ease-out infinite",
      }}
    >
      Register Now
    </button>
  );
}
