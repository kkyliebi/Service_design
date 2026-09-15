import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  X, 
  Layers, 
  FileCode, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { BLUEPRINT_OVERVIEW_LANES, BLUEPRINT_MODULES } from '../data/blueprintData';

interface BlueprintExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BlueprintExportModal: React.FC<BlueprintExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const isInIframe = window.self !== window.top;

  const handlePrint = () => {
    onClose();
    setTimeout(() => {
      window.print();
    }, 150);
  };

  const handleOpenStandalone = () => {
    window.open(window.location.href, '_blank');
  };

  const generateMarkdown = () => {
    let md = `# Resident Maintenance Target System Blueprint\n`;
    md += `## Master Architecture & Service Flow Specification\n`;
    md += `**Date**: September 2026 | **Target Cohort**: Lombardy Affordable Housing Operator (~3,000 homes)\n\n`;
    md += `---\n\n`;

    md += `### 1. Actor Swimlanes Overview\n\n`;
    BLUEPRINT_OVERVIEW_LANES.forEach((lane) => {
      md += `#### ${lane.title}\n*${lane.subtitle}*\n\n`;
      lane.steps.forEach((step, idx) => {
        md += `- **Step ${idx + 1}: ${step.title}** [${step.actorLabel}]\n`;
        md += `  - ${step.description}\n`;
        md += `  - *Implementation*: ${step.implementationBadge}\n`;
        if (step.rules && step.rules.length > 0) {
          md += `  - *Rules*: ${step.rules.join('; ')}\n`;
        }
        md += `\n`;
      });
    });

    md += `---\n\n### 2. Operational Sub-Modules (01 - 08)\n\n`;
    BLUEPRINT_MODULES.forEach((mod) => {
      md += `#### Module ${mod.number}: ${mod.title}\n`;
      md += `*${mod.subHeader}*\n\n`;
      md += `**Steps**:\n`;
      mod.steps.forEach((st, i) => {
        md += `${i + 1}. **[${st.actorLabel || st.actor.toUpperCase()}] ${st.title}** — ${st.description}\n`;
        if (st.rules && st.rules.length > 0) {
          md += `   - *Governance & Rules*: ${st.rules.join('; ')}\n`;
        }
        if (st.detailedSpecs && st.detailedSpecs.length > 0) {
          md += `   - *Detailed Specifications*: ${st.detailedSpecs.join('; ')}\n`;
        }
      });
      md += `\n`;
    });

    md += `---\n*Generated from Resident Maintenance Target System Blueprint Interactive Dossier.*`;
    return md;
  };

  const handleDownloadMarkdown = () => {
    const md = generateMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Resident_Maintenance_Target_Blueprint_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadHtml = () => {
    let html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Target System Blueprint - Master Architecture</title><style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1e293b; max-width: 900px; margin: 40px auto; padding: 0 20px; }
      h1 { color: #0f172a; border-bottom: 2px solid #b87a3d; padding-bottom: 8px; }
      h2 { color: #9a6027; margin-top: 30px; }
      h3 { color: #334155; margin-top: 24px; }
      .badge { display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-family: monospace; font-weight: bold; background: #fef3c7; color: #92400e; border: 1px solid #fde68a; }
      .step-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; margin-bottom: 12px; }
      .step-title { font-weight: bold; font-size: 14px; color: #0f172a; margin-bottom: 4px; }
      .rules { font-size: 12px; color: #475569; margin-top: 6px; padding-left: 18px; }
    </style></head><body>`;

    html += `<h1>Resident Maintenance Target System Blueprint</h1>`;
    html += `<p><strong>Specification Date:</strong> September 2026 | <strong>Target Cohort:</strong> Lombardy Housing Operator (~3,000 homes)</p>`;

    BLUEPRINT_MODULES.forEach((mod) => {
      html += `<h2>Module ${mod.number}: ${mod.title}</h2>`;
      html += `<p><em>${mod.subHeader}</em></p>`;
      
      mod.steps.forEach((st) => {
        html += `<div class="step-box">`;
        html += `<div class="step-title"><span class="badge">${st.actorLabel || st.actor.toUpperCase()}</span> ${st.title}</div>`;
        html += `<p style="margin: 4px 0; font-size: 13px;">${st.description}</p>`;
        if (st.rules && st.rules.length > 0) {
          html += `<div style="font-size: 12px; font-weight: bold; margin-top: 6px; color: #64748b;">Governance Rules:</div><ul class="rules">`;
          st.rules.forEach((r) => { html += `<li>${r}</li>`; });
          html += `</ul>`;
        }
        if (st.detailedSpecs && st.detailedSpecs.length > 0) {
          html += `<div style="font-size: 12px; font-weight: bold; margin-top: 6px; color: #64748b;">Technical Specs:</div><ul class="rules">`;
          st.detailedSpecs.forEach((s) => { html += `<li>${s}</li>`; });
          html += `</ul>`;
        }
        html += `</div>`;
      });
    });

    html += `<hr style="margin-top: 40px; border: 0; border-top: 1px solid #e2e8f0;"><p style="font-size: 12px; color: #94a3b8; text-align: center;">Resident Maintenance Service Integration • Master Architecture Blueprint</p></body></html>`;

    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Resident_Maintenance_Blueprint_Document_${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopySummary = () => {
    const md = generateMarkdown();
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 no-print">
      <div className="relative w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-zinc-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#b87a3d]/10 text-[#9a6027] border border-[#b87a3d]/25 flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-sans font-bold text-zinc-900">
                Download & Print Blueprints
              </h3>
              <p className="text-xs text-zinc-500 font-sans">
                Export the 6 actor swimlanes & 8 operational sub-modules
              </p>
            </div>
          </div>

          <button
            id="btn-close-blueprint-export"
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Iframe Notice */}
        {isInIframe && (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-2.5 text-xs text-zinc-800 font-sans">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-zinc-900 block">Preview iFrame Detected</span>
              For full multi-page PDF generation without sandbox restrictions, you can also use <strong className="text-zinc-900">Open in Full Tab</strong> or download the complete <strong className="text-zinc-900">.MD / .HTML Dossier</strong>.
            </div>
          </div>
        )}

        {/* Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          
          {/* Action 1: Print / PDF */}
          <button
            id="btn-blueprint-print-pdf"
            onClick={handlePrint}
            className="p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-[#b87a3d]/40 text-left transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-[#b87a3d]/10 text-[#9a6027]">
                <Printer className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-zinc-500">PDF Print</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 mb-1 group-hover:text-[#9a6027] transition-colors">
                Print / Save as PDF
              </h4>
              <p className="text-[11px] text-zinc-500 leading-snug">
                Opens clean, print-optimized document view to save as PDF.
              </p>
            </div>
          </button>

          {/* Action 2: Download HTML Package */}
          <button
            id="btn-blueprint-download-html"
            onClick={handleDownloadHtml}
            className="p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-emerald-500/40 text-left transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                <FileCode className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-emerald-800 font-bold">Offline Ready</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 mb-1 group-hover:text-emerald-800 transition-colors">
                Download Standalone HTML
              </h4>
              <p className="text-[11px] text-zinc-500 leading-snug">
                Self-contained document for offline sharing or Word import.
              </p>
            </div>
          </button>

          {/* Action 3: Download Markdown Spec */}
          <button
            id="btn-blueprint-download-md"
            onClick={handleDownloadMarkdown}
            className="p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-sky-500/40 text-left transition-all group flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-sky-100 text-sky-800">
                <Download className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-zinc-500">.MD Dossier</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 mb-1 group-hover:text-sky-800 transition-colors">
                Download Markdown Spec
              </h4>
              <p className="text-[11px] text-zinc-500 leading-snug">
                Complete technical step triggers, actors and governance rules.
              </p>
            </div>
          </button>

          {/* Action 4: Copy Full Blueprint Text */}
          <button
            id="btn-blueprint-copy-text"
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
                {copied ? 'Copied to Clipboard!' : 'Copy Architecture Text'}
              </h4>
              <p className="text-[11px] text-zinc-500 leading-snug">
                Copy formatted architecture blueprint into Confluence or Jira.
              </p>
            </div>
          </button>

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
          <button
            onClick={handleOpenStandalone}
            className="text-xs text-zinc-500 hover:text-zinc-800 flex items-center gap-1.5 transition-colors font-medium"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open in New Tab</span>
          </button>
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
