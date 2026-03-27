import { NextRequest, NextResponse } from "next/server";
import { withX402 } from "@x402/next";
import { server, weatherRoute } from "@/lib/x402";

// Business logic — only runs after payment is verified and settled
const handler = async (_req: NextRequest) => {
  const cities = [
    { city: "Tokyo", temp: "22°C", condition: "Sunny", humidity: "45%", wind: "12 km/h" },
    { city: "New York", temp: "18°C", condition: "Cloudy", humidity: "62%", wind: "20 km/h" },
    { city: "London", temp: "14°C", condition: "Rainy", humidity: "78%", wind: "25 km/h" },
    { city: "Singapore", temp: "31°C", condition: "Humid", humidity: "85%", wind: "8 km/h" },
    { city: "Dubai", temp: "38°C", condition: "Clear", humidity: "20%", wind: "15 km/h" },
  ];

  const data = cities[Math.floor(Math.random() * cities.length)];

  return NextResponse.json({
    ...data,
    timestamp: new Date().toISOString(),
    powered_by: "PayGate402 x402",
  });
};

// Wrap with x402 payment protection
// Without valid payment: returns 402 with price info
// With valid payment: runs handler, then settles USDC on-chain
export const GET = withX402(handler, weatherRoute, server);
