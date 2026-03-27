import Link from "next/link";
import { SITE } from "@/lib/constants";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid #1a1a1d", padding: "40px 0" }}>
      <div className="container-fluid" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <span style={{ fontSize: 13, color: "#555" }}>{SITE.name}</span>
        <nav style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {[
            { label: "Docs", href: "/docs" },
            { label: "Demo", href: "/demo" },
            { label: "GitHub", href: SITE.github, external: true },
            { label: "x402", href: "https://www.x402.org", external: true },
          ].map(l => (
            l.external ? (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#555", textDecoration: "none" }}>{l.label}</a>
            ) : (
              <Link key={l.label} href={l.href} style={{ fontSize: 13, color: "#555", textDecoration: "none" }}>{l.label}</Link>
            )
          ))}
        </nav>
      </div>
    </footer>
  );
}
