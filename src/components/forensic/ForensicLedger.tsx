import React from 'react';
import { LedgerEntry } from '../../types';

interface Props {
  entries: LedgerEntry[];
  onUpdateCategory: (entryId: string, oldCategory: string, newCategory: string) => void;
}

const ForensicLedger: React.FC<Props> = ({ entries, onUpdateCategory }) => {
  // ... logic
  return <div>Forensic Ledger</div>;
};

export default ForensicLedger;
