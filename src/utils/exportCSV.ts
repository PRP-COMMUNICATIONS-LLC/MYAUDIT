import { LedgerEntry } from '../types';

export const exportToCSV = (transactions: LedgerEntry[], fileName: string = 'forensic_ledger_export') => {
  // Define 8 headers to match the new Debit/Credit structure
  const headers = ['Date', 'Description', 'Debit', 'Credit', 'E-Invoice Status', 'Category', 'Status', 'DIE Flags'];

  const rows = transactions.map(t => [
    t.date || 'N/A', 
    // Clean regex to escape double quotes without extra corrupted characters
    `"${(t.description || '').replace(/"/g, '""')}"`, 
    (t.debit || 0).toString(),
    (t.credit || 0).toString(),
    t.eInvoiceStatus || 'pending',
    t.category || 'Uncategorized',
    t.status || 'New',
    (t.dieFlags && t.dieFlags.length > 0) ? 'YES' : 'NO'
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${fileName}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
