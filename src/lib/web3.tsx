"use client";

import dynamic from "next/dynamic";

// Prevent SSR issues with wagmi/rainbowkit (they access localStorage, indexedDB)
const Web3ProviderInner = dynamic(
  () => import("./web3-inner").then((mod) => mod.Web3ProviderInner),
  { ssr: false },
);

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return <Web3ProviderInner>{children}</Web3ProviderInner>;
}
