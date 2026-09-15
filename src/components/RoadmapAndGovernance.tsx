import React, { useState } from 'react';
import { IMPLEMENTATION_PHASES } from '../data/proposalData';
import { RaciMatrixSection } from './RaciMatrixSection';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ChevronRight,
  ShieldCheck,
  Flag
} from 'lucide-react';

export const RoadmapAndGovernance: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<number>(1);

  return (
    <section id="raci-roadmap" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#9a6027] bg-[#b87a3d]/10 border border-[#b87a3d]/30 mb-3">
          Section 07
        </div>
        <h2 className="text-3xl sm:text-4xl font-sans font-bold text-zinc-900 mb-3">
          Implementation Roadmap & Governance
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 font-sans max-w-3xl leading-relaxed">
          A 5-phase staged rollout that validates technical assumptions, configures core transfer gates, tests controlled add-ons in proof-of-concept, and runs a limited cohort pilot before full commitment.
        </p>
      </div>

      {/* Critical Lead Time Callout Banner */}
      <div className="p-5 sm:p-6 rounded-2xl bg-amber-50 border border-amber-300 mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-850 border border-amber-200 shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-zinc-900 font-sans mb-1">
              Critical Path: DomusOne Connector 6–8 Week Supplier Lead Time
            </h3>
            <p className="text-xs text-zinc-700 font-sans leading-relaxed">
              The DomusOne Integration Connector requires 6 to 8 weeks from supplier authorization to delivery of the test environment. Core Phase 1 Discovery must initiate this lead-time process immediately.
            </p>
          </div>
        </div>

        <div className="shrink-0 font-mono text-xs text-amber-900 bg-white px-3 py-1.5 rounded-xl border border-amber-200 font-semibold">
          Supplier Quote Valid to 31 Oct 2026
        </div>
      </div>

      {/* Phase Timeline Stepper */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-8">
        {IMPLEMENTATION_PHASES.map((p) => {
          const isSelected = selectedPhase === p.phaseNumber;
          return (
            <button
              key={p.phaseNumber}
              id={`btn-phase-tab-${p.phaseNumber}`}
              onClick={() => setSelectedPhase(p.phaseNumber)}
              className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between shadow-xs ${
                isSelected
                  ? 'bg-white border-[#b87a3d] ring-2 ring-[#b87a3d]/20'
                  : 'bg-white border-zinc-200 hover:border-zinc-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                    isSelected ? 'bg-[#b87a3d] text-white' : 'bg-zinc-100 text-zinc-600'
                  }`}>
                    Phase 0{p.phaseNumber}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 font-medium">{p.durationWeeks || 'TBD'}</span>
                </div>
                <h4 className="text-xs font-bold text-zinc-900 font-sans line-clamp-2">
                  {p.name}
                </h4>
              </div>

              <div className="pt-3 border-t border-zinc-100 mt-2 text-[10px] font-sans text-zinc-500 line-clamp-1">
                {p.purpose}
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Phase Deep Dive Card */}
      {IMPLEMENTATION_PHASES.find(p => p.phaseNumber === selectedPhase) && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-xs mb-14 space-y-6">
          {(() => {
            const p = IMPLEMENTATION_PHASES.find(ph => ph.phaseNumber === selectedPhase)!;
            return (
              <>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
                  <div>
                    <span className="text-xs font-mono font-bold text-[#9a6027] px-3 py-1 rounded-full bg-[#b87a3d]/10 border border-[#b87a3d]/25 inline-block mb-2">
                      Phase 0{p.phaseNumber} Scope
                    </span>
                    <h3 className="text-2xl font-sans font-bold text-zinc-900">
                      {p.name} ({p.durationWeeks})
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-zinc-100 text-zinc-800 border border-zinc-200 font-medium">
                      Objective: {p.purpose}
                    </span>
                  </div>
                </div>

                {/* Key Outputs List */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono uppercase text-[#9a6027] font-bold block">
                    Key Outputs & Deliverables
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans text-zinc-700">
                    {p.keyOutputs.map((out, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Embedded RACI Matrix Component */}
      <RaciMatrixSection />

    </section>
  );
};
