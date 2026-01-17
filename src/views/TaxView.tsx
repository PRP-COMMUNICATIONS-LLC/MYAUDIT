import React from 'react';
import { computeSmeTaxScenario } from '../utils/logic/taxcompute';
import TaxPlanningView from '../components/audit/TaxPlanningView';

const TaxView: React.FC = () => {
  // In a real application, this data would come from a state management store or an API call.
  // For this demonstration, we are using a mock chargeable income.
  const chargeableIncome = 750000;
  const taxScenario = computeSmeTaxScenario(chargeableIncome, true);

  const handleOptimize = () => {
    // This function would typically trigger a process to find tax incentives or optimizations.
    // For now, we'll just log a message to the console.
    console.log("Optimization heuristics initiated...");
  };

  return (
    <div className="font-display space-y-8 animate-in fade-in duration-500">
      <div className="border-l-4 border-emerald-500 pl-8 py-2">
        <h2 className="text-3xl font-black tracking-tighter uppercase text-white">Stage 4: Tax Simulation</h2>
        <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-bold">
          Project your YA 2026 tax obligations based on the refined ledger.
        </p>
      </div>

      <div className="p-1 rounded-2xl bg-black/20 border border-white/5">
        <TaxPlanningView scenario={taxScenario} onOptimize={handleOptimize} />
      </div>
    </div>
  );
};

export default TaxView;