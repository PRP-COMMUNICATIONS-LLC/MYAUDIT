
import React from 'react';
import { IncentiveSignals } from '../../types';

// Self-contained SVG for the help icon to avoid external libraries
const HelpCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500 group-hover:text-blue-400 transition-colors">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

interface Props {
  signals: IncentiveSignals;
  onUpdate: (key: keyof IncentiveSignals, value: boolean) => void;
}

const IncentiveProfile: React.FC<Props> = ({ signals, onUpdate }) => {
  const questions = [
    {
      key: 'usesAutomation',
      label: 'Do you invest in new machines, equipment, or software to adopt automation or AI?',
      ref: 'Automation CA',
      tooltip: `
        <h4 class="font-bold text-white mb-2">Advisory Note: Automation CA</h4>
        <p class="mb-3">Potential 200% simulated allowance on qualifying automation/Industry 4.0 expenditure, often capped around RM10M for the period YA 2023–2027.</p>
        <h5 class="font-semibold text-slate-300 mb-1">Typical Verification Steps:</h5>
        <ul class="list-disc list-inside text-slate-400 space-y-1">
            <li>Assets are typically required to be in use before technical verification.</li>
            <li>Claims often require documented productivity gains (e.g., reduction in man-hours).</li>
            <li>Eligibility is a joint assessment by bodies like SIRIM and MIDA.</li>
        </ul>
        <p class="mt-3 text-xs text-blue-400/80">Always confirm with your tax advisor/MIDA before filing.</p>
      `
    },
     {
      key: 'reinvestsInAssets',
      label: 'Does your business reinvest profits in upgrading factories or buildings?',
      ref: 'Reinvestment Allowance',
      tooltip: `
        <h4 class="font-bold text-white mb-2">Advisory Note: Reinvestment Allowance (RA)</h4>
        <p class="mb-3">Existing companies in operation for 36+ months undertaking expansion or modernization may qualify for RA, commonly computed at 60% of qualifying expenditure.</p>
        <p class="mt-3 text-xs text-blue-400/80">This incentive may be mutually exclusive with Automation CA. Confirm with your tax advisor.</p>
      `
    },
    {
      key: 'employsDisabledStaff',
      label: 'Do you employ anyone who is officially registered as disabled (Kad OKU)?',
      ref: 'Double Deduction',
      tooltip: `
        <h4 class="font-bold text-white mb-2">Advisory Note: Double Deduction</h4>
        <p>Simulates a double deduction on remuneration for employees registered with a "Kad OKU". Requires documentary proof of registration and employment. Always confirm with your tax advisor.</p>
      `
    },
    {
      key: 'frequentSmallAssets',
      label: 'Do you often buy small items like tools or furniture (each under RM 2,000)?',
      ref: 'Small Value Assets',
      tooltip: `
        <h4 class="font-bold text-white mb-2">Advisory Note: Small Value Assets (SVA)</h4>
        <p>Simulates 100% capital allowance on small value assets where each asset costs no more than RM 2,000. Capped at RM 20,000 per YA. Always confirm with your tax advisor.</p>
      `
    },
    {
      key: 'hasPioneerStatus',
      label: 'Does your company have "Pioneer Status" under the Promotion of Investments Act 1986?',
      ref: 'Tax Exemption',
      tooltip: `
        <h4 class="font-bold text-white mb-2">Advisory Note: Pioneer Status</h4>
        <p class="mb-3">Often provides partial or total tax relief for a period (commonly 5 years) for "promoted" activities.</p>
        <p class="mt-3 text-xs text-blue-400/80">This incentive may be mutually exclusive with other capital allowances. Confirm availability with your tax advisor or MIDA.</p>
      `
    },
  ];

  return (
    <div className="space-y-6 p-6 bg-slate-900 rounded-lg border border-slate-700">
      <h3 className="text-lg font-semibold text-white">Business Incentive Profile</h3>
      <p className="text-sm text-slate-400">Answer these simple questions to help Mr R.P.P simulate potential tax benefits.</p>
      
      {questions.map((q) => (
        <div key={q.key} className="p-4 bg-slate-800 rounded-md border border-slate-700">
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <div className="text-sm text-white flex items-center gap-2">
                {q.label}
                <div className="group relative flex items-center">
                   <HelpCircleIcon />
                  <div 
                    className="absolute bottom-full mb-2 w-80 p-4 bg-slate-950 border border-slate-700 rounded-lg text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                    dangerouslySetInnerHTML={{ __html: q.tooltip }}
                  >
                  </div>
                </div>
              </div>
              <span className="text-[10px] text-slate-500 font-mono italic">Potential Incentive: {q.ref}</span>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              {(['Yes', 'No'] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => onUpdate(q.key as keyof IncentiveSignals, opt === 'Yes')}
                  className={`px-4 py-1 text-xs rounded transition-colors ${
                    (opt === 'Yes' && signals[q.key as keyof IncentiveSignals]) || 
                    (opt === 'No' && !signals[q.key as keyof IncentiveSignals])
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IncentiveProfile;
