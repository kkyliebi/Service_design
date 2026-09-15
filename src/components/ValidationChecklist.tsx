import React, { useState } from 'react';
import { OPEN_VALIDATION_ITEMS } from '../data/proposalData';
import { MeasurementAndRisk } from './MeasurementAndRisk';
import { ValidationChecklistExportModal } from './ValidationChecklistExportModal';
import { 
  CheckSquare, 
  HelpCircle, 
  FileCheck, 
  Filter, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Stamp,
  Printer,
  Download,
  FileText
} from 'lucide-react';

export const ValidationChecklist: React.FC = () => {
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('all');
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  const statuses = [
    'all',
    'Client input required',
    'Technical validation required',
    'Open decision',
    'Proof of concept',
    'Data-protection approval',
    'Commercial validation',
    'Operating decision'
  ];

  const filteredItems = OPEN_VALIDATION_ITEMS.filter(item => {
    if (activeStatusFilter === 'all') return true;
    return item.status === activeStatusFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Client input required':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Technical validation required':
        return 'bg-sky-100 text-sky-900 border-sky-300';
      case 'Open decision':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'Proof of concept':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Data-protection approval':
        return 'bg-red-100 text-red-900 border-red-300';
      case 'Commercial validation':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      default:
        return 'bg-zinc-100 text-zinc-700 border-zinc-200';
    }
  };

  return (
    <section id="validation-signoff" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#9a6027] bg-[#b87a3d]/10 border border-[#b87a3d]/30 mb-3">
          Section 08
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-3xl sm:text-4xl font-sans font-bold text-zinc-900">
              Open Items & Validation Checklist
            </h2>
            <button
              id="btn-export-val-checklist"
              onClick={() => setIsExportModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#b87a3d]/10 hover:bg-[#b87a3d]/20 text-[#9a6027] hover:text-[#804f1e] border border-[#b87a3d]/30 text-xs font-mono font-bold transition-all shadow-xs cursor-pointer"
              title="Export / Print Checklist (Word .doc, PDF, Markdown)"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Export / Print Checklist</span>
            </button>
          </div>
        </div>
        <p className="text-sm sm:text-base text-zinc-600 font-sans max-w-3xl leading-relaxed">
          The 13 prioritized assumptions, system constraints, and policy choices requiring formal resolution before the pilot goes live.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 no-scrollbar">
        <span className="text-xs font-mono uppercase text-zinc-500 mr-2 flex items-center gap-1 shrink-0 font-bold">
          <Filter className="w-3.5 h-3.5 text-[#9a6027]" />
          Filter Type:
        </span>

        {statuses.map((st) => (
          <button
            key={st}
            onClick={() => setActiveStatusFilter(st)}
            className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all border shrink-0 ${
              activeStatusFilter === st
                ? 'bg-[#b87a3d] text-white font-semibold border-[#b87a3d]'
                : 'bg-white text-zinc-600 border-zinc-200 hover:text-zinc-900 hover:bg-zinc-50'
            }`}
          >
            {st === 'all' ? 'All 13 Open Items' : st}
          </button>
        ))}
      </div>

      {/* 13 Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
        {filteredItems.map((item, idx) => (
          <div 
            key={item.id}
            className="p-5 rounded-2xl bg-white border border-zinc-200 hover:border-[#b87a3d]/40 transition-all shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-md border ${getStatusBadge(item.status)}`}>
                  {item.status}
                </span>
                <span className="text-[10px] font-mono text-zinc-400">#{item.id.toUpperCase()}</span>
              </div>

              <h4 className="text-sm font-bold text-zinc-900 mb-2 font-sans">
                {item.item}
              </h4>
            </div>

            <div className="pt-3 border-t border-zinc-100 mt-3 text-xs text-zinc-600 font-sans">
              <span className="text-[10px] font-mono uppercase text-zinc-400 font-bold block mb-1">
                Strategic Importance
              </span>
              <p className="leading-relaxed">{item.whyItMatters}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Embedded KPI & Risk Section */}
      <MeasurementAndRisk />

      {/* Formal Architecture Approval & Signature Block (Light Theme) */}
      <div className="mt-14 rounded-3xl bg-white border border-zinc-200 p-6 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 mb-6 border-b border-zinc-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 font-mono mb-1">
              <ShieldCheck className="w-4 h-4" />
              Client Review & Next-Step Approval
            </div>
            <h3 className="text-2xl font-sans font-bold text-zinc-900">
              Initial Recommendation for Endorsement
            </h3>
            <p className="text-xs text-zinc-500 font-sans mt-1">
              Prepared for the Lombardy Housing Operator Board & IT Steering Committee.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-mono font-bold">
              Ready for Client Review
            </span>
          </div>
        </div>

        {/* 3 Sign-Off Stamping Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block">
              Service Design & Proposal Development
            </span>
            <div className="font-sans font-bold text-zinc-900 text-base">
              Kylie Bi
            </div>
            <div className="pt-2 text-[11px] font-mono text-emerald-700 font-semibold flex items-center gap-1">
              <span>Initial Recommendation Prepared — Sept 2026</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block">
              Client Operating Sponsor
            </span>
            <div className="font-sans font-bold text-zinc-900 text-base">
              Resident Services Director
            </div>
            <p className="text-xs text-zinc-600 font-sans">
              Lombardy Affordable Housing Operator
            </p>
            <div className="pt-2 text-[11px] font-mono text-zinc-500 flex items-center gap-1">
              <span>Pending Phase 1 Discovery Kickoff</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block">
              Authorized Planning Ceiling
            </span>
            <div className="font-sans font-bold text-zinc-900 text-base">
              €60,000 (Excl. VAT)
            </div>
            <p className="text-xs text-zinc-600 font-sans">
              Target Cohort: ~3,000 Homes
            </p>
            <div className="pt-2 text-[11px] font-mono text-[#9a6027] font-semibold flex items-center gap-1">
              <span>Firm Core Allocation: €52,150</span>
            </div>
          </div>

        </div>
      </div>

      {/* Validation Checklist Export & Print Modal */}
      <ValidationChecklistExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

    </section>
  );
};
