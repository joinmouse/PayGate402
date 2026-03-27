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
    setLoading(true);
    setResult(null);
    try {
      const h: HeadersInit = {};
      if (pay) h["x-payment"] = "demo-signature";

      const opts: RequestInit = { headers: h };
      if (api.method === "POST") {
        opts.method = "POST";
        h["Content-Type"] = "application/json";
        opts.body = JSON.stringify({ text: "AI agents can now autonomously write code, test applications, deploy services, and pay for API access using cryptocurrency." });
      }

      const res = await fetch(api.endpoint, opts);
      setResult({ status: res.status, statusText: res.statusText, body: await res.json() });
    } catch (e) {
      setResult({ status: 500, statusText: "Error", body: { error: String(e) } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-28 pb-16 px-[6%]">
        <div className="mx-auto max-w-[1400px]">
          <div className="text-center mb-14">
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-500 mb-3">Demo</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Try the 402 flow</h1>
            <p className="text-[15px] text-zinc-500">Toggle payment to compare 402 vs 200 responses.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Controls */}
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-2xl border border-white/[0.06] overflow-hidden">
                <div className="px-5 py-3 border-b border-white/[0.06]">
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-zinc-500">Endpoint</span>
                </div>
                {DEMO_APIS.map((a, i) => (
                  <button
                    key={i}
                    onClick={() => { setSelected(i); setResult(null); }}
                    className={`w-full text-left px-5 py-3.5 border-b border-white/[0.04] last:border-0 transition-colors ${
                      selected === i ? "bg-white/[0.03]" : "hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-medium">{a.name}</span>
                      <span className={`text-[11px] font-mono ${a.price === "Free" ? "text-emerald-500" : "text-amber-400"}`}>{a.price}</span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-600">{a.method} {a.endpoint}</span>
                  </button>
                ))}
              </div>

              {api.price !== "Free" && (
                <button
                  onClick={() => { setPay(!pay); setResult(null); }}
                  className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl border border-white/[0.06] hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-[13px]">
                    {pay ? <span className="text-emerald-400">Payment attached</span> : <span className="text-zinc-500">No payment</span>}
                  </span>
                  <div className={`w-9 h-5 rounded-full relative transition-colors ${pay ? "bg-indigo-600" : "bg-zinc-700"}`}>
                    <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-all ${pay ? "left-[18px]" : "left-[3px]"}`} />
                  </div>
                </button>
              )}

              <button
                onClick={send}
                disabled={loading}
                className="w-full text-sm font-medium bg-white text-black py-3 rounded-xl hover:bg-zinc-200 disabled:opacity-40 transition-colors"
              >
                {loading ? "Sending..." : `Send ${api.method} request`}
              </button>
            </div>

            {/* Response */}
            <div className="lg:col-span-3">
              <div className="code-block min-h-[400px]">
                <div className="code-header justify-between">
                  <div className="flex items-center gap-2">
                    <div className="dots"><span className="bg-[#ff5f57]" /><span className="bg-[#febc2e]" /><span className="bg-[#28c840]" /></div>
                    <span className="text-[11px] text-zinc-600 ml-1">Response</span>
                  </div>
                  {result && (
                    <span className={`text-[11px] font-mono ${
                      result.status === 200 ? "text-emerald-400" : result.status === 402 ? "text-amber-400" : "text-red-400"
                    }`}>
                      {result.status} {result.statusText}
                    </span>
                  )}
                </div>
                <pre className="overflow-auto max-h-[480px]">
                  {!result && !loading && (
                    <span className="text-zinc-600">
                      {"// Select an endpoint and click Send\n"}
                      {"// Toggle payment to see 402 vs 200"}
                    </span>
                  )}
                  {loading && <span className="text-zinc-500">Fetching...</span>}
                  {result && (
                    <code>
                      <span className={result.status === 200 ? "text-emerald-400" : result.status === 402 ? "text-amber-400" : "text-red-400"}>
                        HTTP/1.1 {result.status} {result.statusText}
                      </span>
                      {"\n\n"}
                      <span className="text-zinc-400">{JSON.stringify(result.body, null, 2)}</span>
                    </code>
                  )}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
