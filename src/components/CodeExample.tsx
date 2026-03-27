"use client";

import { motion } from "framer-motion";

export default function CodeExample() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-3"
          >
            Integration
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-[2.75rem] font-bold tracking-tight"
          >
            Ship in Minutes
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Server */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Server
              </span>
              <span className="text-[13px] text-zinc-500">Next.js / Express / Hono</span>
            </div>
            <div className="code-block glow-sm">
              <div className="code-header">
                <div className="dots">
                  <span className="bg-[#ff5f57]" />
                  <span className="bg-[#febc2e]" />
                  <span className="bg-[#28c840]" />
                </div>
                <span className="text-[11px] text-zinc-500 ml-2">middleware.ts</span>
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
                  <span className="text-zinc-600">  {"// Define paid endpoints"}</span>{"\n"}
                  {"  "}
                  <span className="text-emerald-400">&apos;GET /api/weather&apos;</span>
                  {": {\n"}
                  {"    "}price: <span className="text-emerald-400">&apos;$0.001&apos;</span>,{"\n"}
                  {"    "}network: <span className="text-emerald-400">&apos;base-sepolia&apos;</span>,{"\n"}
                  {"    "}config: {"{ "}description: <span className="text-emerald-400">&apos;Weather data&apos;</span>{" }\n"}
                  {"  },\n"}
                  {"  "}
                  <span className="text-emerald-400">&apos;POST /api/ai-summary&apos;</span>
                  {": {\n"}
                  {"    "}price: <span className="text-emerald-400">&apos;$0.01&apos;</span>,{"\n"}
                  {"    "}network: <span className="text-emerald-400">&apos;base-sepolia&apos;</span>{"\n"}
                  {"  }\n"}
                  {"}"})
                </code>
              </pre>
            </div>
          </motion.div>

          {/* Client */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Client
              </span>
              <span className="text-[13px] text-zinc-500">Agent / Browser / CLI</span>
            </div>
            <div className="code-block glow-sm">
              <div className="code-header">
                <div className="dots">
                  <span className="bg-[#ff5f57]" />
                  <span className="bg-[#febc2e]" />
                  <span className="bg-[#28c840]" />
                </div>
                <span className="text-[11px] text-zinc-500 ml-2">agent.ts</span>
              </div>
              <pre>
                <code>
                  <span className="text-indigo-400">import</span>{" "}
                  <span className="text-zinc-300">{"{ x402Fetch }"}</span>{" "}
                  <span className="text-indigo-400">from</span>{" "}
                  <span className="text-emerald-400">&apos;@x402/fetch&apos;</span>
                  {"\n"}
                  <span className="text-indigo-400">import</span>{" "}
                  <span className="text-zinc-300">{"{ createWallet }"}</span>{" "}
                  <span className="text-indigo-400">from</span>{" "}
                  <span className="text-emerald-400">&apos;@x402/core&apos;</span>
                  {"\n\n"}
                  <span className="text-zinc-600">{"// Agent wallet with USDC"}</span>{"\n"}
                  <span className="text-indigo-400">const</span> wallet = <span className="text-cyan-300">createWallet</span>(key)
                  {"\n\n"}
                  <span className="text-zinc-600">{"// Auto-handles 402 → pay → retry"}</span>{"\n"}
                  <span className="text-indigo-400">const</span> data = <span className="text-indigo-400">await</span>{" "}
                  <span className="text-cyan-300">x402Fetch</span>({"\n"}
                  {"  "}<span className="text-emerald-400">&apos;https://api.example.com/weather&apos;</span>,{"\n"}
                  {"  "}{"{ wallet }\n"}
                  {")"}{"\n\n"}
                  console.<span className="text-cyan-300">log</span>(data)
                  {" "}
                  <span className="text-zinc-600">{"// { city: 'Tokyo' }"}</span>
                </code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
