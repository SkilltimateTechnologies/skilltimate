import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { authClient, getToken, clearToken } from "../lib/auth";
import { C, FONT } from "../lib/theme";

// ---------------- Types ----------------
interface Lead {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  course: string | null;
  message: string | null;
  source: string;
  status: string;
  notes: string | null;
  createdAt: string | number | null;
}

const STATUSES = ["new", "contacted", "converted", "closed"] as const;
const SOURCES = ["register", "enroll", "contact", "demo"] as const;

const STATUS_COLOR: Record<string, string> = {
  new: "#2E8FFF",
  contacted: "#E7B94C",
  converted: "#3ED598",
  closed: "#8FA3C0",
};

const fmtDate = (v: string | number | null) => {
  if (!v) return "—";
  const d = new Date(typeof v === "number" ? v * 1000 : v);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) +
    " · " + d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
};

// ---------------- Shell ----------------
export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!getToken()) { setAuthed(false); return; }
      try {
        const res = await api.admin.me.$get();
        if (!alive) return;
        setAuthed(res.ok);
      } catch {
        if (alive) setAuthed(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  if (authed === null) {
    return (
      <div style={{ ...pageBase, display: "grid", placeItems: "center" }}>
        <div style={{ color: C.mute, fontFamily: FONT.mono, fontSize: ".85rem" }}>Loading…</div>
      </div>
    );
  }
  return authed ? <Dashboard onLogout={() => setAuthed(false)} /> : <Login onLogin={() => setAuthed(true)} />;
}

// ---------------- Login ----------------
function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const { error } = await authClient.signIn.email({ email: email.trim(), password });
      if (error) { setErr("Invalid email or password."); setBusy(false); return; }
      onLogin();
    } catch {
      setErr("Something went wrong. Please try again.");
      setBusy(false);
    }
  };

  return (
    <div style={{ ...pageBase, display: "grid", placeItems: "center", padding: 22 }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <form onSubmit={submit} style={{ background: "linear-gradient(180deg,#0A1428,#0F1E3A)", border: `1px solid ${C.line}`, borderRadius: 18, padding: 26, display: "flex", flexDirection: "column", gap: 14, boxShadow: "0 24px 70px rgba(0,0,0,.45)" }}>
          <img src="/skilltimate-logo.png" alt="Skilltimate" style={{ height: 30, margin: "4px auto 12px" }} />
          <Field label="Email">
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" autoComplete="username" placeholder="you@skilltimate.com" style={inputStyle} />
          </Field>
          <Field label="Password">
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password" placeholder="••••••••" style={inputStyle} />
          </Field>
          {err && <div style={{ fontSize: ".82rem", color: "#FF8080", fontFamily: FONT.mono }}>{err}</div>}
          <button type="submit" disabled={busy} style={{ ...primaryBtn, opacity: busy ? 0.7 : 1, cursor: busy ? "default" : "pointer" }}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------------- Dashboard ----------------
function Dashboard({ onLogout }: { onLogout: () => void }) {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-leads"],
    queryFn: async () => {
      const res = await api.admin.leads.$get();
      if (!res.ok) throw new Error("failed");
      const j = await res.json();
      return j.leads as Lead[];
    },
  });

  const [q, setQ] = useState("");
  const [statusF, setStatusF] = useState("all");
  const [sourceF, setSourceF] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [active, setActive] = useState<Lead | null>(null);

  const patchMut = useMutation({
    mutationFn: async ({ id, status, notes }: { id: number; status?: string; notes?: string }) => {
      const res = await api.admin.leads[":id"].$patch({ param: { id: String(id) }, json: { status, notes } });
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-leads"] }),
  });

  const delMut = useMutation({
    mutationFn: async (id: number) => {
      await api.admin.leads[":id"].$delete({ param: { id: String(id) } });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-leads"] }),
  });

  const leads = data ?? [];

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const fromT = from ? new Date(from + "T00:00:00").getTime() : null;
    const toT = to ? new Date(to + "T23:59:59").getTime() : null;
    return leads.filter((l) => {
      if (statusF !== "all" && l.status !== statusF) return false;
      if (sourceF !== "all" && l.source !== sourceF) return false;
      const t = l.createdAt ? new Date(typeof l.createdAt === "number" ? l.createdAt * 1000 : l.createdAt).getTime() : 0;
      if (fromT && t < fromT) return false;
      if (toT && t > toT) return false;
      if (term) {
        const hay = [l.name, l.email, l.phone, l.course, l.message, l.notes].join(" ").toLowerCase();
        if (!hay.includes(term)) return false;
      }
      return true;
    });
  }, [leads, q, statusF, sourceF, from, to]);

  const stats = useMemo(() => {
    const by = (s: string) => leads.filter((l) => l.status === s).length;
    return { total: leads.length, new: by("new"), contacted: by("contacted"), converted: by("converted") };
  }, [leads]);

  const exportCsv = async () => {
    const res = await fetch("/api/admin/leads/export", { headers: { Authorization: `Bearer ${getToken()}` } });
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "skilltimate-leads.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const logout = async () => {
    try { await authClient.signOut(); } catch { /* ignore */ }
    clearToken();
    onLogout();
  };

  const resetFilters = () => { setQ(""); setStatusF("all"); setSourceF("all"); setFrom(""); setTo(""); };
  const anyFilter = q || statusF !== "all" || sourceF !== "all" || from || to;

  return (
    <div style={pageBase}>
      {/* Top bar */}
      <header style={{ position: "sticky", top: 0, zIndex: 20, backdropFilter: "blur(16px)", background: "rgba(4,9,26,.85)", borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 20px", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src="/skilltimate-logo.png" alt="Skilltimate" style={{ height: 24 }} />
            <span style={{ fontFamily: FONT.mono, fontSize: ".7rem", letterSpacing: ".14em", textTransform: "uppercase", color: C.gold, padding: ".35em .7em", border: `1px solid ${C.line}`, borderRadius: 100 }}>Leads CMS</span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={exportCsv} style={ghostBtn}>Export CSV</button>
            <button onClick={logout} style={{ ...ghostBtn, color: C.mute }}>Sign out</button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "26px 20px 80px" }}>
        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14, marginBottom: 22 }}>
          <StatCard label="Total leads" value={stats.total} accent={C.gold} />
          <StatCard label="New" value={stats.new} accent={STATUS_COLOR.new} />
          <StatCard label="Contacted" value={stats.contacted} accent={STATUS_COLOR.contacted} />
          <StatCard label="Converted" value={stats.converted} accent={STATUS_COLOR.converted} />
        </div>

        <PricingSettings />

        {/* Filters */}
        <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 14, padding: 16, marginBottom: 18, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-end" }}>
          <div style={{ flex: "1 1 220px", display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={labelStyle}>Search</label>
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name, email, phone, course…" style={inputStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={labelStyle}>Status</label>
            <select value={statusF} onChange={(e) => setStatusF(e.target.value)} style={selectStyle}>
              <option value="all">All</option>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={labelStyle}>Source</label>
            <select value={sourceF} onChange={(e) => setSourceF(e.target.value)} style={selectStyle}>
              <option value="all">All</option>
              {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={labelStyle}>From</label>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} style={selectStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <label style={labelStyle}>To</label>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} style={selectStyle} />
          </div>
          {anyFilter && <button onClick={resetFilters} style={{ ...ghostBtn, height: 40 }}>Reset</button>}
        </div>

        {/* Table */}
        <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "12px 16px", borderBottom: `1px solid ${C.line}`, fontFamily: FONT.mono, fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase", color: C.mute }}>
            {filtered.length} {filtered.length === 1 ? "lead" : "leads"}{anyFilter ? " (filtered)" : ""}
          </div>
          {isLoading ? (
            <div style={{ padding: 40, textAlign: "center", color: C.mute, fontFamily: FONT.mono, fontSize: ".85rem" }}>Loading leads…</div>
          ) : filtered.length === 0 ? (
            <div style={{ padding: 48, textAlign: "center", color: C.mute }}>No leads found.</div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".86rem", minWidth: 760 }}>
                <thead>
                  <tr style={{ textAlign: "left", color: C.mute, fontFamily: FONT.mono, fontSize: ".68rem", letterSpacing: ".08em", textTransform: "uppercase" }}>
                    <th style={th}>Name</th>
                    <th style={th}>Contact</th>
                    <th style={th}>Course</th>
                    <th style={th}>Source</th>
                    <th style={th}>Status</th>
                    <th style={th}>Date</th>
                    <th style={th}></th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((l) => (
                    <tr key={l.id} style={{ borderTop: `1px solid ${C.line}`, cursor: "pointer" }} onClick={() => setActive(l)}>
                      <td style={td}>
                        <div style={{ fontWeight: 600 }}>{l.name || "—"}</div>
                        {l.message && <div style={{ color: C.mute, fontSize: ".76rem", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.message}</div>}
                      </td>
                      <td style={td}>
                        <div>{l.phone || "—"}</div>
                        <div style={{ color: C.mute, fontSize: ".76rem" }}>{l.email || ""}</div>
                      </td>
                      <td style={td}>{l.course || "—"}</td>
                      <td style={td}><span style={pill(C.azure)}>{l.source}</span></td>
                      <td style={td} onClick={(e) => e.stopPropagation()}>
                        <select value={l.status} onChange={(e) => patchMut.mutate({ id: l.id, status: e.target.value })} style={{ ...selectStyle, height: 32, fontSize: ".78rem", padding: "0 26px 0 10px", color: STATUS_COLOR[l.status], borderColor: STATUS_COLOR[l.status] + "66" }}>
                          {STATUSES.map((s) => <option key={s} value={s} style={{ color: "#04091A" }}>{s}</option>)}
                        </select>
                      </td>
                      <td style={{ ...td, color: C.mute, fontSize: ".78rem", whiteSpace: "nowrap" }}>{fmtDate(l.createdAt)}</td>
                      <td style={td} onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => { if (confirm("Delete this lead permanently?")) delMut.mutate(l.id); }} style={{ background: "none", border: "none", color: "#FF8080", cursor: "pointer", fontSize: "1rem", padding: 4 }} title="Delete">✕</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {active && (
        <LeadDrawer
          lead={active}
          onClose={() => setActive(null)}
          onSaveNotes={(notes) => patchMut.mutate({ id: active.id, notes })}
          onStatus={(status) => patchMut.mutate({ id: active.id, status })}
          saving={patchMut.isPending}
        />
      )}
    </div>
  );
}

// ---------------- Lead detail drawer ----------------
function LeadDrawer({ lead, onClose, onSaveNotes, onStatus, saving }: {
  lead: Lead;
  onClose: () => void;
  onSaveNotes: (notes: string) => void;
  onStatus: (status: string) => void;
  saving: boolean;
}) {
  const [notes, setNotes] = useState(lead.notes ?? "");
  useEffect(() => { setNotes(lead.notes ?? ""); }, [lead.id, lead.notes]);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(2,5,14,.6)", backdropFilter: "blur(4px)", display: "flex", justifyContent: "flex-end" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "min(440px,100%)", height: "100%", background: "linear-gradient(180deg,#0A1428,#0B1120)", borderLeft: `1px solid ${C.line}`, padding: 26, overflowY: "auto", boxShadow: "-24px 0 70px rgba(0,0,0,.5)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <h2 style={{ fontFamily: FONT.display, fontSize: "1.35rem", fontWeight: 700 }}>{lead.name || "Unnamed lead"}</h2>
            <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
              <span style={pill(C.azure)}>{lead.source}</span>
              <span style={pill(STATUS_COLOR[lead.status])}>{lead.status}</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: C.mute, fontSize: "1.4rem", cursor: "pointer" }}>✕</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 22 }}>
          <DetailRow label="Phone" value={lead.phone} copyable />
          <DetailRow label="Email" value={lead.email} copyable />
          <DetailRow label="Course" value={lead.course} />
          <DetailRow label="Submitted" value={fmtDate(lead.createdAt)} />
          {lead.message && <DetailRow label="Message" value={lead.message} multiline />}
        </div>

        <div style={{ marginBottom: 22 }}>
          <label style={labelStyle}>Status</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            {STATUSES.map((s) => (
              <button key={s} onClick={() => onStatus(s)} style={{
                padding: ".45em 1em", borderRadius: 100, fontSize: ".8rem", fontWeight: 600, cursor: "pointer", fontFamily: FONT.body,
                border: `1px solid ${lead.status === s ? STATUS_COLOR[s] : C.line}`,
                background: lead.status === s ? STATUS_COLOR[s] : "transparent",
                color: lead.status === s ? "#04091A" : C.mute,
              }}>{s}</button>
            ))}
          </div>
        </div>

        <div>
          <label style={labelStyle}>Notes</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={5} placeholder="Add follow-up notes…" style={{ ...inputStyle, marginTop: 8, resize: "vertical", width: "100%" }} />
          <button onClick={() => onSaveNotes(notes)} disabled={saving || notes === (lead.notes ?? "")} style={{ ...primaryBtn, marginTop: 12, opacity: saving || notes === (lead.notes ?? "") ? 0.5 : 1, cursor: saving || notes === (lead.notes ?? "") ? "default" : "pointer" }}>
            {saving ? "Saving…" : "Save notes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------- Small components ----------------
// ---------------- Pricing & offers control ----------------
interface PricingForm {
  currency: string;
  originalPrice: number;
  discountPercent: number;
  gstPercent: number;
  offerEnabled: boolean;
  offerHours: number;
}

function PricingSettings() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<PricingForm | null>(null);
  const [saved, setSaved] = useState(false);

  const { data } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const res = await api.settings.$get();
      if (!res.ok) throw new Error("Failed to load settings");
      return (await res.json()).settings as PricingForm & { dealPrice: number };
    },
  });

  useEffect(() => {
    if (data && !form) {
      setForm({
        currency: data.currency,
        originalPrice: data.originalPrice,
        discountPercent: data.discountPercent,
        gstPercent: data.gstPercent,
        offerEnabled: data.offerEnabled,
        offerHours: data.offerHours,
      });
    }
  }, [data, form]);

  const save = useMutation({
    mutationFn: async (payload: PricingForm) => {
      const res = await api.admin.settings.$put({ json: payload });
      if (!res.ok) throw new Error("Failed to save");
      return (await res.json()).settings;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-settings"] });
      qc.invalidateQueries({ queryKey: ["site-settings"] });
      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    },
  });

  const set = <K extends keyof PricingForm>(k: K, v: PricingForm[K]) =>
    setForm((f) => (f ? { ...f, [k]: v } : f));

  const deal = form
    ? Math.max(0, Math.round(form.originalPrice * (1 - form.discountPercent / 100)))
    : 0;
  const fmt = (n: number) => `${form?.currency ?? "₹"}${n.toLocaleString("en-IN")}`;

  return (
    <div style={{ border: `1px solid ${C.line}`, borderRadius: 16, background: C.panel, marginBottom: 22, overflow: "hidden" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "16px 20px", background: "none", border: "none", cursor: "pointer", color: C.paper, textAlign: "left" }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: FONT.mono, fontSize: ".64rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.gold, padding: ".35em .7em", border: `1px solid ${C.line}`, borderRadius: 100 }}>Pricing &amp; Offers</span>
          <span style={{ color: C.mute, fontSize: ".85rem" }}>
            {form ? <>Now <b style={{ color: C.paper }}>{fmt(deal)}</b> <s style={{ color: C.dim }}>{fmt(form.originalPrice)}</s> + GST · {form.offerEnabled ? "offer live" : "offer off"}</> : "Loading…"}
          </span>
        </span>
        <span style={{ color: C.mute, fontSize: "1rem", transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }}>⌄</span>
      </button>

      {open && form && (
        <div style={{ padding: "4px 20px 22px", borderTop: `1px solid ${C.line}` }}>
          <p style={{ color: C.mute, fontSize: ".82rem", lineHeight: 1.55, margin: "14px 0 18px", maxWidth: "56em" }}>
            Controls the price and limited-time discount shown across the whole website — the urgency bar, hero, course pages, FAQ and terms. The <b style={{ color: C.body }}>deal price is calculated automatically</b> from the original price and discount.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 16 }}>
            <Field label="Currency symbol">
              <input style={inputStyle} value={form.currency} maxLength={4} onChange={(e) => set("currency", e.target.value)} />
            </Field>
            <Field label="Original price (struck)">
              <input style={inputStyle} type="number" min={0} value={form.originalPrice} onChange={(e) => set("originalPrice", Number(e.target.value))} />
            </Field>
            <Field label="Discount %">
              <input style={inputStyle} type="number" min={0} max={100} value={form.discountPercent} onChange={(e) => set("discountPercent", Number(e.target.value))} />
            </Field>
            <Field label="GST %">
              <input style={inputStyle} type="number" min={0} max={100} value={form.gstPercent} onChange={(e) => set("gstPercent", Number(e.target.value))} />
            </Field>
            <Field label="Offer timer (hours)">
              <input style={inputStyle} type="number" min={1} max={720} value={form.offerHours} onChange={(e) => set("offerHours", Number(e.target.value))} />
            </Field>
            <Field label="Limited-time offer">
              <label style={{ display: "flex", alignItems: "center", gap: 10, height: 46, color: C.body, fontSize: ".9rem", cursor: "pointer" }}>
                <input type="checkbox" checked={form.offerEnabled} onChange={(e) => set("offerEnabled", e.target.checked)} style={{ width: 18, height: 18, accentColor: C.gold }} />
                {form.offerEnabled ? "Discount & countdown shown" : "Hidden (full price only)"}
              </label>
            </Field>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", marginTop: 18, paddingTop: 16, borderTop: `1px dashed ${C.line}` }}>
            <div style={{ fontSize: ".9rem", color: C.mute }}>
              Live preview:&nbsp;
              <b style={{ color: C.paper }}>{fmt(deal)}</b>
              <s style={{ color: C.dim, margin: "0 .4em" }}>{fmt(form.originalPrice)}</s>
              <span style={{ color: C.gold, fontWeight: 600 }}>+ GST · {form.discountPercent}% off</span>
            </div>
            <button
              onClick={() => save.mutate(form)}
              disabled={save.isPending}
              style={{ ...primaryBtn, width: "auto", opacity: save.isPending ? 0.7 : 1, cursor: save.isPending ? "default" : "pointer" }}
            >
              {save.isPending ? "Saving…" : saved ? "Saved ✓" : "Save changes"}
            </button>
            {save.isError && <span style={{ color: "#FF8080", fontSize: ".82rem", fontFamily: FONT.mono }}>Save failed. Try again.</span>}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, accent }: { label: string; value: number; accent: string }) {
  return (
    <div style={{ background: C.panel, border: `1px solid ${C.line}`, borderRadius: 14, padding: "18px 18px" }}>
      <div style={{ fontFamily: FONT.display, fontSize: "1.9rem", fontWeight: 700, color: accent, lineHeight: 1 }}>{value}</div>
      <div style={{ color: C.mute, fontSize: ".8rem", marginTop: 6, fontFamily: FONT.mono, letterSpacing: ".06em", textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

function DetailRow({ label, value, multiline, copyable }: { label: string; value: string | null; multiline?: boolean; copyable?: boolean }) {
  return (
    <div>
      <div style={labelStyle}>{label}</div>
      <div style={{ marginTop: 4, fontSize: ".92rem", color: C.paper, whiteSpace: multiline ? "pre-wrap" : "normal", display: "flex", alignItems: "center", gap: 8 }}>
        <span>{value || "—"}</span>
        {copyable && value && <button onClick={() => navigator.clipboard?.writeText(value)} style={{ background: "none", border: `1px solid ${C.line}`, color: C.mute, borderRadius: 6, fontSize: ".65rem", padding: "2px 6px", cursor: "pointer", fontFamily: FONT.mono }}>copy</button>}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

// ---------------- Styles ----------------
const pageBase: React.CSSProperties = { minHeight: "100vh", background: C.ink, color: C.paper, fontFamily: FONT.body };
const labelStyle: React.CSSProperties = { fontFamily: FONT.mono, fontSize: ".64rem", letterSpacing: ".12em", textTransform: "uppercase", color: C.mute };
const inputStyle: React.CSSProperties = { background: C.ink, border: `1px solid rgba(127,186,255,.18)`, borderRadius: 10, padding: "12px 14px", color: C.paper, fontSize: ".92rem", fontFamily: FONT.body, outline: "none", width: "100%", boxSizing: "border-box" };
const selectStyle: React.CSSProperties = { background: C.ink, border: `1px solid rgba(127,186,255,.18)`, borderRadius: 10, padding: "0 12px", height: 40, color: C.paper, fontSize: ".86rem", fontFamily: FONT.body, outline: "none" };
const primaryBtn: React.CSSProperties = { border: "none", borderRadius: 100, padding: "0.95em 1.6em", minHeight: 48, fontWeight: 700, fontSize: ".95rem", fontFamily: FONT.body, background: `linear-gradient(135deg,${C.gold},${C.goldHot})`, color: "#04091A", width: "100%" };
const ghostBtn: React.CSSProperties = { border: `1px solid ${C.line}`, borderRadius: 100, padding: "0 1.1em", height: 38, background: "transparent", color: C.paper, fontSize: ".82rem", fontFamily: FONT.body, cursor: "pointer", fontWeight: 600 };
const th: React.CSSProperties = { padding: "12px 16px", fontWeight: 600 };
const td: React.CSSProperties = { padding: "12px 16px", verticalAlign: "top" };
const pill = (color: string): React.CSSProperties => ({ display: "inline-block", padding: ".25em .7em", borderRadius: 100, fontSize: ".7rem", fontWeight: 600, fontFamily: FONT.mono, letterSpacing: ".04em", color, background: color + "22", border: `1px solid ${color}44`, textTransform: "capitalize" });
