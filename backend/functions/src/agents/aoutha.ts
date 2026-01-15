import { LedgerEntry, DieFlag } from '../types';

const DOCUMENT_GAP_THRESHOLD = 500;

export const analyzeEntry = (entry: LedgerEntry): DieFlag[] => {
  const flags: DieFlag[] = [];
  
  if (entry.category === 'Uncategorized') {
    flags.push({
      flagType: "MISCLASSIFICATION_RISK",
      suggestion: `Entry "${entry.description}" is uncategorized and requires classification.`,
      estimatedImpact: "Potential tax impact depends on correct categorization.",
      confidence: 0.9,
      createdAt: Date.now(),
    });
  }
  
  if (entry.debit > DOCUMENT_GAP_THRESHOLD && entry.supportingDocLinks.length === 0) {
    flags.push({
      flagType: "MISSING_DOC",
      suggestion: `Entry "${entry.description}" exceeds RM ${DOCUMENT_GAP_THRESHOLD} threshold but has no supporting documentation.`,
      estimatedImpact: `Potential tax disallowance of RM ${entry.debit.toFixed(2)} if documentation is not provided.`,
      confidence: 1.0,
      createdAt: Date.now(),
    });
  }
  
  return flags;
};