import React, { useState } from 'react';
import { Header } from './components/layout/Header';
import IncentiveProfile from './components/IncentiveProfile';
import { DocumentUploader } from './components/ingestion/DocumentUploader';
import ExtractionResults from './components/ingestion/ExtractionResults';
import RefinementView from './views/RefinementView';
import TaxView from './views/TaxView';
import { LedgerEntry, IncentiveSignals } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Tax');
  const [entries, setEntries] = useState<LedgerEntry[]>([]);
  const [signals, setSignals] = useState<IncentiveSignals>({ 
    usesAutomation: true,
    reinvestsInAssets: false,
    employsDisabledStaff: false,
    frequentSmallAssets: false,
    hasPioneerStatus: false
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleEntriesExtracted = (entries: LedgerEntry[]) => {
    setEntries(entries);
    setActiveTab('Refinement');
  };

  const handleSignalUpdate = (key: keyof IncentiveSignals, value: boolean) => {
    setSignals(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen font-sans">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="flex space-x-4 mb-4">
          <button onClick={() => handleTabChange('Profile')} className={`px-4 py-2 rounded ${activeTab === 'Profile' ? 'bg-blue-600' : 'bg-gray-700'}`}>Profile</button>
          <button onClick={() => handleTabChange('Ingestion')} className={`px-4 py-2 rounded ${activeTab === 'Ingestion' ? 'bg-blue-600' : 'bg-gray-700'}`}>Ingestion</button>
          <button onClick={() => handleTabChange('Extraction')} className={`px-4 py-2 rounded ${activeTab === 'Extraction' ? 'bg-blue-600' : 'bg-gray-700'}`}>Extraction</button>
          <button onClick={() => handleTabChange('Refinement')} className={`px-4 py-2 rounded ${activeTab === 'Refinement' ? 'bg-blue-600' : 'bg-gray-700'}`}>Refinement</button>
          <button onClick={() => handleTabChange('Tax')} className={`px-4 py-2 rounded ${activeTab === 'Tax' ? 'bg-blue-600' : 'bg-gray-700'}`}>Tax</button>
        </div>
        {activeTab === 'Profile' && <IncentiveProfile signals={signals} onUpdate={handleSignalUpdate} />}
        {activeTab === 'Ingestion' && <DocumentUploader onExtractionComplete={handleEntriesExtracted} />}
        {activeTab === 'Extraction' && <ExtractionResults transactions={entries} />}
        {activeTab === 'Refinement' && <RefinementView entries={entries} />}
        {activeTab === 'Tax' && <TaxView entries={entries} signals={signals} />}
      </main>
    </div>
  );
};

export default App;
