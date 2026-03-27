const steps = [
  {
    num: "1",
    icon: "&#x1F310;",
    title: "Agent Requests API",
    desc: "AI agent or client sends a standard HTTP request to your API endpoint.",
    color: "blue",
  },
  {
    num: "2",
    icon: "&#x1F4B0;",
    title: "Server Returns 402",
    desc: "Your API responds with HTTP 402 + payment requirements (price, token, chain).",
    color: "amber",
  },
  {
    num: "3",
    icon: "&#x1F4DD;",
    title: "Agent Signs USDC",
    desc: "Agent signs a gasless USDC transfer (EIP-3009) and retries with payment header.",
    color: "purple",
  },
  {
    num: "4",
    icon: "&#x2705;",
    title: "Data Delivered",
    desc: "Server verifies payment, settles on-chain via facilitator, returns HTTP 200 + data.",
    color: "green",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Four steps. No accounts. No API keys. Just HTTP + crypto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-zinc-700 to-transparent z-0" />
              )}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative z-10 hover:border-zinc-600 transition">
                <div className="text-3xl mb-4" dangerouslySetInnerHTML={{ __html: step.icon }} />
                <div className="text-xs font-mono text-zinc-500 mb-2">STEP {step.num}</div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* HTTP flow visualization */}
        <div className="mt-16 code-block max-w-3xl mx-auto">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
            <span className="text-xs text-zinc-500">HTTP Flow</span>
          </div>
          <pre className="text-sm font-mono">
            <code>
              <span className="text-zinc-500">{"// 1. Initial request"}</span>{"\n"}
              <span className="text-blue-400">GET</span> /api/weather HTTP/1.1{"\n\n"}

              <span className="text-zinc-500">{"// 2. Server responds with payment required"}</span>{"\n"}
              <span className="text-amber-400">HTTP/1.1 402 Payment Required</span>{"\n"}
              <span className="text-zinc-400">X-Payment-Required: {"{"} price: "$0.001", token: "USDC", chain: "base" {"}"}</span>{"\n\n"}

              <span className="text-zinc-500">{"// 3. Agent retries with payment"}</span>{"\n"}
              <span className="text-purple-400">GET</span> /api/weather HTTP/1.1{"\n"}
              <span className="text-zinc-400">X-Payment: {"{"} signature: "0xabc...", amount: "1000", ... {"}"}</span>{"\n\n"}

              <span className="text-zinc-500">{"// 4. Success!"}</span>{"\n"}
              <span className="text-green-400">HTTP/1.1 200 OK</span>{"\n"}
              <span className="text-zinc-400">{"{"} "city": "Tokyo", "temp": "22C", "condition": "Sunny" {"}"}</span>
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
}
