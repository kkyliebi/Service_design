import React, { useState } from 'react';
import { 
  METRIC_BASELINE, 
  PROPOSAL_AT_A_GLANCE 
} from '../data/proposalData';
import { 
  Building2, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Info, 
  Calendar, 
  Layers, 
  Lock, 
  ChevronRight 
} from 'lucide-react';

interface HeroExecutiveProps {
  onNavigate: (sectionId: string) => void;
}

export const HeroExecutive: React.FC<HeroExecutiveProps> = ({ onNavigate }) => {
  const [selectedGlanceIdx, setSelectedGlanceIdx] = useState<number>(0);

  return (
    <section id="executive-summary" className="pt-28 pb-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Editorial Header Block (Light Theme) */}
      <div className="relative rounded-3xl bg-white border border-zinc-200/90 p-6 sm:p-10 lg:p-12 shadow-sm mb-10 overflow-hidden">
        
        {/* Subtle decorative background tint */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#b87a3d]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          
          {/* Metadata badges strip */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#b87a3d]/10 text-[#9a6027] border border-[#b87a3d]/25 uppercase tracking-wider font-sans">
              <Building2 className="w-3.5 h-3.5 text-[#9a6027]" />
              Lombardy Housing Operator
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 text-zinc-700 border border-zinc-200">
              <Calendar className="w-3.5 h-3.5 text-zinc-500" />
              September 2026
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-mono text-zinc-600 bg-zinc-100 border border-zinc-200">
              Ref: Pilot Blueprint
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200">
              Costs Exclude VAT
            </span>
          </div>

          {/* Master Title & Subtitle */}
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans font-bold text-zinc-900 tracking-tight leading-[1.15] mb-4">
              Resident Maintenance <br />
              <span className="text-[#b87a3d]">
                Service Integration
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-zinc-600 font-sans font-normal leading-relaxed mb-6 max-w-3xl">
              Initial recommendation for a limited resident-maintenance pilot across resident intake, case preparation and work order integration.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-3 pb-6 border-b border-zinc-200">
              <p className="text-xs text-zinc-500 max-w-xl">
                Prepared for the Lombardy affordable housing operator managing ~3,000 homes.
              </p>
            </div>
          </div>

          {/* Key Proposal Decision & Recommended Commercial Position Callouts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            
            {/* Decision Callout */}
            <div className="p-5 rounded-2xl bg-[#fdfbf7] border border-[#b87a3d]/30 relative overflow-hidden group hover:border-[#b87a3d]/60 transition-colors shadow-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-[#b87a3d]/10 text-[#9a6027] border border-[#b87a3d]/20 shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs uppercase tracking-wider font-bold text-[#9a6027] mb-1">
                    Key Proposal Decision
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">
                    Implement the <strong className="text-zinc-900 font-semibold">DomusOne Integration Connector</strong> to connect existing Zendesk intake directly with operational work orders. Protect human approval gates before formal dispatch.
                  </p>
                </div>
              </div>
            </div>

            {/* Commercial Position Callout */}
            <div className="p-5 rounded-2xl bg-[#f6fbf8] border border-emerald-500/30 relative overflow-hidden group hover:border-emerald-500/60 transition-colors shadow-xs">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200 shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xs uppercase tracking-wider font-bold text-emerald-800 mb-1">
                    Commercial Recommendation
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">
                    Approve <strong className="text-zinc-900 font-semibold">Core Pilot (€52,150)</strong> as the firm commitment within the €60,000 ceiling (€7,850 headroom). Treat Recommended add-ons as phased options after discovery.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Action Navigation CTAs */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              id="hero-btn-blueprint"
              onClick={() => onNavigate('blueprint-explorer')}
              className="px-5 py-2.5 rounded-xl bg-[#b87a3d] hover:bg-[#a66a30] text-white font-semibold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm shadow-[#b87a3d]/25 active:scale-95"
            >
              <Layers className="w-4 h-4" />
              <span>Interactive Blueprint</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              id="hero-btn-commercial"
              onClick={() => onNavigate('commercial-options')}
              className="px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-semibold text-xs tracking-wider transition-all flex items-center gap-2 border border-zinc-200"
            >
              <span>Budget & Scenario Modeler</span>
            </button>
            <button
              id="hero-btn-tom"
              onClick={() => onNavigate('target-model')}
              className="px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 hover:text-zinc-900 font-medium text-xs tracking-wider transition-all flex items-center gap-2 border border-zinc-200"
            >
              <span>Target Operating Model</span>
            </button>
          </div>

        </div>
      </div>

      {/* Baseline Operational Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {METRIC_BASELINE.map((metric) => (
          <div 
            key={metric.id}
            id={`metric-card-${metric.id}`}
            className="p-5 rounded-2xl bg-white border border-zinc-200/90 hover:border-[#b87a3d]/50 transition-all shadow-xs group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold">
                {metric.label}
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-700 border border-zinc-200">
                {metric.badge}
              </span>
            </div>
            
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl sm:text-3xl font-sans font-bold text-zinc-900 group-hover:text-[#b87a3d] transition-colors">
                {metric.value}
              </span>
              {metric.unit && (
                <span className="text-xs font-sans text-zinc-500 font-medium">
                  {metric.unit}
                </span>
              )}
            </div>
            
            <p className="text-xs text-zinc-500 font-sans leading-snug">
              {metric.subtext}
            </p>
          </div>
        ))}
      </div>

      {/* Proposal at a Glance: Interactive Pillar Explorer */}
      <div className="rounded-3xl bg-white border border-zinc-200/90 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#9a6027] mb-1 font-mono">
              <Info className="w-3.5 h-3.5" />
              Executive Summary
            </div>
            <h2 className="text-xl sm:text-2xl font-sans font-bold text-zinc-900">
              Proposal at a Glance (5 Key Pillars)
            </h2>
          </div>
          <p className="text-xs text-zinc-500 max-w-md leading-relaxed">
            Click each pillar to examine the verified operational constraint, proposed architecture response, and measurable result to test during the pilot.
          </p>
        </div>

        {/* Pillar Selection Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-6">
          {PROPOSAL_AT_A_GLANCE.map((item, idx) => (
            <button
              key={idx}
              id={`btn-glance-tab-${idx}`}
              onClick={() => setSelectedGlanceIdx(idx)}
              className={`p-3 rounded-xl text-left transition-all border ${
                selectedGlanceIdx === idx
                  ? 'bg-[#b87a3d]/10 border-[#b87a3d] text-zinc-900 shadow-xs font-semibold'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold text-[#9a6027]">Pillar 0{idx + 1}</span>
                {selectedGlanceIdx === idx && <ChevronRight className="w-3.5 h-3.5 text-[#9a6027]" />}
              </div>
              <p className="text-xs truncate">
                {idx === 0 && 'Unified Record'}
                {idx === 1 && 'Connector Bridge'}
                {idx === 2 && 'SMS Milestones'}
                {idx === 3 && 'Governed AI'}
                {idx === 4 && 'Night Automation'}
              </p>
            </button>
          ))}
        </div>

        {/* Selected Pillar Deep Dive Card */}
        {PROPOSAL_AT_A_GLANCE[selectedGlanceIdx] && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-5 sm:p-6 rounded-2xl bg-zinc-50 border border-zinc-200 animate-in fade-in duration-200">
            
            {/* Column 1: Constraint */}
            <div className="p-4 rounded-xl bg-red-50/70 border border-red-200">
              <span className="text-[10px] font-mono uppercase tracking-widest text-red-800 block mb-2 font-bold">
                01. Current Constraint
              </span>
              <p className="text-sm text-zinc-800 font-sans leading-relaxed">
                {PROPOSAL_AT_A_GLANCE[selectedGlanceIdx].currentConstraint}
              </p>
            </div>

            {/* Column 2: Proposed Response */}
            <div className="p-4 rounded-xl bg-[#fdfbf7] border border-[#b87a3d]/30">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#9a6027] block mb-2 font-bold">
                02. Proposed Response
              </span>
              <p className="text-sm text-zinc-800 font-sans leading-relaxed font-medium">
                {PROPOSAL_AT_A_GLANCE[selectedGlanceIdx].proposedResponse}
              </p>
            </div>

            {/* Column 3: Result to Test */}
            <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 block mb-2 font-bold">
                03. Result to Test in Pilot
              </span>
              <p className="text-sm text-zinc-800 font-sans leading-relaxed">
                {PROPOSAL_AT_A_GLANCE[selectedGlanceIdx].resultToTest}
              </p>
            </div>

          </div>
        )}

      </div>

    </section>
  );
};
