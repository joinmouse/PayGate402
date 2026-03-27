"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section style={{ paddingTop: "clamp(120px, 15vh, 180px)", paddingBottom: "clamp(60px, 8vh, 100px)" }}>
      <div className="container-fluid" style={{ textAlign: "center" }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="label" style={{ marginBottom: 20 }}>
          Built on the x402 open protocol
        </motion.p>

        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="heading-xl" style={{ marginBottom: 20, maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
          Pay any API with crypto.{" "}
          <span className="gradient-text">One line of code.</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-body" style={{ maxWidth: 480, margin: "0 auto 36px", fontSize: "1.0625rem" }}>
          Accept USDC micropayments for your APIs on Base. No accounts, no KYC — AI agents pay autonomously.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: "clamp(48px, 6vh, 80px)" }}>
          <Link href="/demo" className="btn-primary">Try Demo</Link>
          <Link href="/docs" className="btn-secondary">Documentation</Link>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="code-block">
            <div className="code-header">
              <div className="code-dots"><span style={{ background: "#ff5f57" }} /><span style={{ background: "#febc2e" }} /><span style={{ background: "#28c840" }} /></div>
              <span style={{ fontSize: 11, color: "#555", marginLeft: 8, fontFamily: "monospace" }}>middleware.ts</span>
            </div>
            <pre><code>
<span style={{ color: "#c084fc" }}>import</span> <span style={{ color: "#d4d4d8" }}>{"{ paymentMiddleware }"}</span> <span style={{ color: "#c084fc" }}>from</span> <span style={{ color: "#34d399" }}>&apos;@x402/next&apos;</span>{"\n\n"}
<span style={{ color: "#c084fc" }}>export default</span> <span style={{ color: "#67e8f9" }}>paymentMiddleware</span>{"({\n"}
{"  "}<span style={{ color: "#34d399" }}>&apos;GET /api/weather&apos;</span>{": { price: "}<span style={{ color: "#34d399" }}>&apos;$0.001&apos;</span>{", network: "}<span style={{ color: "#34d399" }}>&apos;base&apos;</span>{" }\n}"})
            </code></pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
