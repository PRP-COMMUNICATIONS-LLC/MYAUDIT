import React from 'react';
import { LedgerEntry } from '../types';
import ForensicLedger from '../components/forensic/ForensicLedger';

interface Props {
  entries: LedgerEntry[];
}

const RefinementView: React.FC<Props> = ({ entries }) => {
  const handleCategoryUpdate = (entryId: string, oldCategory: string, newCategory: string) => {
    // This is a placeholder. In a real app, you'd update the state.
    console.log(`Updated entry ${entryId} from ${oldCategory} to ${newCategory}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Refinement</h1>
      <ForensicLedger entries={entries} onUpdateCategory={handleCategoryUpdate} />
    </div>
  );
};

export default RefinementView;
