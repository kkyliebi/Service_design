import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  X, 
  FileText, 
  FileCode, 
  ShieldCheck, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { 
  PROPOSAL_AT_A_GLANCE, 
  BUDGET_SCENARIOS, 
  BUDGET_COST_ITEMS,
  RACI_MATRIX,
  OPEN_VALIDATION_ITEMS,
  RISKS_AND_MITIGATIONS,
  MEASUREMENT_PLAN
} from '../data/proposalData';
import { BLUEPRINT_MODULES } from '../data/blueprintData';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [printAttempted, setPrintAttempted] = useState(false);

  if (!isOpen) return null;

  const isInIframe = window.self !== window.top;

  const handleNativePrint = () => {
    setPrintAttempted(true);
    try {
      window.print();
    } catch (e) {
      console.warn('Native window.print() blocked by iframe sandbox', e);
    }
  };

  const handleOpenStandalone = () => {
    window.open(window.location.href, '_blank');
  };

  const generateMarkdownDossier = () => {
    return `# Resident Maintenance Service Integration
## Initial recommendation for a limited resident-maintenance pilot
**Author**: Design by Kylie Bi
**Planning Basis**: September 2026
**Target Cohort**: Lombardy Affordable Housing Operator (~3,000 homes)
**Planning Ceiling**: €60,000 (Excl. VAT)

---

### Executive Summary & Key Decisions
- **Key Proposal Decision**: Implement the **DomusOne Integration Connector** to connect existing Zendesk intake directly with operational work orders while protecting human approval gates before formal dispatch.
- **Recommended Commercial Position**: Approve **Core Pilot (€52,150)** as the firm commitment within the €60,000 ceiling (€7,850 headroom). Treat Recommended add-ons (€63,620) as phased options after Phase 1 discovery.
- **Critical Lead Time**: DomusOne Integration Connector requires 6–8 weeks supplier lead time. Must be authorized in Phase 1.

---

### Commercial Scenarios (Base Planning Case, Excl. VAT)
1. **Core Pilot Scenario**: €52,150 (Headroom under €60k ceiling: -€7,850)
2. **Recommended Pilot Scenario**: €63,620 (Gap over €60k ceiling: +€3,620)
3. **Expanded Pilot Scenario**: €69,470 (Gap over €60k ceiling: +€9,470)

---

### 5-Phase Implementation Roadmap
- **Phase 1 (Weeks 1-4)**: Discovery and Technical Validation
- **Phase 2 (Weeks 5-10)**: Core Configuration & Integration Setup
- **Phase 3 (Weeks 8-12)**: Controlled Add-on Proof of Concept
- **Phase 4 (Weeks 13-20)**: Limited Pilot Run (Target cohort of ~3,000 homes)
- **Phase 5 (Weeks 21-24)**: Pilot Review and Scale Decision

---

### RACI Governance Highlights
- **Human Approval Authority**: Resident Services Lead & Maintenance Coordinator remain solely authorized to approve work order dispatch into DomusOne.
- **AI Boundaries**: Zendesk AI / Macro assists with extraction, tagging, and summary drafts, but is strictly prohibited from direct automatic dispatch into DomusOne without human sign-off.

---
*Report generated from Resident Maintenance Service Integration interactive platform.*
`;
  };

  const handleDownloadMarkdown = () => {
    const mdContent = generateMarkdownDossier();
    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Resident_Maintenance_Service_Integration_Report_${new Date().toISOString().slice(0,10)}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopySummary = () => {
    const summary = `Resident Maintenance Service Integration
Initial recommendation for a limited resident-maintenance pilot
Design by Kylie Bi | September 2026

- Primary Decision: Implement DomusOne Integration Connector between Zendesk and DomusOne with human approval gates.
- Commercial Recommendation: Approve Core Pilot (€52,150) within the €60,000 planning ceiling (€7,850 headroom).
- Delivery Path: 5-Phase rollout with 6-8 week lead-time for DomusOne connector.
- AI Governance: Structured intake assistance only; human staff retains sole dispatch authority.`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-zinc-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#b87a3d]/10 text-[#9a6027] border border-[#b87a3d]/25 flex items-center justify-center shrink-0">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-sans font-bold text-zinc-900">
                Print & Export Report
              </h3>
              <p className="text-xs text-zinc-500 font-sans">
                Save as PDF, print full dossier, or export offline document
              </p>
            </div>
          </div>

          <button
            id="btn-close-export-modal"
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Iframe Notice (if inside iframe preview) */}
        {isInIframe && (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-2.5 text-xs text-zinc-800 font-sans">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-zinc-900 block">Preview iFrame Detected</span>
              Browser security policies in embedded iframes may block print dialogs. For best results when printing to PDF, click <strong className="text-zinc-900">Open in Full Tab to Print</strong> below.
            </div>
          </div>
        )}

        {/* Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          
          {/* Action 1: Native Print */}
          <button
            id="btn-modal-trigger-print"
            onClick={handleNativePrint}
            className="p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-[#b87a3d]/40 text-left transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-[#b87a3d]/10 text-[#9a6027]">
                <Printer className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-zinc-500">Ctrl/Cmd + P</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 mb-1 group-hover:text-[#9a6027] transition-colors">
                Print / Save as PDF
              </h4>
              <p className="text-[11px] text-zinc-500 leading-snug">
                Triggers browser print dialog with print-optimized styling.
              </p>
            </div>
          </button>

          {/* Action 2: Open Standalone Tab */}
          <button
            id="btn-modal-open-standalone"
            onClick={handleOpenStandalone}
            className="p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-emerald-500/40 text-left transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                <ExternalLink className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-emerald-800 font-bold">Recommended</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 mb-1 group-hover:text-emerald-800 transition-colors">
                Open in Full Tab to Print
              </h4>
              <p className="text-[11px] text-zinc-500 leading-snug">
                Bypasses iframe sandbox to allow unrestricted PDF export.
              </p>
            </div>
          </button>

          {/* Action 3: Download Markdown Dossier */}
          <button
            id="btn-modal-download-md"
            onClick={handleDownloadMarkdown}
            className="p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-sky-500/40 text-left transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-sky-100 text-sky-800">
                <Download className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-zinc-500">.MD Document</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 mb-1 group-hover:text-sky-800 transition-colors">
                Download Executive Dossier
              </h4>
              <p className="text-[11px] text-zinc-500 leading-snug">
                Export complete master content, RACI & cost tables offline.
              </p>
            </div>
          </button>

          {/* Action 4: Copy Executive Summary */}
          <button
            id="btn-modal-copy-summary"
            onClick={handleCopySummary}
            className="p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-[#b87a3d]/40 text-left transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-[#b87a3d]/10 text-[#9a6027]">
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </div>
              <span className="text-[10px] font-mono text-zinc-500">Clipboard</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 mb-1 group-hover:text-[#9a6027] transition-colors">
                {copied ? 'Summary Copied!' : 'Copy Executive Summary'}
              </h4>
              <p className="text-[11px] text-zinc-500 leading-snug">
                Copy condensed proposal brief to clipboard for emails or decks.
              </p>
            </div>
          </button>

        </div>

        {/* Footer info & close */}
        <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-500">
            Document Version: Pilot Blueprint Release
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs transition-colors shadow-xs"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
