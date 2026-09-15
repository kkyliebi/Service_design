import React, { useState } from 'react';
import { 
  Printer, 
  Download, 
  ExternalLink, 
  Copy, 
  Check, 
  X, 
  FileText, 
  FileSpreadsheet, 
  CheckSquare, 
  AlertCircle,
  HelpCircle,
  FileCode
} from 'lucide-react';
import { OPEN_VALIDATION_ITEMS } from '../data/proposalData';

interface ValidationChecklistExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ValidationChecklistExportModal: React.FC<ValidationChecklistExportModalProps> = ({ 
  isOpen, 
  onClose 
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const isInIframe = window.self !== window.top;

  // Generate Word Document (.doc) as formatted HTML
  const handleDownloadWordDoc = () => {
    const tableRows = OPEN_VALIDATION_ITEMS.map((item, index) => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 10px; font-family: monospace; font-size: 11px; text-align: center; vertical-align: top; width: 40px;">
          [ ]
        </td>
        <td style="padding: 10px; font-family: monospace; font-size: 11px; vertical-align: top; width: 60px; font-weight: bold; color: #64748b;">
          #${item.id.toUpperCase()}
        </td>
        <td style="padding: 10px; font-size: 12px; vertical-align: top; width: 140px;">
          <span style="display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 10px; font-family: monospace; font-weight: bold; background-color: #f1f5f9; color: #334155; border: 1px solid #cbd5e1;">
            ${item.status}
          </span>
        </td>
        <td style="padding: 10px; font-size: 12px; vertical-align: top; font-weight: 600; color: #0f172a; width: 280px;">
          ${item.item}
        </td>
        <td style="padding: 10px; font-size: 11px; vertical-align: top; color: #475569;">
          ${item.whyItMatters}
        </td>
        <td style="padding: 10px; font-size: 11px; vertical-align: top; color: #94a3b8; width: 120px; font-style: italic;">
          ___________________
        </td>
      </tr>
    `).join('');

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset='utf-8'>
        <title>Resident Maintenance Pilot - Open Items & Validation Checklist</title>
        <style>
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            margin: 30px;
            color: #0f172a;
            line-height: 1.5;
          }
          h1 {
            color: #1e293b;
            font-size: 22px;
            margin-bottom: 4px;
          }
          h2 {
            color: #9a6027;
            font-size: 14px;
            font-weight: normal;
            margin-top: 0;
            margin-bottom: 20px;
          }
          .meta-box {
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 12px;
            margin-bottom: 24px;
            font-size: 12px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 15px;
          }
          th {
            background-color: #f1f5f9;
            color: #475569;
            font-size: 11px;
            font-weight: bold;
            text-transform: uppercase;
            padding: 10px;
            text-align: left;
            border-bottom: 2px solid #cbd5e1;
          }
          .signoff-section {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e2e8f0;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <h1>Resident Maintenance Service Integration</h1>
        <h2>Open Items & Validation Checklist • Phase 1 Technical & Policy Verification</h2>
        
        <div class="meta-box">
          <strong>Target Organization:</strong> Lombardy Affordable Housing Operator (~3,000 homes)<br>
          <strong>Author & System Architect:</strong> Design by Kylie Bi (September 2026)<br>
          <strong>Total Items Requiring Input / Check:</strong> 13 Prioritized Action Items<br>
          <strong>Instructions:</strong> Review each item below with the IT, Customer Service, and Operations teams. Complete feedback in the 'Resolution & Notes' column before Phase 1 Pilot Sign-off.
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 40px; text-align: center;">Done</th>
              <th style="width: 60px;">ID</th>
              <th style="width: 140px;">Status / Category</th>
              <th style="width: 280px;">Action Item & Required Information</th>
              <th>Strategic Rationale (Why It Matters)</th>
              <th style="width: 120px;">Resolution & Notes</th>
            </tr>
          </thead>
          <tbody>
            ${tableRows}
          </tbody>
        </table>

        <div class="signoff-section">
          <h3>Phase 1 Validation Sign-Off</h3>
          <p>Upon addressing the items above, authorized representatives confirm that the technical requirements, vendor terms, and operating decisions are resolved:</p>
          <br>
          <table style="width: 100%; border: none;">
            <tr>
              <td style="width: 50%; padding: 10px; border: 1px solid #cbd5e1;">
                <strong>Client Operating Lead:</strong> ___________________________<br><br>
                <strong>Signature / Date:</strong> ___________________________
              </td>
              <td style="width: 50%; padding: 10px; border: 1px solid #cbd5e1;">
                <strong>IT / Technical Authority:</strong> ___________________________<br><br>
                <strong>Signature / Date:</strong> ___________________________
              </td>
            </tr>
          </table>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff', htmlContent], {
      type: 'application/msword;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Resident_Maintenance_Open_Items_Validation_Checklist_${new Date().toISOString().slice(0, 10)}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Generate Markdown
  const handleDownloadMarkdown = () => {
    const mdRows = OPEN_VALIDATION_ITEMS.map((item) => {
      return `### [ ] #${item.id.toUpperCase()}: ${item.item}\n- **Category/Status**: ${item.status}\n- **Strategic Rationale**: ${item.whyItMatters}\n- **Owner/Sign-off**: [ ] Pending review\n- **Client Notes**: _____________________\n`;
    }).join('\n');

    const mdContent = `# Resident Maintenance Service Integration
## Open Items & Validation Checklist
**Prepared for**: Lombardy Affordable Housing Operator (~3,000 homes)  
**System Architecture**: Design by Kylie Bi (September 2026)  
**Total Items**: 13 Action Items  

---

${mdRows}

---
### Phase 1 Sign-Off
- **Client Operating Lead**: ____________________ (Date: _________)
- **Technical Lead**: ____________________ (Date: _________)
`;

    const blob = new Blob([mdContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Resident_Maintenance_Validation_Checklist_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyText = () => {
    const text = OPEN_VALIDATION_ITEMS.map((item, idx) => {
      return `${idx + 1}. [${item.status}] #${item.id.toUpperCase()}: ${item.item}\n   -> Why it matters: ${item.whyItMatters}`;
    }).join('\n\n');

    const fullSummary = `Resident Maintenance Service Integration - Open Items & Validation Checklist (13 Items)\n\n${text}`;

    navigator.clipboard.writeText(fullSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    // Generate a printable HTML document in a new window or trigger window.print
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      window.print();
      return;
    }

    const rows = OPEN_VALIDATION_ITEMS.map((item, idx) => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 10px; font-family: monospace; font-size: 12px; text-align: center; width: 35px;">[ ]</td>
        <td style="padding: 10px; font-family: monospace; font-size: 11px; color: #64748b; font-weight: bold; width: 55px;">#${item.id.toUpperCase()}</td>
        <td style="padding: 10px; font-size: 11px; width: 140px;"><span style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace; border: 1px solid #cbd5e1;">${item.status}</span></td>
        <td style="padding: 10px; font-size: 12px; font-weight: 600; color: #0f172a;">${item.item}</td>
        <td style="padding: 10px; font-size: 11px; color: #475569;">${item.whyItMatters}</td>
        <td style="padding: 10px; font-size: 11px; width: 100px; color: #94a3b8;">___________</td>
      </tr>
    `).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Open Items & Validation Checklist - Resident Maintenance Integration</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; padding: 24px; color: #0f172a; margin: 0; }
          h1 { font-size: 20px; margin-bottom: 4px; color: #0f172a; }
          .sub { color: #64748b; font-size: 13px; margin-bottom: 16px; }
          .banner { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; font-size: 12px; margin-bottom: 20px; }
          table { width: 100%; border-collapse: collapse; text-align: left; }
          th { background: #f1f5f9; padding: 8px 10px; font-size: 10px; font-family: monospace; text-transform: uppercase; color: #475569; border-bottom: 2px solid #cbd5e1; }
          @media print {
            body { padding: 0; }
            button { display: none; }
          }
        </style>
      </head>
      <body>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px;">
          <div>
            <h1>Open Items & Validation Checklist</h1>
            <div class="sub">Resident Maintenance Service Integration • Design by Kylie Bi (Sept 2026)</div>
          </div>
          <button onclick="window.print()" style="padding: 8px 16px; background: #0f172a; color: white; border: none; border-radius: 6px; font-size: 12px; cursor: pointer;">Print / Save PDF</button>
        </div>

        <div class="banner">
          <strong>Instructions:</strong> This document contains all 13 key validation items, technical constraints, and operating decisions requiring client confirmation before pilot deployment.
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 35px; text-align: center;">Done</th>
              <th style="width: 55px;">ID</th>
              <th style="width: 140px;">Status / Category</th>
              <th>Action Item & Required Information</th>
              <th>Strategic Importance</th>
              <th style="width: 100px;">Sign-off</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>

        <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #cbd5e1; font-size: 11px; color: #64748b; display: flex; justify-content: space-between;">
          <span>Target Housing Cohort: ~3,000 homes</span>
          <span>Sign-off: ________________________ (Date: ____________)</span>
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 no-print">
      <div className="relative w-full max-w-xl p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-zinc-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#b87a3d]/10 text-[#9a6027] border border-[#b87a3d]/25 flex items-center justify-center shrink-0">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-sans font-bold text-zinc-900">
                Export & Print Validation Checklist
              </h3>
              <p className="text-xs text-zinc-500 font-sans">
                Export all 13 client action items & validation checkpoints into Word, PDF, or Markdown
              </p>
            </div>
          </div>

          <button
            id="btn-close-val-export-modal"
            onClick={onClose}
            className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Iframe Notice */}
        {isInIframe && (
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-300 flex items-start gap-2.5 text-xs text-zinc-800 font-sans">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-zinc-900 block">Print Tip for Embedded Previews</span>
              For direct printing or saving as PDF without browser sandbox restrictions, use <strong className="text-zinc-900">Print / Save as PDF</strong> (opens a clean dedicated printable document window) or download the <strong className="text-zinc-900">Word (.doc)</strong> file.
            </div>
          </div>
        )}

        {/* Action Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          
          {/* Action 1: Download Word Document */}
          <button
            id="btn-modal-val-download-word"
            onClick={handleDownloadWordDoc}
            className="p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-[#b87a3d]/40 text-left transition-all group flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-800">
                <FileText className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-blue-800 font-bold">Word / .DOC</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 mb-1 group-hover:text-[#9a6027] transition-colors">
                Download Word Document (.doc)
              </h4>
              <p className="text-[11px] text-zinc-500 leading-snug">
                Formatted Word file with interactive checkbox grid, table, and sign-off block.
              </p>
            </div>
          </button>

          {/* Action 2: Print / PDF Window */}
          <button
            id="btn-modal-val-print"
            onClick={handlePrint}
            className="p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-emerald-500/40 text-left transition-all group flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                <Printer className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-emerald-800 font-bold">Print / PDF</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 mb-1 group-hover:text-emerald-800 transition-colors">
                Print / Save as PDF
              </h4>
              <p className="text-[11px] text-zinc-500 leading-snug">
                Opens clean printable checklist with print-optimized table styles.
              </p>
            </div>
          </button>

          {/* Action 3: Download Markdown (.md) */}
          <button
            id="btn-modal-val-download-md"
            onClick={handleDownloadMarkdown}
            className="p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-sky-500/40 text-left transition-all group flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-sky-100 text-sky-800">
                <Download className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-mono text-zinc-500">.MD Checklist</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 mb-1 group-hover:text-sky-800 transition-colors">
                Download Markdown (.md)
              </h4>
              <p className="text-[11px] text-zinc-500 leading-snug">
                Task-list markdown format with standard checkboxes (`- [ ]`).
              </p>
            </div>
          </button>

          {/* Action 4: Copy to Clipboard */}
          <button
            id="btn-modal-val-copy"
            onClick={handleCopyText}
            className="p-4 rounded-2xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-[#b87a3d]/40 text-left transition-all group flex flex-col justify-between cursor-pointer"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2 rounded-xl bg-[#b87a3d]/10 text-[#9a6027]">
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </div>
              <span className="text-[10px] font-mono text-zinc-500">Clipboard</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-zinc-900 mb-1 group-hover:text-[#9a6027] transition-colors">
                {copied ? 'Checklist Copied!' : 'Copy Checklist Text'}
              </h4>
              <p className="text-[11px] text-zinc-500 leading-snug">
                Fast copy for pasting into team emails, Jira, or review docs.
              </p>
            </div>
          </button>

        </div>

        {/* Footer info & close */}
        <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-500">
            13 Open Items • Phase 1 Validation
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs transition-colors shadow-xs cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
