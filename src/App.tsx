import React, { useState, useEffect } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { HeroExecutive } from './components/HeroExecutive';
import { ProblemAndContext } from './components/ProblemAndContext';
import { PrinciplesAndGovernance } from './components/PrinciplesAndGovernance';
import { TargetOperatingModel } from './components/TargetOperatingModel';
import { BlueprintExplorer } from './components/BlueprintExplorer';
import { CommercialCalculator } from './components/CommercialCalculator';
import { RoadmapAndGovernance } from './components/RoadmapAndGovernance';
import { ValidationChecklist } from './components/ValidationChecklist';
import { FooterCredits } from './components/FooterCredits';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('executive-summary');

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'executive-summary',
        'context-problems',
        'principles-governance',
        'target-model',
        'blueprint-explorer',
        'commercial-options',
        'raci-roadmap',
        'validation-signoff',
      ];

      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -90;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] text-zinc-900 font-sans antialiased selection:bg-[#b87a3d] selection:text-white">
      
      {/* Top Floating Navigation Bar with Reading Progress */}
      <HeaderNav activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Long-Form Interactive Web Report */}
      <main className="relative">
        
        {/* Section 01: Master Title & Executive Summary */}
        <HeroExecutive onNavigate={handleNavigate} />

        {/* Section 02: Client Context & The Integration Break */}
        <ProblemAndContext />

        {/* Section 03: Design Principles & AI Safety Governance */}
        <PrinciplesAndGovernance />

        {/* Section 04: Target Operating Model & System Authority */}
        <TargetOperatingModel />

        {/* Section 05: Master Architecture — Target System Blueprint */}
        <BlueprintExplorer />

        {/* Section 06: Commercial Options & Budget Sensitivity */}
        <CommercialCalculator />

        {/* Section 07: Implementation Roadmap, RACI & Governance */}
        <RoadmapAndGovernance />

        {/* Section 08: Open Items, Validation Register & Approval */}
        <ValidationChecklist />

      </main>

      {/* Footer & Design Attribution */}
      <FooterCredits onNavigate={handleNavigate} />

    </div>
  );
}
