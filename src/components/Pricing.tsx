"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const tiers = [
  {
    name: "Free", price: "$0", period: "forever", desc: "For testing",
    features: ["1,000 requests/mo", "Base Sepolia testnet", "Community support"],
    cta: "Get Started", href: "/docs", highlight: false,
  },
  {
    name: "Growth", price: "0.5%", period: "per tx", desc: "For production",
    features: ["Unlimited requests", "Base Mainnet", "Priority support", "Advanced analytics", "Custom pricing", "Webhooks"],
    cta: "Start Building", href: "/docs", highlight: true,
  },
  {
    name: "Enterprise", price: "Custom", period: "", desc: "High volume",
    features: ["Volume discounts", "Multi-chain", "Dedicated facilitator", "SLA guarantee", "White-label SDK"],
    cta: "Contact Us", href: "mailto:joinmouse@foxmail.com", highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-28 px-6 border-t border-white/[0.04]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-500 mb-3">Pricing</p>
          <h2 className="text-2xl md:text-[2.5rem] font-bold tracking-tight mb-3">Simple pricing</h2>
          <p className="text-[15px] text-zinc-500">Zero protocol fees. Only network gas (&lt; $0.01 on Base).</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          {tiers.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`p-6 md:p-8 ${t.highlight ? "bg-[#0d0d10]" : "bg-[#09090b]"}`}
            >
              {t.highlight && <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-indigo-400 block mb-3">Popular</span>}
              <h3 className="text-base font-semibold mb-1">{t.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-2xl font-bold tracking-tight">{t.price}</span>
                {t.period && <span className="text-[13px] text-zinc-500">{t.period}</span>}
              </div>
              <p className="text-[13px] text-zinc-500 mb-6">{t.desc}</p>

              <ul className="space-y-2.5 mb-8">
                {t.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-[13px] text-zinc-400">
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
