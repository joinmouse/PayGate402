"use client";

import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Request API", desc: "Agent sends a standard HTTP GET/POST request to your endpoint.", tag: "GET /api/weather" },
  { num: "02", title: "Receive 402", desc: "Server returns payment requirements — price, token, chain.", tag: "402 + price" },
  { num: "03", title: "Sign USDC", desc: "Agent signs a gasless USDC transfer using EIP-3009.", tag: "X-Payment: 0x..." },
  { num: "04", title: "Get Data", desc: "Payment settles on-chain via facilitator. Data returned.", tag: "200 OK + JSON" },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 px-6 border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-500 mb-3">How it works</p>
          <h2 className="text-2xl md:text-[2.5rem] font-bold tracking-tight">Four steps, zero friction</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bg-[#111113] border border-white/[0.06] rounded-2xl p-6 hover:border-white/[0.1] transition-colors"
            >
              <span className="text-[11px] font-mono text-zinc-600 block mb-5">{s.num}</span>
              <h3 className="text-[15px] font-semibold mb-2">{s.title}</h3>
              <p className="text-[13px] text-zinc-500 leading-relaxed mb-5">{s.desc}</p>
              <span className="text-[11px] font-mono text-indigo-400/70 bg-indigo-500/[0.06] border border-indigo-500/[0.1] px-2.5 py-1 rounded-md">{s.tag}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
