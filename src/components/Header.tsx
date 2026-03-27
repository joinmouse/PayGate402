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
    <header style={{ position: "fixed", top: 0, width: "100%", zIndex: 50, background: "rgba(10,10,11,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1a1a1d" }}>
      <div className="container-fluid" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        <Link href="/" style={{ fontWeight: 600, fontSize: 14, color: "#fff", textDecoration: "none" }}>{SITE.name}</Link>
        <nav style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden md:flex">
          {nav.map(l => (
            <Link key={l.href} href={l.href} style={{ padding: "6px 14px", fontSize: 13, color: "#777", textDecoration: "none", borderRadius: 6, transition: "color 0.15s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#ddd")}
              onMouseLeave={e => (e.currentTarget.style.color = "#777")}
            >{l.label}</Link>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }} className="hidden md:flex">
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#777", textDecoration: "none" }}>GitHub</a>
          <Link href="/demo" className="btn-primary" style={{ padding: "7px 18px", fontSize: 13 }}>Try Demo</Link>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} style={{ background: "none", border: "none", color: "#777", cursor: "pointer" }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={open ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} />
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden" style={{ borderTop: "1px solid #1a1a1d", padding: "12px 0" }}>
          <div className="container-fluid" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {nav.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ padding: "10px 0", fontSize: 14, color: "#888", textDecoration: "none" }}>{l.label}</Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
