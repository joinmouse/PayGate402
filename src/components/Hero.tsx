"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section style={{ paddingTop: "clamp(120px, 15vh, 180px)", paddingBottom: "clamp(60px, 8vh, 100px)" }}>
      <div className="container-fluid" style={{ textAlign: "center" }}>
        <p className="label" style={{ marginBottom: 20 }}>Built on the x402 open protocol</p>
        <h1 className="heading-xl" style={{ marginBottom: 20, maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
          Pay any API with crypto.{" "}<span className="gradient-text">One line of code.</span>
        </h1>
        <p className="text-body" style={{ maxWidth: 480, margin: "0 auto 36px", fontSize: "1.0625rem" }}>
          Accept USDC micropayments for your APIs on Base. No accounts, no KYC — AI agents pay autonomously.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: "clamp(48px, 6vh, 80px)" }}>
          <Link href="/demo" className="btn-primary">Try Demo</Link>
          <Link href="/docs" className="btn-secondary">Documentation</Link>
        </div>
        <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }} style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="code-block">
            <div className="code-header">
              <div className="code-dots"><span style={{ background: "var(--dot-red)" }} /><span style={{ background: "var(--dot-yellow)" }} /><span style={{ background: "var(--dot-green)" }} /></div>
              <span style={{ fontSize: 11, color: "var(--text-3)", marginLeft: 8, fontFamily: "monospace" }}>middleware.ts</span>
            </div>
            <pre><code>
<span style={{ color: "var(--code-keyword)" }}>import</span> <span style={{ color: "var(--code-default)" }}>{"{ paymentMiddleware }"}</span> <span style={{ color: "var(--code-keyword)" }}>from</span> <span style={{ color: "var(--code-string)" }}>&apos;@x402/next&apos;</span>{"\n\n"}
<span style={{ color: "var(--code-keyword)" }}>export default</span> <span style={{ color: "var(--code-fn)" }}>paymentMiddleware</span>{"({\n"}
{"  "}<span style={{ color: "var(--code-string)" }}>&apos;GET /api/weather&apos;</span>{": { price: "}<span style={{ color: "var(--code-string)" }}>&apos;$0.001&apos;</span>{", network: "}<span style={{ color: "var(--code-string)" }}>&apos;base&apos;</span>{" }\n}"})
            </code></pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
