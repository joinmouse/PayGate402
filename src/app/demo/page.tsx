"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { DEMO_APIS } from "@/lib/constants";
import { motion } from "framer-motion";
import { Send, ToggleLeft, ToggleRight, CircleDot, Loader2 } from "lucide-react";

type ApiResult = {
  status: number;
  statusText: string;
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
          signature: "0xdemo_signature_abc123",
          amount: api.price.replace("$", ""),
          token: "USDC",
          chain: "base-sepolia",
        });
      }

      const options: RequestInit = { headers };
      if (api.method === "POST") {
        options.method = "POST";
        options.body = JSON.stringify({
          text: "Artificial intelligence is transforming how we build software. AI agents can now autonomously write code, test applications, deploy services, and even pay for API access using cryptocurrency. This represents a fundamental shift in the developer experience.",
        });
        headers["Content-Type"] = "application/json";
      }

      const res = await fetch(api.endpoint, options);
      const body = await res.json();

      setResult({
        status: res.status,
        statusText: res.statusText,
        body,
        paid: withPayment,
      });
    } catch (err) {
      setResult({ status: 500, statusText: "Error", body: { error: String(err) }, paid: false });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="pt-24 pb-16 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-14"
          >
            <p className="text-indigo-400 text-sm font-medium uppercase tracking-widest mb-3">Interactive Demo</p>
            <h1 className="text-4xl font-bold tracking-tight mb-4">Experience the 402 Flow</h1>
            <p className="text-zinc-500 text-lg">Toggle payment on/off to see the difference between 402 and 200.</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Control Panel */}
            <div className="lg:col-span-2 space-y-5">
              {/* API Selector */}
              <div className="bg-[#111113] border border-[#1e1e22] rounded-2xl p-5">
                <h3 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-4">Select Endpoint</h3>
                <div className="space-y-2">
                  {DEMO_APIS.map((a, i) => (
                    <button
                      key={i}
                      onClick={() => { setSelectedApi(i); setResult(null); }}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                        selectedApi === i
                          ? "border-indigo-500/40 bg-indigo-500/[0.06]"
                          : "border-[#1e1e22] bg-[#0c0c0e] hover:border-[#2a2a30]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[13px] font-medium">{a.name}</span>
                        <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${
                          a.price === "Free"
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}>
                          {a.price}
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-600 font-mono">{a.method} {a.endpoint}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Toggle */}
              {api.price !== "Free" && (
                <div className="bg-[#111113] border border-[#1e1e22] rounded-2xl p-5">
                  <h3 className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest mb-4">Payment Header</h3>
                  <button
                    onClick={() => { setWithPayment(!withPayment); setResult(null); }}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl border border-[#1e1e22] bg-[#0c0c0e] hover:border-[#2a2a30] transition-all"
                  >
                    <span className="text-[13px]">
                      {withPayment ? (
                        <span className="text-emerald-400 flex items-center gap-2">
                          <CircleDot className="w-3.5 h-3.5" />
                          Payment attached
                        </span>
                      ) : (
                        <span className="text-zinc-500">No payment (expect 402)</span>
                      )}
                    </span>
                    {withPayment
                      ? <ToggleRight className="w-6 h-6 text-indigo-400" />
                      : <ToggleLeft className="w-6 h-6 text-zinc-600" />
                    }
                  </button>
                </div>
              )}

              {/* Send */}
              <button
                onClick={callApi}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/20"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {loading ? "Sending..." : `Send ${api.method} Request`}
              </button>
            </div>

            {/* Response Panel */}
            <div className="lg:col-span-3">
              <div className="code-block min-h-[460px]">
                <div className="code-header justify-between">
                  <div className="flex items-center gap-2">
                    <div className="dots">
                      <span className="bg-[#ff5f57]" />
                      <span className="bg-[#febc2e]" />
                      <span className="bg-[#28c840]" />
                    </div>
                    <span className="text-[11px] text-zinc-500 ml-2">Response</span>
                  </div>
                  {result && (
                    <span className={`text-[11px] font-mono px-2.5 py-1 rounded-md border ${
                      result.status === 200
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : result.status === 402
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                    }`}>
                      {result.status} {result.statusText}
                    </span>
                  )}
                </div>
                <pre className="overflow-auto max-h-[500px]">
                  {!result && !loading && (
                    <span className="text-zinc-600">
                      {"// Click \"Send Request\" to see the response\n"}
                      {"// Toggle payment to compare 402 vs 200\n\n"}
                      {"// Without payment → HTTP 402 Payment Required\n"}
                      {"// With payment    → HTTP 200 OK + data"}
                    </span>
                  )}
                  {loading && (
                    <span className="text-zinc-500 animate-pulse">Fetching...</span>
                  )}
                  {result && (
                    <code>
                      <span className={
                        result.status === 200 ? "text-emerald-400" :
                        result.status === 402 ? "text-amber-400" : "text-red-400"
                      }>
                        HTTP/1.1 {result.status} {result.statusText}
                      </span>
                      {"\n\n"}
                      <span className="text-zinc-300">
                        {JSON.stringify(result.body, null, 2)}
                      </span>
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
