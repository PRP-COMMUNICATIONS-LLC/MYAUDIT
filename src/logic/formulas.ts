import { LedgerEntry, IncentiveSignals } from '../types';

/**
 * ADVISORY FORMULA: Automation Capital Allowance (ACA)
 * Based on v1.2 Roadmap: 200% allowance on qualifying expenditure.
 * Advisory Cap: RM 10,000,000.
 * * NOTE: This is a non-binding simulation for advisory visualization only.
 */
export const calculateSimulatedACA = (
  entries: LedgerEntry[],
  signals: IncentiveSignals
) => {
  if (!signals.usesAutomation) {
    return { totalCA: 0, qualifyingExpenditure: 0 };
  }

  // Simple advisory filter for simulation
  const qualifyingExpenses = entries.filter(entry => 
    entry.category === 'Technology' || 
    entry.description.toLowerCase().includes('software') ||
    entry.description.toLowerCase().includes('automation')
  );

  const qualifyingExpenditure = qualifyingExpenses.reduce((sum, entry) => sum + entry.amount, 0);

  // Math-only simulation: min(qualifyingExpenditure, 10,000,000) * 2
  const cappedQE = Math.min(qualifyingExpenditure, 10000000);
  const totalCA = cappedQE * 2.0;

  return { totalCA, qualifyingExpenditure };
};
