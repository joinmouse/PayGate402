import Link from "next/link";
import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 font-bold">
          <span className="text-xl">&#x26A1;</span>
          <span>{SITE.name}</span>
        </div>

        <nav className="flex items-center gap-6 text-sm text-zinc-400">
          <Link href="/docs" className="hover:text-white transition">Docs</Link>
          <Link href="/demo" className="hover:text-white transition">Demo</Link>
          <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub</a>
        </nav>

        <div className="text-sm text-zinc-500">
          Built on{" "}
          <a href="https://www.x402.org" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition">
            x402 protocol
          </a>
          {" "}&bull;{" "}
          <a href="https://base.org" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition">
            Base network
          </a>
        </div>
      </div>
    </footer>
  );
}
