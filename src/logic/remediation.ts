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
        if (entry.debit > 500 && (!entry.supportingDocLinks || entry.supportingDocLinks.length === 0)) {
            tasks.push({
                id: entry.id,
                description: entry.description,
                reason: 'MISSING_DOC',
                simulatedSavings: entry.debit * 0.24,
            });
        }

        if (entry.category === 'Uncategorized') {
            tasks.push({
                id: entry.id,
                description: entry.description,
                reason: 'UNCATEGORIZED',
                simulatedSavings: entry.debit * 0.24,
            });
        }
    }

    return tasks;
}
