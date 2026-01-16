import React from 'react';

export interface AouthaWidgetProps {
  stats: {
    total: number;
    uncategorized: number;
    auditReady: number;
    highRisk: number;
    dieFlagsCount: number;
    readinessScore: number;
  };
}

export const AouthaWidget: React.FC<AouthaWidgetProps> = ({ stats }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg">
      <h3 className="text-lg font-bold text-white">Aoutha Summary</h3>
      <p className="text-sm text-slate-400">Real-time forensic analysis of your ledger.</p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="text-center">
          <p className="text-3xl font-black text-sky-400">{stats.readinessScore}%</p>
          <p className="text-xs text-slate-400">Audit Readiness</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-black text-amber-400">{stats.dieFlagsCount}</p>
          <p className="text-xs text-slate-400">DIE Flags</p>
        </div>
      </div>
    </div>
  );
};

export default AouthaWidget;
