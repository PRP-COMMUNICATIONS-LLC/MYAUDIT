/**
 * Represents a flag raised by the Deductibility Insight Engine (DIE).
 */
export interface DieFlag {
  flagType: "MISCLASSIFICATION_RISK" | "MISSING_DOC" | "CAPITAL_VS_REVENUE" | "OTHER";
  suggestion: string;
  estimatedImpact: string;
  confidence: number;
  createdAt: number;
}

export interface LedgerEntry {
  id?: string;
  transactionId?: string;
  yearId?: string;
  description: string;
  category: string;
  debit: number;
  credit?: number;
  supportingDocLinks: string[];
  status?: string;
}
