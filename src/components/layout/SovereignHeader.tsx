import React from 'react';
import { Lock } from 'lucide-react';
import { User } from 'firebase/auth';

interface SovereignHeaderProps {
  projectName: string;
  user: User | null;
  isAuditMode: boolean;
}

const SovereignHeader: React.FC<SovereignHeaderProps> = ({ projectName, user, isAuditMode }) => {
  const colors = {
    cyan: '#00D9FF',
  };

  return (
    <header className="h-20 border-b border-slate-800 flex items-center justify-between px-10 bg-slate-950/40 backdrop-blur-xl sticky top-0 z-50">
      <div className="flex flex-col">
        <div className="flex items-baseline font-sans text-2xl font-black uppercase tracking-tighter">
          <span className="text-white">{projectName.substring(0, 2)}</span>
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
          <span className="text-white">{projectName.substring(3)}</span>
        </div>
        <p className="text-[9px] text-cyan-400 font-bold tracking-[0.3em] uppercase mt-1">
          Sovereign Identity Architecture v2.2
        </p>
      </div>

      <div className="flex items-center gap-10">
        <div className="hidden lg:flex flex-col items-end">
          <div className="flex items-center gap-2">
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
        <Lock
          size={20}
          className={isAuditMode ? "text-emerald-500" : "text-slate-600"}
        />
      </div>
    </header>
  );
};

export default SovereignHeader;