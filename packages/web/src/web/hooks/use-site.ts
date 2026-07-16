import { useEffect, useRef, useState } from "react";

const prefersReduced = () =>
  typeof matchMedia !== "undefined" &&
  matchMedia("(prefers-reduced-motion:reduce)").matches;

/** Scroll reveal — fade + rise once in view. Returns a ref + style. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(delay = 0) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (prefersReduced()) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const style: React.CSSProperties = {
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : "translateY(26px)",
    transition: `opacity .7s cubic-bezier(.2,.7,.3,1) ${delay * 0.1}s, transform .7s cubic-bezier(.2,.7,.3,1) ${delay * 0.1}s`,
  };
  return { ref, style };
}

/** Count-up from 0 to `to` when in view. */
export function useCountUp(to: number, dur = 1600) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) {
      setVal(to);
      return;
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          const t0 = performance.now();
          const step = (t: number) => {
            const p = Math.min((t - t0) / dur, 1);
            setVal(Math.floor(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          io.unobserve(e.target);
        }),
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, dur]);
  return { ref, val };
}

export interface Countdown {
  d: number;
  h: number;
  m: number;
  s: number;
}
const pad = (x: number) => String(x).padStart(2, "0");
export const cpad = pad;

function nextMonday() {
  const n = new Date();
  const d = new Date(n);
  d.setDate(n.getDate() + ((8 - n.getDay()) % 7 || 7));
  d.setHours(0, 0, 0, 0);
  return d;
}

/** Live countdown to next Monday 00:00. */
export function useCountdown(): Countdown {
  const target = useRef(nextMonday());
  const [cd, setCd] = useState<Countdown>({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      let ms = target.current.getTime() - Date.now();
      if (ms < 0) ms = 0;
      setCd({
        d: Math.floor(ms / 864e5),
        h: Math.floor(ms / 36e5) % 24,
        m: Math.floor(ms / 6e4) % 60,
        s: Math.floor(ms / 1e3) % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return cd;
}

/**
 * Evergreen offer-expiry countdown. Each visitor gets a personal deadline
 * `hours` from their first visit, persisted in localStorage so it keeps
 * ticking across page loads. When it runs out it silently renews.
 */
export function useOfferExpiry(hours = 48): Countdown {
  const KEY = "st_offer_deadline";
  const deadline = useRef(0);
  const [cd, setCd] = useState<Countdown>({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const now = Date.now();
    const span = hours * 36e5;
    let end = 0;
    try {
      end = Number(localStorage.getItem(KEY)) || 0;
    } catch {
      end = 0;
    }
    if (!end || end - now <= 0) {
      end = now + span;
      try {
        localStorage.setItem(KEY, String(end));
      } catch {
        /* ignore */
      }
    }
    deadline.current = end;

    const tick = () => {
      let ms = deadline.current - Date.now();
      if (ms <= 0) {
        const next = Date.now() + span;
        deadline.current = next;
        try {
          localStorage.setItem(KEY, String(next));
        } catch {
          /* ignore */
        }
        ms = span;
      }
      setCd({
        d: Math.floor(ms / 864e5),
        h: Math.floor(ms / 36e5) % 24,
        m: Math.floor(ms / 6e4) % 60,
        s: Math.floor(ms / 1e3) % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [hours]);

  return cd;
}
