import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { server, aiSummaryRoute } from "@/lib/x402";

// Business logic — only runs after payment is verified
const postHandler = async (req: NextRequest) => {
  let text = "The quick brown fox jumps over the lazy dog.";
  try {
    const body = await req.json();
    if (body.text) text = body.text;
  } catch {
    // use default
  }

  const wordCount = text.split(/\s+/).length;
  const summary = wordCount > 20
    ? text.split(/\s+/).slice(0, Math.ceil(wordCount * 0.3)).join(" ") + "..."
    : text;

  return NextResponse.json({
    original_length: text.length,
    summary_length: summary.length,
    summary,
    model: "paygate402-summarizer-v1",
    timestamp: new Date().toISOString(),
    powered_by: "PayGate402 x402",
  });
};

const getHandler = async (_req: NextRequest) => {
  return NextResponse.json({
    message: "Use POST with { text: '...' } body.",
    price: "$0.01 USDC on Base Sepolia",
  });
};

export const POST = withX402(postHandler, aiSummaryRoute, server);
export const GET = withX402(getHandler, aiSummaryRoute, server);
