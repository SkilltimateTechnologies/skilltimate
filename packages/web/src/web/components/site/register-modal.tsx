// Register popup form — global modal opened by any "Register" button across the
// site. Captures Full Name, Contact Number, Email and Additional Details, then
// saves the lead to the DB (visible in the /admin leads CMS).

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import { C, FONT, STAR_PATH } from "../../lib/theme";
import { useSubmitLead } from "../../lib/use-lead";

interface RegisterCtx {
  open: (opts?: { course?: string }) => void;
}
const Ctx = createContext<RegisterCtx>({ open: () => {} });

export function useRegister() {
  return useContext(Ctx);
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(127,186,255,.05)",
  border: `1px solid ${C.line}`,
  borderRadius: 12,
  padding: ".85em 1em",
  color: C.paper,
  fontFamily: FONT.body,
  fontSize: ".95rem",
  outline: "none",
  transition: "border-color .2s, box-shadow .2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  marginBottom: 7,
  fontFamily: FONT.mono,
  fontSize: ".64rem",
  letterSpacing: ".13em",
  textTransform: "uppercase",
  color: C.mute,
};

export function RegisterProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [course, setCourse] = useState<string | undefined>(undefined);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [err, setErr] = useState<string | null>(null);
  const submit = useSubmitLead();
  const firstRef = useRef<HTMLInputElement>(null);

  const open = useCallback((opts?: { course?: string }) => {
    setCourse(opts?.course);
    setDone(false);
    setErr(null);
    setForm({ name: "", phone: "", email: "", message: "" });
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstRef.current?.focus(), 120);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [isOpen, close]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!form.name.trim()) return setErr("Please enter your full name.");
    if (!form.phone.trim()) return setErr("Please enter your contact number.");
    if (!form.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email))
      return setErr("Please enter a valid email address.");
    try {
      await submit.mutateAsync({
        name: form.name,
        phone: form.phone,
        email: form.email,
        message: form.message,
        course,
        source: "register",
      });
      setDone(true);
    } catch {
      setErr("Something went wrong. Please try again.");
    }
  }

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              background: "rgba(2,6,16,.72)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 480,
                background: `linear-gradient(180deg, ${C.panel2}, ${C.panel})`,
                border: `1px solid ${C.line}`,
                borderRadius: 22,
                boxShadow: "0 40px 120px rgba(0,0,0,.6), 0 0 0 1px rgba(231,185,76,.08)",
                overflow: "hidden",
              }}
            >
              {/* gold top glow */}
              <div
                style={{
                  position: "absolute",
                  top: -80,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 320,
                  height: 160,
                  background: `radial-gradient(ellipse at center, rgba(231,185,76,.22), transparent 70%)`,
                  pointerEvents: "none",
                }}
              />
              <button
                onClick={close}
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  border: `1px solid ${C.line}`,
                  background: "rgba(127,186,255,.06)",
                  color: C.mute,
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  lineHeight: 1,
                  display: "grid",
                  placeItems: "center",
                }}
              >
                ×
              </button>

              <div style={{ padding: "34px 30px 30px" }}>
                {done ? (
                  <div style={{ textAlign: "center", padding: "20px 0 8px" }}>
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      style={{
                        width: 64,
                        height: 64,
                        margin: "0 auto 18px",
                        borderRadius: "50%",
                        display: "grid",
                        placeItems: "center",
                        background: "rgba(231,185,76,.14)",
                        border: `1px solid ${C.gold}`,
                      }}
                    >
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 13l4 4L19 7"
                          stroke={C.gold}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                    <h3
                      style={{
                        fontFamily: FONT.display,
                        fontWeight: 700,
                        fontSize: "1.5rem",
                        color: C.paper,
                        margin: "0 0 10px",
                      }}
                    >
                      You&apos;re registered!
                    </h3>
                    <p style={{ color: C.body, fontSize: ".95rem", lineHeight: 1.6, margin: "0 0 24px" }}>
                      Thanks, {form.name.split(" ")[0]}. Our team will reach out to you shortly with
                      the next steps and a personalised roadmap.
                    </p>
                    <button
                      onClick={close}
                      style={{
                        padding: ".85em 2em",
                        borderRadius: 100,
                        border: "none",
                        background: C.gold,
                        color: C.ink,
                        fontWeight: 700,
                        fontFamily: FONT.body,
                        fontSize: ".95rem",
                        cursor: "pointer",
                      }}
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill={C.gold}>
                        <path d={STAR_PATH} />
                      </svg>
                      <span
                        style={{
                          fontFamily: FONT.mono,
                          fontSize: ".62rem",
                          letterSpacing: ".18em",
                          textTransform: "uppercase",
                          color: C.gold,
                        }}
                      >
                        Register your interest
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: FONT.display,
                        fontWeight: 700,
                        fontSize: "1.55rem",
                        lineHeight: 1.15,
                        color: C.paper,
                        margin: "0 0 6px",
                      }}
                    >
                      Start your certification journey
                    </h3>
                    <p style={{ color: C.mute, fontSize: ".9rem", lineHeight: 1.55, margin: "0 0 22px" }}>
                      {course
                        ? `Register for ${course.toUpperCase()} and we'll get in touch with the details.`
                        : "Fill in your details and our team will reach out with course details and the next batch."}
                    </p>

                    <form onSubmit={onSubmit} style={{ display: "grid", gap: 16 }}>
                      <div>
                        <label style={labelStyle}>Full Name *</label>
                        <input
                          ref={firstRef}
                          style={inputStyle}
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          placeholder="e.g. Priya Sharma"
                          onFocus={(e) => (e.target.style.borderColor = C.gold)}
                          onBlur={(e) => (e.target.style.borderColor = C.line)}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Contact Number *</label>
                        <input
                          style={inputStyle}
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          placeholder="e.g. +91 98765 43210"
                          inputMode="tel"
                          onFocus={(e) => (e.target.style.borderColor = C.gold)}
                          onBlur={(e) => (e.target.style.borderColor = C.line)}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Email ID *</label>
                        <input
                          style={inputStyle}
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          placeholder="you@example.com"
                          inputMode="email"
                          onFocus={(e) => (e.target.style.borderColor = C.gold)}
                          onBlur={(e) => (e.target.style.borderColor = C.line)}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Additional Details</label>
                        <textarea
                          style={{ ...inputStyle, minHeight: 84, resize: "vertical" }}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          placeholder="Tell us which certification you're interested in, your background, or any questions."
                          onFocus={(e) => (e.target.style.borderColor = C.gold)}
                          onBlur={(e) => (e.target.style.borderColor = C.line)}
                        />
                      </div>

                      {err && (
                        <div style={{ color: C.red, fontSize: ".82rem", fontWeight: 500 }}>{err}</div>
                      )}

                      <button
                        type="submit"
                        disabled={submit.isPending}
                        style={{
                          width: "100%",
                          padding: "1em",
                          borderRadius: 100,
                          border: "none",
                          background: "linear-gradient(135deg,#25D366,#1EAE55)",
                          color: C.ink,
                          fontWeight: 700,
                          fontFamily: FONT.body,
                          fontSize: "1rem",
                          cursor: submit.isPending ? "wait" : "pointer",
                          boxShadow: "0 12px 34px rgba(37,211,102,.28)",
                          opacity: submit.isPending ? 0.7 : 1,
                          transition: "transform .15s, opacity .2s",
                        }}
                      >
                        {submit.isPending ? "Submitting…" : "Register Now"}
                      </button>
                      <p style={{ textAlign: "center", fontSize: ".72rem", color: C.dim, margin: 0 }}>
                        No payment required. We&apos;ll never share your details.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}
