"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { DEMO_APIS } from "@/lib/constants";

type ApiResult = { status: number; statusText: string; body: unknown };

export default function DemoPage() {
  const [selected, setSelected] = useState(0);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [pay, setPay] = useState(false);
  const api = DEMO_APIS[selected];

  const send = async () => {
    setLoading(true); setResult(null);
    try {
      const h: HeadersInit = {};
      if (pay) h["x-payment"] = "demo-signature";
      const opts: RequestInit = { headers: h };
      if (api.method === "POST") {
        opts.method = "POST"; h["Content-Type"] = "application/json";
        opts.body = JSON.stringify({ text: "AI agents can now autonomously write code, test applications, deploy services, and pay for API access using cryptocurrency." });
      }
      const res = await fetch(api.endpoint, opts);
      setResult({ status: res.status, statusText: res.statusText, body: await res.json() });
    } catch (e) { setResult({ status: 500, statusText: "Error", body: { error: String(e) } }); }
    finally { setLoading(false); }
  };

  return (
    <>
      <Header />
      <main style={{ paddingTop: 100, paddingBottom: 60 }}>
        <div className="container-fluid">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="label" style={{ marginBottom: 12 }}>Demo</p>
            <h1 className="heading-lg" style={{ marginBottom: 8 }}>Try the 402 flow</h1>
            <p className="text-body">Toggle payment to compare 402 vs 200 responses.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: 20 }}>
            {/* Controls */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="card" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ padding: "14px 20px", borderBottom: "1px solid #1e1e21" }}>
                  <span className="label">Endpoint</span>
                </div>
                {DEMO_APIS.map((a, i) => (
                  <button key={i} onClick={() => { setSelected(i); setResult(null); }}
                    style={{ display: "block", width: "100%", textAlign: "left", padding: "14px 20px", background: selected === i ? "rgba(255,255,255,0.02)" : "transparent", border: "none", borderBottom: "1px solid #1a1a1d", color: "#ededed", cursor: "pointer", transition: "background 0.15s" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{a.name}</span>
                      <span style={{ fontSize: 11, fontFamily: "monospace", color: a.price === "Free" ? "#34d399" : "#eab308" }}>{a.price}</span>
                    </div>
                    <span style={{ fontSize: 11, fontFamily: "monospace", color: "#555" }}>{a.method} {a.endpoint}</span>
                  </button>
                ))}
              </div>

              {api.price !== "Free" && (
                <button onClick={() => { setPay(!pay); setResult(null); }} className="card"
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", border: "1px solid #1e1e21", background: "#141415" }}>
                  <span style={{ fontSize: 13, color: pay ? "#34d399" : "#666" }}>{pay ? "Payment attached" : "No payment (expect 402)"}</span>
                  <div style={{ width: 36, height: 20, borderRadius: 10, background: pay ? "#6366f1" : "#333", position: "relative", transition: "background 0.15s" }}>
                    <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#fff", position: "absolute", top: 3, left: pay ? 19 : 3, transition: "left 0.15s" }} />
                  </div>
                </button>
              )}

              <button onClick={send} disabled={loading} className="btn-primary" style={{ justifyContent: "center", width: "100%", padding: "12px 24px", opacity: loading ? 0.5 : 1 }}>
                {loading ? "Sending..." : `Send ${api.method} request`}
              </button>
            </div>

            {/* Response */}
            <div className="code-block" style={{ minHeight: 380 }}>
              <div className="code-header" style={{ justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div className="code-dots"><span style={{ background: "#ff5f57" }} /><span style={{ background: "#febc2e" }} /><span style={{ background: "#28c840" }} /></div>
                  <span style={{ fontSize: 11, color: "#555", marginLeft: 4 }}>Response</span>
                </div>
                {result && (
                  <span style={{ fontSize: 11, fontFamily: "monospace", color: result.status === 200 ? "#34d399" : result.status === 402 ? "#eab308" : "#ef4444" }}>
                    {result.status} {result.statusText}
                  </span>
                )}
              </div>
              <pre style={{ maxHeight: 440, overflow: "auto" }}>
                {!result && !loading && <span style={{ color: "#444" }}>{"// Click \"Send request\" to see the response\n// Toggle payment to compare 402 vs 200"}</span>}
                {loading && <span style={{ color: "#666" }}>Fetching...</span>}
                {result && (
                  <code>
                    <span style={{ color: result.status === 200 ? "#34d399" : result.status === 402 ? "#eab308" : "#ef4444" }}>
                      HTTP/1.1 {result.status} {result.statusText}
                    </span>
                    {"\n\n"}
                    <span style={{ color: "#999" }}>{JSON.stringify(result.body, null, 2)}</span>
                  </code>
                )}
              </pre>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
