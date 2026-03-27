"use client";
import { useLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

const stepKeys = [
  { t: "how.s1.title" as const, d: "how.s1.desc" as const, tag: "GET /api/weather" },
  { t: "how.s2.title" as const, d: "how.s2.desc" as const, tag: "402 Payment Required" },
  { t: "how.s3.title" as const, d: "how.s3.desc" as const, tag: "X-Payment: 0x..." },
  { t: "how.s4.title" as const, d: "how.s4.desc" as const, tag: "200 OK" },
];

export default function HowItWorks() {
  const { lang } = useLang();
  return (
    <section id="how-it-works" style={{ padding: "clamp(48px, 6vh, 80px) 0" }}>
      <div className="divider" />
      <div className="container-fluid" style={{ paddingTop: "clamp(48px, 6vh, 80px)" }}>
        <p className="label" style={{ textAlign: "center", marginBottom: 12 }}>{tr("how.label", lang)}</p>
        <h2 className="heading-lg" style={{ textAlign: "center", marginBottom: "clamp(40px, 5vh, 64px)" }}>{tr("how.title", lang)}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {stepKeys.map((s, i) => (
            <div key={i} className="card">
              <span className="label" style={{ display: "block", marginBottom: 16 }}>0{i + 1}</span>
              <h3 className="heading-md" style={{ marginBottom: 8 }}>{tr(s.t, lang)}</h3>
              <p className="text-small" style={{ marginBottom: 16 }}>{tr(s.d, lang)}</p>
              <span className="tag">{s.tag}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
