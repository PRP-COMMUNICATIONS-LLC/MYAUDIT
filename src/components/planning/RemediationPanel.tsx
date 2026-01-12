// src/components/planning/RemediationPanel.tsx
import React, { useState } from 'react';
import { uploadReceiptAndUpdateLedger } from '../../services/ledgerService';

interface RemediationPanelProps {
  entityId: string;
  entryId: string; 
  onClose: () => void;
}

export const RemediationPanel: React.FC<RemediationPanelProps> = ({ entityId, entryId, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await uploadReceiptAndUpdateLedger(entityId, entryId, file);
      onClose(); // Close panel on success
    } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred.');
        }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-slate-50 border-t border-b border-slate-200">
      <h4 className="font-semibold text-slate-700 mb-3">Upload Supporting Document</h4>
      <div className="flex flex-col space-y-3">
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"/>
        
        <button 
          onClick={handleUpload}
          disabled={isLoading || !file}
          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md disabled:bg-slate-400 hover:bg-blue-700">
          {isLoading ? 'Uploading...' : 'Upload Receipt'}
        </button>
        
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      </div>
    </div>
  );
};
