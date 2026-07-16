# Skilltimate Technologies — Design System (Northstar DS v1.0)

Premium dark-azure conversion system. Faithful reproduction of the source design.
Gold = "act now", azure = "trust", newsprint = "evidence". Education brand (distinct
from Skilltimate Studios lime/black).

## Color tokens
- Surface: ink `#04091A` (base), panel `#0A1428`, panel-2 `#0F1E3A`, footer `#070F22`, news mid `#070F22`
- Brand: azure `#2E8FFF`, azure-soft `#7FBAFF` (labels/links), gold `#E7B94C`, gold-hot `#FFD34D`, red `#FF6B6B` (scarcity only)
- Text: paper `#F2F6FC` (primary), body `#C7D3E6` (article), mute `#8FA3C0` (secondary), footer-dim `#6E819E`
- WhatsApp green `#25D366` on ink text `#04140A`
- Line/border: `rgba(127,186,255,.14)`
- Gold CTA gradient: `linear-gradient(135deg,#FFDE85,#E7B94C 45%,#C98F1E)` text `#171100`
- Course accents: AI-900 `#2E8FFF`, AB-900 `#E7B94C`, AZ-900 `#22C7E6`, DP-900 `#9B7BFF`
- Newsprint: paper `linear-gradient(158deg,#F6EFDB,#ECE0C5 70%,#E2D4B4)`, ink `#241D12`, body `#3A3120`, byline `#6B5B36`, pen red `#C0271B`

## Typography
- Display/headings: **Bricolage Grotesque** 700–800, tight tracking (-0.02 to -0.028em), line 1.02–1.12
- Body: **Inter** 400/500/600/700, 16px base, line 1.6
- Labels/eyebrows/mono: **JetBrains Mono** .58–.74rem UPPERCASE wide tracking (+0.16–0.2em), azure-soft
- Newsprint headlines: **Playfair Display** 800; newsprint body: **Noticia Text** justified
- Load via Google Fonts `<link>` in index.html

## Shape / elevation
- radius: cards 22–24px, chips/pills 100px, cells 10–14px
- card shadow: `0 40px 100px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.05)`
- gold btn shadow: `0 10px 34px rgba(231,185,76,.38)`; WA btn: `0 12px 34px rgba(37,211,102,.34)`

## Components
- Eyebrow: mono uppercase + twinkling 4-point star (gold)
- 4-point star `#lstar` path: `M12 0c.9 7.6 3.9 10.9 12 12-8.1 1.1-11.1 4.4-12 12-.9-7.6-3.9-10.9-12-12C8.1 10.9 11.1 7.6 12 0Z` — the ONLY decorative motif
- Buttons: gold primary (shine sweep) / WhatsApp green / ghost (border, no star)
- Cards: panel gradient, hover translateY(-6/-7px) + accent border
- Countdown cells (gold-hot digits) → next Monday 00:00
- Scarcity seat bar (red gradient), newspaper clippings (torn edge clip-path, tape, pen circle)
- Sticky blurred nav (h64), floating WhatsApp / bottom CTA bar

## Motion
- Scroll reveal: opacity+24px rise, stagger .1s, IntersectionObserver 15%, once
- Count-up stats 1.6s ease-out; star twinkle 2.2–3.4s; gold button shine 3.2s; honor prefers-reduced-motion

## Voice
Confident insider. First-person CTAs ("book my demo"), risk reversal beside CTAs
(free, no card, 30s), specific numbers, attributed stats, one conversion goal (free demo).
Never: gold on non-conversion, competing CTAs, jargon, more than 4 courses.

## Implementation notes
- Inline style objects mirror source for fidelity; shared tokens in `web/lib/theme.ts`.
- Shared building blocks: Star, WhatsAppIcon, Nav, Footer, FloatingWA, useReveal, useCountdown, useCountUp, LeadForm.
- Data-driven: `web/lib/site-data.ts` (courses dataset, landing data) + `web/lib/articles-data.ts` (16 articles).
