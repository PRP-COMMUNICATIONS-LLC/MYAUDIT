import React from 'react';
import { useMemo } from 'react';
import { useForensicContext } from '../../context/ForensicContext';
import { calculateTaxStats } from '../../utils/logic/taxcompute';

const TaxPlanningView = () => {
    const { forensicLedger } = useForensicContext();

    const taxStats = useMemo(() => calculateTaxStats(forensicLedger), [forensicLedger]);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="border-l-4 border-emerald-500 pl-8 py-2">
                <h2 className="text-3xl font-black tracking-tighter uppercase">04 Tax Planning</h2>
                <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-bold">Estimated Liability // Advisory Only</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 bg-slate-950 border border-slate-800 rounded-3xl">
                    <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Total Revenue</p>
                    <p className="text-3xl font-black text-white">RM {taxStats.totalCredits.toLocaleString()}</p>
                </div>
                <div className="p-8 bg-slate-950 border border-slate-800 rounded-3xl">
                    <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Total Expenses</p>
                    <p className="text-3xl font-black text-white">RM {taxStats.totalDebits.toLocaleString()}</p>
                </div>
                <div className="p-8 bg-cyan-900/10 border border-cyan-500/20 rounded-3xl">
                    <p className="text-[10px] text-cyan-400 uppercase font-black mb-1">Estimated Tax</p>
                    <p className="text-3xl font-black text-white">RM {taxStats.estimatedTax.toLocaleString()}</p>
                    <p className="text-[10px] text-cyan-500/70 mt-2 font-bold uppercase tracking-widest">15% Flat Rate</p>
                </div>
            </div>
            <div className="p-6 bg-slate-950 border border-slate-800 rounded-3xl">
                <p className="text-[10px] text-slate-500 uppercase font-black mb-2">Net Income</p>
                <p className="text-2xl font-black text-white">RM {taxStats.netIncome.toLocaleString()}</p>
            </div>
        </div>
    );
};

export default TaxPlanningView;