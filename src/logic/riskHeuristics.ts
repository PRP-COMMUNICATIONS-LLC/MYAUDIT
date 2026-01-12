import { LedgerEntry, RuleRegistry, DieFlag } from "../types";

export function detectMisclassifications(entry: LedgerEntry, rules: RuleRegistry[]): DieFlag[] {
    const flags: DieFlag[] = [];

    for (const rule of rules) {
        const keywordMatch = rule.conditions.keywords.some(keyword => 
            entry.description.toLowerCase().includes(keyword.toLowerCase())
        );

        if (keywordMatch && entry.category !== rule.conditions.category) {
            flags.push({
                flagType: "MISCLASSIFICATION_RISK",
                suggestion: `Entry "${entry.description}" might be miscategorized. Expected ${rule.conditions.category}, but found ${entry.category}.`,
                estimatedImpact: `Potential tax impact depends on category change.`,
                confidence: 0.8,
                createdAt: Date.now(),
            });
        }
    }

    return flags;
}

export function estimateRiskSimulation(entries: LedgerEntry[]) {
    const highRiskEntries = entries.filter(e => 
        (e.debit > 500 && (!e.supportingDocLinks || e.supportingDocLinks.length === 0)) ||
        e.category === 'Uncategorized'
    );

    const estimatedExposure = highRiskEntries.reduce((acc, entry) => acc + entry.debit, 0);
    const simulatedLeakage = estimatedExposure * 0.24; // 24% tax rate

    return {
        estimatedExposure,
        simulatedLeakage,
        riskLevel: simulatedLeakage > 10000 ? 'HIGH' : 'MEDIUM',
    };
}
