"use client";

import { motion } from "framer-motion";

export default function CodeExample() {
  return (
    <section className="py-20 md:py-28 px-6 border-t border-white/[0.04]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-500 mb-3">Integration</p>
          <h2 className="text-2xl md:text-[2.5rem] font-bold tracking-tight">Server and client</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-500/70 mb-3">Server — middleware.ts</p>
            <div className="code-block">
              <div className="code-header">
                <div className="dots"><span className="bg-[#ff5f57]" /><span className="bg-[#febc2e]" /><span className="bg-[#28c840]" /></div>
              </div>
              <pre><code>
<span className="text-purple-400">import</span> <span className="text-zinc-300">{"{ paymentMiddleware }"}</span> <span className="text-purple-400">from</span> <span className="text-emerald-400">&apos;@x402/next&apos;</span>{"\n\n"}
<span className="text-purple-400">export default</span> <span className="text-cyan-300">paymentMiddleware</span>{"({\n"}
{"  "}<span className="text-emerald-400">&apos;GET /api/weather&apos;</span>{": {\n"}
{"    "}price: <span className="text-emerald-400">&apos;$0.001&apos;</span>,{"\n"}
{"    "}network: <span className="text-emerald-400">&apos;base-sepolia&apos;</span>,{"\n"}
{"    "}config: {"{ "}description: <span className="text-emerald-400">&apos;Weather data&apos;</span>{" }\n"}
{"  },\n"}
{"  "}<span className="text-emerald-400">&apos;POST /api/ai-summary&apos;</span>{": {\n"}
{"    "}price: <span className="text-emerald-400">&apos;$0.01&apos;</span>,{"\n"}
{"    "}network: <span className="text-emerald-400">&apos;base-sepolia&apos;</span>{"\n"}
{"  }\n}"})</code></pre>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-blue-500/70 mb-3">Client — agent.ts</p>
            <div className="code-block">
              <div className="code-header">
                <div className="dots"><span className="bg-[#ff5f57]" /><span className="bg-[#febc2e]" /><span className="bg-[#28c840]" /></div>
              </div>
              <pre><code>
<span className="text-purple-400">import</span> <span className="text-zinc-300">{"{ x402Fetch }"}</span> <span className="text-purple-400">from</span> <span className="text-emerald-400">&apos;@x402/fetch&apos;</span>{"\n"}
<span className="text-purple-400">import</span> <span className="text-zinc-300">{"{ createWallet }"}</span> <span className="text-purple-400">from</span> <span className="text-emerald-400">&apos;@x402/core&apos;</span>{"\n\n"}
<span className="text-zinc-600">{"// Agent wallet funded with USDC"}</span>{"\n"}
<span className="text-purple-400">const</span> wallet = <span className="text-cyan-300">createWallet</span>(key){"\n\n"}
<span className="text-zinc-600">{"// Auto-handles 402 → pay → retry"}</span>{"\n"}
<span className="text-purple-400">const</span> data = <span className="text-purple-400">await</span> <span className="text-cyan-300">x402Fetch</span>({"\n"}
{"  "}<span className="text-emerald-400">&apos;https://api.example.com/weather&apos;</span>,{"\n"}
{"  "}{"{ wallet }\n)"}
{"\n\n"}console.<span className="text-cyan-300">log</span>(data) <span className="text-zinc-600">{"// { city: 'Tokyo', temp: '22C' }"}</span></code></pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
