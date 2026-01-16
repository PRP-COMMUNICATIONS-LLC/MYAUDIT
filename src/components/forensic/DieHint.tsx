import React from 'react';
import { DieFlag } from '../../types';

interface Props {
  flag: DieFlag;
}

const DieHint: React.FC<Props> = ({ flag }) => {
  const getFlagAppearance = () => {
    switch (flag.flagType) {
      case 'risk':
        return { icon: '⚠️', color: 'text-amber-400', bgColor: 'bg-amber-900/50' };
      case 'opportunity':
        return { icon: '💡', color: 'text-sky-400', bgColor: 'bg-sky-900/50' };
      default:
        return { icon: '💡', color: 'text-slate-400', bgColor: 'bg-slate-700/50' };
    }
  };

  const { icon, color, bgColor } = getFlagAppearance();

  return (
    <div className={`flex items-start space-x-3 p-3 rounded-md text-xs ${bgColor}`}>
      <div className={`shrink-0 text-base ${color}`}>{icon}</div>
      <div>
        <p className={`font-bold ${color}`}>{flag.title}</p>
        <p className="text-slate-300 mt-1">{flag.message}</p>
        {flag.suggestion && <p className="text-slate-300 mt-1">{flag.suggestion}</p>}
        {flag.estimatedImpact && <p className="text-slate-300 mt-1">{flag.estimatedImpact}</p>}
        {flag.confidence && <p className="text-slate-400 text-[10px] mt-2">Confidence: {flag.confidence}</p>}
      </div>
    </div>
  );
};

export default DieHint;
