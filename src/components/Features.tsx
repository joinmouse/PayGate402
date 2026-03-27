const features = [
  {
    icon: "&#x1F4B8;",
    title: "Micropayments from $0.001",
    desc: "Charge per request, per byte, per token. Credit cards can't do this — crypto can.",
  },
  {
    icon: "&#x26FD;",
    title: "Gasless USDC Payments",
    desc: "EIP-3009 transferWithAuthorization. Users only need USDC — no ETH for gas.",
  },
  {
    icon: "&#x1F4E6;",
    title: "One-Line Integration",
    desc: "Add paymentMiddleware() to your Next.js, Express, or Hono server. Done.",
  },
  {
    icon: "&#x26A1;",
    title: "Base L2 Settlement",
    desc: "Sub-cent gas fees, 2-second finality. Built on Coinbase's Base network.",
  },
  {
    icon: "&#x1F916;",
    title: "Agent-Native",
    desc: "No accounts, no KYC, no API keys. AI agents pay autonomously with their wallets.",
  },
  {
    icon: "&#x1F310;",
    title: "Open Protocol",
    desc: "Built on x402 open standard. Not locked into any vendor. Fully permissionless.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-zinc-950/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why <span className="gradient-text">PayGate402</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Everything you need to monetize APIs for the AI agent economy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 transition group"
            >
              <div className="text-3xl mb-4" dangerouslySetInnerHTML={{ __html: f.icon }} />
              <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-400 transition">{f.title}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
