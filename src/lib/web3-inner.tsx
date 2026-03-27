"use client";

import { getDefaultConfig, RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTheme } from "@/lib/theme";
import "@rainbow-me/rainbowkit/styles.css";

const config = getDefaultConfig({
  appName: "PayGate402",
  projectId: "paygate402-demo",
  chains: [baseSepolia],
});

const queryClient = new QueryClient();

export function Web3ProviderInner({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={theme === "dark" ? darkTheme({ accentColor: "#6366f1" }) : lightTheme({ accentColor: "#6366f1" })}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
