import React, { useState } from 'react';
import { 
  SYSTEM_AUTHORITY_MATRIX,
  DOMUSONE_STATUS_MAPPING,
  RESIDENT_SMS_MILESTONES
} from '../data/proposalData';
import { 
  Workflow, 
  Database, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Send, 
  FileSpreadsheet, 
  Building2, 
  PhoneCall, 
  UserCheck, 
  AlertCircle,
  ShieldCheck,
  Smartphone
} from 'lucide-react';

export const TargetOperatingModel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flow' | 'authority' | 'status' | 'sms'>('flow');

  const lifecycleStages = [
    { num: '01', title: 'Capture & Verify', desc: 'Zendesk captures multi-channel input; agent verifies tenant/property identity and confirms completeness.' },
    { num: '02', title: 'Authorise Transfer', desc: 'Human agent approves work order creation gate. Connector transmits payload to DomusOne.' },
    { num: '03', title: 'Assign & Dispatch', desc: 'Maintenance coordinator selects and confirms eligible contractor in DomusOne.' },
    { num: '04', title: 'Execute & Mirror', desc: 'Contractor updates appointments & job status in portal; events mirror automatically to Zendesk.' },
    { num: '05', title: 'Notify & Close', desc: 'Zendesk triggers milestone SMS updates to residents and records satisfaction upon closure.' },
  ];

  return (
    <section id="target-model" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-[#9a6027] bg-[#b87a3d]/10 border border-[#b87a3d]/30 mb-3">
          Section 04
        </div>
        <h2 className="text-3xl sm:text-4xl font-sans font-bold text-zinc-900 mb-3">
          Target Operating Model & Integration Architecture
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 font-sans max-w-3xl leading-relaxed">
          The end-to-end service lifecycle connecting Zendesk service intake with DomusOne maintenance execution, governed by clear authority boundaries and resident milestone communications.
        </p>
      </div>

      {/* Interactive Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 mb-8 overflow-x-auto no-scrollbar">
        <button
          id="btn-tom-tab-flow"
          onClick={() => setActiveTab('flow')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all shrink-0 ${
            activeTab === 'flow'
              ? 'bg-zinc-900 text-white shadow-xs'
              : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200'
          }`}
        >
          1. Service Lifecycle Stages
        </button>
        <button
          id="btn-tom-tab-authority"
          onClick={() => setActiveTab('authority')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all shrink-0 ${
            activeTab === 'authority'
              ? 'bg-zinc-900 text-white shadow-xs'
              : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200'
          }`}
        >
          2. System of Record Authorities
        </button>
        <button
          id="btn-tom-tab-status"
          onClick={() => setActiveTab('status')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all shrink-0 ${
            activeTab === 'status'
              ? 'bg-zinc-900 text-white shadow-xs'
              : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200'
          }`}
        >
          3. DomusOne Status Mapping
        </button>
        <button
          id="btn-tom-tab-sms"
          onClick={() => setActiveTab('sms')}
          className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all shrink-0 ${
            activeTab === 'sms'
              ? 'bg-zinc-900 text-white shadow-xs'
              : 'bg-zinc-100 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200'
          }`}
        >
          4. Resident SMS Milestones
        </button>
      </div>

      {/* Tab 1: Service Lifecycle Stages */}
      {activeTab === 'flow' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {lifecycleStages.map((st, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-[#9a6027] px-2 py-0.5 rounded bg-[#b87a3d]/10">
                      Stage {st.num}
                    </span>
                    {idx < 4 && <ArrowRight className="w-4 h-4 text-zinc-300 hidden md:block" />}
                  </div>
                  <h4 className="font-bold text-sm text-zinc-900 font-sans mb-2">
                    {st.title}
                  </h4>
                  <p className="text-xs text-zinc-600 font-sans leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-sans">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <strong className="text-zinc-900 block font-bold text-sm">Human Approval Gate at Stage 02</strong>
                <span className="text-zinc-600">No ticket is automatically dispatched into DomusOne without staff review of completeness, property matching, and urgency.</span>
              </div>
            </div>
            <span className="text-[11px] font-mono font-semibold text-emerald-800 bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shrink-0">
              Zero Autonomous Dispatch
            </span>
          </div>
        </div>
      )}

      {/* Tab 2: System Authority Matrix */}
      {activeTab === 'authority' && (
        <div className="rounded-3xl bg-white border border-zinc-200 p-4 sm:p-6 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-700 border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 text-[10px] font-mono uppercase tracking-wider text-zinc-500 bg-zinc-50">
                <th className="p-3.5 rounded-l-xl">Domain / Action</th>
                <th className="p-3.5">Authoritative System of Record</th>
                <th className="p-3.5">Data Flow Direction</th>
                <th className="p-3.5 rounded-r-xl">Governance Rule</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-sans">
              {SYSTEM_AUTHORITY_MATRIX.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                  <td className="p-3.5 font-bold text-zinc-900">{row.informationOrAction}</td>
                  <td className="p-3.5 font-mono text-[11px] text-[#9a6027] font-semibold">{row.authoritativeSystem}</td>
                  <td className="p-3.5 text-zinc-700">{row.permittedDirection}</td>
                  <td className="p-3.5 text-zinc-500">{row.notes || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: DomusOne Status Mapping */}
      {activeTab === 'status' && (
        <div className="rounded-3xl bg-white border border-zinc-200 p-4 sm:p-6 shadow-xs overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-700 border-collapse">
            <thead>
              <tr className="border-b border-zinc-200 text-[10px] font-mono uppercase tracking-wider text-zinc-500 bg-zinc-50">
                <th className="p-3.5 rounded-l-xl">DomusOne Status</th>
                <th className="p-3.5">Control Owner</th>
                <th className="p-3.5">Resident Communication Trigger</th>
                <th className="p-3.5 rounded-r-xl">Category Badge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-sans">
              {DOMUSONE_STATUS_MAPPING.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                  <td className="p-3.5 font-bold text-zinc-900 font-mono text-[11px]">{row.status}</td>
                  <td className="p-3.5 text-zinc-700">{row.primaryControl}</td>
                  <td className="p-3.5 text-zinc-600">{row.residentCommunication}</td>
                  <td className="p-3.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 uppercase font-semibold">
                      {row.badgeType}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 4: Resident SMS Milestones */}
      {activeTab === 'sms' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {RESIDENT_SMS_MILESTONES.map((sms, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Smartphone className="w-4 h-4 text-emerald-700" />
                  <h4 className="font-bold text-sm text-zinc-900 font-sans">
                    {sms.milestone}
                  </h4>
                </div>
                <p className="text-xs text-zinc-600 font-sans leading-relaxed mb-4">
                  {sms.messagePurpose}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
                <span className="text-[10px] font-mono uppercase text-[#9a6027] font-bold block mb-1">
                  Enforced Guardrail
                </span>
                <p className="text-zinc-700 font-medium font-sans">
                  {sms.control}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

    </section>
  );
};
