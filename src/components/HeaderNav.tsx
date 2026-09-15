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
    { id: 'executive-summary', shortLabel: 'Executive', label: 'Executive Summary', icon: FileText },
    { id: 'context-problems', shortLabel: 'Context', label: 'Context & Problems', icon: Compass },
    { id: 'principles-governance', shortLabel: 'Principles', label: 'Principles & AI', icon: Shield },
    { id: 'target-model', shortLabel: 'Operating Model', label: 'Operating Model', icon: Sliders },
    { id: 'blueprint-explorer', shortLabel: 'Blueprint', label: 'Blueprint', icon: Layers },
    { id: 'commercial-options', shortLabel: 'Commercial', label: 'Commercial & Budget', icon: DollarSign },
    { id: 'raci-roadmap', shortLabel: 'Roadmap', label: 'RACI & Roadmap', icon: CheckSquare },
    { id: 'validation-signoff', shortLabel: 'Validation', label: 'Open Items Checklist', icon: CheckSquare },
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
      <div className="fixed top-0 inset-x-0 w-full h-[3px] bg-zinc-200 z-50 pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-[#b87a3d] via-[#d4995b] to-[#b87a3d] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Executive Header Bar (Light Theme) */}
      <header className="fixed top-3 inset-x-0 mx-auto w-[96%] max-w-7xl z-40 bg-white/95 backdrop-blur-xl border border-zinc-200/90 rounded-2xl shadow-lg shadow-zinc-900/5 px-3.5 sm:px-5 py-2 transition-all duration-300">
        <div className="flex items-center justify-between gap-3">
          
          {/* Logo / Byline Title */}
          <div 
            onClick={scrollToTop}
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#b87a3d] to-[#8c521d] flex items-center justify-center text-white font-bold text-xs shadow-xs group-hover:scale-105 transition-transform shrink-0">
              KB
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-tight text-zinc-900 font-sans whitespace-nowrap">
                  Resident Maintenance
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#b87a3d]/10 text-[#9a6027] border border-[#b87a3d]/25 font-bold">
                  Blueprint
                </span>
              </div>
              <span className="text-[10px] text-zinc-500 font-sans tracking-tight leading-none whitespace-nowrap">
                Design by <strong className="text-zinc-700 font-medium">Kylie Bi</strong>
              </span>
            </div>
          </div>

          {/* Desktop Nav Links (Responsive to screen width) */}
          <nav className="hidden xl:flex items-center gap-1 shrink-1 overflow-hidden">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`text-xs px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 font-medium whitespace-nowrap ${
                    isActive 
                      ? 'bg-[#b87a3d]/10 text-[#9a6027] font-semibold border border-[#b87a3d]/30 shadow-xs' 
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                  title={item.label}
                >
                  <item.icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#9a6027]' : 'text-zinc-400'}`} />
                  <span>{item.shortLabel}</span>
                </button>
              );
            })}
          </nav>

          {/* Mid-screen compact nav for 1024px-1279px */}
          <nav className="hidden lg:flex xl:hidden items-center gap-1 shrink-1 overflow-hidden">
            {navItems.slice(0, 6).map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-compact-${item.id}`}
                  onClick={() => onNavigate(item.id)}
                  className={`text-[11px] px-2 py-1 rounded-md transition-all font-medium whitespace-nowrap ${
                    isActive 
                      ? 'bg-[#b87a3d]/10 text-[#9a6027] font-semibold border border-[#b87a3d]/30' 
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                  title={item.label}
                >
                  {item.shortLabel}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              id="btn-quick-blueprint"
              onClick={() => onNavigate('blueprint-explorer')}
              className="hidden md:flex items-center gap-1.5 text-xs bg-[#b87a3d] hover:bg-[#a66a30] text-white font-semibold px-3 py-1.5 rounded-xl transition-all shadow-xs active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-white" />
              <span>Blueprint</span>
            </button>

            <button
              id="btn-print-report"
              onClick={handlePrint}
              title="Print & Export (PDF, Markdown, Word)"
              className="p-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200 transition-all flex items-center justify-center cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#9a6027]" />
            </button>

            {/* Mobile / Tablet Menu Trigger */}
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-zinc-100 text-zinc-700 hover:bg-zinc-200 xl:hidden flex items-center justify-center cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile / Tablet Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden mt-3 pt-3 border-t border-zinc-200 grid grid-cols-2 sm:grid-cols-4 gap-2 animate-in fade-in duration-200">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left text-xs p-2.5 rounded-xl flex items-center gap-2 font-medium ${
                  activeSection === item.id 
                    ? 'bg-[#b87a3d]/15 text-[#9a6027] font-semibold border border-[#b87a3d]/30' 
                    : 'bg-zinc-50 text-zinc-700 hover:bg-zinc-100'
                }`}
              >
                <item.icon className="w-4 h-4 text-[#9a6027] shrink-0" />
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
