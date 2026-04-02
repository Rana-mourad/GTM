'use client';

import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

interface InputFormProps {
  onSubmit: (data: {
    businessName: string;
    productService: string;
    valueProp: string;
    targetMarket: string;
    priceRange: string;
  }) => void;
  isLoading: boolean;
}

export default function InputForm({ onSubmit, isLoading }: InputFormProps) {
  const [formData, setFormData] = useState({
    businessName: '',
    productService: '',
    valueProp: '',
    targetMarket: '',
    priceRange: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 md:p-12 rounded-[2rem]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="block font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Business Name</label>
          <input
            required
            type="text"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00FF00] focus:border-transparent transition-all placeholder:text-slate-300"
            placeholder="E.G. ACME CORP"
            value={formData.businessName}
            onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
          />
        </div>
        <div className="space-y-3">
          <label className="block font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Product / Service</label>
          <input
            required
            type="text"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00FF00] focus:border-transparent transition-all placeholder:text-slate-300"
            placeholder="E.G. AI-POWERED CRM"
            value={formData.productService}
            onChange={(e) => setFormData({ ...formData, productService: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Primary Value Proposition</label>
        <textarea
          required
          rows={3}
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00FF00] focus:border-transparent transition-all placeholder:text-slate-300 resize-none"
          placeholder="EXPLAIN THE CORE PROBLEM SOLVED AND KEY BENEFIT..."
          value={formData.valueProp}
          onChange={(e) => setFormData({ ...formData, valueProp: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="block font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Target Market (Optional)</label>
          <input
            type="text"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00FF00] focus:border-transparent transition-all placeholder:text-slate-300"
            placeholder="E.G. SAAS COMPANIES"
            value={formData.targetMarket}
            onChange={(e) => setFormData({ ...formData, targetMarket: e.target.value })}
          />
        </div>
        <div className="space-y-3">
          <label className="block font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Price Range (Optional)</label>
          <input
            type="text"
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00FF00] focus:border-transparent transition-all placeholder:text-slate-300"
            placeholder="E.G. $10K - $50K ACV"
            value={formData.priceRange}
            onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
          />
        </div>
      </div>

      <button
        disabled={isLoading}
        type="submit"
        className="w-full bg-slate-900 text-white py-5 px-8 rounded-2xl font-mono text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-[#00FF00] hover:text-black transition-all shadow-lg shadow-slate-200 active:scale-[0.98] disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            ANALYZING MARKET...
          </>
        ) : (
          <>
            <Search className="w-4 h-4" />
            GENERATE GTM INTEL
          </>
        )}
      </button>
    </form>
  );
}
