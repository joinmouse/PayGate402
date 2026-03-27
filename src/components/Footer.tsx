import Link from "next/link";
import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[13px] text-zinc-600">
        <span>{SITE.name}</span>
        <nav className="flex items-center gap-5">
          <Link href="/docs" className="hover:text-zinc-300 transition-colors">Docs</Link>
          <Link href="/demo" className="hover:text-zinc-300 transition-colors">Demo</Link>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">GitHub</a>
          <a href="https://www.x402.org" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-300 transition-colors">x402</a>
        </nav>
      </div>
    </footer>
  );
}
