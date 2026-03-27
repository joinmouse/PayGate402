"use client";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

const heroCode = `import { paymentMiddleware } from '@x402/next'

export default paymentMiddleware({
  'GET /api/weather': {
    price: '$0.001',
    network: 'base',
  },
})`;

function CodeHighlight({ code }: { code: string }) {
  const keywords = ['import', 'from', 'export', 'default', 'const', 'await'];
  const lines = code.split('\n');

  return (
    <pre><code>{lines.map((line, i) => {
      const parts: React.ReactNode[] = [];
      // Match strings (single-quoted)
      const regex = /('(?:[^'\\]|\\.)*')|(\b(?:import|from|export|default|const|await)\b)|(\/\/.*$)/g;
      let last = 0;
      let m;
      const lineStr = line;
      while ((m = regex.exec(lineStr)) !== null) {
        if (m.index > last) parts.push(<span key={`t${i}-${last}`} style={{ color: "var(--code-default)" }}>{lineStr.slice(last, m.index)}</span>);
        if (m[1]) parts.push(<span key={`s${i}-${m.index}`} style={{ color: "var(--code-string)" }}>{m[1]}</span>);
        else if (m[2]) parts.push(<span key={`k${i}-${m.index}`} style={{ color: "var(--code-keyword)" }}>{m[2]}</span>);
        else if (m[3]) parts.push(<span key={`c${i}-${m.index}`} style={{ color: "var(--code-comment)" }}>{m[3]}</span>);
        last = m.index + m[0].length;
      }
      if (last < lineStr.length) parts.push(<span key={`e${i}`} style={{ color: "var(--code-default)" }}>{lineStr.slice(last)}</span>);
      if (parts.length === 0) parts.push(<span key={`empty${i}`}>{" "}</span>);
      return <span key={i}>{parts}{i < lines.length - 1 ? '\n' : ''}</span>;
    })}</code></pre>
  );
}

export default function Hero() {
  const { lang } = useLang();
  return (
    <section style={{ paddingTop: "clamp(120px, 15vh, 180px)", paddingBottom: "clamp(60px, 8vh, 100px)" }}>
      <div className="container-fluid" style={{ textAlign: "center" }}>
        <p className="label" style={{ marginBottom: 20 }}>{tr("hero.badge", lang)}</p>
        <h1 className="heading-xl" style={{ marginBottom: 20, maxWidth: 720, marginLeft: "auto", marginRight: "auto" }}>
          {tr("hero.title1", lang)}{" "}<span className="gradient-text">{tr("hero.title2", lang)}</span>
        </h1>
        <p className="text-body" style={{ maxWidth: 480, margin: "0 auto 36px", fontSize: "1.0625rem" }}>{tr("hero.desc", lang)}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: "clamp(48px, 6vh, 80px)" }}>
          <Link href="/demo" className="btn-primary">{tr("hero.cta1", lang)}</Link>
          <Link href="/docs" className="btn-secondary">{tr("hero.cta2", lang)}</Link>
        </div>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div className="code-block">
            <div className="code-header">
              <div className="code-dots"><span style={{ background: "var(--dot-red)" }} /><span style={{ background: "var(--dot-yellow)" }} /><span style={{ background: "var(--dot-green)" }} /></div>
              <span style={{ fontSize: 11, color: "var(--text-3)", marginLeft: 8, fontFamily: "monospace" }}>middleware.ts</span>
            </div>
            <CodeHighlight code={heroCode} />
          </div>
        </div>
      </div>
    </section>
  );
}
