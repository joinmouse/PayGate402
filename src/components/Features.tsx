"use client";
import { useLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

const keys = [
  { t: "feat.1.title" as const, d: "feat.1.desc" as const },
  { t: "feat.2.title" as const, d: "feat.2.desc" as const },
  { t: "feat.3.title" as const, d: "feat.3.desc" as const },
  { t: "feat.4.title" as const, d: "feat.4.desc" as const },
  { t: "feat.5.title" as const, d: "feat.5.desc" as const },
  { t: "feat.6.title" as const, d: "feat.6.desc" as const },
];

export default function Features() {
  const { lang } = useLang();
  return (
    <section id="features" style={{ padding: "clamp(48px, 6vh, 80px) 0" }}>
      <div className="divider" />
      <div className="container-fluid" style={{ paddingTop: "clamp(48px, 6vh, 80px)" }}>
        <p className="label" style={{ textAlign: "center", marginBottom: 12 }}>{tr("feat.label", lang)}</p>
        <h2 className="heading-lg" style={{ textAlign: "center", marginBottom: "clamp(40px, 5vh, 64px)" }}>{tr("feat.title", lang)}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {keys.map((f, i) => (
            <div key={i} className="card">
              <h3 className="heading-md" style={{ marginBottom: 8 }}>{tr(f.t, lang)}</h3>
              <p className="text-small">{tr(f.d, lang)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
