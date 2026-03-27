"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import CodeExample from "@/components/CodeExample";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

export default function Home() {
  const { lang } = useLang();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <CodeExample />
        <Pricing />
        <section style={{ padding: "clamp(48px, 6vh, 80px) 0" }}>
          <div className="divider" />
          <div className="container-fluid" style={{ paddingTop: "clamp(48px, 6vh, 80px)", textAlign: "center" }}>
            <h2 className="heading-lg" style={{ marginBottom: 12 }}>{tr("cta.title", lang)}</h2>
            <p className="text-body" style={{ marginBottom: 32 }}>{tr("cta.desc", lang)}</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
              <Link href="/demo" className="btn-primary">{tr("hero.cta1", lang)}</Link>
              <a href="https://github.com/joinmouse/PayGate402" target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
