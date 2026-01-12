import { LedgerEntry } from "../types";

export function getReadinessStats(entries: LedgerEntry[]) {
    const totalEntries = entries.length;
    const entriesWithDocs = entries.filter(e => e.supportingDocLinks && e.supportingDocLinks.length > 0).length;
    const pendingTasks = totalEntries - entriesWithDocs;
    const score = totalEntries > 0 ? Math.round((entriesWithDocs / totalEntries) * 100) : 100;

    return {
        score,
        pendingTasks,
        isAuditReady: pendingTasks === 0,
    };
}
