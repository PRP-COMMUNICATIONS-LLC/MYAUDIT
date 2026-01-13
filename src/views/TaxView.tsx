import React from 'react';
import { LedgerEntry, IncentiveSignals } from '../types';
import AutomationCapitalAllowanceCard from '../components/tax/AutomationCapitalAllowanceCard';
import { calculateSimulatedACA } from '../logic/formulas';

interface Props {
  entries: LedgerEntry[];
  signals: IncentiveSignals;
}

const TaxView: React.FC<Props> = ({ entries, signals }) => {

  const { totalCA, qualifyingExpenditure } = calculateSimulatedACA(entries, signals);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-white">Tax Optimization Analysis</h2>
        <p className="text-slate-400 mt-1">
          Forensic audit of your ledger against 2026 Malaysian SME incentives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AutomationCapitalAllowanceCard
          totalCA={totalCA}
          qualifyingExpenditure={qualifyingExpenditure}
          isEnabled={signals.usesAutomation}
        />
        
        {/* Placeholder for SME Tiered Tax Rate info */}
        <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
            SME Tax Profile
          </h3>
          <p className="mt-4 text-3xl font-bold text-white">15% - 17%</p>
          <p className="mt-2 text-sm text-slate-500">
            Preferential rate applied to the first RM600,000 of income.
          </p>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-blue-900/20 border border-blue-800/50 rounded-lg">
        <p className="text-xs text-blue-300">
          <strong>Note:</strong> Automation CA requires technical verification by SIRIM 
          and approval from MIDA. This is a simulation based on your ledger data.
        </p>
      </div>
    </div>
  );
};

export default TaxView;