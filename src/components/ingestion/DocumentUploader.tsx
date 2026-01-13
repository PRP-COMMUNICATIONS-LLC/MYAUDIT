import React from 'react';
import { LedgerEntry } from '../../types';

interface Props {
  onExtractionComplete: (entries: LedgerEntry[]) => void;
}

export const DocumentUploader: React.FC<Props> = ({ onExtractionComplete }) => {
  const handleSimulateUpload = () => {
    // In a real app, this would involve file parsing and API calls.
    const dummyEntries: LedgerEntry[] = [
      {
        id: '1',
        date: '2023-10-26',
        description: 'Purchase of new robot arm',
        amount: 15000,
        category: 'Capital Expenditure',
        confidence: 0.95
      },
      {
        id: '2',
        date: '2023-10-25',
        description: 'Software license for AI-powered sorting system',
        amount: 2500,
        category: 'Operating Expense',
        confidence: 0.8
      },
    ];
    onExtractionComplete(dummyEntries);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Document Uploader</h2>
      <button onClick={handleSimulateUpload} className="bg-blue-600 px-4 py-2 rounded">
        Simulate Document Upload
      </button>
    </div>
  );
};
