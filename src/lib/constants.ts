export const SITE = {
  name: "PayGate402",
  tagline: "Pay Any API with Crypto. One Line of Code.",
  description: "The x402 payment gateway for AI agents and developers. Accept USDC micropayments on Base.",
  github: "https://github.com/joinmouse/PayGate402",
  docs: "/docs",
  demo: "/demo",
} as const;

export const DEMO_APIS = [
  {
    name: "Weather API",
    endpoint: "/api/weather",
    price: "$0.001",
    description: "Real-time weather data for any city",
    method: "GET",
  },
  {
    name: "AI Summary API",
    endpoint: "/api/ai-summary",
    price: "$0.01",
    description: "AI-powered text summarization",
    method: "POST",
  },
  {
    name: "Health Check",
    endpoint: "/api/health",
    price: "Free",
    description: "Service health status (no payment required)",
    method: "GET",
  },
] as const;
