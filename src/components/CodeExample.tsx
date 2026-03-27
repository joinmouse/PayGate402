"use client";
import { motion } from "framer-motion";

export default function CodeExample() {
  return (
    <section style={{ padding: "clamp(48px, 6vh, 80px) 0" }}>
      <div className="divider" />
      <div className="container-fluid" style={{ paddingTop: "clamp(48px, 6vh, 80px)" }}>
        <p className="label" style={{ textAlign: "center", marginBottom: 12 }}>Integration</p>
        <h2 className="heading-lg" style={{ textAlign: "center", marginBottom: "clamp(40px, 5vh, 64px)" }}>Server and client</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))", gap: 20 }}>
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="label" style={{ color: "#34d399", marginBottom: 12 }}>Server — middleware.ts</p>
            <div className="code-block">
              <div className="code-header">
                <div className="code-dots"><span style={{ background: "#ff5f57" }} /><span style={{ background: "#febc2e" }} /><span style={{ background: "#28c840" }} /></div>
              </div>
              <pre><code>
<span style={{ color: "#c084fc" }}>import</span> <span style={{ color: "#d4d4d8" }}>{"{ paymentMiddleware }"}</span> <span style={{ color: "#c084fc" }}>from</span> <span style={{ color: "#34d399" }}>&apos;@x402/next&apos;</span>{"\n\n"}
<span style={{ color: "#c084fc" }}>export default</span> <span style={{ color: "#67e8f9" }}>paymentMiddleware</span>{"({\n"}
{"  "}<span style={{ color: "#34d399" }}>&apos;GET /api/weather&apos;</span>{": {\n"}
{"    price: "}<span style={{ color: "#34d399" }}>&apos;$0.001&apos;</span>{",\n"}
{"    network: "}<span style={{ color: "#34d399" }}>&apos;base-sepolia&apos;</span>{",\n"}
{"    config: { description: "}<span style={{ color: "#34d399" }}>&apos;Weather data&apos;</span>{" }\n"}
{"  },\n"}
{"  "}<span style={{ color: "#34d399" }}>&apos;POST /api/ai-summary&apos;</span>{": {\n"}
{"    price: "}<span style={{ color: "#34d399" }}>&apos;$0.01&apos;</span>{",\n"}
{"    network: "}<span style={{ color: "#34d399" }}>&apos;base-sepolia&apos;</span>{"\n"}
{"  }\n}"})
              </code></pre>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <p className="label" style={{ color: "#60a5fa", marginBottom: 12 }}>Client — agent.ts</p>
            <div className="code-block">
              <div className="code-header">
                <div className="code-dots"><span style={{ background: "#ff5f57" }} /><span style={{ background: "#febc2e" }} /><span style={{ background: "#28c840" }} /></div>
              </div>
              <pre><code>
<span style={{ color: "#c084fc" }}>import</span> <span style={{ color: "#d4d4d8" }}>{"{ x402Fetch }"}</span> <span style={{ color: "#c084fc" }}>from</span> <span style={{ color: "#34d399" }}>&apos;@x402/fetch&apos;</span>{"\n"}
<span style={{ color: "#c084fc" }}>import</span> <span style={{ color: "#d4d4d8" }}>{"{ createWallet }"}</span> <span style={{ color: "#c084fc" }}>from</span> <span style={{ color: "#34d399" }}>&apos;@x402/core&apos;</span>{"\n\n"}
<span style={{ color: "#3f3f46" }}>{"// Agent wallet funded with USDC"}</span>{"\n"}
<span style={{ color: "#c084fc" }}>const</span> wallet = <span style={{ color: "#67e8f9" }}>createWallet</span>(key){"\n\n"}
<span style={{ color: "#3f3f46" }}>{"// Auto-handles 402 → pay → retry"}</span>{"\n"}
<span style={{ color: "#c084fc" }}>const</span> data = <span style={{ color: "#c084fc" }}>await</span> <span style={{ color: "#67e8f9" }}>x402Fetch</span>({"\n"}
{"  "}<span style={{ color: "#34d399" }}>&apos;https://api.example.com/weather&apos;</span>,{"\n"}
{"  "}{"{ wallet }\n)"}{"\n\n"}
console.<span style={{ color: "#67e8f9" }}>log</span>(data) <span style={{ color: "#3f3f46" }}>{"// { city: 'Tokyo', temp: '22C' }"}</span>
              </code></pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
