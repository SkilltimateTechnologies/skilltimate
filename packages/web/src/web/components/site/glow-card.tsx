// Premium GlowCard — light follows the cursor and a soft border light traces
// the edge on hover. Purely presentational; wraps any content.

import { useRef, type CSSProperties, type ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "article" | "section";
}

export function GlowCard({ children, className = "", style, as = "div" }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--st-mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--st-my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const Tag = as as "div";
  return (
    <Tag ref={ref} className={`st-glow ${className}`} style={style} onMouseMove={onMove}>
      {children}
    </Tag>
  );
}
