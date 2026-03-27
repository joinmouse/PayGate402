"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const tiers = [
  { name: "Free", price: "$0", period: "forever", desc: "For testing", features: ["1,000 requests / month", "Base Sepolia testnet", "Community support", "Basic analytics"], cta: "Get Started", href: "/docs", highlight: false },
  { name: "Growth", price: "0.5%", period: "per tx", desc: "For production", features: ["Unlimited requests", "Base Mainnet", "Priority support", "Advanced analytics", "Custom pricing", "Webhooks"], cta: "Start Building", href: "/docs", highlight: true },
  { name: "Enterprise", price: "Custom", period: "", desc: "High volume", features: ["Volume discounts", "Multi-chain", "Dedicated facilitator", "SLA guarantee", "White-label SDK", "24/7 support"], cta: "Contact Us", href: "mailto:joinmouse@foxmail.com", highlight: false },
];

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: "clamp(48px, 6vh, 80px) 0" }}>
      <div className="divider" />
      <div className="container-fluid" style={{ paddingTop: "clamp(48px, 6vh, 80px)" }}>
        <p className="label" style={{ textAlign: "center", marginBottom: 12 }}>Pricing</p>
        <h2 className="heading-lg" style={{ textAlign: "center", marginBottom: 8 }}>Simple pricing</h2>
        <p className="text-body" style={{ textAlign: "center", marginBottom: "clamp(40px, 5vh, 64px)" }}>Zero protocol fees. Only network gas (&lt; $0.01 on Base).</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {tiers.map((t, i) => (
            <motion.div key={i} initial={{ opacity: 1 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="card" style={t.highlight ? { borderColor: "var(--accent)" } : {}}>
              {t.highlight && <span className="label" style={{ color: "var(--accent)", display: "block", marginBottom: 12 }}>Popular</span>}
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
              <Link href={t.href} className={t.highlight ? "btn-primary" : "btn-secondary"} style={{ width: "100%" }}>{t.cta}</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
