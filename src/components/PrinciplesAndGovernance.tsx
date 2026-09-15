import React, { useState } from 'react';
import { 
  DESIGN_PRINCIPLES, 
  AI_GOVERNANCE_MATRIX 
} from '../data/proposalData';
import { 
  Shield, 
  Bot, 
  UserCheck, 
  Sparkles, 
  Lock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Info,
  Layers,
  Database,
  ShieldCheck,
  Cpu
} from 'lucide-react';

export const PrinciplesAndGovernance: React.FC = () => {
  const [selectedPrincipleIdx, setSelectedPrincipleIdx] = useState<number>(0);

  const getPrincipleIcon = (name: string) => {
    switch (name) {
      case 'Database': return <Database className="w-5 h-5 text-emerald-700" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-sky-700" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5 text-[#9a6027]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-700" />;
      default: return <AlertTriangle className="w-5 h-5 text-amber-700" />;
    }
  };

  return (
    <section id="principles-governance" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#9a6027] bg-[#b87a3d]/10 border border-[#b87a3d]/30 mb-3">
          Section 03
        </div>
        <h2 className="text-3xl sm:text-4xl font-sans font-bold text-zinc-900 mb-3">
          Architectural Principles & AI Governance
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 font-sans max-w-3xl leading-relaxed">
          Robust, deterministic guardrails ensuring automation serves staff and residents without ceding critical approval, emergency, or financial authority to artificial intelligence.
        </p>
      </div>

      {/* 1. Five Design Principles Grid */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-sans font-bold text-zinc-900 flex items-center gap-2">
            <span>5 Core Service Design Principles</span>
          </h3>
          <span className="text-xs font-mono text-zinc-500">System Architecture Foundation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DESIGN_PRINCIPLES.map((principle, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-zinc-100 border border-zinc-200">
                    {getPrincipleIcon(principle.iconName)}
                  </div>
                  <span className="text-[10px] font-mono text-[#9a6027] font-bold px-2 py-0.5 rounded bg-[#b87a3d]/10">
                    {principle.tag}
                  </span>
                </div>
                <h4 className="text-base font-bold text-zinc-900 font-sans mb-2">
                  {principle.title}
                </h4>
                <p className="text-xs text-zinc-700 font-sans leading-relaxed">
                  {principle.description}
                </p>
              </div>

              <div className="pt-3 border-t border-zinc-100 mt-4 text-[10px] font-mono text-zinc-500 flex items-center justify-between">
                <span>Rule 0{idx + 1}</span>
                <span className="text-emerald-700 font-bold">✓ Enforced</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. AI Governance & Boundary Control Table */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-sans font-bold text-zinc-900 flex items-center gap-2">
              <Bot className="w-5 h-5 text-[#9a6027]" />
              <span>AI Governance & Operational Authority Boundaries</span>
            </h3>
            <p className="text-xs text-zinc-500 font-sans mt-0.5">
              Strictly defined capabilities, evidence requirements, and fallback mechanisms for AI components.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-semibold">
            <UserCheck className="w-3.5 h-3.5" />
            Human Authority Retained
          </div>
        </div>

        <div className="rounded-3xl bg-white border border-zinc-200 p-4 sm:p-6 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-700 border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 text-[10px] font-mono uppercase tracking-wider text-zinc-500 bg-zinc-50">
                <th className="p-3.5 rounded-l-xl min-w-[140px]">AI Assistance Task</th>
                <th className="p-3.5 min-w-[160px]">Evidence Used</th>
                <th className="p-3.5 min-w-[160px]">Permitted Output</th>
                <th className="p-3.5 min-w-[180px]">Strictly Not Authorised</th>
                <th className="p-3.5 rounded-r-xl min-w-[160px]">Human Fallback Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-sans">
              {AI_GOVERNANCE_MATRIX.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                  <td className="p-3.5 font-bold text-zinc-900">{row.task}</td>
                  <td className="p-3.5 text-zinc-600 font-medium">{row.evidenceUsed}</td>
                  <td className="p-3.5 text-emerald-800 font-medium">{row.output}</td>
                  <td className="p-3.5 text-red-800 font-medium">
                    <span className="inline-flex items-start gap-1">
                      <XCircle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                      {row.notAuthorised}
                    </span>
                  </td>
                  <td className="p-3.5 text-zinc-700 font-medium">{row.fallback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
};
