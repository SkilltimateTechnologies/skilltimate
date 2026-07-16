import { Link } from "wouter";
import { C } from "../../lib/theme";
import { RegisterButton } from "./primitives";

export interface NavLink {
  label: string;
  href: string;
}

function NavItem({ link }: { link: NavLink }) {
  const isRoute = link.href.startsWith("/");
  if (isRoute) {
    return (
      <Link to={link.href} className="st-navlink" style={{ color: C.mute }}>
        {link.label}
      </Link>
    );
  }
  return (
    <a href={link.href} className="st-navlink" style={{ color: C.mute }}>
      {link.label}
    </a>
  );
}

export function Nav({ links }: { links: NavLink[] }) {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 60,
        backdropFilter: "blur(16px)",
        background: "rgba(4,9,26,.85)",
        borderBottom: `1px solid ${C.line}`,
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "0 22px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
          gap: 20,
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center", flex: "none" }}>
          <img
            src="/skilltimate-logo.png"
            alt="Skilltimate"
            style={{ height: 30, width: "auto", display: "block", imageRendering: "auto" }}
          />
        </Link>
        <div
          className="st-navlinks-desktop"
          style={{ display: "flex", gap: "2rem", fontSize: ".9rem", alignItems: "center" }}
        >
          {links.map((l) => (
            <NavItem key={l.label} link={l} />
          ))}
        </div>
        <RegisterButton style={{ flex: "none", padding: ".6em 1.3em", minHeight: 40, fontSize: ".85rem" }}>
          Register Now
        </RegisterButton>
      </div>
    </nav>
  );
}
