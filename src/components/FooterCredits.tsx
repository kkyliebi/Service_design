import React, { useState } from 'react';
import { Building2, ArrowUp, Printer, FileText, Layers, Shield } from 'lucide-react';
import { ExportModal } from './ExportModal';

interface FooterCreditsProps {
  onNavigate: (sectionId: string) => void;
}

export const FooterCredits: React.FC<FooterCreditsProps> = ({ onNavigate }) => {
  const [exportModalOpen, setExportModalOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-200 bg-white py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        
        {/* Brand & Author */}
        <div className="max-w-md">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#b87a3d] to-[#8c521d] flex items-center justify-center font-bold text-white text-sm shadow-xs">
              KB
            </div>
            <div>
              <h3 className="text-sm font-bold text-zinc-900 font-sans">
                Resident Maintenance Service Integration
              </h3>
              <p className="text-xs text-zinc-500 font-sans">
                Initial recommendation for a limited resident-maintenance pilot
              </p>
            </div>
          </div>
          <p className="text-xs text-zinc-600 font-sans leading-relaxed">
            Master report & interactive Target System Blueprint. Prepared for the Lombardy affordable housing operator. <strong className="text-zinc-900">Design by Kylie Bi</strong>.
          </p>
        </div>

        {/* Quick Jump Links */}
        <div className="flex flex-wrap gap-4 text-xs text-zinc-600 font-sans">
          <button 
            onClick={() => onNavigate('executive-summary')}
            className="hover:text-[#9a6027] transition-colors"
          >
            Executive Summary
          </button>
          <button 
            onClick={() => onNavigate('context-problems')}
            className="hover:text-[#9a6027] transition-colors"
          >
            Friction Analysis
          </button>
          <button 
            onClick={() => onNavigate('target-model')}
            className="hover:text-[#9a6027] transition-colors"
          >
            Operating Model
          </button>
          <button 
            onClick={() => onNavigate('blueprint-explorer')}
            className="hover:text-[#9a6027] transition-colors"
          >
            Master Blueprint
          </button>
          <button 
            onClick={() => onNavigate('commercial-options')}
            className="hover:text-[#9a6027] transition-colors"
          >
            Commercials
          </button>
          <button 
            onClick={() => onNavigate('raci-roadmap')}
            className="hover:text-[#9a6027] transition-colors"
          >
            Roadmap
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setExportModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-xs text-zinc-700 hover:text-zinc-900 border border-zinc-200 flex items-center gap-2 transition-all font-medium"
          >
            <Printer className="w-3.5 h-3.5 text-[#9a6027]" />
            <span>Print & Export</span>
          </button>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200 transition-all"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>

      <div className="max-w-7xl mx-auto pt-8 mt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-zinc-400 gap-2">
        <span>© September 2026 Kylie Bi. All technical architecture rights reserved.</span>
        <span>Planning Ceiling: €60,000 (Excl. VAT) • Target Cohort: 3,000 Homes</span>
      </div>

      {/* Export & Print Modal */}
      <ExportModal 
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
      />
    </footer>
  );
};
