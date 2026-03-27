"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import CodeExample from "@/components/CodeExample";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

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

        <section className="py-20 md:py-28 px-6 border-t border-white/[0.04]">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto text-center"
          >
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">Start accepting payments</h2>
            <p className="text-[15px] text-zinc-500 mb-8">Join 200+ projects in the x402 ecosystem.</p>
            <div className="flex items-center justify-center gap-3">
              <Link href="/demo" className="text-sm font-medium bg-white text-black px-6 py-2.5 rounded-lg hover:bg-zinc-200 transition-colors">
                Try Demo
              </Link>
              <a href="https://github.com/joinmouse/PayGate402" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-zinc-300 px-6 py-2.5 rounded-lg border border-white/[0.08] hover:border-white/[0.15] transition-all">
                GitHub
              </a>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
