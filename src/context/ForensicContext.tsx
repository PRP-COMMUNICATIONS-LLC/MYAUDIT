import React, { createContext, useContext, useState, useMemo } from 'react';
import { UILedgerEntry, LedgerEntry, mapLedgerEntryToUILedgerEntry, mapUILedgerEntryToLedgerEntry } from '../types';
import { computeUpdatedFlags } from '../utils/logic/taxcompute';

interface ForensicState {
  ledger: UILedgerEntry[];
  isAuditMode: boolean;
  substrateIntegrity: number;
  forensicLedger: LedgerEntry[];
  flaggedUiEntries: UILedgerEntry[];
  evidenceHash: string;
  handleReclassifyEntry: (entryId: string, updates: Partial<UILedgerEntry>) => void;
  handleExportAuditPack: () => void;
}

const ForensicContext = createContext<ForensicState | undefined>(undefined);

export const useForensicContext = () => {
  const context = useContext(ForensicContext);
  if (!context) {
    throw new Error('useForensicContext must be used within a ForensicProvider');
  }
  return context;
};

import { useSovereignSubstrate } from '../hooks/useSovereignSubstrate';

export const ForensicProvider: React.FC<{ children: React.ReactNode, setActiveTab: (tab: string) => void, user: any }> = ({ children, setActiveTab, user }) => {
    const { data: initialLedger, loading: isProcessing } = useSovereignSubstrate('massive-activation-1234567-X');
    const [forensicLedger, setForensicLedger] = useState<LedgerEntry[]>([]);
    const [isAuditMode, setIsAuditMode] = useState(false);

    useEffect(() => {
        if (initialLedger) {
            setForensicLedger(initialLedger);
        }
    }, [initialLedger]);

    const uiLedger = useMemo(() => {
        return forensicLedger.map(mapLedgerEntryToUILedgerEntry);
      }, [forensicLedger]);

      const handleReclassifyEntry = (entryId: string, updates: Partial<UILedgerEntry>) => {
        const originalEntry = forensicLedger.find(e => e.id === entryId);
        if (!originalEntry) return;

        const updatedUIEntry: UILedgerEntry = {
          ...uiLedger.find(e => e.id === entryId)!,
          ...updates
        };

        const newFlags = computeUpdatedFlags(updatedUIEntry, updatedUIEntry.category);
        updatedUIEntry.dieFlags = newFlags;

        const updatedLedgerEntry = mapUILedgerEntryToLedgerEntry(updatedUIEntry, originalEntry);

        setForensicLedger(prev =>
          prev.map(e => e.id === entryId ? updatedLedgerEntry : e)
        );
      };

      const handleExportAuditPack = () => {
        const exportData = {
          timestamp: new Date().toISOString(),
          ledger: forensicLedger,
          metadata: {
            year: 'YA2017',
            entity: 'Test Entity',
            generatedBy: user?.uid || 'anonymous'
          }
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `myaudit-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      };

      const flaggedUiEntries = useMemo(() => {
        return uiLedger.filter(e => e.dieFlags && e.dieFlags.length > 0);
      }, [uiLedger]);

      const evidenceHash = useMemo(() => {
        const hash = forensicLedger.length.toString(36).toUpperCase();
        return `EVID-${hash}-${Date.now().toString(36).slice(-4).toUpperCase()}`;
      }, [forensicLedger]);

  const value = {
    ledger: uiLedger,
    isAuditMode,
    substrateIntegrity: 0.0, // Placeholder
    forensicLedger,
    flaggedUiEntries,
    evidenceHash,
    handleReclassifyEntry,
    handleExportAuditPack,
  };

  return (
    <ForensicContext.Provider value={value}>
      {children}
    </ForensicContext.Provider>
  );
};