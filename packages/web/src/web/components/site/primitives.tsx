import { useReveal } from "../../hooks/use-site";
import { C, FONT } from "../../lib/theme";
import { Star } from "./icons";
import { useRegister } from "./register-modal";

/**
* Primary CTA — opens the Register popup form. Gold brand fill with a soft light-glow hover.
 */
export function RegisterButton({
  children,
  big = false,
  full = false,
  course,
  style,
}: {
  children?: React.ReactNode;
  big?: boolean;
  full?: boolean;
  course?: string;
  style?: React.CSSProperties;
}) {
  const { open } = useRegister();
  return (
    <button
      type="button"
      onClick={() => open({ course })}
      className="st-cta-reg"
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: ".55em",
        padding: big ? "1.05em 2em" : ".85em 1.6em",
        borderRadius: 100,
        fontWeight: 700,
        fontFamily: FONT.body,
        fontSize: big ? "1rem" : ".92rem",
        minHeight: big ? 52 : 48,
        border: "none",
        cursor: "pointer",
        background: "linear-gradient(135deg, #25D366, #1EAE55)",
        color: C.ink,
        overflow: "visible",
        boxShadow: "0 12px 34px rgba(37,211,102,.32)",
        transition: "transform .18s ease, box-shadow .18s ease",
        width: full ? "100%" : undefined,
        ...style,
      }}
    >
      <span style={{ position: "relative", zIndex: 1, display: "inline-flex", alignItems: "center", gap: ".5em", lineHeight: 1 }}>
        {children ?? "Register Now"}
      </span>
    </button>
  );
}

/** Scroll-reveal wrapper (mirrors data-rv in source). */
export function Reveal({
  delay = 0,
  as = "div",
  className,
  style,
  children,
}: {
  delay?: number;
  as?: "div" | "section" | "article" | "aside" | "span";
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  const { ref, style: rvStyle } = useReveal<HTMLDivElement>(delay);
  const Tag = as as "div";
  return (
    <Tag ref={ref} className={className} style={{ ...style, ...rvStyle }}>
      {children}
    </Tag>
  );
}

/** Mono eyebrow with twinkling star. */
export function Eyebrow({
  children,
  color = C.azureSoft,
  center = false,
  style,
}: {
  children: React.ReactNode;
  color?: string;
  center?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={{
        fontFamily: FONT.mono,
        fontSize: ".7rem",
        letterSpacing: ".2em",
        textTransform: "uppercase",
        color,
        display: "inline-flex",
        alignItems: "center",
        gap: ".7em",
        justifyContent: center ? "center" : undefined,
        ...style,
      }}
    >
      <Star size=".95em" />
      {children}
    </span>
  );
}

/** Ghost / secondary button (renders <a>). */
export function GhostButton({
  href,
  children,
  big = true,
  style,
}: {
  href: string;
  children: React.ReactNode;
  big?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: ".55em",
        padding: big ? "1.05em 1.9em" : ".85em 1.5em",
        borderRadius: 100,
        fontWeight: 700,
        fontSize: "1rem",
        minHeight: big ? 52 : 48,
        background: "rgba(127,186,255,.06)",
        color: C.paper,
        border: `1px solid ${C.line}`,
        ...style,
      }}
    >
      {children}
    </a>
  );
}

export function riskLine(items: string[]) {
  return items;
}

/** "✓ 100% free" microcopy row. */
export function RiskRow({ items, style }: { items: string[]; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        fontSize: ".8rem",
        color: C.mute,
        display: "flex",
        gap: "1.4em",
        flexWrap: "wrap",
        ...style,
      }}
    >
      {items.map((t) => (
        <span key={t}>
          <span style={{ color: C.gold, marginRight: ".5em" }}>✓</span>
          {t}
        </span>
      ))}
    </div>
  );
}
