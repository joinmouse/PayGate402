"use client";

import { motion } from "framer-motion";

const features = [
  { title: "Micropayments", desc: "Charge from $0.001 per request. Impossible with credit cards, trivial on L2." },
  { title: "Gasless USDC", desc: "EIP-3009 authorization. Users only need USDC — zero ETH required for gas." },
  { title: "One-line setup", desc: "Add paymentMiddleware() to your Next.js, Express, or Hono server." },
  { title: "Base settlement", desc: "Sub-cent gas fees. 2-second finality. Powered by Coinbase." },
  { title: "Agent-native", desc: "No accounts, no KYC, no API keys. AI agents pay with their wallets." },
  { title: "Open standard", desc: "Built on x402 by Coinbase. Not locked into any vendor." },
];

export default function Features() {
  return (
    <section id="features" className="py-20 md:py-28 px-6 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-500 mb-3">Features</p>
          <h2 className="text-2xl md:text-[2.5rem] font-bold tracking-tight">Everything you need</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.04] rounded-2xl overflow-hidden">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="bg-[#09090b] p-6 md:p-8"
            >
              <h3 className="text-[15px] font-semibold mb-2">{f.title}</h3>
              <p className="text-[13px] text-zinc-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
