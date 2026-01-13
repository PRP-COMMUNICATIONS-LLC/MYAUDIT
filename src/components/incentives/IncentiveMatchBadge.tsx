import React from 'react';

// Change 'export default' to a named 'export const'
export const IncentiveMatchBadge: React.FC<{ category: string }> = ({ category }) => {
    let type = null;
    // A real implementation would have more robust logic
    if (category === 'Asset Purchase') {
        type = "Automation CA"
    }

    if (!type) return null;

  return (
    <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-900/40 text-blue-400 border border-blue-500/30 font-bold uppercase tracking-tighter">
      {type}
    </span>
  );
};
