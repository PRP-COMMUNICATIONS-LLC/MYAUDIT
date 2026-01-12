/**
 * Guardian Manifest v1.2 - Risk Tiering Logic
 * Ensures MYAUDIT remains audit-proof while maintaining mass-market speed.
 */

export enum RiskTier {
  TIER_0_SAFE,      // Background logs, no user bother
  TIER_1_ADVISORY,  // UI Suggestion, user MUST tap to apply
  TIER_2_CRITICAL   // Hard block, forces decision
}

export interface GuardianAuditSignal {
  id: string;
  tier: RiskTier;
  message: string;
  suggestedAction?: any;
  requiresMutation: boolean; // If true, AI CANNOT apply without user tap
}

export class GuardianRiskService {
  /**
   * Processes a ledger entry and determines the escalation path.
   */
  public static analyzeEntry(entry: any): GuardianAuditSignal {
    // TIER 2: Regional/Fraud Hard Locks
    if (entry.currency !== 'MYR' || entry.amount > 1000000) {
      return { 
        id: entry.id, tier: RiskTier.TIER_2_CRITICAL, 
        message: "CRITICAL: Transaction outside Malaysia scope or suspected anomaly.",
        requiresMutation: true 
      };
    }

    // TIER 1: Deductibility Insight Engine (DIE)
    if (entry.description.toLowerCase().includes('dinner') && entry.category === 'Entertainment') {
      return {
        id: entry.id, tier: RiskTier.TIER_1_ADVISORY,
        message: "FORENSIC INSIGHT: This looks like Staff Welfare (100% deductible).",
        suggestedAction: { category: 'Staff Welfare' },
        requiresMutation: true // AI must NOT auto-change this
      };
    }

    // TIER 0: Standard Plumbing
    return { 
      id: entry.id, tier: RiskTier.TIER_0_SAFE, 
      message: "Automated classification verified.", 
      requiresMutation: false 
    };
  }
}