"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

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

function Callout({ children, type = "info" }: { children: React.ReactNode; type?: "info" | "tip" | "warn" }) {
  const colors = { info: "var(--accent)", tip: "var(--success)", warn: "var(--warning)" };
  const icons = { info: "💡", tip: "✅", warn: "⚠️" };
  return (
    <div style={{ display: "flex", gap: 12, padding: "14px 16px", borderRadius: 10, border: `1px solid color-mix(in srgb, ${colors[type]} 25%, transparent)`, background: `color-mix(in srgb, ${colors[type]} 6%, transparent)`, marginBottom: 24, fontSize: 13, lineHeight: 1.6, color: "var(--text-2)" }}>
      <span style={{ fontSize: 16, lineHeight: 1.3, flexShrink: 0 }}>{icons[type]}</span>
      <div>{children}</div>
    </div>
  );
}

function Step({ num, id, title, children }: { num: number; id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} style={{ marginBottom: 56, scrollMarginTop: 24 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <span className="step-num">{num}</span>
        <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--text-1)" }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default function DocsPage() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const contentEl = document.getElementById("docs-content");
    if (!contentEl) return;

    const observer = new IntersectionObserver(
      (entries) => { for (const e of entries) { if (e.isIntersecting) setActive(e.target.id); } },
      { root: contentEl, rootMargin: "-20px 0px -60% 0px" }
    );
    sections.forEach(s => { const el = document.getElementById(s.id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Docs uses its own layout — no shared Header to avoid transparency issues */}
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>

        {/* ── Top bar (solid, not transparent) ── */}
        <header style={{ height: 56, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", borderBottom: "1px solid var(--border)", background: "var(--bg)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <Link href="/" style={{ fontWeight: 600, fontSize: 14, color: "var(--text-1)", textDecoration: "none" }}>PayGate402</Link>
            <span style={{ color: "var(--text-4)", fontSize: 13 }}>/</span>
            <span style={{ fontSize: 13, color: "var(--text-2)" }}>Documentation</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link href="/demo" style={{ fontSize: 13, color: "var(--text-3)", textDecoration: "none" }}>Demo</Link>
            <Link href="/pricing" style={{ fontSize: 13, color: "var(--text-3)", textDecoration: "none" }}>Pricing</Link>
            <a href="https://github.com/joinmouse/PayGate402" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--text-3)", textDecoration: "none" }}>GitHub</a>
          </div>
        </header>

        {/* ── Body: sidebar + content ── */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

          {/* ── Sidebar (fixed left, scrolls independently) ── */}
          <aside className="hidden lg:flex" style={{ width: 240, flexShrink: 0, flexDirection: "column", borderRight: "1px solid var(--border)", background: "var(--bg)", padding: "24px 16px", overflowY: "auto" }}>
            <p className="label" style={{ marginBottom: 12, paddingLeft: 8 }}>On this page</p>
            <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {sections.map(s => (
                <a key={s.id} href={`#${s.id}`} className={`docs-link ${active === s.id ? "active" : ""}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
                  }}
                >{s.label}</a>
              ))}
            </nav>
            <div className="divider" style={{ margin: "20px 0" }} />
            <p className="label" style={{ marginBottom: 8, paddingLeft: 8 }}>Navigate</p>
            <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Link href="/" className="docs-link">← Home</Link>
              <Link href="/demo" className="docs-link">→ Try Demo</Link>
              <Link href="/pricing" className="docs-link">→ Pricing</Link>
            </nav>
          </aside>

          {/* ── Content (scrolls independently) ── */}
          <div id="docs-content" style={{ flex: 1, overflowY: "auto", padding: "32px clamp(24px, 5vw, 64px) 80px" }}>
            <div style={{ maxWidth: 720 }}>

              <h1 className="heading-lg" style={{ marginBottom: 12 }}>Quick Start Guide</h1>
              <p className="text-body" style={{ marginBottom: 40, maxWidth: 540 }}>
                Add crypto payments to any API in 5 minutes. This guide walks you through server setup, deployment, and client integration.
              </p>

              {/* ── Overview ── */}
              <div id="overview" style={{ marginBottom: 56, scrollMarginTop: 24 }}>
                <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--text-1)", marginBottom: 12 }}>What is x402?</h2>
                <p className="text-body" style={{ marginBottom: 16 }}>
                  HTTP 402 &quot;Payment Required&quot; has been reserved since 1997 but never implemented — because the internet had no native payment layer. x402 changes that.
                </p>
                <p className="text-body" style={{ marginBottom: 16 }}>
                  When a client requests your API without paying, your server returns <strong style={{ color: "var(--text-1)" }}>HTTP 402</strong> with the price. The client signs a gasless USDC transfer and retries. Payment is settled on-chain, and data is returned.
                </p>
                <Callout type="info">
                  <strong style={{ color: "var(--text-1)" }}>Why does this matter?</strong> AI agents can&apos;t fill out credit card forms. With x402, they pay APIs autonomously using their own wallets — no accounts, no KYC, no API keys.
                </Callout>
              </div>

              {/* ── Prerequisites ── */}
              <div id="prerequisites" style={{ marginBottom: 56, scrollMarginTop: 24 }}>
                <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--text-1)", marginBottom: 12 }}>Prerequisites</h2>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {["Node.js 18+ (or Bun)", "A Next.js, Express, or Hono project", "Coinbase Developer Platform account (for CDP keys)", "A Vercel account (for deployment)"].map((item, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", fontSize: 14, color: "var(--text-2)" }}>
                      <span style={{ color: "var(--success)", fontSize: 14 }}>✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Step num={1} id="install" title="Install the SDK">
                <p className="text-body" style={{ marginBottom: 4 }}>Install the x402 middleware for your framework. We&apos;ll use Next.js here.</p>
                <Code filename="terminal" code="npm install @x402/next @x402/core">npm install @x402/next @x402/core</Code>
                <Callout type="tip">Using Bun? Just run <code style={{ fontSize: 12, background: "var(--bg-code)", padding: "2px 6px", borderRadius: 4 }}>bun add @x402/next @x402/core</code></Callout>
              </Step>

              <Step num={2} id="middleware" title="Add Payment Middleware">
                <p className="text-body" style={{ marginBottom: 4 }}>The middleware intercepts requests to your paid endpoints. If no valid payment is attached, it automatically returns <code style={{ fontSize: 12, background: "var(--bg-code)", padding: "2px 6px", borderRadius: 4 }}>402</code> with the price.</p>
                <Code filename="middleware.ts" code={`import { paymentMiddleware } from "@x402/next"

export default paymentMiddleware({
  "GET /api/weather": {
    price: "$0.001",
    network: "base-sepolia",
    config: { description: "Weather data API" }
  },
  "POST /api/ai-summary": {
    price: "$0.01",
    network: "base-sepolia"
  }
})`}>{`import { paymentMiddleware } from "@x402/next"

export default paymentMiddleware({
  "GET /api/weather": {
    price: "$0.001",
    network: "base-sepolia",
    config: { description: "Weather data API" }
  },
  "POST /api/ai-summary": {
    price: "$0.01",
    network: "base-sepolia"
  }
})`}</Code>
                <Callout type="info"><strong style={{ color: "var(--text-1)" }}>Pricing:</strong> Set any USD amount. The protocol converts it to USDC on-chain.</Callout>
              </Step>

              <Step num={3} id="route" title="Write Your API Route">
                <p className="text-body" style={{ marginBottom: 4 }}>Your route stays exactly the same — the middleware handles payment. If the request reaches your handler, payment is already verified.</p>
                <Code filename="app/api/weather/route.ts" code={`import { NextResponse } from "next/server"

export async function GET() {
  // Only runs after payment is verified
  return NextResponse.json({
    city: "Tokyo",
    temp: "22°C",
    condition: "Sunny"
  })
}`}>{`import { NextResponse } from "next/server"

export async function GET() {
  // Only runs after payment is verified
  return NextResponse.json({
    city: "Tokyo",
    temp: "22°C",
    condition: "Sunny"
  })
}`}</Code>
              </Step>

              <Step num={4} id="deploy" title="Deploy to Vercel">
                <p className="text-body" style={{ marginBottom: 4 }}>Set three environment variables from the <a href="https://portal.cdp.coinbase.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-text)", textDecoration: "none" }}>Coinbase Developer Platform</a>, then deploy.</p>
                <Code filename="terminal" code={`vercel env add CDP_API_KEY_ID
vercel env add CDP_API_KEY_SECRET
vercel env add CDP_WALLET_SECRET
vercel deploy --prod`}>{`vercel env add CDP_API_KEY_ID
vercel env add CDP_API_KEY_SECRET
vercel env add CDP_WALLET_SECRET
vercel deploy --prod`}</Code>
                <Callout type="warn"><strong style={{ color: "var(--text-1)" }}>Security:</strong> Never commit CDP credentials to git.</Callout>
              </Step>

              <Step num={5} id="client" title="Client / Agent Integration">
                <p className="text-body" style={{ marginBottom: 4 }}><code style={{ fontSize: 12, background: "var(--bg-code)", padding: "2px 6px", borderRadius: 4 }}>x402Fetch</code> is a drop-in replacement for <code style={{ fontSize: 12, background: "var(--bg-code)", padding: "2px 6px", borderRadius: 4 }}>fetch()</code> that auto-handles 402 → pay → retry.</p>
                <Code filename="agent.ts" code={`import { x402Fetch } from "@x402/fetch"
import { createWallet } from "@x402/core"

const wallet = createWallet(process.env.PRIVATE_KEY)

// Auto-handles 402 → sign USDC → retry
const weather = await x402Fetch(
  "https://your-app.vercel.app/api/weather",
  { wallet }
)

console.log(weather) // { city: "Tokyo", temp: "22°C" }`}>{`import { x402Fetch } from "@x402/fetch"
import { createWallet } from "@x402/core"

const wallet = createWallet(process.env.PRIVATE_KEY)

// Auto-handles 402 → sign USDC → retry
const weather = await x402Fetch(
  "https://your-app.vercel.app/api/weather",
  { wallet }
)

console.log(weather) // { city: "Tokyo", temp: "22°C" }`}</Code>
              </Step>

              <Step num={6} id="testing" title="Test It Locally">
                <p className="text-body" style={{ marginBottom: 4 }}>Verify with curl: no payment → 402, with payment → 200.</p>
                <Code filename="terminal" code={`# 402 Payment Required
curl -i http://localhost:3000/api/weather

# 200 OK with data
curl -i -H "x-payment: test" http://localhost:3000/api/weather

# Free endpoint
curl -i http://localhost:3000/api/health`}>{`# 402 Payment Required
curl -i http://localhost:3000/api/weather

# 200 OK with data
curl -i -H "x-payment: test" http://localhost:3000/api/weather

# Free endpoint
curl -i http://localhost:3000/api/health`}</Code>
                <Callout type="tip">Try the interactive demo at <Link href="/demo" style={{ color: "var(--accent-text)", textDecoration: "none" }}>/demo</Link> to see 402 vs 200 in real time.</Callout>
              </Step>

              {/* ── Concepts ── */}
              <div id="concepts" style={{ marginBottom: 56, scrollMarginTop: 24 }}>
                <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>Key Concepts</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                  {[
                    { term: "x402 Protocol", def: "Open standard by Coinbase that adds payment to HTTP via the 402 status code." },
                    { term: "Facilitator", def: "Verifies payment signatures and settles on-chain. Coinbase runs a free one." },
                    { term: "EIP-3009", def: "Gasless USDC transfers. Users sign authorization — no ETH needed." },
                    { term: "Base Network", def: "Coinbase's L2. Sub-cent gas, 2s finality, built on Optimism." },
                  ].map(c => (
                    <div key={c.term} className="card">
                      <h4 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-1)", marginBottom: 4 }}>{c.term}</h4>
                      <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.5 }}>{c.def}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Resources ── */}
              <div id="resources" style={{ marginBottom: 40, scrollMarginTop: 24 }}>
                <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>Resources</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                  {[
                    { label: "x402 Docs", desc: "Full specification and API reference", href: "https://docs.x402.org" },
                    { label: "x402 GitHub", desc: "SDKs for TS/Python/Go/Java", href: "https://github.com/coinbase/x402" },
                    { label: "Ecosystem", desc: "200+ projects on x402", href: "https://www.x402.org/ecosystem" },
                    { label: "Source Code", desc: "This project on GitHub", href: "https://github.com/joinmouse/PayGate402" },
                    { label: "Coinbase CDP", desc: "Get API keys for settlement", href: "https://portal.cdp.coinbase.com" },
                    { label: "Base Network", desc: "L2 powering x402 payments", href: "https://base.org" },
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
      </div>
    </>
  );
}
