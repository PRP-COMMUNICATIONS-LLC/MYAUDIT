
import React, { useState, useEffect } from 'react';
import AouthaPanel from '../components/aoutha/AouthaPanel';
import { useLedgerEntries } from '../hooks/useLedgerEntries';
import { detectMisclassifications } from '../logic/riskHeuristics';
import { DieFlag, LedgerEntry, RuleRegistry } from '../types';

// Directly import the rules from the JSON file.
// Make sure your build process supports JSON imports.
import rules from '../../rule-registry-ya2026.json';

const RefinementView: React.FC = () => {
  const { entries, loading } = useLedgerEntries('ya2026');
  const [dieFlags, setDieFlags] = useState<DieFlag[]>([]);

  useEffect(() => {
    if (entries && entries.length > 0) {
      // The rules are typed as any by default when imported from JSON, so we cast them.
      const typedRules = rules as RuleRegistry[];

      // Run the DIE logic for each ledger entry.
      const allFlags = entries.flatMap((entry: LedgerEntry) =>
        detectMisclassifications(entry, typedRules)
      );

      setDieFlags(allFlags);
    }
  }, [entries]); // Re-run the effect when entries change.

  if (loading) return <div>Synchronizing with MYAUDIT Cloud...</div>;

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-4">Refinement View</h1>
        <p>Ledger Table Area (Refinement Phase)</p>
        {/*
          Here you would display the ledger entries.
          You could highlight entries that have associated flags from the DIE.
          For example: entry.id is in dieFlags.map(f => f.ledgerEntryId)
        */}
      </div>
      <div className="col-span-1">
        {/* Pass the detected flags to the AouthaPanel.
            AouthaPanel will need to be updated to display these insights. */}
        <AouthaPanel entries={entries} dieFlags={dieFlags} />
      </div>
    </div>
  );
};

export default RefinementView;
