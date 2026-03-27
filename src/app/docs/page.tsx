import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DocsPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16 px-[6%]">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">Quick Start Guide</h1>
          <p className="text-zinc-400 text-lg mb-12">Get your API accepting crypto payments in under 5 minutes.</p>

          {/* Step 1 */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-600 text-white text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full">1</span>
              <h2 className="text-xl font-semibold">Install the SDK</h2>
            </div>
            <div className="code-block">
              <pre className="text-sm"><code>npm install @x402/next @x402/core</code></pre>
            </div>
          </div>

          {/* Step 2 */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-600 text-white text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full">2</span>
              <h2 className="text-xl font-semibold">Add Payment Middleware</h2>
            </div>
            <div className="code-block">
              <div className="px-4 py-2 border-b border-zinc-800 text-xs text-zinc-500">middleware.ts</div>
              <pre className="text-sm"><code>{`import { paymentMiddleware } from "@x402/next"

export default paymentMiddleware({
  "GET /api/weather": {
    price: "$0.001",
    network: "base-sepolia",
    config: {
      description: "Weather data API"
    }
  }
})`}</code></pre>
            </div>
          </div>

          {/* Step 3 */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-600 text-white text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full">3</span>
              <h2 className="text-xl font-semibold">Write Your API Route</h2>
            </div>
            <div className="code-block">
              <div className="px-4 py-2 border-b border-zinc-800 text-xs text-zinc-500">app/api/weather/route.ts</div>
              <pre className="text-sm"><code>{`import { NextResponse } from "next/server"

export async function GET() {
  // Your business logic — only reached after payment
  return NextResponse.json({
    city: "Tokyo",
    temp: "22°C",
    condition: "Sunny"
  })
}`}</code></pre>
            </div>
          </div>

          {/* Step 4 */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-600 text-white text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full">4</span>
              <h2 className="text-xl font-semibold">Deploy to Vercel</h2>
            </div>
            <div className="code-block">
              <pre className="text-sm"><code>{`# Set environment variables
vercel env add CDP_API_KEY_ID
vercel env add CDP_API_KEY_SECRET
vercel env add CDP_WALLET_SECRET

# Deploy
vercel deploy --prod`}</code></pre>
            </div>
          </div>

          {/* Step 5 - Client */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-green-600 text-white text-sm font-bold w-8 h-8 flex items-center justify-center rounded-full">5</span>
              <h2 className="text-xl font-semibold">Client / Agent Integration</h2>
            </div>
            <div className="code-block">
              <div className="px-4 py-2 border-b border-zinc-800 text-xs text-zinc-500">agent.ts</div>
              <pre className="text-sm"><code>{`import { x402Fetch } from "@x402/fetch"

// x402Fetch auto-handles 402 → pay → retry
const weather = await x402Fetch(
  "https://your-app.vercel.app/api/weather",
  { wallet }
)

console.log(weather) // { city: "Tokyo", temp: "22°C" }`}</code></pre>
            </div>
          </div>

          {/* Resources */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://docs.x402.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition">
                  x402 Protocol Documentation &rarr;
                </a>
              </li>
              <li>
                <a href="https://github.com/coinbase/x402" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition">
                  x402 GitHub Repository &rarr;
                </a>
              </li>
              <li>
                <a href="https://www.x402.org/ecosystem" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition">
                  x402 Ecosystem Directory &rarr;
                </a>
              </li>
              <li>
                <a href="https://github.com/joinmouse/PayGate402" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition">
                  PayGate402 Source Code &rarr;
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
