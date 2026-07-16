// Northstar DS tokens + shared helpers for Skilltimate Technologies.

export const C = {
  ink: "#04091A",
  panel: "#0A1428",
  panel2: "#0F1E3A",
  footer: "#070F22",
  azure: "#2E8FFF",
  azureSoft: "#7FBAFF",
  gold: "#E7B94C",
  goldHot: "#FFD34D",
  red: "#FF6B6B",
  paper: "#F2F6FC",
  body: "#C7D3E6",
  mute: "#8FA3C0",
  dim: "#6E819E",
  line: "rgba(127,186,255,.14)",
} as const;

export const FONT = {
  display: "'Bricolage Grotesque',sans-serif",
  body: "'Inter',sans-serif",
  mono: "'JetBrains Mono',monospace",
  serif: "'Playfair Display',serif",
  news: "'Noticia Text',serif",
} as const;

// 4-point star — the only decorative motif.
export const STAR_PATH =
  "M12 0c.9 7.6 3.9 10.9 12 12-8.1 1.1-11.1 4.4-12 12-.9-7.6-3.9-10.9-12-12C8.1 10.9 11.1 7.6 12 0Z";
