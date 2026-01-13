export type ConfidenceLevel = 'low' | 'medium' | 'high' | number;

export interface LedgerEntry {
  id?: string;
  transactionId?: string;
  yearId?: string;
  date?: string;
  description?: string;
  debit?: number;
  credit?: number;
  amount?: number;
  category?: string;
  confidence?: ConfidenceLevel;
  eInvoiceStatus?: 'valid' | 'missing' | 'warning' | string;
  dieFlags?: DieFlag[];
  supportingDocLinks?: string[];
  status?: 'AUDIT_READY' | 'DIE_FLAGGED' | 'New' | string;
}

export type DieFlagType = 'risk' | 'opportunity' | 'MISCLASSIFICATION_RISK';

export interface DieFlag {
  id: string;
  entryId: string;
  title: string;
  message: string;
  flagType: DieFlagType;
  suggestion?: string;
  estimatedImpact?: string;
  confidence?: ConfidenceLevel;
  createdAt?: string;
}

export interface IncentiveSignals {
  usesAutomation: boolean;
  reinvestsInAssets: boolean;
  employsDisabledStaff: boolean;
  frequentSmallAssets: boolean;
  hasPioneerStatus: boolean;
}

export interface AuditLogEntry {
    id: string;
    timestamp: number;
    user: string;
    details: string;
}

export type ActivityType = 'SYSTEM_ACTION' | 'USER_ACTION' | 'FLAG_RAISED';

export interface ActivityLog {
  id: string;
  type: ActivityType;
  details: string;
  timestamp: number;
}

export interface TaxDeductions {
  epf: number;
  socso: number;
  eis: number;
  total: number;
}

export interface TaxComputationResult {
  taxableIncome: number;
  estimatedTax: number;
  grossSalary: number;
  netPay: number;
  deductions: TaxDeductions;
  notes?: string;
}

export interface RuleRegistry {
  id: string;
  triggerSignal: string;
  shortName: string;
  advisoryText: string;
  taxCode: string;
}
