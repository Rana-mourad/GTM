'use client';

import React, { useState } from 'react';
import { MarketIntelligence } from '@/types';
import { Download, Users, Building2, Target, Brain, Send, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';

interface ResultsDisplayProps {
  data: MarketIntelligence;
}

export default function ResultsDisplay({ data }: ResultsDisplayProps) {
  const [activeTab, setActiveTab] = useState<'icp' | 'companies' | 'decisionMakers' | 'behavior' | 'outreach'>('icp');

  const exportToCSV = () => {
    // Helper to escape CSV values
    const escape = (val: any) => `"${String(val).replace(/"/g, '""')}"`;

    // We'll export the company data as a primary example, or a combined sheet
    const headers = ['Company', 'Website', 'Industry', 'HQ', 'Employees', 'Revenue', 'Decision Maker', 'Title', 'LinkedIn'];
    const rows = data.companies.map((company, index) => {
      const dm = data.decisionMakers.find(d => d.company === company.name) || data.decisionMakers[index] || {};
      return [
        escape(company.name),
        escape(company.website),
        escape(company.industry),
        escape(company.headquarters),
        escape(company.employees),
        escape(company.revenue),
        escape(dm.fullName || 'N/A'),
        escape(dm.jobTitle || 'N/A'),
        escape(dm.linkedinUrl || 'N/A'),
      ];
    });

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gtm-intelligence-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const tabs = [
    { id: 'icp', label: '01 ICP', icon: Target },
    { id: 'companies', label: '02 Companies', icon: Building2 },
    { id: 'decisionMakers', label: '03 People', icon: Users },
    { id: 'behavior', label: '04 Behavior', icon: Brain },
    { id: 'outreach', label: '05 Outreach', icon: Send },
  ] as const;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                  : 'bg-white text-slate-400 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <tab.icon className={`w-3.5 h-3.5 ${activeTab === tab.id ? 'text-[#00FF00]' : ''}`} />
              {tab.label}
            </button>
          ))}
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#00FF00] text-black rounded-xl font-mono text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-[#00FF00] transition-all shadow-lg shadow-slate-100"
        >
          <Download className="w-3.5 h-3.5" />
          Export CSV
        </button>
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="min-h-[400px]"
      >
        {activeTab === 'icp' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center font-black text-white text-xl">01</div>
                <h3 className="font-black text-3xl uppercase tracking-tighter">ICP Profile</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Primary Industries', value: data.icp.profile.primaryIndustries.join(', ') },
                  { label: 'Secondary Industries', value: data.icp.profile.secondaryIndustries.join(', ') },
                  { label: 'Ideal Size', value: data.icp.profile.idealCompanySize },
                  { label: 'Revenue Range', value: data.icp.profile.idealRevenueRange },
                  { label: 'Geo Focus', value: data.icp.profile.geographicFocus },
                  { label: 'Maturity', value: data.icp.profile.businessMaturity },
                  { label: 'Complexity', value: data.icp.profile.operationalComplexity },
                  { label: 'Tech Adoption', value: data.icp.profile.technologyAdoption },
                ].map((item, i) => (
                  <div key={i} className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                    <span className="block font-mono text-[10px] font-black uppercase text-slate-400 mb-1">{item.label}</span>
                    <span className="block font-bold text-slate-900 leading-tight">{item.value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#00FF00] flex items-center justify-center font-black text-black text-xl">!</div>
                <h3 className="font-black text-3xl uppercase tracking-tighter">Pain & Triggers</h3>
              </div>
              <div className="space-y-6">
                <div className="p-6 bg-slate-900 text-white rounded-3xl shadow-xl">
                  <span className="block font-mono text-[10px] font-black uppercase text-[#00FF00] mb-6 tracking-widest">Critical Pain Points</span>
                  <div className="space-y-6">
                    {data.icp.painPoints.map((pp, i) => (
                      <div key={i} className="space-y-1">
                        <strong className="font-black uppercase text-sm block">{pp.category}</strong>
                        <p className="text-xs text-slate-400 leading-relaxed">{pp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-6 bg-white border border-slate-100 text-slate-900 rounded-3xl shadow-sm">
                  <span className="block font-mono text-[10px] font-black uppercase text-slate-400 mb-6 tracking-widest">Buying Triggers</span>
                  <div className="space-y-6">
                    {data.icp.buyingTriggers.map((bt, i) => (
                      <div key={i} className="space-y-1">
                        <strong className="font-black uppercase text-sm block">{bt.event}</strong>
                        <p className="text-xs text-slate-500 leading-relaxed">{bt.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'companies' && (
          <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-400 font-mono text-[10px] font-black uppercase tracking-widest">
                    <th className="p-6">Company</th>
                    <th className="p-6">Industry / HQ</th>
                    <th className="p-6">Size / Revenue</th>
                    <th className="p-6">Tech Stack</th>
                    <th className="p-6">Growth Signals</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {data.companies.map((company, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-6">
                        <div className="font-black text-lg uppercase tracking-tighter text-slate-900">{company.name}</div>
                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-2 text-[10px] font-bold text-slate-400 hover:text-[#00FF00] transition-colors">
                          {company.website.replace(/^https?:\/\//, '')} <ExternalLink className="w-3 h-3" />
                        </a>
                      </td>
                      <td className="p-6">
                        <div className="font-bold text-sm text-slate-900">{company.industry}</div>
                        <div className="text-[10px] font-black uppercase text-slate-400">{company.headquarters}</div>
                      </td>
                      <td className="p-6">
                        <div className="font-bold text-sm text-slate-900">{company.employees} EMP</div>
                        <div className="inline-block px-2 py-0.5 mt-1 bg-slate-100 text-slate-500 text-[10px] font-black uppercase rounded-md">{company.revenue}</div>
                      </td>
                      <td className="p-6">
                        <div className="text-[10px] font-medium text-slate-500 leading-relaxed max-w-[200px]">{company.techStack}</div>
                      </td>
                      <td className="p-6">
                        <ul className="space-y-1.5">
                          {company.growthSignals.map((signal, j) => (
                            <li key={j} className="flex items-start gap-2 text-[10px] font-bold text-slate-600">
                              <span className="mt-1 w-1.5 h-1.5 bg-[#00FF00] rounded-full shrink-0" />
                              {signal}
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'decisionMakers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {data.decisionMakers.map((dm, i) => (
              <div key={i} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] shadow-sm flex flex-col group hover:shadow-xl hover:shadow-slate-100 transition-all">
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-1">
                    <h4 className="font-black text-2xl uppercase tracking-tighter leading-none text-slate-900">{dm.fullName}</h4>
                    <p className="font-mono text-[10px] font-black uppercase text-slate-400 tracking-widest">{dm.jobTitle}</p>
                    <p className="font-black text-[10px] uppercase tracking-widest text-[#00FF00]">{dm.company}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs ${
                    dm.authorityLevel === 'High' ? 'bg-[#00FF00] text-black' :
                    dm.authorityLevel === 'Medium' ? 'bg-slate-900 text-white' :
                    'bg-slate-100 text-slate-400'
                  }`}>
                    {dm.authorityLevel[0]}
                  </div>
                </div>
                
                <div className="space-y-8 flex-grow">
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">{dm.background}</p>
                  
                  <div className="space-y-6">
                    <div>
                      <span className="block font-mono text-[9px] font-black uppercase text-slate-300 mb-2 tracking-widest">Priorities</span>
                      <p className="text-[11px] font-bold text-slate-700 leading-relaxed">{dm.priorities}</p>
                    </div>
                    <div>
                      <span className="block font-mono text-[9px] font-black uppercase text-slate-300 mb-2 tracking-widest">Key KPIs</span>
                      <p className="text-[11px] font-bold text-slate-700 leading-relaxed">{dm.kpis}</p>
                    </div>
                  </div>

                  {dm.email && (
                    <div className="bg-slate-50 p-4 rounded-2xl font-mono text-[10px] font-black text-slate-400">
                      <span className="opacity-50">EMAIL: </span>
                      <span className="text-slate-900">{dm.email}</span>
                    </div>
                  )}
                </div>

                <a 
                  href={dm.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="mt-10 flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-2xl font-mono text-[10px] font-black uppercase tracking-widest hover:bg-[#00FF00] hover:text-black transition-all shadow-lg shadow-slate-200"
                >
                  View Profile <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'behavior' && (
          <div className="space-y-6">
            {data.behavioralIntelligence.map((bi, i) => {
              const dm = data.decisionMakers.find(d => d.id === bi.decisionMakerId);
              return (
                <div key={i} className="bg-white border border-slate-100 p-8 rounded-[2.5rem] grid grid-cols-1 md:grid-cols-3 gap-12 shadow-sm">
                  <div className="md:col-span-1 space-y-8">
                    <div>
                      <h4 className="font-black text-2xl uppercase tracking-tighter text-slate-900">{dm?.fullName || 'Unknown'}</h4>
                      <p className="font-mono text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">{dm?.jobTitle} @ {dm?.company}</p>
                    </div>
                    <div className="space-y-3">
                      <span className="block font-mono text-[10px] font-black uppercase text-slate-300 tracking-widest">Activity Level</span>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-[#00FF00] h-full rounded-full" 
                          style={{ width: bi.activityLevel === 'High' ? '100%' : bi.activityLevel === 'Medium' ? '60%' : '30%' }}
                        />
                      </div>
                      <span className="block font-mono text-[9px] font-black text-slate-400 text-right uppercase tracking-widest">{bi.activityLevel}</span>
                    </div>
                  </div>
                  <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <span className="block font-mono text-[10px] font-black uppercase text-slate-300 tracking-widest">Interests & Topics</span>
                      <div className="flex flex-wrap gap-2">
                        {[...bi.contentTopics, ...bi.interests].map((topic, j) => (
                          <span key={j} className="px-3 py-1 bg-slate-50 text-slate-600 rounded-lg font-mono text-[9px] font-black uppercase tracking-widest border border-slate-100">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-8">
                      <div>
                        <span className="block font-mono text-[10px] font-black uppercase text-slate-300 tracking-widest mb-2">Comm. Style</span>
                        <p className="text-xs font-bold text-slate-700 italic leading-relaxed">&quot;{bi.communicationStyle}&quot;</p>
                      </div>
                      <div>
                        <span className="block font-mono text-[10px] font-black uppercase text-slate-300 tracking-widest mb-2">Strategic Focus</span>
                        <p className="text-xs font-bold text-slate-700 leading-relaxed">{bi.strategicInitiatives}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'outreach' && (
          <div className="space-y-8">
            {data.outreachStrategies.map((os, i) => {
              const dm = data.decisionMakers.find(d => d.id === os.decisionMakerId);
              return (
                <div key={i} className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-slate-100 transition-all">
                  <div className="bg-slate-900 text-white p-8 flex justify-between items-center">
                    <div className="font-mono text-sm font-black uppercase tracking-widest">
                      Target: <span className="text-[#00FF00]">{dm?.fullName}</span>
                    </div>
                    <div className="font-mono text-[10px] font-black uppercase bg-[#00FF00] text-black px-4 py-1.5 rounded-full tracking-widest">
                      {os.bestChannel}
                    </div>
                  </div>
                  <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="space-y-8">
                      <div className="space-y-2">
                        <span className="block font-mono text-[9px] font-black uppercase text-slate-300 tracking-widest">Timing Trigger</span>
                        <p className="text-sm font-black text-slate-900 uppercase tracking-tight leading-tight">{os.timingTrigger}</p>
                      </div>
                      <div className="space-y-2">
                        <span className="block font-mono text-[9px] font-black uppercase text-slate-300 tracking-widest">Messaging Angle</span>
                        <p className="text-xs font-bold text-slate-600 leading-relaxed">{os.messagingAngle}</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <span className="block font-mono text-[9px] font-black uppercase text-slate-300 tracking-widest mb-2">Personalization Hook</span>
                        <p className="text-[11px] font-bold text-[#00FF00] italic leading-relaxed">{os.personalizationHook}</p>
                      </div>
                    </div>
                    <div className="lg:col-span-2 bg-slate-50 rounded-[2rem] p-8 md:p-10 relative border border-slate-100">
                      <div className="flex justify-between items-center mb-6">
                        <span className="font-mono text-[10px] font-black uppercase text-slate-300 tracking-widest">Draft Script</span>
                        <button 
                          onClick={() => navigator.clipboard.writeText(os.exampleMessage)}
                          className="p-2 hover:bg-[#00FF00] hover:text-black rounded-lg transition-colors text-slate-400"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="font-mono text-xs font-bold text-slate-700 whitespace-pre-wrap leading-relaxed">
                        {os.exampleMessage}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
}
