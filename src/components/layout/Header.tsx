import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="h-14 bg-slate-900 border-b border-slate-800 flex items-center px-6">
      <h1 className="text-white font-bold tracking-tighter text-lg">MYAUDIT <span className="text-blue-500 text-xs font-mono ml-2">v1.2</span></h1>
      <div className="ml-auto flex items-center gap-4 text-[10px] text-slate-500 uppercase font-bold tracking-widest">
        <span>Region: asia-southeast1</span>
        <span className="bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded border border-emerald-500/20">Audit-Ready Mode</span>
      </div>
    </header>
  );
};
