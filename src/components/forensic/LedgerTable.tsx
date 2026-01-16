import React, { useState } from 'react';
import { LedgerEntry, DieFlag } from '../../types';
import { IncentiveMatchBadge } from '../incentives/IncentiveMatchBadge';

export interface LedgerTableProps {
  transactions: LedgerEntry[];
  onUpdateCategory: (entryId: string, oldCategory: string, newCategory: string) => void;
}

const CategoryCell: React.FC<{ entry: LedgerEntry, onUpdate: (newCategory: string) => void }> = ({ entry, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(entry.category);

  if (isEditing) {
    return (
      <select 
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => {
          onUpdate(value!);
          setIsEditing(false);
        }}
        autoFocus
        className="bg-slate-900 text-white w-full"
      >
        <option>Staff Welfare</option>
        <option>Entertainment</option>
        <option>Uncategorized</option>
        <option>Asset Purchase</option>
        <option>Operating Expense</option>
      </select>
    );
  }

  return (
    <div onClick={() => setIsEditing(true)} className="cursor-pointer">
      {entry.category}
    </div>
  );
};


export const LedgerTable: React.FC<LedgerTableProps> = ({ transactions, onUpdateCategory }) => {
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'AUDIT_READY': return 'text-emerald-400';
      case 'USER_REVIEWED': return 'text-sky-400';
      case 'FLAGGED': return 'text-amber-400';
      default: return 'text-slate-400';
    }
  };

  const DieFlagPill: React.FC<{flag: DieFlag}> = ({ flag }) => (
    <div className="bg-amber-900/50 border border-amber-700 text-amber-300 text-[10px] px-1.5 py-0.5 rounded-full inline-block whitespace-nowrap">
      {flag.flagType.replace('_', ' ')}
    </div>
  );

  return (
    <div className="overflow-x-auto bg-slate-800/50 rounded-lg border border-slate-700">
      <table className="min-w-full text-sm text-left text-slate-300">
        <thead className="text-xs text-slate-400 uppercase bg-slate-900/50">
          <tr>
            <th scope="col" className="px-6 py-3">Date</th>
            <th scope="col" className="px-6 py-3">Description</th>
            <th scope="col" className="px-6 py-3">Category</th>
            <th scope="col" className="px-6 py-3 text-right">Amount (RM)</th>
            <th scope="col" className="px-6 py-3">DIE Flags</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3">Incentives</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((entry) => (
            <tr key={entry.id} className="border-b border-slate-700 hover:bg-slate-800/40">
              <td className="px-6 py-4">{entry.date}</td>
              <td className="px-6 py-4 font-medium text-white">{entry.description}</td>
              <td className="px-6 py-4">
                 <CategoryCell 
                    entry={entry} 
                    onUpdate={(newCategory) => onUpdateCategory(entry.id!, entry.category!, newCategory)} 
                />
              </td>
              <td className="px-6 py-4 text-right font-mono">{entry.debit!.toFixed(2)}</td>
              <td className="px-6 py-4">
                <div className="flex flex-col gap-1.5 items-start">
                  {/* {entry.dieFlags?.map((flag, index) => <DieFlagPill key={index} flag={flag} />)} */}
                </div>
              </td>
              {/* <td className={`px-6 py-4 font-medium ${getStatusColor(entry.status)}`}>{entry.status.replace('_', ' ')}</td> */}
              <td className="px-6 py-4">
                <IncentiveMatchBadge category={entry.category!} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
