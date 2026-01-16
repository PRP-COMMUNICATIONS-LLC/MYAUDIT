import { LedgerEntry } from "../types";

export interface RemediationTask {
    id: string;
    description: string;
    reason: 'MISSING_DOC' | 'UNCATEGORIZED';
    simulatedSavings: number;
}

export function mapEntriesToTasks(entries: LedgerEntry[]): RemediationTask[] {
    const tasks: RemediationTask[] = [];

    for (const entry of entries) {
        const debit = entry.debit ?? 0;
        const description = entry.description ?? '';
        const category = entry.category ?? '';
        
        if (debit > 500 && (!entry.supportingDocLinks || entry.supportingDocLinks.length === 0)) {
            tasks.push({
                id: entry.id!,
                description: description,
                reason: 'MISSING_DOC',
                simulatedSavings: debit * 0.24,
            });
        }

        if (category === 'Uncategorized') {
            tasks.push({
                id: entry.id!,
                description: description,
                reason: 'UNCATEGORIZED',
                simulatedSavings: debit * 0.24,
            });
        }
    }

    return tasks;
}
