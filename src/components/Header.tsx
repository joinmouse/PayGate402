"use client";

import Link from "next/link";
import { useState } from "react";
import { SITE } from "@/lib/constants";

const nav = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Demo", href: "/demo" },
  { label: "Docs", href: "/docs" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 w-full z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="mx-auto max-w-[1400px] px-[6%] h-14 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-tight">{SITE.name}</Link>
        <nav className="hidden md:flex items-center gap-1">
          {nav.map(l => (
            <Link key={l.href} href={l.href} className="px-3 py-1.5 text-[13px] text-zinc-500 hover:text-zinc-200 transition-colors">{l.label}</Link>
          ))}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="text-[13px] text-zinc-500 hover:text-zinc-200 transition-colors">GitHub</a>
          <Link href="/demo" className="text-[13px] font-medium bg-white text-black px-4 py-1.5 rounded-lg hover:bg-zinc-200 transition-colors">Try Demo</Link>
        </div>
        <button className="md:hidden text-zinc-400" onClick={() => setOpen(!open)}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={open ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} />
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#09090b] px-[6%] py-3 space-y-1">
          {nav.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-2 text-sm text-zinc-400 hover:text-white">{l.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
}
