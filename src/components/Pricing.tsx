"use client";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

export default function Pricing() {
  const { lang } = useLang();
  const tiers = [
    { name: tr("price.free", lang), price: "$0", period: lang === "en" ? "forever" : "永久", desc: tr("price.free.desc", lang), features: lang === "en" ? ["1,000 requests / month","Base Sepolia testnet","Community support","Basic analytics"] : ["每月 1,000 次请求","Base Sepolia 测试网","社区支持","基础分析"], cta: tr("price.cta.start", lang), href: "/docs", hl: false },
    { name: tr("price.growth", lang), price: "0.5%", period: lang === "en" ? "per tx" : "每笔", desc: tr("price.growth.desc", lang), features: lang === "en" ? ["Unlimited requests","Base Mainnet","Priority support","Advanced analytics","Custom pricing","Webhooks"] : ["无限请求","Base 主网","优先支持","高级分析","自定义定价","Webhook 通知"], cta: tr("price.cta.build", lang), href: "/docs", hl: true },
    { name: tr("price.enterprise", lang), price: lang === "en" ? "Custom" : "定制", period: "", desc: tr("price.enterprise.desc", lang), features: lang === "en" ? ["Volume discounts","Multi-chain","Dedicated facilitator","SLA guarantee","White-label SDK","24/7 support"] : ["批量折扣","多链支持","专属 Facilitator","SLA 保障","白标 SDK","7×24 支持"], cta: tr("price.cta.contact", lang), href: "mailto:joinmouse@foxmail.com", hl: false },
  ];

  return (
    <section id="pricing" style={{ padding: "clamp(48px, 6vh, 80px) 0" }}>
      <div className="divider" />
      <div className="container-fluid" style={{ paddingTop: "clamp(48px, 6vh, 80px)" }}>
        <p className="label" style={{ textAlign: "center", marginBottom: 12 }}>{tr("price.label", lang)}</p>
        <h2 className="heading-lg" style={{ textAlign: "center", marginBottom: 8 }}>{tr("price.title", lang)}</h2>
        <p className="text-body" style={{ textAlign: "center", marginBottom: "clamp(40px, 5vh, 64px)" }}>{tr("price.desc", lang)}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {tiers.map((t, i) => (
            <div key={i} className="card" style={t.hl ? { borderColor: "var(--accent)" } : {}}>
              {t.hl && <span className="label" style={{ color: "var(--accent)", display: "block", marginBottom: 12 }}>{tr("price.popular", lang)}</span>}
              <h3 className="heading-md" style={{ marginBottom: 4 }}>{t.name}</h3>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 28, fontWeight: 700, color: "var(--text-1)", letterSpacing: "-0.02em" }}>{t.price}</span>
                {t.period && <span className="text-small">{t.period}</span>}
              </div>
              <p className="text-small" style={{ marginBottom: 24 }}>{t.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: 28 }}>
                {t.features.map((f, j) => (
                  <li key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--text-2)", padding: "5px 0" }}>
                    <span style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--text-4)", flexShrink: 0 }} />{f}
                  </li>
                ))}
              </ul>
              <Link href={t.href} className={t.hl ? "btn-primary" : "btn-secondary"} style={{ width: "100%" }}>{t.cta}</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
