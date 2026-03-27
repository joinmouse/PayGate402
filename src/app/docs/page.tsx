"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect } from "react";

const sections = [
  { id: "install", label: "Install SDK" },
  { id: "middleware", label: "Add Middleware" },
  { id: "route", label: "API Route" },
  { id: "deploy", label: "Deploy" },
  { id: "client", label: "Client / Agent" },
  { id: "resources", label: "Resources" },
];

function CodeDots() {
  return <div className="code-dots"><span style={{ background: "var(--dot-red)" }} /><span style={{ background: "var(--dot-yellow)" }} /><span style={{ background: "var(--dot-green)" }} /></div>;
}

function Step({ num, id, title, children }: { num: number; id: string; title: string; children: React.ReactNode }) {
  return (
    <div id={id} style={{ marginBottom: 48, scrollMarginTop: 80 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <span className="step-num">{num}</span>
        <h2 className="heading-md">{title}</h2>
      </div>
      {children}
    </div>
  );
}

export default function DocsPage() {
  const [active, setActive] = useState("install");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />
      <main style={{ paddingTop: 80, paddingBottom: 60 }}>
        <div className="container-fluid" style={{ maxWidth: 1000 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }} className="lg:grid-cols-[200px_1fr] lg:gap-12">

            {/* Sidebar — desktop only */}
            <aside className="hidden lg:block" style={{ position: "sticky", top: 80, alignSelf: "start", paddingTop: 32 }}>
              <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {sections.map(s => (
                  <a key={s.id} href={`#${s.id}`} className={`docs-link ${active === s.id ? "active" : ""}`}>{s.label}</a>
                ))}
              </nav>
              <div className="divider" style={{ margin: "16px 0" }} />
              <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Link href="/" className="docs-link">← Home</Link>
                <Link href="/demo" className="docs-link">→ Try Demo</Link>
                <Link href="/pricing" className="docs-link">→ Pricing</Link>
              </nav>
            </aside>

            {/* Content */}
            <div style={{ paddingTop: 32 }}>
              <p className="label" style={{ marginBottom: 12 }}>Documentation</p>
              <h1 className="heading-lg" style={{ marginBottom: 8 }}>Quick Start Guide</h1>
              <p className="text-body" style={{ marginBottom: 48 }}>Get your API accepting crypto payments in under 5 minutes.</p>

              <Step num={1} id="install" title="Install the SDK">
                <div className="code-block"><pre><code>npm install @x402/next @x402/core</code></pre></div>
              </Step>

              <Step num={2} id="middleware" title="Add Payment Middleware">
                <div className="code-block">
                  <div className="code-header"><CodeDots /><span style={{ fontSize: 11, color: "var(--text-4)", marginLeft: 8, fontFamily: "monospace" }}>middleware.ts</span></div>
                  <pre><code>{`import { paymentMiddleware } from "@x402/next"

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
              </Step>

              <Step num={3} id="route" title="Write Your API Route">
                <div className="code-block">
                  <div className="code-header"><CodeDots /><span style={{ fontSize: 11, color: "var(--text-4)", marginLeft: 8, fontFamily: "monospace" }}>app/api/weather/route.ts</span></div>
                  <pre><code>{`import { NextResponse } from "next/server"

export async function GET() {
  // Only reached after payment is verified
  return NextResponse.json({
    city: "Tokyo",
    temp: "22°C",
    condition: "Sunny"
  })
}`}</code></pre>
                </div>
              </Step>

              <Step num={4} id="deploy" title="Deploy to Vercel">
                <div className="code-block">
                  <pre><code>{`# Set environment variables
vercel env add CDP_API_KEY_ID
vercel env add CDP_API_KEY_SECRET
vercel env add CDP_WALLET_SECRET

# Deploy
vercel deploy --prod`}</code></pre>
                </div>
              </Step>

              <Step num={5} id="client" title="Client / Agent Integration">
                <div className="code-block">
                  <div className="code-header"><CodeDots /><span style={{ fontSize: 11, color: "var(--text-4)", marginLeft: 8, fontFamily: "monospace" }}>agent.ts</span></div>
                  <pre><code>{`import { x402Fetch } from "@x402/fetch"

// x402Fetch auto-handles 402 → pay → retry
const weather = await x402Fetch(
  "https://your-app.vercel.app/api/weather",
  { wallet }
)

console.log(weather) // { city: "Tokyo", temp: "22°C" }`}</code></pre>
                </div>
              </Step>

              <div id="resources" style={{ scrollMarginTop: 80 }}>
                <h2 className="heading-md" style={{ marginBottom: 16 }}>Resources</h2>
                <div className="card">
                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      { label: "x402 Protocol Documentation", href: "https://docs.x402.org" },
                      { label: "x402 GitHub Repository", href: "https://github.com/coinbase/x402" },
                      { label: "x402 Ecosystem Directory", href: "https://www.x402.org/ecosystem" },
                      { label: "PayGate402 Source Code", href: "https://github.com/joinmouse/PayGate402" },
                    ].map(r => (
                      <li key={r.href}>
                        <a href={r.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: "var(--accent-text)", textDecoration: "none" }}>
                          {r.label} →
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Mobile nav links */}
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
