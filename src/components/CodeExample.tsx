export default function CodeExample() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Integrate in Minutes</h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto">
            Server-side and client-side. That&apos;s all it takes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Server */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-green-500/20 text-green-400 text-xs font-mono px-2 py-1 rounded">SERVER</span>
              <span className="text-sm text-zinc-400">Next.js / Express / Hono</span>
            </div>
            <div className="code-block">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
                <span className="text-xs text-zinc-500">middleware.ts</span>
              </div>
              <pre className="text-sm">
                <code>
                  <span className="text-purple-400">import</span> {"{ "}
                  <span className="text-zinc-300">paymentMiddleware</span>
                  {" }"} <span className="text-purple-400">from</span>{" "}
                  <span className="text-green-400">{`"@x402/next"`}</span>
                  {"\n\n"}
                  <span className="text-purple-400">export default</span>{" "}
                  <span className="text-blue-400">paymentMiddleware</span>
                  {"({\n"}
                  <span className="text-zinc-500">  // Define paid endpoints and prices</span>{"\n"}
                  {"  "}
                  <span className="text-green-400">{`"GET /api/weather"`}</span>
                  {": {\n"}
                  {"    price: "}
                  <span className="text-green-400">{`"$0.001"`}</span>
                  {",\n"}
                  {"    network: "}
                  <span className="text-green-400">{`"base-sepolia"`}</span>
                  {",\n"}
                  {"    config: { description: "}
                  <span className="text-green-400">{`"Weather data"`}</span>
                  {" }\n"}
                  {"  },\n"}
                  {"  "}
                  <span className="text-green-400">{`"POST /api/ai-summary"`}</span>
                  {": {\n"}
                  {"    price: "}
                  <span className="text-green-400">{`"$0.01"`}</span>
                  {",\n"}
                  {"    network: "}
                  <span className="text-green-400">{`"base-sepolia"`}</span>
                  {"\n"}
                  {"  }\n"}{"})"}                </code>
              </pre>
            </div>
          </div>

          {/* Client */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-blue-500/20 text-blue-400 text-xs font-mono px-2 py-1 rounded">CLIENT</span>
              <span className="text-sm text-zinc-400">Agent / Browser / CLI</span>
            </div>
            <div className="code-block">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
                <span className="text-xs text-zinc-500">agent.ts</span>
              </div>
              <pre className="text-sm">
                <code>
                  <span className="text-purple-400">import</span> {"{ "}
                  <span className="text-zinc-300">x402Fetch</span>
                  {" }"} <span className="text-purple-400">from</span>{" "}
                  <span className="text-green-400">{`"@x402/fetch"`}</span>
                  {"\n"}
                  <span className="text-purple-400">import</span> {"{ "}
                  <span className="text-zinc-300">createWallet</span>
                  {" }"} <span className="text-purple-400">from</span>{" "}
                  <span className="text-green-400">{`"@x402/core"`}</span>
                  {"\n\n"}
                  <span className="text-zinc-500">// Create agent wallet with USDC</span>{"\n"}
                  <span className="text-purple-400">const</span> wallet = <span className="text-blue-400">createWallet</span>(privateKey)
                  {"\n\n"}
                  <span className="text-zinc-500">// Fetch pays automatically on 402</span>{"\n"}
                  <span className="text-purple-400">const</span> data = <span className="text-purple-400">await</span>{" "}
                  <span className="text-blue-400">x402Fetch</span>({"\n"}
                  {"  "}
                  <span className="text-green-400">{`"https://api.example.com/weather"`}</span>
                  {",\n"}
                  {"  { wallet }\n"}{")"}
                  {"\n\n"}
                  <span className="text-zinc-500">{"// That's it! Payment handled automatically"}</span>{"\n"}
                  console.<span className="text-blue-400">log</span>(data)
                  {" "}
                  <span className="text-zinc-500">{"// { city: 'Tokyo', temp: '22C' }"}</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
