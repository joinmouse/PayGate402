import Link from "next/link";

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Perfect for testing and prototyping",
    features: [
      "1,000 requests / month",
      "Base Sepolia testnet",
      "Community support",
      "Basic analytics",
    ],
    cta: "Get Started",
    href: "/docs",
    highlight: false,
  },
  {
    name: "Growth",
    price: "0.5%",
    period: "per transaction",
    desc: "For production APIs and services",
    features: [
      "Unlimited requests",
      "Base Mainnet",
      "Priority support",
      "Advanced analytics",
      "Custom pricing rules",
      "Webhook notifications",
    ],
    cta: "Start Building",
    href: "/docs",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For high-volume API providers",
    features: [
      "Volume discounts",
      "Multi-chain support",
      "Dedicated facilitator",
      "SLA guarantee",
      "White-label SDK",
      "24/7 support",
    ],
    cta: "Contact Us",
    href: "mailto:joinmouse@foxmail.com",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Pricing</h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Zero protocol fees. You only pay network gas (&lt; $0.01 on Base).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`rounded-2xl p-8 border transition ${
                tier.highlight
                  ? "bg-blue-600/10 border-blue-500/50 shadow-lg shadow-blue-600/10"
                  : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-600"
              }`}
            >
              {tier.highlight && (
                <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-bold">{tier.price}</span>
                {tier.period && <span className="text-sm text-zinc-400">{tier.period}</span>}
              </div>
              <p className="text-sm text-zinc-400 mb-6">{tier.desc}</p>

              <ul className="space-y-3 mb-8">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-zinc-300">
                    <svg className="w-4 h-4 text-green-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                href={tier.href}
                className={`block text-center py-3 rounded-xl text-sm font-semibold transition ${
                  tier.highlight
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                }`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
