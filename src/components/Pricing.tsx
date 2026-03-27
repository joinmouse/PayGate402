"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Perfect for testing and prototyping",
    features: [
      "1,000 requests / month",
      "Base Sepolia testnet",
      "Community support",
      "Basic analytics",
    ],
    cta: "Get Started",
    href: "/docs",
    highlight: false,
  },
  {
    name: "Growth",
    price: "0.5%",
    period: "per transaction",
    desc: "For production APIs and services",
    features: [
      "Unlimited requests",
      "Base Mainnet",
      "Priority support",
      "Advanced analytics",
      "Custom pricing rules",
      "Webhook notifications",
    ],
    cta: "Start Building",
    href: "/docs",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For high-volume API providers",
    features: [
      "Volume discounts",
      "Multi-chain support",
      "Dedicated facilitator",
      "SLA guarantee",
      "White-label SDK",
      "24/7 support",
    ],
    cta: "Contact Us",
    href: "mailto:joinmouse@foxmail.com",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-3"
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-[2.75rem] font-bold tracking-tight mb-4"
          >
            Simple, Transparent Pricing
          </motion.h2>
          <p className="text-zinc-500 text-lg">Zero protocol fees. You only pay network gas (&lt; $0.01 on Base).</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl p-7 border transition-all ${
                tier.highlight
                  ? "bg-indigo-600/[0.06] border-indigo-500/30 shadow-xl shadow-indigo-600/[0.06] gradient-border"
                  : "bg-[#111113] border-[#1e1e22] hover:border-[#2a2a30]"
              }`}
            >
              {tier.highlight && (
                <span className="inline-block text-[11px] font-semibold text-indigo-400 uppercase tracking-widest mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="text-lg font-bold mb-1">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold tracking-tight">{tier.price}</span>
                {tier.period && <span className="text-sm text-zinc-500">{tier.period}</span>}
              </div>
              <p className="text-sm text-zinc-500 mb-6">{tier.desc}</p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-[13px] text-zinc-400">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`block text-center py-3 rounded-xl text-sm font-medium transition-all ${
                  tier.highlight
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20"
                    : "bg-white/[0.05] hover:bg-white/[0.08] text-white border border-white/[0.06]"
                }`}
              >
                {tier.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
