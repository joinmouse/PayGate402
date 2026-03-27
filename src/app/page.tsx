"use client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import CodeExample from "@/components/CodeExample";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
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
            <h2 className="heading-lg" style={{ marginBottom: 12 }}>Ready to monetize your API?</h2>
            <p className="text-body" style={{ marginBottom: 32 }}>Join 200+ projects in the x402 ecosystem.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
              <Link href="/demo" className="btn-primary">Try Demo</Link>
              <a href="https://github.com/joinmouse/PayGate402" target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
