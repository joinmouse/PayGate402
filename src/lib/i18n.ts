import type { Lang } from "./lang";

const t = {
  // ── Header ──
  "nav.howItWorks": { en: "How it Works", zh: "工作原理" },
  "nav.features": { en: "Features", zh: "功能特性" },
  "nav.pricing": { en: "Pricing", zh: "定价" },
  "nav.demo": { en: "Demo", zh: "演示" },
  "nav.docs": { en: "Docs", zh: "文档" },
  "nav.tryDemo": { en: "Try Demo", zh: "试用" },

  // ── Hero ──
  "hero.badge": { en: "Built on the x402 open protocol", zh: "基于 x402 开放协议构建" },
  "hero.title1": { en: "Pay any API with crypto.", zh: "用加密货币支付任何 API。" },
  "hero.title2": { en: "One line of code.", zh: "只需一行代码。" },
  "hero.desc": { en: "Accept USDC micropayments for your APIs on Base. No accounts, no KYC — AI agents pay autonomously.", zh: "在 Base 网络上为你的 API 接受 USDC 微支付。无需注册、无需 KYC — AI Agent 自主支付。" },
  "hero.cta1": { en: "Try Demo", zh: "试用演示" },
  "hero.cta2": { en: "Documentation", zh: "查看文档" },

  // ── HowItWorks ──
  "how.label": { en: "How it works", zh: "工作原理" },
  "how.title": { en: "Four steps. Zero friction.", zh: "四个步骤，零配置。" },
  "how.s1.title": { en: "Request API", zh: "请求 API" },
  "how.s1.desc": { en: "Agent sends a standard HTTP request to your endpoint.", zh: "Agent 向你的端点发送标准 HTTP 请求。" },
  "how.s2.title": { en: "Receive 402", zh: "收到 402" },
  "how.s2.desc": { en: "Server returns price, token, chain in the response header.", zh: "服务器在响应头中返回价格、代币和链信息。" },
  "how.s3.title": { en: "Sign USDC", zh: "签名 USDC" },
  "how.s3.desc": { en: "Agent signs a gasless USDC transfer via EIP-3009 and retries.", zh: "Agent 通过 EIP-3009 签署免 Gas 的 USDC 转账并重试。" },
  "how.s4.title": { en: "Get Data", zh: "获取数据" },
  "how.s4.desc": { en: "Payment settles on-chain via facilitator. Server returns data.", zh: "支付通过 Facilitator 在链上结算，服务器返回数据。" },

  // ── Features ──
  "feat.label": { en: "Features", zh: "功能特性" },
  "feat.title": { en: "Everything you need", zh: "你需要的一切" },
  "feat.1.title": { en: "Micropayments", zh: "微支付" },
  "feat.1.desc": { en: "Charge from $0.001 per request. Impossible with credit cards, trivial on Base L2.", zh: "每次请求最低 $0.001。信用卡做不到，Base L2 轻松实现。" },
  "feat.2.title": { en: "Gasless USDC", zh: "免 Gas USDC" },
  "feat.2.desc": { en: "EIP-3009 transferWithAuthorization. Users only need USDC — zero ETH for gas.", zh: "EIP-3009 授权转账。用户只需 USDC，无需 ETH 支付 Gas。" },
  "feat.3.title": { en: "One-line setup", zh: "一行代码集成" },
  "feat.3.desc": { en: "Add paymentMiddleware() to Next.js, Express, or Hono. Ship in minutes.", zh: "在 Next.js、Express 或 Hono 中添加 paymentMiddleware()，几分钟即可上线。" },
  "feat.4.title": { en: "Base settlement", zh: "Base 链结算" },
  "feat.4.desc": { en: "Sub-cent gas fees. 2-second finality. Powered by Coinbase's Base network.", zh: "不到 1 美分的 Gas 费，2 秒确认。由 Coinbase 的 Base 网络驱动。" },
  "feat.5.title": { en: "Agent-native", zh: "Agent 原生" },
  "feat.5.desc": { en: "No accounts, no KYC, no API keys. AI agents pay autonomously.", zh: "无需注册、无需 KYC、无需 API Key。AI Agent 自主支付。" },
  "feat.6.title": { en: "Open standard", zh: "开放标准" },
  "feat.6.desc": { en: "Built on x402 by Coinbase. Fully permissionless and vendor-neutral.", zh: "基于 Coinbase 的 x402 协议，完全无许可、厂商中立。" },

  // ── CodeExample ──
  "code.label": { en: "Integration", zh: "集成方式" },
  "code.title": { en: "Server and client", zh: "服务端与客户端" },
  "code.server": { en: "Server — middleware.ts", zh: "服务端 — middleware.ts" },
  "code.client": { en: "Client — agent.ts", zh: "客户端 — agent.ts" },

  // ── Pricing ──
  "price.label": { en: "Pricing", zh: "定价" },
  "price.title": { en: "Simple pricing", zh: "简单定价" },
  "price.desc": { en: "Zero protocol fees. Only network gas (< $0.01 on Base).", zh: "零协议费用，仅需网络 Gas（Base 上不到 $0.01）。" },
  "price.free": { en: "Free", zh: "免费" },
  "price.free.desc": { en: "For testing", zh: "用于测试" },
  "price.growth": { en: "Growth", zh: "增长版" },
  "price.growth.desc": { en: "For production", zh: "用于生产" },
  "price.enterprise": { en: "Enterprise", zh: "企业版" },
  "price.enterprise.desc": { en: "High volume", zh: "大规模使用" },
  "price.popular": { en: "Popular", zh: "最受欢迎" },
  "price.cta.start": { en: "Get Started", zh: "开始使用" },
  "price.cta.build": { en: "Start Building", zh: "开始构建" },
  "price.cta.contact": { en: "Contact Us", zh: "联系我们" },

  // ── CTA ──
  "cta.title": { en: "Ready to monetize your API?", zh: "准备好让你的 API 赚钱了吗？" },
  "cta.desc": { en: "Join 200+ projects in the x402 ecosystem.", zh: "加入 x402 生态中的 200+ 项目。" },

  // ── Demo ──
  "demo.label": { en: "Interactive Playground", zh: "交互式演示" },
  "demo.title": { en: "Experience the 402 Flow", zh: "体验 402 支付流程" },
  "demo.desc": { en: "Call real API endpoints. Toggle payment to see what happens when you pay — and when you don't.", zh: "调用真实 API。切换支付状态，看看付款和不付款时会发生什么。" },
  "demo.endpoint": { en: "Endpoint", zh: "端点" },
  "demo.payAttached": { en: "Payment attached", zh: "已附加支付" },
  "demo.noPay": { en: "No payment", zh: "无支付" },
  "demo.willPay": { en: "Will pay", zh: "将支付" },
  "demo.expect402": { en: "Server will return 402", zh: "服务器将返回 402" },
  "demo.preview": { en: "Request preview", zh: "请求预览" },
  "demo.send": { en: "Send", zh: "发送" },
  "demo.request": { en: "Request", zh: "请求" },
  "demo.processing": { en: "Processing...", zh: "处理中..." },
  "demo.response": { en: "Response", zh: "响应" },
  "demo.flow.sending": { en: "Request sent", zh: "请求已发送" },
  "demo.flow.got402": { en: "402 received", zh: "收到 402" },
  "demo.flow.paying": { en: "Signing USDC", zh: "签名 USDC" },
  "demo.flow.retrying": { en: "Retrying", zh: "重试中" },
  "demo.explain1.title": { en: "No payment = 402", zh: "无支付 = 402" },
  "demo.explain1.desc": { en: "Without X-Payment header, the server returns 402 with pricing info.", zh: "没有 X-Payment 头时，服务器返回 402 和定价信息。" },
  "demo.explain2.title": { en: "Agent signs USDC", zh: "Agent 签名 USDC" },
  "demo.explain2.desc": { en: "The client signs a gasless EIP-3009 authorization — no ETH needed.", zh: "客户端签署免 Gas 的 EIP-3009 授权——无需 ETH。" },
  "demo.explain3.title": { en: "Retry = 200 + data", zh: "重试 = 200 + 数据" },
  "demo.explain3.desc": { en: "Retrying with the payment header returns 200 and the actual data.", zh: "带支付头重试后返回 200 和实际数据。" },

  // ── Footer ──
  "footer.docs": { en: "Docs", zh: "文档" },
  "footer.demo": { en: "Demo", zh: "演示" },
} as const;

type Key = keyof typeof t;

export function useT() {
  // This will be called inside components that have access to useLang
  // We return a function that takes a key
  return { t };
}

export function tr(key: Key, lang: Lang): string {
  return t[key]?.[lang] ?? t[key]?.["en"] ?? key;
}
