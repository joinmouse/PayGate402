"use client";

import { motion } from "framer-motion";

const features = [
  { title: "Micropayments", desc: "Charge from $0.001 per request. Impossible with credit cards, trivial on L2." },
  { title: "Gasless USDC", desc: "EIP-3009 authorization. Users only need USDC — zero ETH required for gas." },
  { title: "One-line setup", desc: "Add paymentMiddleware() to your Next.js, Express, or Hono server. Done." },
  { title: "Base settlement", desc: "Sub-cent gas fees. 2-second finality. Powered by Coinbase's Base network." },
  { title: "Agent-native", desc: "No accounts, no KYC, no API keys. AI agents pay with their own wallets." },
  { title: "Open standard", desc: "Built on x402 by Coinbase. Not locked into any vendor. Fully permissionless." },
];

export default function Features() {
  return (
    <section id="features" className="py-16 md:py-24 px-[6%] border-t border-white/[0.04]">
      <div className="mx-auto max-w-[1400px]">
        <div className="text-center mb-16">
          <p className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-zinc-500 mb-3">Features</p>
          <h2 className="text-[clamp(1.5rem,3vw,2.75rem)] font-bold tracking-tight">Everything you need</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="bg-[#111113] border border-white/[0.06] rounded-2xl p-5 md:p-6 hover:border-white/[0.1] transition-colors"
            >
              <h3 className="text-[0.9375rem] font-semibold mb-2">{f.title}</h3>
              <p className="text-[0.8125rem] text-zinc-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
