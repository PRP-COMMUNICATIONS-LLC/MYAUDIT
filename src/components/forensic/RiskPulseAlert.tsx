import React from 'react';

interface RiskPulseAlertProps {
  count: number;
}

const RiskPulseAlert: React.FC<RiskPulseAlertProps> = ({ count }) => {
  if (count === 0) return null;

  return (
    <div className="glass-card p-4 rounded-xl bg-neon-amber/5 border border-neon-amber/20 relative overflow-hidden">
      <div className="flex items-start gap-4">
        {/* Animated Pulse Indicator */}
        <div className="mt-1 relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-amber opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-amber"></span>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <h4 className="text-sm font-black text-neon-amber uppercase tracking-tighter">
              High Confidence Risk Pulse
            </h4>
            <span className="px-2 py-0.5 bg-neon-amber text-black text-[10px] font-black rounded-full">
              {count} PENDING FLAGS
            </span>
          </div>
          
          <p className="text-xs text-gray-300 leading-relaxed">
            AI Insight: Found <span className="text-white font-bold">{count} transactions</span> with significant DIE flag discrepancies. 
            Potential misclassification risks detected in Staff Welfare categories.
          </p>
          
          <div className="mt-3 flex gap-2">
            <button className="text-[10px] font-bold text-neon-amber hover:underline uppercase">
              Review All Flags
            </button>
            <span className="text-gray-600">|</span>
            <button className="text-[10px] font-bold text-gray-400 hover:text-white uppercase">
              Dismiss
            </button>
          </div>
        </div>
      </div>

      {/* Background Accent Gradient */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-neon-amber/10 blur-3xl rounded-full"></div>
    </div>
  );
};

export default RiskPulseAlert;
