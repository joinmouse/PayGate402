import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { LangProvider } from "@/lib/lang";
import { Web3Provider } from "@/lib/web3";

export const metadata: Metadata = {
  title: "PayGate402 — The x402 Payment Gateway for AI Agents",
  description: "Accept USDC micropayments for your APIs with one line of code. Built on the x402 protocol.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent FOUC: apply saved theme before paint */}
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            const t = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
            document.documentElement.classList.toggle('dark', t === 'dark');
          } catch(e) {}
        ` }} />
      </head>
      <body>
        <ThemeProvider><LangProvider><Web3Provider>{children}</Web3Provider></LangProvider></ThemeProvider>
      </body>
    </html>
  );
}
