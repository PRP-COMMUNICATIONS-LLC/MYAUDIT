
import React from 'react';
import { LedgerEntry, DieFlag } from '../../types';

interface AouthaProps {
  entries: LedgerEntry[];
  dieFlags?: DieFlag[];
}

const DOCUMENT_GAP_THRESHOLD = 500;

const AouthaPanel: React.FC<AouthaProps> = ({ entries, dieFlags = [] }) => {
  // Original filter logic
  const docGaps = entries.filter(e =>
    e.debit > DOCUMENT_GAP_THRESHOLD &&
    (!e.supportingDocLinks || e.supportingDocLinks.length === 0)
  );

  const uncategorized = entries.filter(e => e.category === 'Uncategorized');

  return (
    <div className="bg-white dark:bg-slate-900 border-l border-slate-200 p-6 h-full shadow-lg">
      <h2 className="text-lg font-bold mb-6 text-slate-800 dark:text-slate-100 uppercase tracking-tight">The Aoutha</h2>
      
      {/* DIE Insights Section */}
      {dieFlags.length > 0 && (
        <div className="mb-8 p-4 bg-sky-50 rounded-lg border border-sky-200">
          <p className="text-xs text-sky-700 font-bold uppercase">Deductibility Insights</p>
          <p className="text-2xl font-black text-sky-900 mb-2">{dieFlags.length} Opportunities Found</p>
          <div className="space-y-3">
            {dieFlags.map((flag, index) => (
              <div key={index} className="text-sm text-slate-700 dark:text-slate-300">
                <p className='font-semibold'>Suggestion:</p>
                <p>{flag.suggestion}</p>
                <p className="text-xs text-slate-500 mt-1">{flag.estimatedImpact}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Original Document Gaps and Uncategorized Items Section */}
      <div className="space-y-4">
        <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-xs text-amber-700 font-bold uppercase">Document Gaps (&gt;RM500)</p>
          <p className="text-2xl font-black text-amber-900">{docGaps.length}</p>
        </div>
        <div className="p-4 bg-red-50 rounded-lg border border-red-200">
          <p className="text-xs text-red-700 font-bold uppercase">Uncategorized Items</p>
          <p className="text-2xl font-black text-red-900">{uncategorized.length}</p>
        </div>
      </div>
    </div>
  );
};

export default AouthaPanel;
