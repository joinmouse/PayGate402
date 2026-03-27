"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { DEMO_APIS } from "@/lib/constants";

type ApiResult = { status: number; statusText: string; body: unknown; duration: number };
type FlowStep = "idle" | "sending" | "got402" | "paying" | "retrying" | "done";

export default function DemoPage() {
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
      // Simulate the full 402 flow with visual steps
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
      if (pay) h["x-payment"] = "demo-signature";
      const opts: RequestInit = { headers: h };
      if (api.method === "POST") {
        opts.method = "POST";
        h["Content-Type"] = "application/json";
        opts.body = JSON.stringify({ text: "AI agents can now autonomously write code, test applications, deploy services, and pay for API access using cryptocurrency. This represents a fundamental shift in developer experience." });
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

  const statusColor = (s: number) =>
    s === 200 ? "var(--success)" : s === 402 ? "var(--warning)" : "var(--error)";

  return (
    <>
      <Header />
      <main style={{ paddingTop: 100, paddingBottom: 80 }}>
        <div className="container-fluid">

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="label" style={{ marginBottom: 12 }}>Interactive Playground</p>
            <h1 className="heading-lg" style={{ marginBottom: 8 }}>Experience the 402 Flow</h1>
            <p className="text-body" style={{ maxWidth: 460, margin: "0 auto" }}>
              Call real API endpoints. Toggle payment to see what happens when you pay — and when you don&apos;t.
            </p>
          </div>

          {/* Flow indicator */}
          {flow !== "idle" && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
              {[
                { key: "sending", label: "Request sent" },
                ...(pay && api.price !== "Free" ? [
                  { key: "got402", label: "402 received" },
                  { key: "paying", label: "Signing USDC" },
                  { key: "retrying", label: "Retrying" },
                ] : []),
                { key: "done", label: result ? `${result.status} ${result.statusText}` : "..." },
              ].map((step, i) => {
                const steps = ["sending", ...(pay && api.price !== "Free" ? ["got402", "paying", "retrying"] : []), "done"];
                const currentIdx = steps.indexOf(flow);
                const stepIdx = steps.indexOf(step.key);
                const isActive = stepIdx <= currentIdx;
                const isCurrent = step.key === flow;
                return (
                  <div key={step.key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    {i > 0 && <div style={{ width: 24, height: 1, background: isActive ? "var(--accent)" : "var(--border)" }} />}
                    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 500, background: isCurrent ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "transparent", border: `1px solid ${isActive ? "color-mix(in srgb, var(--accent) 30%, transparent)" : "var(--border)"}`, color: isActive ? "var(--accent-text)" : "var(--text-4)", transition: "all 0.3s ease" }}>
                      {isActive && !isCurrent && <span style={{ color: "var(--success)" }}>✓</span>}
                      {isCurrent && flow !== "done" && <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", animation: "pulse 1s infinite" }} />}
                      {step.label}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Main layout */}
          <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 20 }} className="max-lg:grid-cols-1">

            {/* Left panel */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>

              {/* Endpoint selector */}
              <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
                  <span className="label">Endpoint</span>
                </div>
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
                <button onClick={() => { setPay(!pay); setResult(null); setFlow("idle"); }}
                  className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", padding: "14px 16px" }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: pay ? "var(--success)" : "var(--text-2)", marginBottom: 2 }}>
                      {pay ? "✓ Payment attached" : "No payment"}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text-4)" }}>
                      {pay ? `Will pay ${api.price} USDC` : "Server will return 402"}
                    </div>
                  </div>
                  <div style={{ width: 40, height: 22, borderRadius: 11, background: pay ? "var(--accent)" : "var(--text-4)", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
                    <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: pay ? 21 : 3, transition: "left 0.2s" }} />
                  </div>
                </button>
              )}

              {/* Request preview */}
              <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
                  <span className="label">Request preview</span>
                </div>
                <pre style={{ padding: "12px 16px", fontSize: 11, lineHeight: 1.7, fontFamily: "monospace", color: "var(--text-3)", margin: 0 }}>
                  <span style={{ color: "var(--accent-text)" }}>{api.method}</span> {api.endpoint} <span style={{ color: "var(--text-4)" }}>HTTP/1.1</span>{"\n"}
                  <span style={{ color: "var(--text-4)" }}>Host:</span> localhost:3000{"\n"}
                  {pay && <><span style={{ color: "var(--success)" }}>X-Payment:</span> {"{"} sig: &quot;0xab...&quot;, amount: &quot;{api.price.replace("$","")}&quot; {"}"}{"\n"}</>}
                  {api.method === "POST" && <><span style={{ color: "var(--text-4)" }}>Content-Type:</span> application/json{"\n"}</>}
                </pre>
              </div>

              {/* Send button */}
              <button onClick={send} disabled={loading} className="btn-primary"
                style={{ width: "100%", padding: "14px 24px", fontSize: 14, opacity: loading ? 0.6 : 1 }}>
                {loading ? "Processing..." : `Send ${api.method} Request`}
              </button>
            </div>

            {/* Right panel — Response */}
            <div className="code-block" style={{ minHeight: 480, display: "flex", flexDirection: "column" }}>
              <div className="code-header" style={{ justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div className="code-dots">
                    <span style={{ background: "var(--dot-red)" }} />
                    <span style={{ background: "var(--dot-yellow)" }} />
                    <span style={{ background: "var(--dot-green)" }} />
                  </div>
                  <span style={{ fontSize: 11, color: "var(--text-4)", marginLeft: 4 }}>Response</span>
                </div>
                {result && (
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 11, color: "var(--text-4)" }}>{result.duration}ms</span>
                    <span style={{ fontSize: 11, fontFamily: "monospace", padding: "3px 8px", borderRadius: 4, background: `color-mix(in srgb, ${statusColor(result.status)} 12%, transparent)`, color: statusColor(result.status) }}>
                      {result.status} {result.statusText}
                    </span>
                  </div>
                )}
              </div>
              <pre style={{ flex: 1, overflow: "auto", margin: 0 }}>
                {!result && !loading && (
                  <span style={{ color: "var(--text-4)" }}>
                    {"// Select an endpoint and click Send\n\n"}
                    {"// Without payment:\n"}
                    {"//   → HTTP 402 Payment Required\n"}
                    {"//   → { price, token, network }\n\n"}
                    {"// With payment:\n"}
                    {"//   → HTTP 200 OK\n"}
                    {"//   → { actual data }"}
                  </span>
                )}
                {loading && (
                  <span style={{ color: "var(--text-3)" }}>
                    {flow === "sending" && "→ Sending request..."}
                    {flow === "got402" && "← 402 Payment Required\n\n  Server requires $" + api.price.replace("$","") + " USDC\n\n→ Preparing payment..."}
                    {flow === "paying" && "← 402 Payment Required\n\n  Signing USDC transfer (EIP-3009)...\n  No gas needed — gasless authorization"}
                    {flow === "retrying" && "← 402 Payment Required\n\n  ✓ Payment signed\n\n→ Retrying with X-Payment header..."}
                  </span>
                )}
                {result && (
                  <code>
                    <span style={{ color: statusColor(result.status), fontWeight: 600 }}>
                      HTTP/1.1 {result.status} {result.statusText}
                    </span>
                    {"\n"}
                    <span style={{ color: "var(--text-4)" }}>Content-Type: application/json</span>
                    {"\n\n"}
                    <span style={{ color: "var(--text-2)" }}>{JSON.stringify(result.body, null, 2)}</span>
                  </code>
                )}
              </pre>
            </div>
          </div>

          {/* Explanation */}
          <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
            {[
              { icon: "①", title: "No payment = 402", desc: "Without X-Payment header, the server returns 402 with pricing info." },
              { icon: "②", title: "Agent signs USDC", desc: "The client signs a gasless EIP-3009 authorization — no ETH needed." },
              { icon: "③", title: "Retry = 200 + data", desc: "Retrying with the payment header returns 200 and the actual data." },
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
