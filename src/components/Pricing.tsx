"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const tiers = [
  {
    name: "Free", price: "$0", period: "forever", desc: "For testing and prototyping",
    features: ["1,000 requests / month", "Base Sepolia testnet", "Community support", "Basic analytics"],
    cta: "Get Started", href: "/docs", highlight: false,
  },
  {
    name: "Growth", price: "0.5%", period: "per transaction", desc: "For production APIs and services",
    features: ["Unlimited requests", "Base Mainnet", "Priority support", "Advanced analytics", "Custom pricing rules", "Webhook notifications"],
    cta: "Start Building", href: "/docs", highlight: true,
  },
  {
    name: "Enterprise", price: "Custom", period: "", desc: "For high-volume API providers",
    features: ["Volume discounts", "Multi-chain support", "Dedicated facilitator", "SLA guarantee", "White-label SDK", "24/7 support"],
    cta: "Contact Us", href: "mailto:joinmouse@foxmail.com", highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 px-6 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-500 mb-3">Pricing</p>
          <h2 className="text-2xl md:text-[2.5rem] font-bold tracking-tight mb-3">Simple pricing</h2>
          <p className="text-[15px] text-zinc-500">Zero protocol fees. Only network gas (&lt; $0.01 on Base).</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {tiers.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-2xl border p-7 transition-colors ${
                t.highlight
                  ? "bg-[#111113] border-indigo-500/20"
                  : "bg-[#111113] border-white/[0.06] hover:border-white/[0.1]"
              }`}
            >
              {t.highlight && <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-indigo-400 block mb-3">Popular</span>}
              <h3 className="text-base font-semibold mb-1">{t.name}</h3>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-2xl font-bold tracking-tight">{t.price}</span>
                {t.period && <span className="text-[13px] text-zinc-500">{t.period}</span>}
              </div>
              <p className="text-[13px] text-zinc-500 mb-6">{t.desc}</p>

              <ul className="space-y-2.5 mb-8">
                {t.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-[13px] text-zinc-400">
                    <span className="w-1 h-1 rounded-full bg-zinc-600 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={t.href}
                className={`block text-center py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                  t.highlight
                    ? "bg-white text-black hover:bg-zinc-200"
                    : "bg-white/[0.04] text-zinc-300 hover:bg-white/[0.07] border border-white/[0.06]"
                }`}
              >
                {t.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
