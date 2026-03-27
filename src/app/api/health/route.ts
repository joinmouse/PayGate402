import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "PayGate402",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: {
      free: ["/api/health"],
      paid: [
        { path: "/api/weather", price: "$0.001", method: "GET" },
        { path: "/api/ai-summary", price: "$0.01", method: "POST" },
      ],
    },
  });
}
