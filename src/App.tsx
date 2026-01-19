import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { signInAnonymously, onAuthStateChanged, User } from 'firebase/auth';
import SovereignHeader from './components/layout/SovereignHeader';
import IntroAnimation from './components/shared/IntroAnimation';
import TabRail from './components/layout/TabRail';
import { ForensicProvider, useForensicContext } from './context/ForensicContext';
import SetupView from './components/views/SetupView';
import ExtractionView from './components/extraction/ExtractionView';
import RefinementView from './components/audit/RefinementView';
import TaxPlanningView from './components/audit/TaxPlanningView';
import AuditDefenseView from './components/audit/AuditDefenseView';
import Footer from './components/layout/Footer';
import { UILedgerEntry } from './types';

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('1');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        signInAnonymously(auth).catch(console.error);
      }
    });
    return () => unsubscribe();
  }, []);

  const tabs = [
    { id: '1', label: 'Setup', integrityScore: 1.0 },
    { id: '2', label: 'Extraction', integrityScore: 0.85 },
    { id: '3', label: 'Review & Verify', integrityScore: 0.92 },
    { id: '4', label: 'Tax Planning' },
    { id: '5', label: 'Export' }
  ];

  const AppContent = () => {
    const { ledger, handleReclassifyEntry, isAuditMode, setIsAuditMode } = useForensicContext();
    const renderContent = () => {
        switch (activeTab) {
          case '1':
            return <SetupView />;
          case '2':
            return <ExtractionView />;
          case '3':
            return <RefinementView entries={ledger} onReclassify={handleReclassifyEntry as (id: string, updates: Partial<Pick<UILedgerEntry, 'category' | 'status'>>) => void} integrityScore={0.92} />;
          case '4':
            return <TaxPlanningView />;
          case '5':
            return <AuditDefenseView isAuditMode={isAuditMode} onTriggerAuditMode={() => setIsAuditMode(true)} defenseConfidence={0.95} />;
          default:
            return null;
        }
      }
      return renderContent();
  }

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-cyan-500/30 bg-slate-950 text-white">
      <IntroAnimation isVisible={showIntro} onComplete={() => setShowIntro(false)} />

      {!showIntro && (
        <ForensicProvider setActiveTab={setActiveTab} user={user}>
          <SovereignHeader projectName="MYAUDIT" user={user} isAuditMode={useForensicContext().isAuditMode} />
          <main className="flex-1 overflow-y-auto p-10 max-w-6xl mx-auto w-full">
            <AppContent />
          </main>
          <TabRail
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={tabs}
          />
          <Footer />
        </ForensicProvider>
      )}
    </div>
  );
}

export default App;