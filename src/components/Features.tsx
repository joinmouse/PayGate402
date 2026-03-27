"use client";

import { motion } from "framer-motion";
import { Banknote, Fuel, Package, Zap, Bot, Globe2 } from "lucide-react";

const features = [
  {
    icon: Banknote,
    title: "Micropayments from $0.001",
    desc: "Charge per request, per byte, per token. Credit cards can't do this — crypto on L2 can.",
  },
  {
    icon: Fuel,
    title: "Gasless USDC Payments",
    desc: "EIP-3009 transferWithAuthorization. Users only need USDC — zero ETH required.",
  },
  {
    icon: Package,
    title: "One-Line Integration",
    desc: "Add paymentMiddleware() to your Next.js, Express, or Hono server. Ship in minutes.",
  },
  {
    icon: Zap,
    title: "Base L2 Settlement",
    desc: "Sub-cent gas fees, 2-second finality. Powered by Coinbase's Base network.",
  },
  {
    icon: Bot,
    title: "Agent-Native",
    desc: "No accounts, no KYC, no API keys. AI agents pay autonomously with their wallets.",
  },
  {
    icon: Globe2,
    title: "Open Protocol",
    desc: "Built on x402 open standard by Coinbase. Not locked into any vendor. Fully permissionless.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-28 px-6 relative">
      {/* Subtle bg gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-600/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-3"
          >
            Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-[2.75rem] font-bold tracking-tight"
          >
            Everything You Need
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group bg-[#111113] border border-[#1e1e22] rounded-2xl p-6 hover:border-[#2a2a30] transition-all hover:bg-[#141416]"
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-500/[0.07] border border-indigo-500/[0.12] flex items-center justify-center mb-5 group-hover:bg-indigo-500/[0.12] transition-all">
                <f.icon className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-[15px] font-semibold mb-2 group-hover:text-indigo-300 transition-colors">{f.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
