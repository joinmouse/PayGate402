"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

type Lang = "en" | "zh";

const i18n = {
  en: {
    label: "Documentation",
    title: "Quick Start Guide",
    subtitle: "Add crypto payments to any API in 5 minutes. Server setup, deployment, and client integration.",
    onThisPage: "On this page",
    overviewTitle: "What is x402?",
    overviewP1: 'HTTP 402 "Payment Required" has been reserved since 1997 but never implemented — because the internet had no native payment layer. x402 changes that.',
    overviewP2: "When a client requests your API without paying, your server returns HTTP 402 with the price. The client signs a gasless USDC transfer and retries. Payment settles on-chain and data is returned.",
    overviewCallout: "Why does this matter? AI agents can't fill out credit card forms. With x402, they pay APIs autonomously — no accounts, no KYC, no API keys.",
    prereqTitle: "Prerequisites",
    prereqs: ["Node.js 18+ (or Bun)", "A Next.js, Express, or Hono project", "Coinbase Developer Platform account", "A Vercel account (for deployment)"],
    steps: [
      { title: "Install the SDK", desc: "Install the x402 middleware for your framework." },
      { title: "Add Payment Middleware", desc: "The middleware intercepts requests. No valid payment → automatic 402 with pricing." },
      { title: "Write Your API Route", desc: "Your route stays the same — middleware handles payment. If the request reaches your handler, payment is verified." },
      { title: "Deploy to Vercel", desc: "Set three environment variables from Coinbase Developer Platform, then deploy." },
      { title: "Client / Agent Integration", desc: "x402Fetch is a drop-in fetch() replacement that auto-handles 402 → pay → retry." },
      { title: "Test It Locally", desc: "Verify with curl: no payment → 402, with payment → 200." },
    ],
    tipBun: "Using Bun? Run",
    pricingCallout: "Pricing: Set any USD amount. The protocol converts to USDC on-chain.",
    securityCallout: "Security: Never commit CDP credentials to git.",
    testTip: "Try the interactive demo at",
    testTipLink: "/demo",
    testTipText: "to see 402 vs 200 in real time.",
    conceptsTitle: "Key Concepts",
    concepts: [
      { term: "x402 Protocol", def: "Open standard by Coinbase that adds payment to HTTP via the 402 status code." },
      { term: "Facilitator", def: "Verifies payment signatures and settles on-chain. Coinbase runs a free one." },
      { term: "EIP-3009", def: "Gasless USDC transfers. Users sign authorization — no ETH needed." },
      { term: "Base Network", def: "Coinbase's L2. Sub-cent gas, 2s finality, built on Optimism." },
    ],
    resourcesTitle: "Resources",
  },
  zh: {
    label: "文档",
    title: "快速开始",
    subtitle: "5 分钟内为任何 API 添加加密支付。包含服务端配置、部署和客户端集成。",
    onThisPage: "本页目录",
    overviewTitle: "什么是 x402？",
    overviewP1: "HTTP 402「需要付款」状态码自 1997 年保留至今从未启用——因为互联网没有原生支付层。x402 改变了这一切。",
    overviewP2: "当客户端请求你的 API 但未付款时，服务器返回 HTTP 402 及价格信息。客户端签署一笔免 Gas 的 USDC 转账并重试。支付在链上结算，数据随即返回。",
    overviewCallout: "为什么重要？AI Agent 无法填写信用卡表单。通过 x402，它们可以用自己的钱包自主支付 API——无需注册、无需 KYC、无需 API Key。",
    prereqTitle: "前置条件",
    prereqs: ["Node.js 18+（或 Bun）", "Next.js / Express / Hono 项目", "Coinbase 开发者平台账号", "Vercel 账号（用于部署）"],
    steps: [
      { title: "安装 SDK", desc: "安装 x402 中间件。" },
      { title: "添加支付中间件", desc: "中间件拦截请求。未付款时自动返回 402 及定价信息。" },
      { title: "编写 API 路由", desc: "你的路由代码不需要改动——中间件处理支付。请求到达你的 handler 时，付款已验证。" },
      { title: "部署到 Vercel", desc: "在 Coinbase 开发者平台获取三个环境变量，然后部署。" },
      { title: "客户端 / Agent 集成", desc: "x402Fetch 是 fetch() 的替代品，自动处理 402 → 支付 → 重试。" },
      { title: "本地测试", desc: "用 curl 验证：无支付 → 402，有支付 → 200。" },
    ],
    tipBun: "使用 Bun？运行",
    pricingCallout: "定价：设定任意美元金额，协议自动转换为链上 USDC。",
    securityCallout: "安全提醒：永远不要将 CDP 密钥提交到 git。",
    testTip: "试试交互式 Demo",
    testTipLink: "/demo",
    testTipText: "实时查看 402 与 200 的区别。",
    conceptsTitle: "核心概念",
    concepts: [
      { term: "x402 协议", def: "Coinbase 推出的开放标准，通过 HTTP 402 状态码为 API 添加支付能力。" },
      { term: "Facilitator", def: "验证支付签名并在链上结算的服务。Coinbase 提供免费实例。" },
      { term: "EIP-3009", def: "免 Gas 的 USDC 转账标准。用户只需签名授权，无需 ETH。" },
      { term: "Base 网络", def: "Coinbase 的 L2 区块链。Gas 费不到 1 美分，2 秒确认。" },
    ],
    resourcesTitle: "相关资源",
  },
};

const sectionLabels = {
  en: ["Overview", "Prerequisites", "1. Install", "2. Middleware", "3. API Route", "4. Deploy", "5. Client", "6. Test It", "Key Concepts", "Resources"],
  zh: ["概述", "前置条件", "1. 安装", "2. 中间件", "3. API 路由", "4. 部署", "5. 客户端", "6. 测试", "核心概念", "相关资源"],
};

const sectionIds = ["overview", "prerequisites", "install", "middleware", "route", "deploy", "client", "testing", "concepts", "resources"];

const resources = [
  { label: "x402 Docs", desc: "Full specification and API reference", href: "https://docs.x402.org" },
  { label: "x402 GitHub", desc: "SDKs for TS/Python/Go/Java", href: "https://github.com/coinbase/x402" },
  { label: "Ecosystem", desc: "200+ projects on x402", href: "https://www.x402.org/ecosystem" },
  { label: "Source Code", desc: "This project on GitHub", href: "https://github.com/joinmouse/PayGate402" },
  { label: "Coinbase CDP", desc: "Get API keys", href: "https://portal.cdp.coinbase.com" },
  { label: "Base Network", desc: "L2 powering payments", href: "https://base.org" },
];

/* ── Shared components ── */
function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }, [text]);
  return <button onClick={copy} aria-label="Copy" style={{ marginLeft: "auto", background: "none", border: "1px solid var(--border)", borderRadius: 6, padding: "4px 10px", fontSize: 11, color: copied ? "var(--success)" : "var(--text-4)", cursor: "pointer" }}>{copied ? "Copied!" : "Copy"}</button>;
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
  const c = { info: "var(--accent)", tip: "var(--success)", warn: "var(--warning)" }[type];
  const icon = { info: "💡", tip: "✅", warn: "⚠️" }[type];
  return (
    <div style={{ display: "flex", gap: 12, padding: "14px 16px", borderRadius: 10, border: `1px solid color-mix(in srgb, ${c} 25%, transparent)`, background: `color-mix(in srgb, ${c} 6%, transparent)`, marginBottom: 24, fontSize: 13, lineHeight: 1.6, color: "var(--text-2)" }}>
      <span style={{ fontSize: 16, lineHeight: 1.3, flexShrink: 0 }}>{icon}</span>
      <div>{children}</div>
    </div>
  );
}

function StepBlock({ num, id, title, children }: { num: number; id: string; title: string; children: React.ReactNode }) {
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

/* ── Code snippets (shared between languages) ── */
const codeSnippets = {
  install: "npm install @x402/next @x402/core",
  middleware: `import { paymentMiddleware } from "@x402/next"

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
})`,
  route: `import { NextResponse } from "next/server"

export async function GET() {
  // Only runs after payment is verified
  return NextResponse.json({
    city: "Tokyo",
    temp: "22°C",
    condition: "Sunny"
  })
}`,
  deploy: `vercel env add CDP_API_KEY_ID
vercel env add CDP_API_KEY_SECRET
vercel env add CDP_WALLET_SECRET
vercel deploy --prod`,
  client: `import { x402Fetch } from "@x402/fetch"
import { createWallet } from "@x402/core"

const wallet = createWallet(process.env.PRIVATE_KEY)

// Auto-handles 402 → sign USDC → retry
const weather = await x402Fetch(
  "https://your-app.vercel.app/api/weather",
  { wallet }
)

console.log(weather) // { city: "Tokyo", temp: "22°C" }`,
  test: `# 402 Payment Required
curl -i http://localhost:3000/api/weather

# 200 OK with data
curl -i -H "x-payment: test" http://localhost:3000/api/weather

# Free endpoint
curl -i http://localhost:3000/api/health`,
};

const filenames = ["terminal", "middleware.ts", "app/api/weather/route.ts", "terminal", "agent.ts", "terminal"];
const codeKeys: (keyof typeof codeSnippets)[] = ["install", "middleware", "route", "deploy", "client", "test"];

/* ── Page ── */
export default function DocsPage() {
  const [active, setActive] = useState("overview");
  const [lang, setLang] = useState<Lang>("en");
  const t = i18n[lang];
  const labels = sectionLabels[lang];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { for (const e of entries) { if (e.isIntersecting) setActive(e.target.id); } },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    sectionIds.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Header />

      <div style={{ display: "flex", paddingTop: 56, minHeight: "100vh" }}>

        {/* ── Sidebar ── */}
        <aside className="hidden lg:flex" style={{ width: 220, flexShrink: 0, flexDirection: "column", position: "fixed", top: 56, bottom: 0, left: 0, borderRight: "1px solid var(--border)", background: "var(--bg)", padding: "24px 12px", overflowY: "auto" }}>
          <p className="label" style={{ marginBottom: 12, paddingLeft: 8 }}>{t.onThisPage}</p>
          <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {sectionIds.map((id, i) => (
              <a key={id} href={`#${id}`} className={`docs-link ${active === id ? "active" : ""}`}
                onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); }}
              >{labels[i]}</a>
            ))}
          </nav>

          {/* Language switch */}
          <div className="divider" style={{ margin: "20px 0" }} />
          <p className="label" style={{ marginBottom: 8, paddingLeft: 8 }}>Language</p>
          <div style={{ display: "flex", gap: 4, paddingLeft: 4 }}>
            {(["en", "zh"] as const).map(l => (
              <button key={l} onClick={() => setLang(l)}
                style={{ padding: "4px 12px", fontSize: 12, borderRadius: 6, border: "1px solid var(--border)", background: lang === l ? "var(--tag-bg)" : "transparent", color: lang === l ? "var(--accent-text)" : "var(--text-4)", cursor: "pointer", fontWeight: lang === l ? 600 : 400 }}>
                {l === "en" ? "EN" : "中文"}
              </button>
            ))}
          </div>
        </aside>

        {/* ── Content ── */}
        <div className="lg:ml-[220px]" style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 720, padding: "32px clamp(24px, 5vw, 48px) 80px" }}>

            <p className="label" style={{ marginBottom: 8 }}>{t.label}</p>
            <h1 className="heading-lg" style={{ marginBottom: 12 }}>{t.title}</h1>
            <p className="text-body" style={{ marginBottom: 40 }}>{t.subtitle}</p>

            {/* Mobile language toggle */}
            <div className="lg:hidden" style={{ display: "flex", gap: 8, marginBottom: 32 }}>
              {(["en", "zh"] as const).map(l => (
                <button key={l} onClick={() => setLang(l)}
                  style={{ padding: "6px 16px", fontSize: 13, borderRadius: 6, border: "1px solid var(--border)", background: lang === l ? "var(--tag-bg)" : "transparent", color: lang === l ? "var(--accent-text)" : "var(--text-4)", cursor: "pointer" }}>
                  {l === "en" ? "English" : "中文"}
                </button>
              ))}
            </div>

            {/* Overview */}
            <div id="overview" style={{ marginBottom: 56, scrollMarginTop: 80 }}>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--text-1)", marginBottom: 12 }}>{t.overviewTitle}</h2>
              <p className="text-body" style={{ marginBottom: 16 }}>{t.overviewP1}</p>
              <p className="text-body" style={{ marginBottom: 16 }}>{t.overviewP2}</p>
              <Callout type="info"><strong style={{ color: "var(--text-1)" }}>{t.overviewCallout}</strong></Callout>
            </div>

            {/* Prerequisites */}
            <div id="prerequisites" style={{ marginBottom: 56, scrollMarginTop: 80 }}>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--text-1)", marginBottom: 12 }}>{t.prereqTitle}</h2>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {t.prereqs.map((item, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", fontSize: 14, color: "var(--text-2)" }}>
                    <span style={{ color: "var(--success)" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Steps 1-6 */}
            {t.steps.map((step, i) => (
              <StepBlock key={i} num={i + 1} id={sectionIds[i + 2]} title={step.title}>
                <p className="text-body" style={{ marginBottom: 4 }}>{step.desc}</p>
                <Code filename={filenames[i]} code={codeSnippets[codeKeys[i]]}>{codeSnippets[codeKeys[i]]}</Code>
                {i === 0 && <Callout type="tip">{t.tipBun} <code style={{ fontSize: 12, background: "var(--bg-code)", padding: "2px 6px", borderRadius: 4 }}>bun add @x402/next @x402/core</code></Callout>}
                {i === 1 && <Callout type="info"><strong style={{ color: "var(--text-1)" }}>{t.pricingCallout}</strong></Callout>}
                {i === 3 && <Callout type="warn"><strong style={{ color: "var(--text-1)" }}>{t.securityCallout}</strong></Callout>}
                {i === 5 && <Callout type="tip">{t.testTip} <Link href={t.testTipLink} style={{ color: "var(--accent-text)", textDecoration: "none" }}>/demo</Link> {t.testTipText}</Callout>}
              </StepBlock>
            ))}

            {/* Concepts */}
            <div id="concepts" style={{ marginBottom: 56, scrollMarginTop: 80 }}>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>{t.conceptsTitle}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                {t.concepts.map(c => (
                  <div key={c.term} className="card">
                    <h4 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-1)", marginBottom: 4 }}>{c.term}</h4>
                    <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.5 }}>{c.def}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div id="resources" style={{ marginBottom: 40, scrollMarginTop: 80 }}>
              <h2 style={{ fontSize: "1.125rem", fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>{t.resourcesTitle}</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
                {resources.map(r => (
                  <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className="card" style={{ textDecoration: "none", display: "block" }}>
                    <h4 style={{ fontSize: 14, fontWeight: 600, color: "var(--accent-text)", marginBottom: 4 }}>{r.label} →</h4>
                    <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.5 }}>{r.desc}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile nav */}
            <div className="lg:hidden" style={{ marginTop: 48, display: "flex", gap: 12 }}>
              <Link href="/" className="btn-secondary" style={{ flex: 1 }}>← Home</Link>
              <Link href="/demo" className="btn-primary" style={{ flex: 1 }}>Try Demo →</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:ml-[220px]"><Footer /></div>
    </>
  );
}
