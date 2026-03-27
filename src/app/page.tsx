"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import CodeExample from "@/components/CodeExample";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

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

        {/* CTA Section */}
        <section className="py-28 px-6 relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/8 rounded-full blur-[120px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-center relative z-10"
          >
            <h2 className="text-3xl md:text-[2.75rem] font-bold tracking-tight mb-4">
              Ready to Monetize Your API?
            </h2>
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed">
              Join 200+ projects in the x402 ecosystem. Start accepting crypto payments in minutes.
            </p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="/demo"
                className="group flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-7 py-3.5 rounded-xl transition-all shadow-xl shadow-indigo-600/25"
              >
                Try Live Demo
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="https://github.com/joinmouse/PayGate402"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/[0.05] hover:bg-white/[0.08] text-white font-medium px-7 py-3.5 rounded-xl transition-all border border-white/[0.06]"
              >
                <Star className="w-4 h-4" />
                Star on GitHub
              </a>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </>
  );
}
