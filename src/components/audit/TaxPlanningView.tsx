import React from 'react';
import { Calculator, ShieldAlert, TrendingDown, CheckCircle, Loader2 } from 'lucide-react';
import { TaxScenario } from '../../utils/logic/taxcompute';

/**
 * TaxPlanningView (User Label: Tax Strategy)
 * Role: Presentational layer for Dr RP's tax computation.
 * Authority: SENTINEL PROTOCOL v1.1.0 (Dual-State Validation)
 * Fix: Added safety guards for undefined scenario prop and nullish metadata to prevent TypeErrors.
 */
interface TaxPlanningViewProps {
  scenario?: TaxScenario;
  onOptimize: () => void;
  isAuditMode?: boolean;
}

export const TaxPlanningView: React.FC<TaxPlanningViewProps> = ({
  scenario,
  onOptimize,
  isAuditMode = false
}) => {
  // Safety Guard: Prevent crash if data is still loading or undefined
  if (!scenario) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-slate-900 border border-slate-800 rounded-[2rem] animate-pulse">
        <Loader2 className="text-cyan-400 animate-spin mb-4" size={32} />
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
          Initializing Tax Substrate...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Mandatory Advisory Posture Banner */}
      <div className="bg-amber-400/10 border border-amber-400/20 p-4 rounded-2xl flex items-start gap-3">
        <ShieldAlert className="text-amber-400 shrink-0 mt-0.5" size={18} />
        <div>
          <p className="text-[11px] text-amber-400 font-bold uppercase tracking-tight">Advisory Posture Active</p>
          <p className="text-[10px] text-slate-400 leading-relaxed mt-1 italic">
            This computation is an MPERS-aligned management reporting substrate. It is NOT a statutory filing.
            Confirm all computed values with your licensed tax agent before submission to LHDN.
          </p>
        </div>
      </div>

      {/* Main Scoreboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] relative overflow-hidden">
          <TrendingDown className="absolute -right-4 -bottom-4 text-cyan-400/5" size={120} />
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Total Tax Liability</div>
          <div className="text-3xl font-mono text-white">
            RM {(scenario.totalTax || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </div>
          <div className="mt-4 flex items-center gap-2 text-[10px] text-emerald-400 font-bold bg-emerald-400/10 w-fit px-2 py-0.5 rounded-full border border-emerald-400/20">
            <CheckCircle size={10} /> SME TIER ACTIVE (18%)
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem]">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Effective Rate</div>
          <div className="text-3xl font-mono text-cyan-400">
            {((scenario.effectiveRate || 0) * 100).toFixed(2)}%
          </div>
          <p className="text-[10px] text-slate-500 mt-4 italic uppercase tracking-tighter">
            Targeting Optimization: Dr RP Heuristics
          </p>
        </div>
      </div>

      {/* Detailed Computation Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-[2rem] overflow-hidden">
        <div className="p-5 border-b border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <h3 className="text-xs font-bold text-white uppercase flex items-center gap-2">
            <Calculator size={14} className="text-cyan-400" />
            Statutory Breakdown (YA 2017)
          </h3>
          <span className="text-[9px] text-slate-500 font-mono italic">
            Rule: {scenario.metadata?.rule_id || 'PROVISIONAL'}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-500 uppercase tracking-tighter bg-slate-950/30">
                <th className="p-5">Bracket Description</th>
                <th className="p-5 text-right">Taxable (RM)</th>
                <th className="p-5 text-center">Rate</th>
                <th className="p-5 text-right">Tax (RM)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {(scenario.breakdown || []).map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-800/20 transition-colors">
                  <td className="p-5 text-xs text-slate-300 font-medium">{item.bracketLabel}</td>
                  <td className="p-5 text-xs text-white text-right font-mono">
                    {(item.taxableAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                  <td className="p-5 text-center">
                    <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700 text-slate-400 font-bold">
                      {((item.rate || 0) * 100)}%
                    </span>
                  </td>
                  <td className="p-5 text-xs text-cyan-400 text-right font-mono font-bold">
                    {(item.taxAmount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={onOptimize}
        className="w-full py-4 bg-cyan-400 hover:bg-cyan-500 text-slate-950 font-bold rounded-2xl transition-all active:scale-95 shadow-lg shadow-cyan-400/20 flex items-center justify-center gap-2"
      >
        <TrendingDown size={18} />
        Run Optimization Heuristics (Dr RP)
      </button>
    </div>
  );
};

export default TaxPlanningView;
