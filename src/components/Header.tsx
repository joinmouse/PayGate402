"use client";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "@/lib/theme";
import { useLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";
import { SITE } from "@/lib/constants";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { lang, setLang } = useLang();

  const nav = [
    { label: tr("nav.howItWorks", lang), href: "/#how-it-works" },
    { label: tr("nav.features", lang), href: "/#features" },
    { label: tr("nav.pricing", lang), href: "/pricing" },
    { label: tr("nav.demo", lang), href: "/demo" },
    { label: tr("nav.docs", lang), href: "/docs" },
  ];

  return (
    <header style={{ position: "fixed", top: 0, width: "100%", zIndex: 50, background: "color-mix(in srgb, var(--bg) 85%, transparent)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--border)" }}>
      <div className="container-fluid" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        <Link href="/" style={{ fontWeight: 600, fontSize: 14, color: "var(--text-1)", textDecoration: "none" }}>{SITE.name}</Link>
        <nav className="hidden md:flex" style={{ alignItems: "center", gap: 4 }}>
          {nav.map(l => <Link key={l.href} href={l.href} style={{ padding: "6px 14px", fontSize: 13, color: "var(--text-3)", textDecoration: "none", borderRadius: 6 }}>{l.label}</Link>)}
        </nav>
        <div className="hidden md:flex" style={{ alignItems: "center", gap: 8 }}>
          {/* Lang toggle */}
          <button onClick={() => setLang(lang === "en" ? "zh" : "en")} style={{ background: "none", border: "1px solid var(--border)", borderRadius: 6, padding: "4px 10px", fontSize: 11, color: "var(--text-3)", cursor: "pointer", fontWeight: 500 }}>
            {lang === "en" ? "中文" : "EN"}
          </button>
          {/* Theme toggle */}
          <button onClick={toggle} data-testid="theme-toggle" style={{ background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: "var(--text-3)", display: "flex", alignItems: "center" }} aria-label="Toggle theme">
            {theme === "dark" ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              : <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>}
          </button>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--text-3)", textDecoration: "none" }}>GitHub</a>
          <Link href="/demo" className="btn-primary" style={{ padding: "7px 18px", fontSize: 13 }}>{tr("nav.tryDemo", lang)}</Link>
        </div>
        <div className="md:hidden" style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <button onClick={() => setLang(lang === "en" ? "zh" : "en")} style={{ background: "none", border: "none", fontSize: 12, color: "var(--text-3)", cursor: "pointer" }}>{lang === "en" ? "中文" : "EN"}</button>
          <button onClick={toggle} style={{ background: "none", border: "none", color: "var(--text-3)", cursor: "pointer", padding: 4 }} aria-label="Toggle theme">
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button onClick={() => setOpen(!open)} style={{ background: "none", border: "none", color: "var(--text-3)", cursor: "pointer" }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={open ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} /></svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden" style={{ borderTop: "1px solid var(--border)", padding: "12px 0" }}>
          <div className="container-fluid" style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {nav.map(l => <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ padding: "10px 0", fontSize: 14, color: "var(--text-2)", textDecoration: "none" }}>{l.label}</Link>)}
          </div>
        </div>
      )}
    </header>
  );
}
