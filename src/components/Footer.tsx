"use client";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";
import { SITE } from "@/lib/constants";

export default function Footer() {
  const { lang } = useLang();
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "40px 0" }}>
      <div className="container-fluid" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <span style={{ fontSize: 13, color: "var(--text-4)" }}>{SITE.name}</span>
        <nav style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Link href="/docs" style={{ fontSize: 13, color: "var(--text-4)", textDecoration: "none" }}>{tr("footer.docs", lang)}</Link>
          <Link href="/demo" style={{ fontSize: 13, color: "var(--text-4)", textDecoration: "none" }}>{tr("footer.demo", lang)}</Link>
          <a href={SITE.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--text-4)", textDecoration: "none" }}>GitHub</a>
          <a href="https://www.x402.org" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--text-4)", textDecoration: "none" }}>x402</a>
        </nav>
      </div>
    </footer>
  );
}
