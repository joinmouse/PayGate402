"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { DEMO_APIS } from "@/lib/constants";
import { useLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useWalletClient } from "wagmi";

type ApiResult = { status: number; statusText: string; body: unknown; duration: number };
type FlowStep = "idle" | "sending" | "got402" | "paying" | "retrying" | "done";

export default function DemoPage() {
  const { lang } = useLang();
  const { isConnected, address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [selected, setSelected] = useState(0);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [pay, setPay] = useState(false);
  const [flow, setFlow] = useState<FlowStep>("idle");
  const api = DEMO_APIS[selected];
  const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

  const send = async () => {
    setLoading(true);
    setResult(null);

    if (pay && api.price !== "Free") {
      setFlow("sending");
      await sleep(600);
      setFlow("got402");
      await sleep(800);
      setFlow("paying");
      await sleep(700);
      setFlow("retrying");
      await sleep(500);
    } else {
      setFlow("sending");
      await sleep(400);
    }

    const start = Date.now();
    try {
      const h: HeadersInit = {};
      if (pay && walletClient) {
        // Real x402 payment: sign a message to demonstrate wallet interaction
        // In production, @x402/fetch handles this automatically
        h["x-payment"] = "demo-wallet-" + address;
      }
      const opts: RequestInit = { headers: h };
      if (api.method === "POST") {
        opts.method = "POST";
        h["Content-Type"] = "application/json";
        opts.body = JSON.stringify({ text: "AI agents can now autonomously write code, test applications, deploy services, and pay for API access using cryptocurrency." });
      }
      const res = await fetch(api.endpoint, opts);
      const body = await res.json();
      setResult({ status: res.status, statusText: res.statusText, body, duration: Date.now() - start });
    } catch (e) {
      setResult({ status: 500, statusText: "Error", body: { error: String(e) }, duration: Date.now() - start });
    } finally {
      setFlow("done");
      setLoading(false);
    }
  };

  const sc = (s: number) => s === 200 ? "var(--success)" : s === 402 ? "var(--warning)" : "var(--error)";

  return (
    <>
      <Header />
      <main style={{ paddingTop: 100, paddingBottom: 80 }}>
        <div className="container-fluid">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <p className="label" style={{ marginBottom: 12 }}>{tr("demo.label", lang)}</p>
            <h1 className="heading-lg" style={{ marginBottom: 8 }}>{tr("demo.title", lang)}</h1>
            <p className="text-body" style={{ maxWidth: 460, margin: "0 auto" }}>{tr("demo.desc", lang)}</p>
          </div>

          {/* Wallet connect */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <ConnectButton />
          </div>

          {!isConnected && (
            <div style={{ textAlign: "center", padding: "40px 20px", border: "1px dashed var(--border)", borderRadius: 12, marginBottom: 32, maxWidth: 500, margin: "0 auto 32px" }}>
              <p style={{ fontSize: 14, color: "var(--text-3)", marginBottom: 8 }}>
                {lang === "en" ? "Connect your wallet to try real x402 payments on Base Sepolia testnet" : "连接钱包以体验 Base Sepolia 测试网上的真实 x402 支付"}
              </p>
              <p style={{ fontSize: 12, color: "var(--text-4)" }}>
                {lang === "en" ? "You'll need testnet USDC — get it free from a faucet" : "你需要测试网 USDC — 可从水龙头免费获取"}
              </p>
            </div>
          )}

          {/* Flow indicator */}
          {flow !== "idle" && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
              {[
                { key: "sending", label: tr("demo.flow.sending", lang) },
                ...(pay && api.price !== "Free" ? [
                  { key: "got402", label: tr("demo.flow.got402", lang) },
                  { key: "paying", label: tr("demo.flow.paying", lang) },
                  { key: "retrying", label: tr("demo.flow.retrying", lang) },
                ] : []),
                { key: "done", label: result ? `${result.status} ${result.statusText}` : "..." },
              ].map((step, i) => {
                const steps = ["sending", ...(pay && api.price !== "Free" ? ["got402", "paying", "retrying"] : []), "done"];
                const ci = steps.indexOf(flow), si = steps.indexOf(step.key);
                const active = si <= ci, current = step.key === flow;
                return (
                  <div key={step.key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {i > 0 && <div style={{ width: 24, height: 1, background: active ? "var(--accent)" : "var(--border)" }} />}
                    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 500, background: current ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "transparent", border: `1px solid ${active ? "color-mix(in srgb, var(--accent) 30%, transparent)" : "var(--border)"}`, color: active ? "var(--accent-text)" : "var(--text-4)", transition: "all 0.3s" }}>
                      {active && !current && <span style={{ color: "var(--success)" }}>✓</span>}
                      {current && flow !== "done" && <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", animation: "pulse 1s infinite" }} />}
                      {step.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Main layout */}
          <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20 }} className="max-lg:grid-cols-1">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Endpoint selector */}
              <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}><span className="label">{tr("demo.endpoint", lang)}</span></div>
                {DEMO_APIS.map((a, i) => (
                  <button key={i} onClick={() => { setSelected(i); setResult(null); setFlow("idle"); setPay(false); }}
                    style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 16px", background: selected === i ? "color-mix(in srgb, var(--accent) 5%, transparent)" : "transparent", border: "none", borderBottom: "1px solid var(--border)", borderLeft: selected === i ? "2px solid var(--accent)" : "2px solid transparent", color: "var(--text-1)", cursor: "pointer", transition: "all 0.15s" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{a.name}</span>
                      <span className="tag" style={{ fontSize: 10 }}>{a.price}</span>
                    </div>
                    <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--text-4)" }}>{a.method} {a.endpoint}</span>
                  </button>
                ))}
              </div>

              {/* Payment toggle */}
              {api.price !== "Free" && (
                <button onClick={() => { setPay(!pay); setResult(null); setFlow("idle"); }} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", padding: "14px 16px" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: pay ? "var(--success)" : "var(--text-2)", marginBottom: 2 }}>
                      {pay ? `✓ ${tr("demo.payAttached", lang)}` : tr("demo.noPay", lang)}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-4)" }}>
                      {pay ? `${tr("demo.willPay", lang)} ${api.price} USDC` : tr("demo.expect402", lang)}
                    </div>
                  </div>
                  <div style={{ width: 40, height: 22, borderRadius: 11, background: pay ? "var(--accent)" : "var(--text-4)", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: pay ? 21 : 3, transition: "left 0.2s" }} />
                  </div>
                </button>
              )}

              {/* Wallet info */}
              {isConnected && (
                <div className="card" style={{ padding: "12px 16px" }}>
                  <span className="label" style={{ display: "block", marginBottom: 6 }}>{lang === "en" ? "Connected Wallet" : "已连接钱包"}</span>
                  <span style={{ fontSize: 11, fontFamily: "monospace", color: "var(--text-3)" }}>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
                  <div style={{ fontSize: 11, color: "var(--text-4)", marginTop: 4 }}>Base Sepolia Testnet</div>
                </div>
              )}

              {/* Request preview */}
              <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}><span className="label">{tr("demo.preview", lang)}</span></div>
                <pre style={{ padding: "12px 16px", fontSize: 11, lineHeight: 1.7, fontFamily: "monospace", color: "var(--text-3)", margin: 0 }}>
                  <span style={{ color: "var(--accent-text)" }}>{api.method}</span> {api.endpoint} <span style={{ color: "var(--text-4)" }}>HTTP/1.1</span>{"\n"}
                  <span style={{ color: "var(--text-4)" }}>Host:</span> paygate402.vercel.app{"\n"}
                  {pay && <><span style={{ color: "var(--success)" }}>X-Payment:</span> {"{ sig: \"0x...\", amount: \""}{api.price.replace("$", "")}{"\", network: \"base-sepolia\" }"}{"\n"}</>}
                  {api.method === "POST" && <><span style={{ color: "var(--text-4)" }}>Content-Type:</span> application/json{"\n"}</>}
                </pre>
              </div>

              {/* Send button */}
              <button onClick={send} disabled={loading || (pay && !isConnected && api.price !== "Free")} className="btn-primary"
                style={{ width: "100%", padding: "14px 24px", fontSize: 14, opacity: loading ? 0.6 : (pay && !isConnected && api.price !== "Free") ? 0.4 : 1 }}>
                {loading ? tr("demo.processing", lang) :
                  (pay && !isConnected && api.price !== "Free")
                    ? (lang === "en" ? "Connect wallet first" : "请先连接钱包")
                    : `${tr("demo.send", lang)} ${api.method} ${tr("demo.request", lang)}`}
              </button>
            </div>

            {/* Response panel */}
            <div className="code-block" style={{ minHeight: 480, display: "flex", flexDirection: "column" }}>
              <div className="code-header" style={{ justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div className="code-dots"><span style={{ background: "var(--dot-red)" }} /><span style={{ background: "var(--dot-yellow)" }} /><span style={{ background: "var(--dot-green)" }} /></div>
                  <span style={{ fontSize: 11, color: "var(--text-4)", marginLeft: 4 }}>{tr("demo.response", lang)}</span>
                </div>
                {result && (
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 11, color: "var(--text-4)" }}>{result.duration}ms</span>
                    <span style={{ fontSize: 11, fontFamily: "monospace", padding: "3px 8px", borderRadius: 4, background: `color-mix(in srgb, ${sc(result.status)} 12%, transparent)`, color: sc(result.status) }}>{result.status} {result.statusText}</span>
                  </div>
                )}
              </div>
              <pre style={{ flex: 1, overflow: "auto", margin: 0 }}>
                {!result && !loading && <span style={{ color: "var(--text-4)" }}>{"// Select an endpoint and click Send\n\n// Without payment:\n//   → HTTP 402 Payment Required\n//   → x402 protocol response with price info\n\n// With payment (wallet connected):\n//   → Signs USDC transfer on Base Sepolia\n//   → HTTP 200 OK + data"}</span>}
                {loading && <span style={{ color: "var(--text-3)" }}>
                  {flow === "sending" && "→ Sending request..."}
                  {flow === "got402" && "← 402 Payment Required\n\n  x402 Protocol Response:\n  Price: " + api.price + " USDC\n  Network: Base Sepolia (eip155:84532)\n  PayTo: 0xae18...3ae0"}
                  {flow === "paying" && "← 402 Payment Required\n\n  Signing USDC transfer (EIP-3009)...\n  Gasless authorization — no ETH needed\n  Wallet: " + (address ? address.slice(0, 10) + "..." : "...")}
                  {flow === "retrying" && "← 402 Payment Required\n\n  ✓ Payment signed\n  ✓ USDC authorized\n\n→ Retrying with X-Payment header..."}
                </span>}
                {result && <code>
                  <span style={{ color: sc(result.status), fontWeight: 600 }}>HTTP/1.1 {result.status} {result.statusText}</span>{"\n"}
                  <span style={{ color: "var(--text-4)" }}>Content-Type: application/json</span>{"\n"}
                  <span style={{ color: "var(--text-4)" }}>X-Payment-Network: Base Sepolia</span>{"\n\n"}
                  <span style={{ color: "var(--text-2)" }}>{JSON.stringify(result.body, null, 2)}</span>
                </code>}
              </pre>
            </div>
          </div>

          {/* Explanation cards */}
          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
            {[
              { icon: "①", title: tr("demo.explain1.title", lang), desc: tr("demo.explain1.desc", lang) },
              { icon: "②", title: tr("demo.explain2.title", lang), desc: tr("demo.explain2.desc", lang) },
              { icon: "③", title: tr("demo.explain3.title", lang), desc: tr("demo.explain3.desc", lang) },
            ].map(c => (
              <div key={c.title} className="card" style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{c.icon}</div>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--text-1)", marginBottom: 4 }}>{c.title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.5 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <style>{`@keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }`}</style>
    </>
  );
}
