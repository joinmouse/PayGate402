"use client";
import { useLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

function CodeDots() {
  return <div className="code-dots"><span style={{ background: "var(--dot-red)" }} /><span style={{ background: "var(--dot-yellow)" }} /><span style={{ background: "var(--dot-green)" }} /></div>;
}

export default function CodeExample() {
  const { lang } = useLang();
  return (
    <section style={{ padding: "clamp(48px, 6vh, 80px) 0" }}>
      <div className="divider" />
      <div className="container-fluid" style={{ paddingTop: "clamp(48px, 6vh, 80px)" }}>
        <p className="label" style={{ textAlign: "center", marginBottom: 12 }}>{tr("code.label", lang)}</p>
        <h2 className="heading-lg" style={{ textAlign: "center", marginBottom: "clamp(40px, 5vh, 64px)" }}>{tr("code.title", lang)}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))", gap: 20 }}>
          <div>
            <p className="label" style={{ color: "var(--success)", marginBottom: 12 }}>{tr("code.server", lang)}</p>
            <div className="code-block"><div className="code-header"><CodeDots /></div>
              <pre><code>
<span style={{ color: "var(--code-keyword)" }}>import</span> <span style={{ color: "var(--code-default)" }}>{"{ paymentMiddleware }"}</span> <span style={{ color: "var(--code-keyword)" }}>from</span> <span style={{ color: "var(--code-string)" }}>&apos;@x402/next&apos;</span>{"\n\n"}
<span style={{ color: "var(--code-keyword)" }}>export default</span> <span style={{ color: "var(--code-fn)" }}>paymentMiddleware</span>{"({\n"}
{"  "}<span style={{ color: "var(--code-string)" }}>&apos;GET /api/weather&apos;</span>{": {\n"}
{"    "}price: <span style={{ color: "var(--code-string)" }}>&apos;$0.001&apos;</span>,{"\n"}
{"    "}network: <span style={{ color: "var(--code-string)" }}>&apos;base-sepolia&apos;</span>,{"\n"}
{"  },\n"}
{"  "}<span style={{ color: "var(--code-string)" }}>&apos;POST /api/ai-summary&apos;</span>{": {\n"}
{"    "}price: <span style={{ color: "var(--code-string)" }}>&apos;$0.01&apos;</span>,{"\n"}
{"    "}network: <span style={{ color: "var(--code-string)" }}>&apos;base-sepolia&apos;</span>,{"\n"}
{"  },\n})"}</code></pre></div>
          </div>
          <div>
            <p className="label" style={{ color: "var(--accent)", marginBottom: 12 }}>{tr("code.client", lang)}</p>
            <div className="code-block"><div className="code-header"><CodeDots /></div>
              <pre><code>
<span style={{ color: "var(--code-keyword)" }}>import</span> <span style={{ color: "var(--code-default)" }}>{"{ x402Fetch }"}</span> <span style={{ color: "var(--code-keyword)" }}>from</span> <span style={{ color: "var(--code-string)" }}>&apos;@x402/fetch&apos;</span>{"\n"}
<span style={{ color: "var(--code-keyword)" }}>import</span> <span style={{ color: "var(--code-default)" }}>{"{ createWallet }"}</span> <span style={{ color: "var(--code-keyword)" }}>from</span> <span style={{ color: "var(--code-string)" }}>&apos;@x402/core&apos;</span>{"\n\n"}
<span style={{ color: "var(--code-comment)" }}>{"// Agent wallet funded with USDC"}</span>{"\n"}
<span style={{ color: "var(--code-keyword)" }}>const</span> wallet = <span style={{ color: "var(--code-fn)" }}>createWallet</span>(key){"\n\n"}
<span style={{ color: "var(--code-comment)" }}>{"// Auto-handles 402 → pay → retry"}</span>{"\n"}
<span style={{ color: "var(--code-keyword)" }}>const</span> data = <span style={{ color: "var(--code-keyword)" }}>await</span> <span style={{ color: "var(--code-fn)" }}>x402Fetch</span>({"'\n"}
{"  "}<span style={{ color: "var(--code-string)" }}>&apos;https://api.example.com/weather&apos;</span>,{"\n"}
{"  "}{"{ wallet },\n)"}{"\n\n"}
console.<span style={{ color: "var(--code-fn)" }}>log</span>(data) <span style={{ color: "var(--code-comment)" }}>{"// { city: 'Tokyo', temp: '22C' }"}</span>
              </code></pre></div>
          </div>
        </div>
      </div>
    </section>
  );
}
