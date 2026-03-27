"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-28 pb-24 px-6 overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="aurora-blob absolute -top-40 left-1/4 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[120px]" />
        <div className="aurora-blob absolute -top-20 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" style={{ animationDelay: "2s" }} />
        <div className="aurora-blob absolute top-40 left-1/2 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px]" style={{ animationDelay: "4s" }} />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.06] rounded-full px-4 py-1.5 text-[13px] text-zinc-400 mb-8 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Built on the x402 open protocol by Coinbase
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[3.25rem] md:text-[4.5rem] font-bold tracking-[-0.04em] leading-[1.05] mb-6"
        >
          Pay Any API with Crypto.
          <br />
          <span className="gradient-text">One Line of Code.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
        >
          The x402 payment gateway for AI agents and developers.
          Accept USDC micropayments on Base. No accounts. No KYC. No friction.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-4 mb-20"
        >
          <Link
            href="/demo"
            className="group flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-7 py-3.5 rounded-xl transition-all shadow-xl shadow-indigo-600/25 hover:shadow-indigo-500/30"
          >
            <Play className="w-4 h-4" />
            Try Live Demo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/docs"
            className="flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.08] text-white font-medium px-7 py-3.5 rounded-xl transition-all border border-white/[0.06] hover:border-white/[0.1]"
          >
            View Docs
          </Link>
        </motion.div>

        {/* Code Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="max-w-2xl mx-auto glow-indigo rounded-2xl"
        >
          <div className="code-block">
            <div className="code-header">
              <div className="dots">
                <span className="bg-[#ff5f57]" />
                <span className="bg-[#febc2e]" />
                <span className="bg-[#28c840]" />
              </div>
              <span className="text-[11px] text-zinc-500 ml-2 font-mono">middleware.ts</span>
            </div>
            <pre>
              <code>
                <span className="text-indigo-400">import</span>{" "}
                <span className="text-zinc-300">{"{ paymentMiddleware }"}</span>{" "}
                <span className="text-indigo-400">from</span>{" "}
                <span className="text-emerald-400">&apos;@x402/next&apos;</span>
                {"\n\n"}
                <span className="text-indigo-400">export default</span>{" "}
                <span className="text-cyan-300">paymentMiddleware</span>
                {"({\n"}
                {"  "}
                <span className="text-emerald-400">&apos;GET /api/weather&apos;</span>
                {": {\n"}
                {"    "}price: <span className="text-emerald-400">&apos;$0.001&apos;</span>,{"\n"}
                {"    "}network: <span className="text-emerald-400">&apos;base&apos;</span>{"\n"}
                {"  }\n"}
                {"}"})
              </code>
            </pre>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-16 mt-20"
        >
          {[
            { value: "$0.001", label: "Min Payment" },
            { value: "< $0.01", label: "Gas on Base" },
            { value: "3 lines", label: "To Integrate" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl font-bold tracking-tight">{s.value}</div>
              <div className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
