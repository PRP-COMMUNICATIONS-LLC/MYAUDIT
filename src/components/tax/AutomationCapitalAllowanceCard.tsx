import React from 'react';

interface Props {
  totalCA: number;
  qualifyingExpenditure: number;
  isEnabled: boolean;
}

const AutomationCapitalAllowanceCard: React.FC<Props> = ({ totalCA, qualifyingExpenditure, isEnabled }) => {
  const formatter = new Intl.NumberFormat('en-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 2,
  });

  return (
    <div className={`p-6 rounded-xl border transition-all duration-300 ${
      isEnabled 
        ? 'bg-emerald-900/20 border-emerald-700/50 shadow-lg' 
        : 'bg-slate-900/50 border-slate-800 opacity-75'
    }`}>
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
          Automation Capital Allowance
        </h3>
        {isEnabled && (
          <span className="px-2 py-1 text-[10px] font-bold bg-blue-500/20 text-blue-300 rounded uppercase border border-blue-500/30">
            Simulated
          </span>
        )}
      </div>
      
      <div className="mt-4">
        <p className={`text-4xl font-bold tracking-tight ${isEnabled ? 'text-emerald-400' : 'text-slate-600'}`}>
          {formatter.format(totalCA)}
        </p>
        
        {isEnabled ? (
          <div className="mt-3 space-y-1">
            <p className="text-sm text-emerald-300/80">
              Potential tax deduction based on 200% rate.
            </p>
            <p className="text-xs text-slate-500 italic">
              Estimated from {formatter.format(qualifyingExpenditure)} in qualifying CAPEX.
            </p>
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-500">
            Enable the <span className="text-blue-400 font-medium">"Automation"</span> signal in your profile to simulate this benefit.
          </p>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800/50">
        <div className="flex flex-col gap-2 text-[10px] text-slate-500">
          <div className="flex justify-between">
            <span>Incentive Period:</span>
            <span className="text-slate-400">YA 2023 – YA 2027</span>
          </div>
          <div className="flex justify-between">
            <span>Expenditure Cap:</span>
            <span className="text-slate-400">RM 10,000,000</span>
          </div>
          
          {/* Global Advisory Disclaimer */}
          <div className="mt-2 p-2 bg-slate-950/50 rounded border border-slate-800/50 leading-relaxed">
            <p><strong>Disclaimer:</strong> This is an advisory simulation for informational purposes only. 
            Calculations are subject to technical verification by SIRIM/MIDA and final approval by the Inland Revenue Board of Malaysia (IRBM). 
            Consult a certified tax professional for actual filing.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationCapitalAllowanceCard;
