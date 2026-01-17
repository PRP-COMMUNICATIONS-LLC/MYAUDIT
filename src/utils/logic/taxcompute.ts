/**
 * MYΛUDIT Forensic Tax Logic v1.2
 * Authority: DR RP (The Knight - Strategist)
 * Objective: SME Corporate Tax Computation (YA 2017 Context)
 * Guardrail: SENTINEL PROTOCOL v1.1.0 - Advisory Only
 */

export interface TaxBracket {
  limit: number;
  rate: number;
  label: string;
}

export interface TaxBreakdownItem {
  bracketLabel: string;
  taxableAmount: number;
  taxAmount: number;
  rate: number;
}

export interface TaxScenario {
  chargeableIncome: number;
  totalTax: number;
  effectiveRate: number;
  isSme: boolean;
  breakdown: TaxBreakdownItem[];
  metadata: {
    rule_id: string;
    authority_ref: string;
    computed_at: string;
  };
}

/**
 * YA 2017 SME Statutory Brackets
 * Source: LHDN Public Ruling / Finance Act 2017
 * Logic: First RM 500,000 @ 18%, Remaining @ 24%
 */
export const YA2017_SME_BRACKETS: TaxBracket[] = [
  { limit: 500000, rate: 0.18, label: "First 500,000 (SME Tier)" },
  { limit: Infinity, rate: 0.24, label: "Remaining Balance (Standard)" }
];

/**
 * Main Computation Engine for SME Tax Tiers
 * @param income - The total chargeable income after DIE Engine adjustments.
 * @param brackets - The statutory tiers (defaults to YA 2017 SME).
 */
export const computeSmeTaxScenario = (
  income: number,
  isSme: boolean = true,
  brackets: TaxBracket[] = YA2017_SME_BRACKETS
): TaxScenario => {
  let remaining = Math.max(0, income);
  let totalTax = 0;
  const breakdown: TaxBreakdownItem[] = [];

  // Iterate through tiers to calculate progressive impact
  for (const bracket of brackets) {
    if (remaining <= 0) break;

    const taxableInBracket = Math.min(remaining, bracket.limit);
    const taxInBracket = taxableInBracket * bracket.rate;

    breakdown.push({
      bracketLabel: bracket.label,
      taxableAmount: taxableInBracket,
      taxAmount: taxInBracket,
      rate: bracket.rate
    });

    totalTax += taxInBracket;
    // Handle the 'Infinity' limit for the final bracket
    if (bracket.limit !== Infinity) {
      remaining -= taxableInBracket;
    } else {
      remaining = 0;
    }
  }

  return {
    chargeableIncome: income,
    totalTax,
    effectiveRate: income > 0 ? totalTax / income : 0,
    isSme,
    breakdown,
    metadata: {
      rule_id: "MYA-RULE-TAX-2017-SME",
      authority_ref: "Finance Act 2017 - Schedule 1",
      computed_at: new Date().toISOString()
    }
  };
};
