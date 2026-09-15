import React, { useState } from 'react';
import { 
  BUDGET_SCENARIOS, 
  BUDGET_COST_ITEMS 
} from '../data/proposalData';
import { BudgetScenario, BudgetCostItem } from '../types';
import { 
  Calculator, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  TrendingUp, 
  ArrowRight, 
  Sliders, 
  Layers,
  Sparkles,
  FileSpreadsheet
} from 'lucide-react';

export const CommercialCalculator: React.FC = () => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<'core' | 'recommended' | 'expanded'>('core');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  const selectedScenario = BUDGET_SCENARIOS.find(s => s.id === selectedScenarioId) || BUDGET_SCENARIOS[0];

  const categories = ['all', 'Licence & Platform', 'Implementation & Setup', 'Communications', 'Contingency'];

  const filteredItems = BUDGET_COST_ITEMS.filter(item => {
    if (activeCategoryFilter === 'all') return true;
    return item.category === activeCategoryFilter;
  });

  const getCostForScenario = (item: BudgetCostItem, scenarioId: 'core' | 'recommended' | 'expanded') => {
    if (scenarioId === 'core') return item.coreCost;
    if (scenarioId === 'recommended') return item.recommendedCost;
    return item.expandedCost;
  };

  const PLANNING_CEILING = 60000;

  return (
    <section id="commercial-options" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#9a6027] bg-[#b87a3d]/10 border border-[#b87a3d]/30 mb-3">
          Section 06
        </div>
        <h2 className="text-3xl sm:text-4xl font-sans font-bold text-zinc-900 mb-3">
          Commercial Strategy & Budget Scenario Analysis
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 font-sans max-w-3xl leading-relaxed">
          The project operates under an authorized planning ceiling of <strong className="text-zinc-900">€60,000 (Excl. VAT)</strong>. Compare the 3 pilot scenarios to evaluate scope commitments against available financial headroom.
        </p>
      </div>

      {/* 3 Scenario Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {BUDGET_SCENARIOS.map((sc) => {
          const isSelected = selectedScenarioId === sc.id;
          const isWithin = sc.budgetCeilingDelta <= 0;
          return (
            <div
              key={sc.id}
              id={`card-scenario-${sc.id}`}
              onClick={() => setSelectedScenarioId(sc.id)}
              className={`cursor-pointer rounded-3xl p-6 sm:p-7 border transition-all flex flex-col justify-between shadow-xs ${
                isSelected
                  ? 'bg-white border-[#b87a3d] ring-2 ring-[#b87a3d]/20'
                  : 'bg-white border-zinc-200 hover:border-zinc-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-md border ${
                    isWithin
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      : 'bg-amber-50 text-amber-850 border-amber-200'
                  }`}>
                    {sc.badge}
                  </span>
                  {isSelected && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#b87a3d] ring-4 ring-[#b87a3d]/20" />
                  )}
                </div>

                <h3 className="text-xl font-sans font-bold text-zinc-900 mb-1">
                  {sc.name}
                </h3>
                <p className="text-xs text-zinc-600 font-sans line-clamp-2 mb-6">
                  {sc.scopeSummary}
                </p>

                {/* Main Price Figures */}
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 mb-6 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-zinc-500 font-mono">Base 1st Year</span>
                    <span className="text-2xl font-bold font-mono text-zinc-900">
                      €{sc.baseFirstYear.toLocaleString()}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-zinc-200 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500">Ceiling Delta (€60k):</span>
                    <span className={`font-bold ${isWithin ? 'text-emerald-700' : 'text-amber-700'}`}>
                      {isWithin ? `-${Math.abs(sc.budgetCeilingDelta).toLocaleString()} (Under)` : `+${sc.budgetCeilingDelta.toLocaleString()} (Over)`}
                    </span>
                  </div>
                </div>

                {/* Key Highlights */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#9a6027] font-bold block">
                    Scenario Highlights
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-600 font-sans">
                    {sc.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#9a6027] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-100 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">Range: €{sc.lowPlanningCase.toLocaleString()} – €{sc.highPlanningCase.toLocaleString()}</span>
                <span className={`font-bold ${isSelected ? 'text-[#9a6027]' : 'text-zinc-400'}`}>
                  {isSelected ? 'Selected' : 'Click to inspect'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Financial Comparison & Detailed Itemized Table */}
      <div className="rounded-3xl bg-white border border-zinc-200 p-6 sm:p-8 shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-200">
          <div>
            <h3 className="text-xl font-sans font-bold text-zinc-900 flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-[#9a6027]" />
              <span>Itemized Cost Schedule (Excl. VAT)</span>
            </h3>
            <p className="text-xs text-zinc-500 font-sans mt-0.5">
              Breakdown across all 11 non-recurring and recurring budget line items for <strong>{selectedScenario.name}</strong>.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3 py-1 rounded-xl text-xs font-mono transition-all border shrink-0 ${
                  activeCategoryFilter === cat
                    ? 'bg-zinc-900 text-white font-bold border-zinc-900'
                    : 'bg-white text-zinc-600 border-zinc-200 hover:text-zinc-900'
                }`}
              >
                {cat === 'all' ? 'All Line Items' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cost Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-700 border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 text-[10px] font-mono uppercase tracking-wider text-zinc-500 bg-zinc-50">
                <th className="p-3.5 rounded-l-xl">Cost Item & Description</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5 text-right">Core Pilot</th>
                <th className="p-3.5 text-right">Recommended</th>
                <th className="p-3.5 text-right">Expanded</th>
                <th className="p-3.5 rounded-r-xl">Status & Quotation Basis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-sans">
              {filteredItems.map((item, idx) => {
                const isItemIncluded = getCostForScenario(item, selectedScenarioId) !== null;
                return (
                  <tr 
                    key={idx} 
                    className={`hover:bg-zinc-50 transition-colors ${
                      isItemIncluded ? 'bg-[#b87a3d]/[0.02]' : 'opacity-40'
                    }`}
                  >
                    <td className="p-3.5 font-bold text-zinc-900">
                      {item.costItem}
                      {item.isRecurring && (
                        <span className="ml-2 text-[10px] font-mono text-[#9a6027] bg-[#b87a3d]/10 px-1.5 py-0.5 rounded font-medium">
                          Annual Recurring
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-zinc-500">{item.category}</td>
                    <td className={`p-3.5 text-right font-mono text-xs ${selectedScenarioId === 'core' ? 'font-bold text-[#9a6027]' : 'text-zinc-600'}`}>
                      {item.coreCost !== null ? `€${item.coreCost.toLocaleString()}` : '—'}
                    </td>
                    <td className={`p-3.5 text-right font-mono text-xs ${selectedScenarioId === 'recommended' ? 'font-bold text-[#9a6027]' : 'text-zinc-600'}`}>
                      {item.recommendedCost !== null ? `€${item.recommendedCost.toLocaleString()}` : '—'}
                    </td>
                    <td className={`p-3.5 text-right font-mono text-xs ${selectedScenarioId === 'expanded' ? 'font-bold text-[#9a6027]' : 'text-zinc-600'}`}>
                      {item.expandedCost !== null ? `€${item.expandedCost.toLocaleString()}` : '—'}
                    </td>
                    <td className="p-3.5 text-xs text-zinc-500">{item.status}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-zinc-900 font-mono text-xs bg-zinc-50">
                <td colSpan={2} className="p-3.5 font-bold text-zinc-900 uppercase">
                  Scenario 1st Year Total
                </td>
                <td className="p-3.5 text-right font-bold text-zinc-900">€52,150</td>
                <td className="p-3.5 text-right font-bold text-zinc-900">€63,620</td>
                <td className="p-3.5 text-right font-bold text-zinc-900">€69,470</td>
                <td className="p-3.5 text-xs text-zinc-500">Planning Baseline Excl. VAT</td>
              </tr>
            </tfoot>
          </table>
        </div>

      </div>

    </section>
  );
};
