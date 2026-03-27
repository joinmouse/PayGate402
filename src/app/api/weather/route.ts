import { NextRequest, NextResponse } from "next/server";

// Simulates a paid weather API endpoint
// In production, x402 middleware would handle 402 responses automatically
export async function GET(req: NextRequest) {
  const paymentHeader = req.headers.get("x-payment");

  // If no payment header, return 402
  if (!paymentHeader) {
    return NextResponse.json(
      {
        error: "Payment Required",
        message: "This endpoint requires payment via x402 protocol.",
        payment: {
          price: "$0.001",
          token: "USDC",
          network: "base-sepolia",
          receiver: "0x0000000000000000000000000000000000000000",
          description: "Weather data API - per request pricing",
        },
        docs: "https://docs.x402.org",
      },
      {
        status: 402,
        headers: {
          "X-Payment-Required": JSON.stringify({
            price: "0.001",
            currency: "USDC",
            network: "base-sepolia",
          }),
        },
      }
    );
  }

  // Payment received — return weather data
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
    payment: { status: "settled", amount: "$0.001", tx: "0xdemo..." },
  });
}
