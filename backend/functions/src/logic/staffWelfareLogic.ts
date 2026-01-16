import { LedgerEntry } from '../types';

/**
 * Validates Staff Welfare transactions for YA 2026 compliance.
 * Region: asia-southeast1 (Singapore)
 */
export const validateStaffWelfare = (entry: LedgerEntry) => {
  const flags = [];
  const WELFARE_THRESHOLD = 5000; // Example threshold for DIE flag trigger

  // 1. Check for Misclassification Risk
  if (entry.category === 'Staff Welfare' && entry.debit > WELFARE_THRESHOLD) {
    flags.push({
      flagType: 'THRESHOLD_EXCEEDED',
      suggestion: 'Verify if this exceeds statutory limits for staff benefits.',
      estimatedImpact: 'Potential non-deductibility',
      confidence: 0.95,
      createdAt: Date.now()
    });
  }

  // 2. E-Invoice Compliance Check
  if (entry.eInvoiceStatus === 'missing') {
    flags.push({
      flagType: 'DOCUMENTATION_GAP',
      suggestion: 'E-Invoice required for YA 2026 tax deduction.',
      estimatedImpact: 'High risk of audit rejection',
      confidence: 1.0,
      createdAt: Date.now()
    });
  }

  return {
    isSafe: flags.length === 0,
    suggestedStatus: flags.length > 0 ? 'DIE_FLAGGED' : 'AUDIT_READY',
    newFlags: flags
  };
};
