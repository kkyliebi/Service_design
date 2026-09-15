import React, { useState } from 'react';
import { 
  EXISTING_CHANNELS, 
  EXISTING_SYSTEMS, 
  PROBLEM_ANALYSIS,
  SCOPE_BOUNDARIES,
  STRATEGIC_OBJECTIVES
} from '../data/proposalData';
import { 
  Building, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Mail, 
  Globe, 
  Users, 
  MessageSquare, 
  Moon,
  ExternalLink,
  ShieldAlert,
  Target,
  ShieldCheck
} from 'lucide-react';

export const ProblemAndContext: React.FC = () => {
  const [selectedProblemIdx, setSelectedProblemIdx] = useState<number>(0);

  const getChannelIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('phone')) return <Phone className="w-4 h-4 text-emerald-700" />;
    if (lower.includes('email')) return <Mail className="w-4 h-4 text-sky-700" />;
    if (lower.includes('portal')) return <Globe className="w-4 h-4 text-purple-700" />;
    if (lower.includes('walk') || lower.includes('office')) return <Users className="w-4 h-4 text-[#9a6027]" />;
    if (lower.includes('whatsapp')) return <MessageSquare className="w-4 h-4 text-emerald-700" />;
    return <Moon className="w-4 h-4 text-amber-700" />;
  };

  return (
    <section id="context-problems" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#9a6027] bg-[#b87a3d]/10 border border-[#b87a3d]/30 mb-3">
          Section 02
        </div>
        <h2 className="text-3xl sm:text-4xl font-sans font-bold text-zinc-900 mb-3">
          Client Context & The Integration Break
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 font-sans max-w-3xl leading-relaxed">
          The organization operates ~3,000 homes across Lombardy with ~2,400 monthly maintenance contacts. While Zendesk manages resident service tickets and DomusOne manages works orders, the gap between them creates significant manual re-entry and communication blind spots.
        </p>
      </div>

      {/* 1. Intake Channels Grid */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-sans font-bold text-zinc-900 flex items-center gap-2">
            <span>6 Existing Contact & Reporting Channels</span>
          </h3>
          <span className="text-xs font-mono text-zinc-500">Current Intake Analysis</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXISTING_CHANNELS.map((ch, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-white border border-zinc-200 hover:border-zinc-300 transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-zinc-100 border border-zinc-200">
                      {getChannelIcon(ch.channel)}
                    </div>
                    <h4 className="font-bold text-sm text-zinc-900 font-sans">
                      {ch.channel}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">#0{idx + 1}</span>
                </div>

                <div className="space-y-2 text-xs font-sans">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-zinc-500 font-semibold block">Current Handling</span>
                    <p className="text-zinc-700 leading-relaxed mt-0.5">{ch.currentHandling}</p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-100 mt-4">
                <span className="text-[10px] font-mono uppercase text-amber-800 font-semibold block">Operational Constraint</span>
                <p className="text-xs text-zinc-600 mt-0.5 font-medium">{ch.confirmedConstraint}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Systems Landscape Cards */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-sans font-bold text-zinc-900 flex items-center gap-2">
            <span>Core Enterprise Systems in Scope</span>
          </h3>
          <span className="text-xs font-mono text-zinc-500">Platform Landscape</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {EXISTING_SYSTEMS.map((sys, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-[#9a6027] px-2.5 py-1 rounded-md bg-[#b87a3d]/10 border border-[#b87a3d]/20">
                    Platform {idx + 1}
                  </span>
                </div>
                <h4 className="text-base font-bold text-zinc-900 font-sans mb-2">
                  {sys.system}
                </h4>
                <p className="text-xs text-zinc-700 font-sans leading-relaxed mb-4">
                  <strong>Operational Role:</strong> {sys.currentRole}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs font-sans text-zinc-600">
                <span className="text-[10px] font-mono uppercase text-zinc-500 font-semibold block mb-1">
                  Licence & Contract Baseline
                </span>
                <p className="text-[11px] leading-relaxed">{sys.relevantContractPosition}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Problem Breakdown & Design Implications */}
      <div className="mb-14">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-sans font-bold text-zinc-900 flex items-center gap-2">
            <span>6 Core Frictions & Architectural Responses</span>
          </h3>
          <span className="text-xs font-mono text-zinc-500">Root-Cause Analysis</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List of Problems */}
          <div className="space-y-2 lg:col-span-1">
            {PROBLEM_ANALYSIS.map((p, idx) => (
              <button
                key={idx}
                id={`btn-problem-item-${idx}`}
                onClick={() => setSelectedProblemIdx(idx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all text-xs font-sans flex items-center justify-between ${
                  selectedProblemIdx === idx
                    ? 'bg-white border-[#b87a3d] ring-2 ring-[#b87a3d]/20 shadow-xs text-zinc-900 font-bold'
                    : 'bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold ${
                    selectedProblemIdx === idx ? 'bg-[#b87a3d] text-white' : 'bg-zinc-100 text-zinc-500'
                  }`}>
                    {idx + 1}
                  </span>
                  <span>{p.problem}</span>
                </div>
                <ArrowRight className={`w-3.5 h-3.5 ${selectedProblemIdx === idx ? 'text-[#9a6027]' : 'text-zinc-400'}`} />
              </button>
            ))}
          </div>

          {/* Deep Dive Panel */}
          <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-xs flex flex-col justify-between">
            {PROBLEM_ANALYSIS[selectedProblemIdx] && (
              <div>
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#9a6027] font-bold mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  Detailed Friction Analysis #0{selectedProblemIdx + 1}
                </div>
                <h4 className="text-2xl font-sans font-bold text-zinc-900 mb-4">
                  {PROBLEM_ANALYSIS[selectedProblemIdx].problem}
                </h4>

                <div className="space-y-5 text-sm font-sans">
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                    <span className="text-[10px] font-mono uppercase text-amber-850 font-bold block mb-1">
                      Current Operational Impact & Waste
                    </span>
                    <p className="text-zinc-800 leading-relaxed font-medium">
                      {PROBLEM_ANALYSIS[selectedProblemIdx].operationalEffect}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                    <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold block mb-1">
                      Target Architectural Implication & Pilot Solution
                    </span>
                    <p className="text-zinc-800 leading-relaxed font-medium">
                      {PROBLEM_ANALYSIS[selectedProblemIdx].designImplication}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Strategic Objectives & Scope Boundaries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Strategic Objectives */}
        <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#9a6027] font-bold">
            <Target className="w-4 h-4" />
            Strategic Pilot Objectives
          </div>
          <h4 className="text-xl font-sans font-bold text-zinc-900">
            What Success Looks Like
          </h4>
          <ul className="space-y-2.5 text-xs font-sans text-zinc-700">
            {STRATEGIC_OBJECTIVES.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-zinc-50 transition-colors">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Scope Boundaries */}
        <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-zinc-600 font-bold">
            <ShieldCheck className="w-4 h-4" />
            Scope Inclusions & Exclusions
          </div>
          <h4 className="text-xl font-sans font-bold text-zinc-900">
            Clear Operational Boundaries
          </h4>
          <div className="space-y-2.5 text-xs font-sans">
            {SCOPE_BOUNDARIES.slice(0, 4).map((b, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 block">✓ Included in Pilot Scope</span>
                  <span className="text-zinc-800 font-medium">{b.included}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-zinc-500 block">✗ Outside Scope / Excluded</span>
                  <span className="text-zinc-600">{b.outside}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
};
