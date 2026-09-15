import React, { useState } from 'react';
import { 
  BLUEPRINT_OVERVIEW_LANES, 
  BLUEPRINT_MODULES 
} from '../data/blueprintData';
import { 
  BlueprintActor, 
  BlueprintStep 
} from '../types';
import { 
  Layers, 
  Search, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink, 
  Info, 
  Sparkles, 
  X, 
  Filter,
  Eye,
  Check
} from 'lucide-react';

export const BlueprintExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedActor, setSelectedActor] = useState<BlueprintActor | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [inspectedStep, setInspectedStep] = useState<BlueprintStep | null>(null);

  const actorColors: Record<BlueprintActor, { badge: string; text: string; dot: string; bg: string; border: string }> = {
    resident: { 
      badge: 'bg-blue-50 text-blue-800 border-blue-200', 
      text: 'text-blue-700',
      dot: 'bg-blue-600',
      bg: 'hover:bg-blue-50/50',
      border: 'border-blue-200'
    },
    zendesk: { 
      badge: 'bg-amber-50 text-amber-800 border-amber-200', 
      text: 'text-amber-700',
      dot: 'bg-amber-600',
      bg: 'hover:bg-amber-50/50',
      border: 'border-amber-200'
    },
    customer_service: { 
      badge: 'bg-emerald-50 text-emerald-800 border-emerald-200', 
      text: 'text-emerald-700',
      dot: 'bg-emerald-600',
      bg: 'hover:bg-emerald-50/50',
      border: 'border-emerald-200'
    },
    connector: { 
      badge: 'bg-rose-50 text-rose-800 border-rose-200', 
      text: 'text-rose-700',
      dot: 'bg-rose-600',
      bg: 'hover:bg-rose-50/50',
      border: 'border-rose-200'
    },
    domusone: { 
      badge: 'bg-purple-50 text-purple-800 border-purple-200', 
      text: 'text-purple-700',
      dot: 'bg-purple-600',
      bg: 'hover:bg-purple-50/50',
      border: 'border-purple-200'
    },
    external_notification: { 
      badge: 'bg-cyan-50 text-cyan-800 border-cyan-200', 
      text: 'text-cyan-700',
      dot: 'bg-cyan-600',
      bg: 'hover:bg-cyan-50/50',
      border: 'border-cyan-200'
    },
  };

  const actorLabels: Record<BlueprintActor, string> = {
    resident: 'Resident',
    zendesk: 'Zendesk / Automation',
    customer_service: 'Customer Service / Staff',
    connector: 'Connector / Integration',
    domusone: 'DomusOne / Repair Delivery',
    external_notification: 'External / SMS Notification',
  };

  const currentModule = BLUEPRINT_MODULES.find(m => m.tabKey === activeTab);

  return (
    <section id="blueprint-explorer" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Blueprint Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#9a6027] bg-[#b87a3d]/10 border border-[#b87a3d]/30 mb-3">
              Section 05 • Master Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-zinc-900 mb-2">
              Target System Blueprint
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 font-sans max-w-3xl">
              An interactive representation of the target operating model across 6 actor swimlanes and 8 operational sub-modules. Click any step to inspect technical details and governance rules.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1.5 rounded-xl bg-white border border-zinc-200 text-zinc-700 flex items-center gap-2 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Pilot Architecture
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs: Overview + 01-08 Modules */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-6 no-scrollbar border-b border-zinc-200">
        <button
          id="btn-blueprint-tab-overview"
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
            activeTab === 'overview'
              ? 'bg-[#b87a3d] text-white font-semibold shadow-xs'
              : 'bg-white text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Complete Overview</span>
        </button>

        {BLUEPRINT_MODULES.map((mod) => (
          <button
            key={mod.id}
            id={`btn-blueprint-tab-${mod.id}`}
            onClick={() => setActiveTab(mod.tabKey)}
            className={`px-3.5 py-2 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === mod.tabKey
                ? 'bg-[#b87a3d] text-white font-semibold shadow-xs'
                : 'bg-white text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200'
            }`}
          >
            <span className="font-mono text-[10px] opacity-80">{mod.number}</span>
            <span>{mod.tabKey.replace(/^\d+\s*/, '')}</span>
          </button>
        ))}
      </div>

      {/* Actor Legend / Filter Bar */}
      <div className="p-3.5 rounded-2xl bg-white border border-zinc-200 mb-8 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono uppercase text-zinc-500 flex items-center gap-1.5 mr-1 font-bold">
            <Filter className="w-3.5 h-3.5 text-[#9a6027]" />
            Filter Actor:
          </span>
          
          <button
            id="btn-filter-actor-all"
            onClick={() => setSelectedActor('all')}
            className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all border ${
              selectedActor === 'all'
                ? 'bg-zinc-900 text-white font-bold border-zinc-900'
                : 'bg-zinc-50 text-zinc-600 hover:text-zinc-900 border-zinc-200'
            }`}
          >
            All Actors
          </button>

          {(Object.keys(actorColors) as BlueprintActor[]).map((actor) => (
            <button
              key={actor}
              id={`btn-filter-actor-${actor}`}
              onClick={() => setSelectedActor(selectedActor === actor ? 'all' : actor)}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all flex items-center gap-1.5 border ${
                selectedActor === actor
                  ? actorColors[actor].badge + ' font-bold shadow-xs'
                  : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:text-zinc-900'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${actorColors[actor].dot}`} />
              <span>{actorLabels[actor]}</span>
            </button>
          ))}
        </div>

        <div className="text-[11px] font-mono text-zinc-500">
          Showing: <span className="text-zinc-900 font-bold">{selectedActor === 'all' ? 'All Roles' : actorLabels[selectedActor]}</span>
        </div>
      </div>

      {/* VIEW A: Complete Overview Swimlanes */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {BLUEPRINT_OVERVIEW_LANES.map((lane, laneIdx) => (
            <div 
              key={lane.id}
              id={`blueprint-lane-${laneIdx}`}
              className="p-5 sm:p-6 rounded-3xl bg-white border border-zinc-200 relative overflow-hidden group shadow-xs"
            >
              {/* Lane Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-4 mb-5 border-b border-zinc-100">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#9a6027] px-2.5 py-0.5 rounded-lg bg-[#b87a3d]/10 border border-[#b87a3d]/25">
                    Track 0{laneIdx + 1}
                  </span>
                  <h3 className="text-base font-sans font-bold text-zinc-900">
                    {lane.title}
                  </h3>
                </div>
                {lane.subtitle && (
                  <p className="text-xs text-zinc-500 font-sans italic">
                    {lane.subtitle}
                  </p>
                )}
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3.5">
                {lane.steps
                  .filter(step => selectedActor === 'all' || step.actor === selectedActor)
                  .map((step) => {
                    const color = actorColors[step.actor] || actorColors.resident;
                    return (
                      <div
                        key={step.id}
                        id={`blueprint-card-${step.id}`}
                        onClick={() => setInspectedStep(step)}
                        className={`p-4 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-[#b87a3d]/40 cursor-pointer transition-all flex flex-col justify-between group/card shadow-xs ${color.bg}`}
                      >
                        <div>
                          {/* Actor Badge */}
                          <div className="flex items-center justify-between gap-2 mb-2.5">
                            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${color.badge}`}>
                              {step.actorLabel}
                            </span>
                            <Eye className="w-3.5 h-3.5 text-zinc-400 group-hover/card:text-[#9a6027] transition-colors" />
                          </div>

                          {/* Card Title */}
                          <h4 className="text-xs font-bold text-zinc-900 mb-1.5 font-sans group-hover/card:text-[#9a6027] transition-colors line-clamp-2">
                            {step.title}
                          </h4>

                          {/* Card Desc */}
                          <p className="text-[11px] text-zinc-600 font-sans leading-relaxed line-clamp-3 mb-3">
                            {step.description}
                          </p>
                        </div>

                        {/* Implementation Badge */}
                        <div className="pt-2.5 border-t border-zinc-200 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-zinc-500 truncate">
                            {step.implementationBadge}
                          </span>
                          <ChevronRight className="w-3 h-3 text-zinc-400 group-hover/card:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW B: Deep Dive Module View (01-08) */}
      {activeTab !== 'overview' && currentModule && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 mb-6 border-b border-zinc-200">
              <div>
                <span className="text-xs font-mono font-bold text-[#9a6027] px-3 py-1 rounded-full bg-[#b87a3d]/10 border border-[#b87a3d]/25 inline-block mb-2">
                  Module {currentModule.number}
                </span>
                <h3 className="text-2xl font-sans font-bold text-zinc-900">
                  {currentModule.title}
                </h3>
              </div>
              <div className="text-xs font-mono text-zinc-500 bg-zinc-50 px-3 py-1.5 rounded-xl border border-zinc-200">
                Steps: {currentModule.steps.length}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentModule.steps
                .filter(step => selectedActor === 'all' || step.actor === selectedActor)
                .map((step) => {
                  const color = actorColors[step.actor] || actorColors.resident;
                  return (
                    <div
                      key={step.id}
                      onClick={() => setInspectedStep(step)}
                      className={`p-5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-[#b87a3d]/50 cursor-pointer transition-all flex flex-col justify-between group/card shadow-xs ${color.bg}`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border ${color.badge}`}>
                            {step.actorLabel}
                          </span>
                          <Eye className="w-4 h-4 text-zinc-400 group-hover/card:text-[#9a6027] transition-colors" />
                        </div>

                        <h4 className="text-sm font-bold text-zinc-900 mb-2 font-sans group-hover/card:text-[#9a6027] transition-colors">
                          {step.title}
                        </h4>

                        <p className="text-xs text-zinc-600 font-sans leading-relaxed mb-4">
                          {step.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-zinc-200 flex items-center justify-between text-xs">
                        <span className="font-mono text-[10px] text-zinc-500">
                          {step.implementationBadge}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover/card:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* Step Inspector Modal (Light Theme) */}
      {inspectedStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-2xl space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-zinc-200">
              <div>
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border inline-block mb-2 ${actorColors[inspectedStep.actor].badge}`}>
                  {inspectedStep.actorLabel}
                </span>
                <h3 className="text-xl font-sans font-bold text-zinc-900">
                  {inspectedStep.title}
                </h3>
              </div>

              <button
                onClick={() => setInspectedStep(null)}
                className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-4 text-xs font-sans">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#9a6027] font-bold block mb-1">
                  Full Functional Description
                </span>
                <p className="text-sm text-zinc-700 leading-relaxed">
                  {inspectedStep.description}
                </p>
              </div>

              {inspectedStep.details && (
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                  <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block">
                    Technical Specifications & Parameters
                  </span>
                  <p className="text-xs text-zinc-700 leading-relaxed font-mono">
                    {inspectedStep.details}
                  </p>
                </div>
              )}

              {inspectedStep.governanceRule && (
                <div className="p-4 rounded-2xl bg-[#fdfbf7] border border-[#b87a3d]/30 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#9a6027] font-bold block">
                    Governance & Guardrail Rule
                  </span>
                  <p className="text-xs text-zinc-800 leading-relaxed font-medium">
                    {inspectedStep.governanceRule}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
              <span className="text-xs font-mono text-zinc-500">
                Scope Tag: {inspectedStep.implementationBadge}
              </span>
              <button
                onClick={() => setInspectedStep(null)}
                className="px-4 py-2 rounded-xl bg-[#b87a3d] hover:bg-[#a66a30] text-white font-semibold text-xs transition-colors shadow-xs"
              >
                Close Inspector
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
