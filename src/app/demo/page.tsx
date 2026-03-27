"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { DEMO_APIS } from "@/lib/constants";

type ApiResult = {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: unknown;
  paid: boolean;
};

export default function DemoPage() {
  const [selectedApi, setSelectedApi] = useState(0);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [withPayment, setWithPayment] = useState(false);

  const api = DEMO_APIS[selectedApi];

  const callApi = async () => {
    setLoading(true);
    setResult(null);

    try {
      const headers: HeadersInit = {};
      if (withPayment) {
        headers["x-payment"] = JSON.stringify({
          signature: "0xdemo_signature_abc123...",
          amount: api.price.replace("$", ""),
          token: "USDC",
          chain: "base-sepolia",
        });
      }

      const options: RequestInit = { headers };
      if (api.method === "POST") {
        options.method = "POST";
        options.body = JSON.stringify({
          text: "Artificial intelligence is transforming how we build software. AI agents can now autonomously write code, test applications, deploy services, and even pay for API access using cryptocurrency. This represents a fundamental shift in the developer experience, moving from manual integration to agent-driven workflows.",
        });
        headers["Content-Type"] = "application/json";
      }

      const res = await fetch(api.endpoint, options);
      const body = await res.json();

      setResult({
        status: res.status,
        statusText: res.statusText,
        headers: {
          "content-type": res.headers.get("content-type") || "",
          ...(res.headers.get("x-payment-required")
            ? { "x-payment-required": res.headers.get("x-payment-required") || "" }
            : {}),
        },
        body,
        paid: withPayment,
      });
    } catch (err) {
      setResult({
        status: 500,
        statusText: "Error",
        headers: {},
        body: { error: String(err) },
        paid: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Interactive Demo</h1>
            <p className="text-zinc-400 text-lg">
              Experience the x402 payment flow. Toggle payment on/off to see the difference.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Control Panel */}
            <div className="space-y-6">
              {/* API Selector */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Select API</h3>
                <div className="space-y-3">
                  {DEMO_APIS.map((a, i) => (
                    <button
                      key={i}
                      onClick={() => { setSelectedApi(i); setResult(null); }}
                      className={`w-full text-left p-4 rounded-xl border transition ${
                        selectedApi === i
                          ? "border-blue-500/50 bg-blue-600/10"
                          : "border-zinc-800 bg-zinc-800/30 hover:border-zinc-600"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold">{a.name}</span>
                        <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                          a.price === "Free" ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"
                        }`}>
                          {a.price}
                        </span>
                      </div>
                      <div className="text-sm text-zinc-400">{a.description}</div>
                      <div className="text-xs text-zinc-500 font-mono mt-1">{a.method} {a.endpoint}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Toggle */}
              {api.price !== "Free" && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Payment</h3>
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm">
                      {withPayment ? (
                        <span className="text-green-400">Payment header attached</span>
                      ) : (
                        <span className="text-zinc-400">No payment (will get 402)</span>
                      )}
                    </span>
                    <div
                      className={`w-12 h-6 rounded-full transition relative ${
                        withPayment ? "bg-blue-600" : "bg-zinc-700"
                      }`}
                      onClick={() => { setWithPayment(!withPayment); setResult(null); }}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition ${
                          withPayment ? "left-6" : "left-0.5"
                        }`}
                      />
                    </div>
                  </label>
                </div>
              )}

              {/* Send Button */}
              <button
                onClick={callApi}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-4 rounded-xl transition text-base"
              >
                {loading ? "Sending..." : `Send ${api.method} Request`}
              </button>
            </div>

            {/* Response Panel */}
            <div className="code-block min-h-[400px]">
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
                <span className="text-xs text-zinc-500">Response</span>
                {result && (
                  <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                    result.status === 200
                      ? "bg-green-500/20 text-green-400"
                      : result.status === 402
                        ? "bg-amber-500/20 text-amber-400"
                        : "bg-red-500/20 text-red-400"
                  }`}>
                    {result.status} {result.statusText}
                  </span>
                )}
              </div>
              <pre className="text-sm p-4 overflow-auto max-h-[500px]">
                {!result && !loading && (
                  <span className="text-zinc-500">
                    {`// Click "Send Request" to see the response\n// Toggle payment to compare 402 vs 200`}
                  </span>
                )}
                {loading && <span className="text-zinc-500 animate-pulse">Fetching...</span>}
                {result && (
                  <code>
                    <span className={result.status === 200 ? "text-green-400" : result.status === 402 ? "text-amber-400" : "text-red-400"}>
                      HTTP/1.1 {result.status} {result.statusText}
                    </span>
                    {"\n"}
                    {Object.entries(result.headers).map(([k, v]) => (
                      <span key={k} className="text-zinc-500">{k}: {v}{"\n"}</span>
                    ))}
                    {"\n"}
                    <span className="text-zinc-300">{JSON.stringify(result.body, null, 2)}</span>
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
