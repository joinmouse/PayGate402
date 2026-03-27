"use client";

import { motion } from "framer-motion";
import { Globe, Coins, ArrowRightLeft, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Globe,
    title: "Request API",
    desc: "Agent sends a standard HTTP request to your endpoint.",
    tag: "GET /api/weather",
    tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  {
    icon: Coins,
    title: "402 + Price",
    desc: "Server responds with payment requirements.",
    tag: "402 Payment Required",
    tagColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  {
    icon: ArrowRightLeft,
    title: "Sign USDC",
    desc: "Agent signs a gasless USDC transfer via EIP-3009.",
    tag: "X-Payment: 0xabc...",
    tagColor: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
  {
    icon: CheckCircle,
    title: "Get Data",
    desc: "Server verifies, settles on-chain, returns data.",
    tag: "200 OK",
    tagColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-3"
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-[2.75rem] font-bold tracking-tight"
          >
            Four Steps. Zero Friction.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(100%+2px)] w-[calc(100%-20px)] h-px">
                  <div className="h-full bg-gradient-to-r from-zinc-700/50 to-transparent" />
                </div>
              )}

              <div className="bg-[#111113] border border-[#1e1e22] rounded-2xl p-6 h-full hover:border-[#2a2a30] transition-all hover:bg-[#141416] group-hover:shadow-lg group-hover:shadow-indigo-500/[0.03]">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center mb-5">
                  <step.icon className="w-5 h-5 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                </div>
                <div className="text-[11px] font-mono text-zinc-600 mb-2">STEP {i + 1}</div>
                <h3 className="text-base font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed mb-4">{step.desc}</p>
                <span className={`inline-block text-[11px] font-mono px-2.5 py-1 rounded-md border ${step.tagColor}`}>
                  {step.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* HTTP flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 code-block max-w-3xl mx-auto glow-sm"
        >
          <div className="code-header">
            <div className="dots">
              <span className="bg-[#ff5f57]" />
              <span className="bg-[#febc2e]" />
              <span className="bg-[#28c840]" />
            </div>
            <span className="text-[11px] text-zinc-500 ml-2 font-mono">HTTP Flow</span>
          </div>
          <pre>
            <code>
              <span className="text-zinc-600">{"// 1. Initial request"}</span>{"\n"}
              <span className="text-blue-400">GET</span> <span className="text-zinc-300">/api/weather</span> <span className="text-zinc-600">HTTP/1.1</span>{"\n\n"}

              <span className="text-zinc-600">{"// 2. Payment required"}</span>{"\n"}
              <span className="text-amber-400">HTTP/1.1 402 Payment Required</span>{"\n"}
              <span className="text-zinc-500">X-Payment: {"{"} price: &quot;$0.001&quot;, token: &quot;USDC&quot;, chain: &quot;base&quot; {"}"}</span>{"\n\n"}

              <span className="text-zinc-600">{"// 3. Retry with payment"}</span>{"\n"}
              <span className="text-purple-400">GET</span> <span className="text-zinc-300">/api/weather</span> <span className="text-zinc-600">HTTP/1.1</span>{"\n"}
              <span className="text-zinc-500">X-Payment: {"{"} sig: &quot;0xabc...&quot;, amount: &quot;1000&quot; {"}"}</span>{"\n\n"}

              <span className="text-zinc-600">{"// 4. Success"}</span>{"\n"}
              <span className="text-emerald-400">HTTP/1.1 200 OK</span>{"\n"}
              <span className="text-zinc-400">{"{"} &quot;city&quot;: &quot;Tokyo&quot;, &quot;temp&quot;: &quot;22C&quot; {"}"}</span>
            </code>
          </pre>
        </motion.div>
      </div>
    </section>
  );
}
