import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Layers, 
  DollarSign, 
  CheckSquare, 
  Compass, 
  Printer, 
  Menu, 
  X, 
  ArrowUp,
  Sliders,
  Shield
} from 'lucide-react';
import { ExportModal } from './ExportModal';

interface HeaderNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ activeSection, onNavigate }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'executive-summary', label: 'Executive Summary', icon: FileText },
    { id: 'context-problems', label: 'Context & Problems', icon: Compass },
    { id: 'principles-governance', label: 'Principles & AI Rules', icon: Shield },
    { id: 'target-model', label: 'Operating Model', icon: Sliders },
    { id: 'blueprint-explorer', label: 'Blueprint', icon: Layers },
    { id: 'commercial-options', label: 'Budget & Scenarios', icon: DollarSign },
    { id: 'raci-roadmap', label: 'RACI & Roadmap', icon: CheckSquare },
    { id: 'validation-signoff', label: 'Validation & Sign-Off', icon: CheckSquare },
  ];

  const handlePrint = () => {
    setExportModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-zinc-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#b87a3d] via-[#d4995b] to-[#b87a3d] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Executive Header Bar (Light Theme) */}
      <header className="fixed top-3 left-1/2 -translate-x-1/2 w-[96%] max-w-7xl z-40 bg-white/90 backdrop-blur-xl border border-zinc-200/80 rounded-2xl shadow-lg shadow-zinc-900/5 px-4 sm:px-6 py-2.5 transition-all duration-300">
        <div className="flex items-center justify-between">
          
          {/* Logo / Byline Title */}
          <div 
            onClick={scrollToTop}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#b87a3d] to-[#8c521d] flex items-center justify-center text-white font-bold text-xs shadow-sm shadow-[#b87a3d]/20 group-hover:scale-105 transition-transform">
              KB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-wider text-zinc-900 uppercase font-sans">
                  Resident Maintenance Service Integration
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#b87a3d]/10 text-[#9a6027] border border-[#b87a3d]/25 font-semibold">
                  Pilot Blueprint
                </span>
              </div>
              <div className="text-[11px] text-zinc-500 font-sans tracking-wide leading-snug">
                <div>Initial recommendation</div>
                <div className="text-zinc-700 font-medium">Design by Kylie Bi</div>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 font-medium ${
                    isActive 
                      ? 'bg-[#b87a3d]/10 text-[#9a6027] font-semibold border border-[#b87a3d]/30 shadow-xs' 
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  <item.icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#9a6027]' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              id="btn-quick-blueprint"
              onClick={() => onNavigate('blueprint-explorer')}
              className="hidden md:flex items-center gap-1.5 text-xs bg-[#b87a3d] hover:bg-[#a66a30] text-white font-semibold px-3 py-1.5 rounded-lg transition-all shadow-sm shadow-[#b87a3d]/20 active:scale-95"
            >
              <Layers className="w-3.5 h-3.5 text-white" />
              <span>Explore Blueprint</span>
            </button>

            <button
              id="btn-print-report"
              onClick={handlePrint}
              title="Print & Export (PDF, Markdown)"
              className="p-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200 transition-all flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-[#9a6027]" />
            </button>

            {/* Mobile Menu Trigger */}
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-100 text-zinc-700 hover:bg-zinc-200 lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-zinc-200 grid grid-cols-2 gap-2 animate-in fade-in duration-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-xs p-2.5 rounded-lg flex items-center gap-2 font-medium ${
                  activeSection === item.id 
                    ? 'bg-[#b87a3d]/15 text-[#9a6027] font-semibold border border-[#b87a3d]/30' 
                    : 'bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                <item.icon className="w-4 h-4 text-[#9a6027]" />
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Floating Scroll to Top button bottom right */}
      <button
        id="btn-scroll-to-top"
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-white hover:bg-[#b87a3d] text-zinc-700 hover:text-white border border-zinc-200 hover:border-[#b87a3d] shadow-lg transition-all duration-300 ${
          scrollProgress > 15 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      {/* Print & Export Dialog Modal */}
      <ExportModal 
        isOpen={exportModalOpen} 
        onClose={() => setExportModalOpen(false)} 
      />
    </>
  );
};
