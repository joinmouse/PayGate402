"use client";
import { motion } from "framer-motion";

const features = [
  { title: "Micropayments", desc: "Charge from $0.001 per request. Impossible with credit cards, trivial on Base L2." },
  { title: "Gasless USDC", desc: "EIP-3009 transferWithAuthorization. Users only need USDC — zero ETH for gas." },
  { title: "One-line setup", desc: "Add paymentMiddleware() to Next.js, Express, or Hono. Ship in minutes." },
  { title: "Base settlement", desc: "Sub-cent gas fees. 2-second finality. Powered by Coinbase's Base network." },
  { title: "Agent-native", desc: "No accounts, no KYC, no API keys. AI agents pay autonomously." },
  { title: "Open standard", desc: "Built on x402 by Coinbase. Fully permissionless and vendor-neutral." },
];

export default function Features() {
  return (
    <section id="features" style={{ padding: "clamp(48px, 6vh, 80px) 0" }}>
      <div className="divider" />
      <div className="container-fluid" style={{ paddingTop: "clamp(48px, 6vh, 80px)" }}>
        <p className="label" style={{ textAlign: "center", marginBottom: 12 }}>Features</p>
        <h2 className="heading-lg" style={{ textAlign: "center", marginBottom: "clamp(40px, 5vh, 64px)" }}>Everything you need</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} className="card">
              <h3 className="heading-md" style={{ marginBottom: 8 }}>{f.title}</h3>
              <p className="text-small">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
