import React, { useState } from 'react';
import { RACI_MATRIX } from '../data/proposalData';
import { Users, Filter, CheckCircle, Shield } from 'lucide-react';

export const RaciMatrixSection: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const roleHeaders = [
    { key: 'residentServicesAgent', label: 'Resident Services Agent', short: 'Agent' },
    { key: 'residentServicesLead', label: 'Resident Services Lead', short: 'CS Lead' },
    { key: 'maintenanceCoordinator', label: 'Maintenance Coordinator', short: 'Maint Coord' },
    { key: 'contractor', label: 'Contractor', short: 'Contractor' },
    { key: 'oohProvider', label: 'Out-of-Hours Provider', short: 'OOH Provider' },
    { key: 'onCallDutyManager', label: 'On-Call Duty Manager', short: 'Duty Mgr' },
    { key: 'itAndSystemOwners', label: 'IT & System Owners', short: 'IT Owners' },
    { key: 'dpo', label: 'DPO (Data Protection)', short: 'DPO' },
    { key: 'implementationPartner', label: 'Implementation Partner', short: 'Impl Partner' },
  ];

  const getRaciBadge = (val: string) => {
    switch (val) {
      case 'R':
        return <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-emerald-100 text-emerald-800 font-bold border border-emerald-300 text-xs">R</span>;
      case 'A':
        return <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#b87a3d]/15 text-[#9a6027] font-bold border border-[#b87a3d]/40 text-xs">A</span>;
      case 'C':
        return <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-sky-100 text-sky-800 font-bold border border-sky-300 text-xs">C</span>;
      case 'I':
        return <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-zinc-100 text-zinc-600 font-medium border border-zinc-200 text-xs">I</span>;
      default:
        return <span className="text-zinc-300 font-mono">—</span>;
    }
  };

  return (
    <div className="py-8">
      {/* Sub Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-sans font-bold text-zinc-900 mb-1">
            RACI Governance & Decision Authority Matrix
          </h3>
          <p className="text-xs text-zinc-500 font-sans">
            Explicit distribution of responsibility across 9 stakeholder roles for 12 key project lifecycle actions.
          </p>
        </div>

        {/* RACI Legend */}
        <div className="flex items-center gap-2 p-2 rounded-xl bg-white border border-zinc-200 text-xs font-mono shadow-xs">
          <span className="flex items-center gap-1 text-emerald-800 font-bold"><span className="w-2 h-2 rounded-full bg-emerald-600" /> R: Responsible</span>
          <span className="flex items-center gap-1 text-[#9a6027] font-bold"><span className="w-2 h-2 rounded-full bg-[#b87a3d]" /> A: Accountable</span>
          <span className="flex items-center gap-1 text-sky-800 font-bold"><span className="w-2 h-2 rounded-full bg-sky-600" /> C: Consulted</span>
          <span className="flex items-center gap-1 text-zinc-600"><span className="w-2 h-2 rounded-full bg-zinc-400" /> I: Informed</span>
        </div>
      </div>

      {/* Role Filter Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 no-scrollbar">
        <span className="text-xs font-mono uppercase text-zinc-500 mr-2 flex items-center gap-1 shrink-0 font-bold">
          <Filter className="w-3.5 h-3.5 text-[#9a6027]" />
          Highlight Role:
        </span>

        <button
          onClick={() => setSelectedRole('all')}
          className={`px-3 py-1 rounded-xl text-xs font-mono transition-all border shrink-0 ${
            selectedRole === 'all'
              ? 'bg-zinc-900 text-white font-bold border-zinc-900'
              : 'bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900'
          }`}
        >
          All Roles
        </button>

        {roleHeaders.map((rh) => (
          <button
            key={rh.key}
            onClick={() => setSelectedRole(selectedRole === rh.key ? 'all' : rh.key)}
            className={`px-3 py-1 rounded-xl text-xs whitespace-nowrap transition-all border shrink-0 ${
              selectedRole === rh.key
                ? 'bg-[#b87a3d] text-white font-semibold border-[#b87a3d]'
                : 'bg-white border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50'
            }`}
          >
            {rh.short}
          </button>
        ))}
      </div>

      {/* Matrix Table Container */}
      <div className="rounded-3xl bg-white border border-zinc-200 p-4 sm:p-6 shadow-xs overflow-x-auto">
        <table className="w-full text-left text-xs text-zinc-700 border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 text-[10px] font-mono uppercase tracking-wider text-zinc-500 bg-zinc-50">
              <th className="p-3.5 rounded-l-xl min-w-[220px]">Project Lifecycle Activity / Decision</th>
              {roleHeaders.map((rh) => (
                <th 
                  key={rh.key} 
                  className={`p-3 text-center min-w-[90px] ${
                    selectedRole === rh.key ? 'bg-[#b87a3d]/10 text-[#9a6027] font-bold' : ''
                  }`}
                >
                  <span title={rh.label}>{rh.short}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 font-sans">
            {RACI_MATRIX.map((row, idx) => (
              <tr key={idx} className="hover:bg-zinc-50 transition-colors">
                <td className="p-3.5 font-medium text-zinc-900 text-xs">
                  {row.activity}
                </td>
                {roleHeaders.map((rh) => {
                  const val = (row as any)[rh.key] || '—';
                  const isRoleHighlighted = selectedRole === rh.key;
                  return (
                    <td 
                      key={rh.key} 
                      className={`p-3 text-center ${
                        isRoleHighlighted ? 'bg-[#b87a3d]/5 font-bold' : ''
                      }`}
                    >
                      {getRaciBadge(val)}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
