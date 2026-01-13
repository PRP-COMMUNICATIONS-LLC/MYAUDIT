import React from 'react';

interface ComplianceAlertsProps {
  missingCount: number;
}

const ComplianceAlerts: React.FC<ComplianceAlertsProps> = ({ missingCount }) => {
  return (
    <div className="glass-card p-5 rounded-xl bg-white/5 border border-white/10 mt-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="material-symbols-outlined text-soft-mint">fact_check</span>
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">E-Invoice Mandate</h3>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg border border-white/5">
          <span className="text-xs text-gray-400">Missing E-Invoices</span>
          <span className={`text-sm font-black ${missingCount > 0 ? 'text-neon-amber' : 'text-soft-mint'}`}>
            {missingCount} Entries
          </span>
        </div>

        {missingCount > 0 && (
          <div className="p-3 bg-neon-amber/5 border-l-2 border-neon-amber rounded-r-lg">
            <p className="text-[11px] text-gray-300 leading-relaxed">
              <span className="text-neon-amber font-bold">Action Required:</span> {missingCount} transactions are currently 
              unverified. Failure to provide E-Invoices may lead to non-deductibility under YA 2026 mandates.
            </p>
          </div>
        )}

        <button className="w-full py-2 bg-soft-mint/10 hover:bg-soft-mint/20 border border-soft-mint/30 rounded-lg text-soft-mint text-[10px] font-black uppercase transition-colors">
          Upload Missing Docs
        </button>
      </div>
    </div>
  );
};

export default ComplianceAlerts;
