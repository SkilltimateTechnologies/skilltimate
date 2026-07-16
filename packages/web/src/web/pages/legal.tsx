import { Link } from "wouter";
import { C, FONT } from "../lib/theme";
import { Nav } from "../components/site/nav";
import { Footer, FloatingWA } from "../components/site/footer";
import { usePricing } from "../hooks/use-pricing";
import { usePageSeo } from "../lib/seo-config";

const NAV_LINKS = [
  { label: "Courses", href: "/#tracks" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
];

interface Sec { h: string; body: string }

const PRIVACY: Sec[] = [
  { h: "1. Introduction", body: 'Skilltimate Technologies ("Skilltimate", "we", "us") respects your privacy. This policy explains what personal information we collect when you use our website and certification courses, how we use it, and the choices you have.' },
  { h: "2. Information we collect", body: "• Details you give us — your name, phone number and email when you register your interest or contact us, and any information you include in your message.\n• Course activity — if you enroll, basic records of your progress and mock-test attempts.\n• Usage data — standard technical information such as browser type and pages visited, used to improve the site." },
  { h: "3. How we use your information", body: "We use your information to respond to enquiries, deliver and support your course, process enrollment, and improve our content and service. We do not sell your personal information." },
  { h: "4. Third-party services", body: "We may use trusted third-party providers for hosting, payments and communication; each processes data under their respective policies." },
  { h: "5. Cookies", body: "Our site may use cookies and similar technologies to remember preferences and understand usage. You can control cookies through your browser settings." },
  { h: "6. Data retention", body: "We keep personal information only as long as needed for the purposes described here, or as required by law." },
  { h: "7. Your rights", body: "You may request access to, correction of, or deletion of your personal information. To make a request, contact us using the details below." },
  { h: "8. Contact us", body: "Questions about this policy? Email hello@skilltimate.com or use the contact form on our site." },
];

const termsFor = (P: ReturnType<typeof usePricing>): Sec[] => [
  { h: "1. Agreement", body: "By using the Skilltimate website or enrolling in a course, you agree to these Terms & Conditions. If you do not agree, please do not use our services." },
  { h: "2. Courses and access", body: "On enrollment you receive access to the self-paced course materials and mock tests for the certification you purchased. Access is for your personal use only and may not be shared or resold." },
  { h: "3. Pricing and payment", body: `Course fees are ${P.deal} + GST per track (a limited-time ${P.discountPercent}% discount off the standard ${P.orig}) unless stated otherwise, payable at enrollment. Promotional discounts are time-limited and may be withdrawn or changed at any time; the price shown at the time of your purchase applies. Fees cover the Skilltimate course only, not the official Microsoft exam fee.` },
  { h: ' 4. The "until you pass" access', body: "If you do not clear your certification on the first attempt, we continue to provide course access and unlimited mock tests at no extra charge, subject to your reasonable and genuine effort to complete the course. This is continued access, not a monetary refund or a guarantee of a passing result." },
  { h: "5. Exam disclaimer", body: "Skilltimate is an independent training provider. Microsoft exams are administered by Microsoft and its partners. We prepare you thoroughly, but we do not administer the exam and cannot guarantee any individual result. Microsoft, Azure and Copilot are trademarks of Microsoft Corporation; we are not affiliated with or endorsed by Microsoft." },
  { h: "6. Acceptable use", body: "You agree not to copy, record, redistribute or publicly share our lessons, mock tests or materials. We may suspend access for misuse." },
  { h: "7. Intellectual property", body: "All course content, mock tests and site materials are the property of Skilltimate and protected by applicable laws. Your enrollment grants a personal, non-transferable licence to use them." },
  { h: "8. Limitation of liability", body: "To the extent permitted by law, Skilltimate is not liable for indirect or consequential losses arising from use of our services. Our total liability is limited to the fees you paid for the relevant course." },
  { h: "9. Changes to these terms", body: "We may update these terms from time to time. Continued use of our services after changes take effect constitutes acceptance of the revised terms." },
  { h: "10. Contact", body: "Questions about these terms? Email hello@skilltimate.com or use the contact form on our site." },
];

export default function Legal({ kind }: { kind: "privacy" | "terms" }) {
  usePageSeo(kind === "privacy" ? "/privacy" : "/terms");
  const P = usePricing();
  const title = kind === "privacy" ? "Privacy Policy" : "Terms & Conditions";
  const secs = kind === "privacy" ? PRIVACY : termsFor(P);

  return (
    <div style={{ overflowX: "clip", minHeight: "100vh" }}>
      <Nav links={NAV_LINKS} />

      <div className="wrap-cp" style={{ maxWidth: 820, padding: "56px 22px 60px" }}>
        <div style={{ fontFamily: FONT.mono, fontSize: ".72rem", color: C.mute, marginBottom: 22 }}>
          <Link to="/" style={{ color: C.mute }}>Home</Link> <span style={{ opacity: 0.5 }}>/</span> <span style={{ color: C.azureSoft }}>{title}</span>
        </div>
        <h1 style={{ fontFamily: FONT.display, fontSize: "clamp(1.9rem,4vw,2.8rem)", fontWeight: 700, letterSpacing: "-.024em", marginBottom: 10 }}>{title}</h1>
        <div style={{ fontFamily: FONT.mono, fontSize: ".74rem", color: C.mute, marginBottom: 16 }}>Last updated: 1 July 2026</div>
        <p style={{ color: C.mute, fontSize: ".9rem", lineHeight: 1.6, fontStyle: "italic", marginBottom: 34, padding: "14px 18px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 12 }}>
          This is a starter template to make the site complete. Have it reviewed by a legal advisor and tailored to your actual {kind === "privacy" ? "data practices" : "business terms"} before you publish.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          {secs.map((s) => (
            <div key={s.h}>
              <h2 style={{ fontFamily: FONT.display, fontSize: "1.2rem", fontWeight: 600, marginBottom: 10 }}>{s.h.trim()}</h2>
              <p style={{ color: C.body, fontSize: "1rem", lineHeight: 1.75, whiteSpace: "pre-line" }}>{s.body}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer showContact />
      <FloatingWA />
    </div>
  );
}
