import React from 'react';
import { User } from 'firebase/auth';

interface SovereignHeaderProps {
  user: User | null;
  isAuditMode: boolean;
}

const SovereignHeader: React.FC<SovereignHeaderProps> = ({ user, isAuditMode }) => {
  const colors = {
    cyan: '#00D9FF',
    slate: '#3A4045',
  };

  return (
    <header className="h-20 border-b border-slate-800 flex items-center justify-between px-10 bg-slate-950/40 backdrop-blur-xl sticky top-0 z-50">
      <div className="flex flex-col">
        <div className="flex items-baseline font-sans text-2xl font-black uppercase tracking-tighter">
          <span className="text-white">MY</span>
          <span 
            className="font-sans text-[1.1em] font-black leading-none" 
            style={{ 
              color: colors.cyan, 
              transform: 'scaleY(1.05) translateY(0.02em)', 
              transformOrigin: 'center baseline', 
              display: 'inline-block',
              margin: '0 -0.02em'
            }}
          >
            Λ
          </span>
          <span className="text-white">UDIT</span>
        </div>
        <p className="text-[9px] text-cyan-400 font-bold tracking-[0.3em] uppercase mt-1">
          Sovereign Identity Architecture v2.2
        </p>
      </div>

      <div className="flex items-center gap-10">
        <div className="hidden lg:flex flex-col items-end">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-3xl bg-slate-900/60 border border-slate-800">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
            <span className="text-[10px] font-black tracking-widest uppercase text-white">
              SENTINEL v1.0 ACTIVE
            </span>
          </div>
          <span className="text-[8px] text-slate-500 uppercase font-black mt-1">
            asia-southeast1: authoritative instance
          </span>
        </div>
        <div className="h-8 w-[1px] bg-slate-800"></div>
        {user && (
          <div className="text-[9px] text-slate-400 uppercase font-black">
            {user.isAnonymous ? 'GUEST' : user.email?.split('@')[0] || 'USER'}
          </div>
        )}
        <div className={`rounded-3xl px-3 py-1 border ${
          isAuditMode 
            ? 'bg-emerald-950 border-emerald-800 ring-2 ring-emerald-400/50' 
            : 'bg-slate-900 border-slate-800'
        }`}>
          <span className={`text-xs font-bold uppercase tracking-wider ${
            isAuditMode ? 'text-emerald-400' : 'text-amber-400'
          }`}>
            SENTINEL
          </span>
        </div>
      </div>
    </header>
  );
};

export default SovereignHeader;
