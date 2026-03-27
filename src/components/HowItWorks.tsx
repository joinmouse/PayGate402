"use client";
import { motion } from "framer-motion";

const steps = [
  { num: "01", title: "Request API", desc: "Agent sends a standard HTTP request to your endpoint.", tag: "GET /api/weather" },
  { num: "02", title: "Receive 402", desc: "Server returns price, token, chain in the response header.", tag: "402 Payment Required" },
  { num: "03", title: "Sign USDC", desc: "Agent signs a gasless USDC transfer via EIP-3009 and retries.", tag: "X-Payment: 0x..." },
  { num: "04", title: "Get Data", desc: "Payment settles on-chain via facilitator. Server returns data.", tag: "200 OK" },
];

const fadeUp = {
  initial: { opacity: 1, y: 0 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ padding: "clamp(48px, 6vh, 80px) 0" }}>
      <div className="divider" />
      <div className="container-fluid" style={{ paddingTop: "clamp(48px, 6vh, 80px)" }}>
        <p className="label" style={{ textAlign: "center", marginBottom: 12 }}>How it works</p>
        <h2 className="heading-lg" style={{ textAlign: "center", marginBottom: "clamp(40px, 5vh, 64px)" }}>Four steps. Zero friction.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {steps.map((s, i) => (
            <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.06 }} className="card">
              <span className="label" style={{ display: "block", marginBottom: 16 }}>{s.num}</span>
              <h3 className="heading-md" style={{ marginBottom: 8 }}>{s.title}</h3>
              <p className="text-small" style={{ marginBottom: 16 }}>{s.desc}</p>
              <span className="tag">{s.tag}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
