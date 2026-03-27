import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PayGate402 — The x402 Payment Gateway for AI Agents",
  description: "Accept USDC micropayments for your APIs with one line of code. Built on the x402 protocol for AI agents and developers.",
  openGraph: {
    title: "PayGate402 — Pay Any API with Crypto",
    description: "The x402 payment gateway for AI agents. Accept USDC micropayments on Base.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
