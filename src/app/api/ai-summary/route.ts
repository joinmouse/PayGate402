import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const paymentHeader = req.headers.get("x-payment");

  if (!paymentHeader) {
    return NextResponse.json(
      {
        error: "Payment Required",
        message: "This endpoint requires payment via x402 protocol.",
        payment: {
          price: "$0.01",
          token: "USDC",
          network: "base-sepolia",
          receiver: "0x0000000000000000000000000000000000000000",
          description: "AI text summarization - per request pricing",
        },
        docs: "https://docs.x402.org",
      },
      {
        status: 402,
        headers: {
          "X-Payment-Required": JSON.stringify({
            price: "0.01",
            currency: "USDC",
            network: "base-sepolia",
          }),
        },
      }
    );
  }

  // Simulate AI summary
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
    payment: { status: "settled", amount: "$0.01", tx: "0xdemo..." },
  });
}

export async function GET() {
  return NextResponse.json(
    {
      error: "Payment Required",
      message: "Use POST with { text: '...' } body. Payment via x402 required.",
      payment: { price: "$0.01", token: "USDC", network: "base-sepolia" },
    },
    { status: 402 }
  );
}
