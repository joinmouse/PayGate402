"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="pt-28 md:pt-40 pb-16 md:pb-24 px-[6%]">
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[0.6875rem] font-medium uppercase tracking-[0.15em] text-zinc-500 mb-6"
          >
            Built on the x402 protocol
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-[clamp(2.25rem,5vw,4.5rem)] font-bold tracking-[-0.04em] leading-[1.08] mb-6"
          >
            Pay any API{" "}
            <span className="gradient-text">with one line of code</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[0.9375rem] md:text-lg text-zinc-400 leading-relaxed mb-10"
          >
            Accept USDC micropayments for your APIs on Base.
            No accounts, no KYC — AI agents pay autonomously.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center justify-center gap-3"
          >
            <Link href="/demo" className="text-sm font-medium bg-white text-black px-6 py-2.5 rounded-lg hover:bg-zinc-200 transition-colors">
              Try Demo
            </Link>
            <Link href="/docs" className="text-sm font-medium text-zinc-300 px-6 py-2.5 rounded-lg border border-white/[0.08] hover:border-white/[0.15] hover:bg-white/[0.03] transition-all">
              Documentation
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="max-w-3xl mx-auto mt-16"
        >
          <div className="code-block">
            <div className="code-header">
              <div className="dots">
                <span className="bg-[#ff5f57]" />
                <span className="bg-[#febc2e]" />
                <span className="bg-[#28c840]" />
              </div>
              <span className="text-[11px] text-zinc-600 ml-2">middleware.ts</span>
            </div>
            <pre>
              <code>
                <span className="text-purple-400">import</span>{" "}
                <span className="text-zinc-300">{"{ paymentMiddleware }"}</span>{" "}
                <span className="text-purple-400">from</span>{" "}
                <span className="text-emerald-400">&apos;@x402/next&apos;</span>
                {"\n\n"}
                <span className="text-purple-400">export default</span>{" "}
                <span className="text-cyan-300">paymentMiddleware</span>
                {"({\n"}
                {"  "}<span className="text-emerald-400">&apos;GET /api/weather&apos;</span>{": { "}
                price: <span className="text-emerald-400">&apos;$0.001&apos;</span>,
                {" "}network: <span className="text-emerald-400">&apos;base&apos;</span>
                {" }\n}"})
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
