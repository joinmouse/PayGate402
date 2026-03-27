import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-zinc-800/50 border border-zinc-700/50 rounded-full px-4 py-1.5 text-sm text-zinc-300 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          Built on the x402 open protocol by Coinbase
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight mb-6">
          Pay Any API with Crypto.{" "}
          <span className="gradient-text">One Line of Code.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          The x402 payment gateway for AI agents and developers.
          Accept USDC micropayments on Base. No accounts, no KYC, no friction.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <Link
            href="/demo"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl text-base transition shadow-lg shadow-blue-600/25"
          >
            Try Live Demo
          </Link>
          <Link
            href="/docs"
            className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-8 py-3.5 rounded-xl text-base transition border border-zinc-700"
          >
            View Docs
          </Link>
        </div>

        {/* Code Preview */}
        <div className="max-w-2xl mx-auto glow rounded-2xl">
          <div className="code-block">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-xs text-zinc-500 ml-2">middleware.ts — Server side</span>
            </div>
            <pre className="text-sm">
              <code>
                <span className="text-purple-400">import</span>{" "}
                <span className="text-zinc-300">{"{ paymentMiddleware }"}</span>{" "}
                <span className="text-purple-400">from</span>{" "}
                <span className="text-green-400">{'"@x402/next"'}</span>
                {"\n\n"}
                <span className="text-purple-400">export default</span>{" "}
                <span className="text-blue-400">paymentMiddleware</span>
                {"({\n"}
                {"  "}
                <span className="text-green-400">{'"GET /api/weather"'}</span>
                {": { "}
                <span className="text-zinc-300">price</span>
                {": "}
                <span className="text-green-400">{'"$0.001"'}</span>
                {", "}
                <span className="text-zinc-300">network</span>
                {": "}
                <span className="text-green-400">{'"base"'}</span>
                {" }\n"})
              </code>
            </pre>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-12 mt-16 text-sm text-zinc-500">
          <div>
            <div className="text-2xl font-bold text-white">$0.001</div>
            <div>Min payment</div>
          </div>
          <div className="w-px h-10 bg-zinc-800" />
          <div>
            <div className="text-2xl font-bold text-white">&lt; $0.01</div>
            <div>Gas fee on Base</div>
          </div>
          <div className="w-px h-10 bg-zinc-800" />
          <div>
            <div className="text-2xl font-bold text-white">3 lines</div>
            <div>To integrate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
