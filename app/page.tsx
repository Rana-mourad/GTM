'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, BarChart3, ShieldCheck, Zap, AlertCircle } from 'lucide-react';
import InputForm from '@/components/InputForm';
import ResultsDisplay from '@/components/ResultsDisplay';
import { generateMarketIntelligence } from '@/lib/gemini';
import { MarketIntelligence } from '@/types';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [intelligence, setIntelligence] = useState<MarketIntelligence | null>(null);

  const handleGenerate = async (formData: {
    businessName: string;
    productService: string;
    valueProp: string;
    targetMarket: string;
    priceRange: string;
  }) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateMarketIntelligence(formData);
      setIntelligence(data);
      // Scroll to results
      setTimeout(() => {
        document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
      setError('Failed to generate intelligence. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-slate-900 selection:bg-[#00FF00] selection:text-black font-sans">
      {/* 01. HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-1.5 rounded-lg">
              <Target className="w-6 h-6 text-[#00FF00]" />
            </div>
            <span className="font-mono text-sm font-black uppercase tracking-widest">GTM ENGINE v2.0</span>
          </div>
          <nav className="hidden md:flex gap-8 font-mono text-[10px] font-black uppercase tracking-widest opacity-60">
            <a href="#" className="hover:text-[#00FF00] transition-colors">Documentation</a>
            <a href="#" className="hover:text-[#00FF00] transition-colors">API Access</a>
            <a href="#" className="hover:text-[#00FF00] transition-colors">Enterprise</a>
          </nav>
        </div>
      </header>

      {/* 02. NAVIGATION / STATUS BAR */}
      <div className="bg-slate-900 text-white px-6 py-2 overflow-hidden">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00FF00] animate-pulse" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-tighter">System Online</span>
            </div>
            <div className="h-4 w-px bg-white/20" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-tighter opacity-60">Region: Global-Alpha</span>
          </div>
          <div className="hidden sm:block font-mono text-[10px] font-bold uppercase tracking-tighter opacity-40 italic">
            &quot;Precision is the only metric that matters.&quot;
          </div>
        </div>
      </div>

      {/* 03. CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 space-y-24">
        {/* Hero Section (Integrated into Content) */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h1 className="font-black text-5xl md:text-8xl leading-[0.9] uppercase tracking-tighter text-slate-900">
              DOMINATE <br />
              <span className="text-[#00FF00] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">YOUR MARKET.</span>
            </h1>
            <p className="font-medium text-lg md:text-xl max-w-2xl text-slate-500 leading-relaxed">
              Generate high-octane GTM strategy using verified business records. 
              Real companies. Real people. No fluff.
            </p>
          </div>
        </section>

        {/* Input Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-white rounded-full">
                <Zap className="w-3 h-3 text-[#00FF00]" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Configuration</span>
              </div>
              <h2 className="font-black text-4xl uppercase tracking-tighter">INITIALIZE ENGINE</h2>
              <p className="font-medium text-slate-500 leading-snug">
                Feed the system your value proposition to generate targeted market intelligence.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: BarChart3, title: "RAW DATA", desc: "VERIFIED BUSINESS RECORDS." },
                { icon: ShieldCheck, title: "BRUTAL PRECISION", desc: "TARGETED ICP MODELING." },
                { icon: Zap, title: "HIGH ENERGY", desc: "BUILT FOR SPEED." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-center p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <div className="bg-slate-50 p-2 rounded-lg">
                    <item.icon className="w-5 h-5 text-slate-900" />
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] font-black uppercase tracking-widest">{item.title}</h4>
                    <p className="text-[10px] font-medium text-slate-400 uppercase">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-white p-1 rounded-3xl border border-slate-200 shadow-xl">
              <InputForm onSubmit={handleGenerate} isLoading={isLoading} />
            </div>
          </div>
        </section>

        {/* Error State */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-red-50 text-red-600 border border-red-100 p-6 rounded-2xl flex items-center gap-4 font-bold uppercase text-sm"
            >
              <AlertCircle className="w-6 h-6 shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <AnimatePresence>
          {intelligence && (
            <motion.section
              id="results-section"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-10 pt-20 border-t border-slate-200"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00FF00] text-black rounded-full">
                    <BarChart3 className="w-3 h-3" />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest">Intelligence Report</span>
                  </div>
                  <h2 className="font-black text-5xl md:text-7xl uppercase tracking-tighter leading-none">
                    GENERATED <span className="text-slate-400">INTEL</span>
                  </h2>
                </div>
                <div className="font-mono text-[10px] font-black uppercase bg-slate-900 text-white px-4 py-2 rounded-lg">
                  STAMP: {new Date().toLocaleDateString()}
                </div>
              </div>
              <ResultsDisplay data={intelligence} />
            </motion.section>
          )}
        </AnimatePresence>
      </div>

      {/* 04. FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 border-b border-slate-100 pb-12 mb-12">
            <div className="flex items-center gap-3">
              <div className="bg-slate-900 p-2 rounded-xl">
                <Target className="w-6 h-6 text-[#00FF00]" />
              </div>
              <span className="font-mono text-lg font-black uppercase tracking-widest">GTM STRATEGIST</span>
            </div>
            <div className="flex gap-8 font-mono text-[10px] font-black uppercase tracking-widest opacity-40">
              <a href="#" className="hover:text-slate-900 transition-colors">Privacy</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Terms</a>
              <a href="#" className="hover:text-slate-900 transition-colors">Contact</a>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[10px] font-bold uppercase tracking-widest opacity-30">
            <div>© 2026 MARKET INTELLIGENCE ENGINE.</div>
            <div className="text-center md:text-right">
              ALL DATA POINTS ARE AI-GENERATED. BUILT FOR DOMINATION.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
