import { UILedgerEntry, LedgerEntry } from '../../types';

export const computeUpdatedFlags = (entry: UILedgerEntry, newCategory: string): string[] => {
    const flags: string[] = [];
    if (newCategory === 'Staff Welfare' && entry.category === 'Entertainment') {
        flags.push('MISCLASSIFICATION_RISK');
    }
    if (entry.debit && entry.debit < 1700 && newCategory.includes('Salary')) {
        flags.push('MINIMUM_WAGE_RISK');
    }
    return flags;
};

export const calculateTaxStats = (forensicLedger: LedgerEntry[]) => {
    const totalDebits = forensicLedger
        .filter(e => e.type === 'DEBIT')
        .reduce((sum, e) => sum + e.amount, 0);
    const totalCredits = forensicLedger
        .filter(e => e.type === 'CREDIT')
        .reduce((sum, e) => sum + e.amount, 0);
    const estimatedTax = totalCredits * 0.15; // Simplified 15% rate

    return {
        totalDebits,
        totalCredits,
        estimatedTax,
        netIncome: totalCredits - totalDebits
    };
}