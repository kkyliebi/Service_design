import React, { useState } from 'react';
import { 
  MEASUREMENT_PLAN, 
  RISKS_AND_MITIGATIONS 
} from '../data/proposalData';
import { 
  BarChart3, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Filter, 
  TrendingUp,
  AlertOctagon,
  Flame
} from 'lucide-react';

export const MeasurementAndRisk: React.FC = () => {
  const [riskFilter, setRiskFilter] = useState<'all' | 'critical' | 'high' | 'medium'>('all');

  const filteredRisks = RISKS_AND_MITIGATIONS.filter(r => {
    if (riskFilter === 'all') return true;
    return r.severity === riskFilter;
  });

  const getSeverityBadge = (sev: 'critical' | 'high' | 'medium') => {
    switch (sev) {
      case 'critical':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-100 text-red-800 border border-red-300">Critical Severity</span>;
      case 'high':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-850 border border-amber-300">High Severity</span>;
      case 'medium':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-300">Medium Severity</span>;
    }
  };

  return (
    <div className="py-12 border-t border-zinc-200">
      
      {/* 1. Pilot Measurement & KPI Plan */}
      <div className="mb-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#9a6027] font-mono mb-1">
              <BarChart3 className="w-4 h-4" />
              Pilot Evaluation Metrics
            </div>
            <h3 className="text-xl sm:text-2xl font-sans font-bold text-zinc-900">
              9 Key Pilot Performance Measures
            </h3>
          </div>
          <p className="text-xs text-zinc-500 max-w-md">
            Distinguishing meaningful 1st response time from automated receipt acknowledgments.
          </p>
        </div>

        <div className="rounded-3xl bg-white border border-zinc-200 p-6 overflow-x-auto shadow-xs">
          <table className="w-full text-left text-xs text-zinc-700 border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 text-[10px] font-mono uppercase tracking-wider text-zinc-500 bg-zinc-50">
                <th className="p-3.5 rounded-l-xl">Performance Measure</th>
                <th className="p-3.5">Definition & Calculation</th>
                <th className="p-3.5">Measurement Source</th>
                <th className="p-3.5 rounded-r-xl">Target / Baseline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-sans">
              {MEASUREMENT_PLAN.map((m, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                  <td className="p-3.5 font-bold text-zinc-900">{m.measure}</td>
                  <td className="p-3.5 text-zinc-600">{m.definition}</td>
                  <td className="p-3.5 font-mono text-[11px] text-zinc-500">{m.source}</td>
                  <td className="p-3.5 font-mono text-[11px] font-bold text-emerald-800">{m.targetOrBaseline}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. Risks & Mitigations Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-850 font-mono mb-1">
              <ShieldAlert className="w-4 h-4" />
              Risk Management
            </div>
            <h3 className="text-xl sm:text-2xl font-sans font-bold text-zinc-900">
              10 Key Pilot Risks & Mitigations
            </h3>
          </div>

          {/* Severity Filter */}
          <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xl text-xs font-mono border border-zinc-200">
            {(['all', 'critical', 'high', 'medium'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setRiskFilter(sev)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  riskFilter === sev
                    ? 'bg-white text-zinc-900 font-bold shadow-xs'
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {sev.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRisks.map((risk, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  {getSeverityBadge(risk.severity)}
                  <span className="text-[10px] font-mono text-zinc-400">#R0{idx + 1}</span>
                </div>

                <h4 className="text-sm font-bold text-zinc-900 mb-2 font-sans">
                  {risk.risk}
                </h4>

                <p className="text-xs text-zinc-600 font-sans leading-relaxed mb-4">
                  {risk.consequence}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
                <span className="text-[10px] font-mono uppercase text-[#9a6027] font-bold block mb-1">
                  Enforced Mitigation Plan
                </span>
                <p className="text-zinc-800 font-sans leading-snug font-medium">
                  {risk.mitigation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
