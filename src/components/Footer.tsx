import Link from "next/link";
import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "40px 0" }}>
      <div className="container-fluid" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <span style={{ fontSize: 13, color: "var(--text-4)" }}>{SITE.name}</span>
        <nav style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {[
            { label: "Docs", href: "/docs" },
            { label: "Demo", href: "/demo" },
            { label: "GitHub", href: SITE.github, ext: true },
            { label: "x402", href: "https://www.x402.org", ext: true },
          ].map(l => l.ext ? (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "var(--text-4)", textDecoration: "none" }}>{l.label}</a>
          ) : (
            <Link key={l.label} href={l.href} style={{ fontSize: 13, color: "var(--text-4)", textDecoration: "none" }}>{l.label}</Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
