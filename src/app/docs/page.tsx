"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

/* ── Sidebar sections ── */
const sections = [
  { id: "overview", label: "Overview" },
  { id: "prerequisites", label: "Prerequisites" },
  { id: "install", label: "1. Install" },
  { id: "middleware", label: "2. Middleware" },
  { id: "route", label: "3. API Route" },
  { id: "deploy", label: "4. Deploy" },
  { id: "client", label: "5. Client" },
  { id: "testing", label: "6. Test It" },
  { id: "concepts", label: "Key Concepts" },
  { id: "resources", label: "Resources" },
];

/* ── Copy button ── */
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);
  return (
    <button onClick={copy} aria-label="Copy code" style={{ marginLeft: "auto", background: "none", border: "1px solid var(--border)", borderRadius: 6, padding: "4px 10px", fontSize: 11, color: copied ? "var(--success)" : "var(--text-4)", cursor: "pointer", transition: "color 0.15s" }}>
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

/* ── Code block with filename + copy ── */
function Code({ filename, children, code }: { filename?: string; children: React.ReactNode; code: string }) {
  return (
    <div className="code-block" style={{ marginTop: 12, marginBottom: 24 }}>
      <div className="code-header">
        <div className="code-dots"><span style={{ background: "var(--dot-red)" }} /><span style={{ background: "var(--dot-yellow)" }} /><span style={{ background: "var(--dot-green)" }} /></div>
        {filename && <span style={{ fontSize: 11, color: "var(--text-4)", marginLeft: 8, fontFamily: "monospace" }}>{filename}</span>}
        <CopyBtn text={code} />
      </div>
      <pre><code>{children}</code></pre>
    </div>
  );
}

/* ── Info callout ── */
function Callout({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "tip" | "warn" }) {
  const colors = { info: "var(--accent)", tip: "var(--success)", warn: "var(--warning)" };
  const icons = { info: "💡", tip: "✅", warn: "⚠️" };
  return (
    <div style={{ display: "flex", gap: 12, padding: "14px 16px", borderRadius: 10, border: `1px solid ${colors[type]}25`, background: `${colors[type]}08`, marginBottom: 24, fontSize: 13, lineHeight: 1.6, color: "var(--text-2)" }}>
      <span style={{ fontSize: 16, lineHeight: 1.3, flexShrink: 0 }}>{icons[type]}</span>
      <div>{children}</div>
    </div>
  );
}

/* ── Step wrapper ── */
function Step({ num, id, title, children }: { num: number; id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} style={{ marginBottom: 56, scrollMarginTop: 80 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <span className="step-num">{num}</span>
        <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--text-1)" }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

/* ── Page ── */
export default function DocsPage() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { for (const e of entries) { if (e.isIntersecting) setActive(e.target.id); } },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    sections.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main style={{ paddingTop: 80, paddingBottom: 80 }}>
        <div className="container-fluid" style={{ maxWidth: 1080 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }} className="lg:grid-cols-[220px_1fr] lg:gap-16">

            {/* ── Sidebar ── */}
            <aside className="hidden lg:block" style={{ position: "sticky", top: 80, alignSelf: "start", paddingTop: 32 }}>
              <p className="label" style={{ marginBottom: 12, paddingLeft: 12 }}>On this page</p>
              <nav style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {sections.map(s => (
                  <a key={s.id} href={`#${s.id}`} className={`docs-link ${active === s.id ? "active" : ""}`}>{s.label}</a>
                ))}
              </nav>
              <div className="divider" style={{ margin: "20px 0" }} />
              <nav style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Link href="/" className="docs-link">← Home</Link>
                <Link href="/demo" className="docs-link">→ Try Demo</Link>
                <Link href="/pricing" className="docs-link">→ Pricing</Link>
              </nav>
            </aside>

            {/* ── Content ── */}
            <div style={{ paddingTop: 32, minWidth: 0 }}>

              {/* Header */}
              <p className="label" style={{ marginBottom: 8 }}>Documentation</p>
              <h1 className="heading-lg" style={{ marginBottom: 12 }}>Quick Start Guide</h1>
              <p className="text-body" style={{ marginBottom: 40, maxWidth: 540 }}>
                Add crypto payments to any API in 5 minutes. This guide walks you through server setup, deployment, and client integration.
              </p>

              {/* ── Overview ── */}
              <div id="overview" style={{ marginBottom: 56, scrollMarginTop: 80 }}>
                <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--text-1)", marginBottom: 12 }}>What is x402?</h2>
                <p className="text-body" style={{ marginBottom: 16 }}>
                  HTTP 402 &quot;Payment Required&quot; has been reserved since 1997 but never implemented — because the internet had no native payment layer. x402 changes that.
                </p>
                <p className="text-body" style={{ marginBottom: 16 }}>
                  When a client requests your API without paying, your server returns <strong style={{ color: "var(--text-1)" }}>HTTP 402</strong> with the price. The client signs a gasless USDC transfer and retries. Payment is settled on-chain, and data is returned. The entire flow happens in a single HTTP round-trip.
                </p>
                <Callout type="info">
                  <strong style={{ color: "var(--text-1)" }}>Why does this matter?</strong> AI agents can&apos;t fill out credit card forms. With x402, they pay APIs autonomously using their own wallets — no accounts, no KYC, no API keys.
                </Callout>
              </div>

              {/* ── Prerequisites ── */}
              <div id="prerequisites" style={{ marginBottom: 56, scrollMarginTop: 80 }}>
                <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--text-1)", marginBottom: 12 }}>Prerequisites</h2>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {[
                    "Node.js 18+ (or Bun)",
                    "A Next.js, Express, or Hono project",
                    "Coinbase Developer Platform account (for CDP keys)",
                    "A Vercel account (for deployment)",
                  ].map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", fontSize: 14, color: "var(--text-2)" }}>
                      <span style={{ color: "var(--success)", fontSize: 14 }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Step 1 ── */}
              <Step num={1} id="install" title="Install the SDK">
                <p className="text-body" style={{ marginBottom: 4 }}>
                  Install the x402 middleware for your framework. We&apos;ll use Next.js here — Express and Hono packages are also available.
                </p>
                <Code filename="terminal" code="npm install @x402/next @x402/core">npm install @x402/next @x402/core</Code>
                <Callout type="tip">
                  Using Bun? Just run <code style={{ fontSize: 12, background: "var(--bg-code)", padding: "2px 6px", borderRadius: 4 }}>bun add @x402/next @x402/core</code>
                </Callout>
              </Step>

              {/* ── Step 2 ── */}
              <Step num={2} id="middleware" title="Add Payment Middleware">
                <p className="text-body" style={{ marginBottom: 4 }}>
                  The middleware intercepts requests to your paid endpoints. If no valid payment is attached, it automatically returns <code style={{ fontSize: 12, background: "var(--bg-code)", padding: "2px 6px", borderRadius: 4 }}>402 Payment Required</code> with the price and payment instructions.
                </p>
                <Code filename="middleware.ts" code={`import { paymentMiddleware } from "@x402/next"

export default paymentMiddleware({
  "GET /api/weather": {
    price: "$0.001",
    network: "base-sepolia",
    config: {
      description: "Weather data API"
    }
  },
  "POST /api/ai-summary": {
    price: "$0.01",
    network: "base-sepolia"
  }
})`}>
{`import { paymentMiddleware } from "@x402/next"

export default paymentMiddleware({
  "GET /api/weather": {
    price: "$0.001",
    network: "base-sepolia",
    config: {
      description: "Weather data API"
    }
  },
  "POST /api/ai-summary": {
    price: "$0.01",
    network: "base-sepolia"
  }
})`}
                </Code>
                <Callout type="info">
                  <strong style={{ color: "var(--text-1)" }}>How pricing works:</strong> Set any USD amount as a string. The protocol converts it to USDC on-chain. You can set different prices for different endpoints.
                </Callout>
              </Step>

              {/* ── Step 3 ── */}
              <Step num={3} id="route" title="Write Your API Route">
                <p className="text-body" style={{ marginBottom: 4 }}>
                  Your route code stays exactly the same — the middleware handles all payment logic. If the request reaches your handler, payment has already been verified.
                </p>
                <Code filename="app/api/weather/route.ts" code={`import { NextResponse } from "next/server"

export async function GET() {
  // This code only runs after payment is verified
  // Write your normal business logic here
  return NextResponse.json({
    city: "Tokyo",
    temp: "22°C",
    condition: "Sunny",
    humidity: "45%"
  })
}`}>
{`import { NextResponse } from "next/server"

export async function GET() {
  // This code only runs after payment is verified
  // Write your normal business logic here
  return NextResponse.json({
    city: "Tokyo",
    temp: "22°C",
    condition: "Sunny",
    humidity: "45%"
  })
}`}
                </Code>
                <Callout type="tip">
                  You don&apos;t need to check for payments in your route code. The middleware does it automatically — your handler is only called when payment is valid.
                </Callout>
              </Step>

              {/* ── Step 4 ── */}
              <Step num={4} id="deploy" title="Deploy to Vercel">
                <p className="text-body" style={{ marginBottom: 4 }}>
                  You need three environment variables from the <a href="https://portal.cdp.coinbase.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-text)", textDecoration: "none" }}>Coinbase Developer Platform</a>. These allow the x402 facilitator to settle payments on-chain.
                </p>
                <Code filename="terminal" code={`# Add your CDP credentials
vercel env add CDP_API_KEY_ID
vercel env add CDP_API_KEY_SECRET
vercel env add CDP_WALLET_SECRET

# Deploy to production
vercel deploy --prod`}>
{`# Add your CDP credentials
vercel env add CDP_API_KEY_ID
vercel env add CDP_API_KEY_SECRET
vercel env add CDP_WALLET_SECRET

# Deploy to production
vercel deploy --prod`}
                </Code>
                <Callout type="warn">
                  <strong style={{ color: "var(--text-1)" }}>Security:</strong> Never commit CDP credentials to git. Always use environment variables or a secrets manager.
                </Callout>
              </Step>

              {/* ── Step 5 ── */}
              <Step num={5} id="client" title="Client / Agent Integration">
                <p className="text-body" style={{ marginBottom: 4 }}>
                  On the client side, use <code style={{ fontSize: 12, background: "var(--bg-code)", padding: "2px 6px", borderRadius: 4 }}>x402Fetch</code> — a drop-in replacement for <code style={{ fontSize: 12, background: "var(--bg-code)", padding: "2px 6px", borderRadius: 4 }}>fetch()</code> that automatically handles 402 responses: detects the price, signs a USDC payment, and retries with the payment header.
                </p>
                <Code filename="agent.ts" code={`import { x402Fetch } from "@x402/fetch"
import { createWallet } from "@x402/core"

// Create a wallet funded with USDC
const wallet = createWallet(process.env.PRIVATE_KEY)

// x402Fetch auto-handles:
// 1. Sends GET → receives 402 + price
// 2. Signs USDC payment (gasless via EIP-3009)
// 3. Retries with X-Payment header → receives 200
const weather = await x402Fetch(
  "https://your-app.vercel.app/api/weather",
  { wallet }
)

console.log(weather) // { city: "Tokyo", temp: "22°C", ... }`}>
{`import { x402Fetch } from "@x402/fetch"
import { createWallet } from "@x402/core"

// Create a wallet funded with USDC
const wallet = createWallet(process.env.PRIVATE_KEY)

// x402Fetch auto-handles:
// 1. Sends GET → receives 402 + price
// 2. Signs USDC payment (gasless via EIP-3009)
// 3. Retries with X-Payment header → receives 200
const weather = await x402Fetch(
  "https://your-app.vercel.app/api/weather",
  { wallet }
)

console.log(weather) // { city: "Tokyo", temp: "22°C", ... }`}
                </Code>
              </Step>

              {/* ── Step 6: Testing ── */}
              <Step num={6} id="testing" title="Test It Locally">
                <p className="text-body" style={{ marginBottom: 4 }}>
                  Verify your setup with curl. Without a payment header, you should get 402. With one, you get 200.
                </p>
                <Code filename="terminal" code={`# Should return 402 Payment Required
curl -i http://localhost:3000/api/weather

# Should return 200 OK with data
curl -i -H "x-payment: test" http://localhost:3000/api/weather

# Free endpoint — always 200
curl -i http://localhost:3000/api/health`}>
{`# Should return 402 Payment Required
curl -i http://localhost:3000/api/weather

# Should return 200 OK with data
curl -i -H "x-payment: test" http://localhost:3000/api/weather

# Free endpoint — always 200
curl -i http://localhost:3000/api/health`}
                </Code>
                <Callout type="tip">
                  Try the interactive demo at <Link href="/demo" style={{ color: "var(--accent-text)", textDecoration: "none" }}>/demo</Link> — toggle payment on/off to see 402 vs 200 in real time.
                </Callout>
              </Step>

              {/* ── Key Concepts ── */}
              <div id="concepts" style={{ marginBottom: 56, scrollMarginTop: 80 }}>
                <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>Key Concepts</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 12 }}>
                  {[
                    { term: "x402 Protocol", def: "Open standard by Coinbase that adds payment capability to HTTP using the 402 status code." },
                    { term: "Facilitator", def: "A server that verifies payment signatures and settles transactions on-chain. Coinbase runs a free one." },
                    { term: "EIP-3009", def: "Ethereum standard for gasless USDC transfers. Users sign an authorization — no ETH needed for gas." },
                    { term: "Base Network", def: "Coinbase's L2 blockchain. Sub-cent gas fees, 2-second finality. Built on Optimism." },
                  ].map(c => (
                    <div key={c.term} className="card">
                      <h4 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-1)", marginBottom: 4 }}>{c.term}</h4>
                      <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.5 }}>{c.def}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Resources ── */}
              <div id="resources" style={{ marginBottom: 40, scrollMarginTop: 80 }}>
                <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>Resources</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 12 }}>
                  {[
                    { label: "x402 Protocol Docs", desc: "Full specification and API reference", href: "https://docs.x402.org" },
                    { label: "x402 GitHub", desc: "Source code, SDKs for TS/Python/Go/Java", href: "https://github.com/coinbase/x402" },
                    { label: "Ecosystem Directory", desc: "200+ projects building on x402", href: "https://www.x402.org/ecosystem" },
                    { label: "PayGate402 Source", desc: "This project's complete source code", href: "https://github.com/joinmouse/PayGate402" },
                    { label: "Coinbase CDP", desc: "Get your API keys for payment settlement", href: "https://portal.cdp.coinbase.com" },
                    { label: "Base Network", desc: "L2 blockchain powering x402 payments", href: "https://base.org" },
                  ].map(r => (
                    <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className="card" style={{ textDecoration: "none", display: "block" }}>
                      <h4 style={{ fontSize: 14, fontWeight: 600, color: "var(--accent-text)", marginBottom: 4 }}>{r.label} →</h4>
                      <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.5 }}>{r.desc}</p>
                    </a>
                  ))}
                </div>
              </div>

              {/* ── Mobile nav ── */}
              <div className="lg:hidden" style={{ marginTop: 48, display: "flex", gap: 12 }}>
                <Link href="/" className="btn-secondary" style={{ flex: 1 }}>← Home</Link>
                <Link href="/demo" className="btn-primary" style={{ flex: 1 }}>Try Demo →</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
