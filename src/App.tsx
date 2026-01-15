import React, { useState, useMemo } from 'react';
import { 
  Shield, 
  Activity, 
  Cpu, 
  FileText, 
  Download, 
  AlertCircle, 
  Lock, 
  Database,
  Search,
  ArrowRightLeft,
  PieChart,
  Table as TableIcon,
  TrendingUp,
  Globe,
  CheckCircle2,
  Terminal,
  Zap,
  Info,
  FileSpreadsheet
} from 'lucide-react';
import ProgressRail from './components/layout/ProgressRail';
import ExtractionView from './views/ExtractionView';
import IntelligenceSuiteView from './views/IntelligenceSuiteView';

// --- MPERS-ALIGNED FORENSIC MOCK DATA ---
const MOCK_LEDGER = [
  { id: '1', date: '2026-01-10', docRef: 'BK-RHB-01', description: 'Cash at Bank (RHB)', accountCode: 1000, accountName: 'Main Operations', debit: 45200.50, credit: 0 },
  { id: '2', date: '2026-01-12', docRef: 'TR-042', description: 'Trade Receivables', accountCode: 1100, accountName: 'Accounts Receivable', debit: 125000.00, credit: 0 },
  { id: '3', date: '2026-01-15', docRef: 'EX-995', description: 'Annual Gala Dinner', accountCode: 8201, accountName: 'Entertainment', debit: 12000, credit: 0 },
  { id: '4', date: '2026-01-20', docRef: 'REV-001', description: 'Revenue - Project Gamma', accountCode: 4000, accountName: 'Software Sales', debit: 0, credit: 54200.00 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState(5); 
  const [exportView, setExportView] = useState('TB'); 
  const [language, setLanguage] = useState('en-MY');
  const [isLocked, setIsLocked] = useState(false);

  // --- RPR BRAND KIT v2.1 COLORS ---
  const colors = {
    charcoal: '#2B2F33', // Primary Surface
    black: '#000000',    // Background
    cyan: '#00D9FF',     // Λ Accent
    white: '#F5F7FA',    // Typography
    slate: '#3A4045',    // Border
    success: '#059669',  // Validated
    warning: '#D97706',  // Advisory
    danger: '#B91C1C'    // The AOUTHA Alert
  };

  const getLanguageLabel = (key: string) => {
    const labels: Record<string, Record<string, string>> = {
      'en-MY': { 
        title: 'Reporting Substrate', 
        badge: 'Regulatory Output Center', 
        disclaimer: 'This report is prepared under MPERS standards. Classification is performed by AI agents; final verification by a qualified auditor is required.' 
      },
      'ms-MY': { 
        title: 'Pusat Pelaporan', 
        badge: 'Pusat Output Kawal Selia', 
        disclaimer: 'Laporan ini disediakan di bawah piawaian MPERS. Versi Bahasa Inggeris akan digunapakai jika terdapat percanggahan.' 
      },
      'zh-Hans-MY': { 
        title: '报告中心', 
        badge: '管理视图 (Management View)', 
        disclaimer: '本报告根据 MPERS 标准编制。如英文版本与中文版本有任何歧异，概以英文版本为准。' 
      }
    };
    return labels[language]?.[key] || '';
  };

  const TabButton = ({ id, label, icon: Icon, color }: { id: number; label: string; icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>; color: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex flex-col items-center justify-center p-3 transition-all duration-300 relative
        ${activeTab === id ? 'text-white' : 'text-slate-500 hover:text-white'}`}
    >
      <Icon size={22} style={{ color: activeTab === id ? color : 'inherit' }} />
      <span className="text-[9px] mt-1.5 font-black uppercase tracking-widest">{label}</span>
      {activeTab === id && (
        <div className="absolute -bottom-1 w-8 h-0.5" style={{ backgroundColor: color }}></div>
      )}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-cyan-500/30" style={{ backgroundColor: colors.charcoal, color: colors.white }}>
      
      {/* --- SOVEREIGN HEADER (HEAVY-WEIGHT Λ WORDMARK) --- */}
      <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex flex-col">
          <div className="flex items-baseline font-sans text-2xl font-black uppercase tracking-tighter">
            <span>MY</span>
            <span 
              className="font-sans text-[1.1em] font-black leading-none" 
              style={{ 
                color: colors.cyan, 
                transform: 'scaleY(1.05) translateY(0.02em)', 
                transformOrigin: 'center baseline', 
                display: 'inline-block',
                margin: '0 -0.02em'
              }}
            >
              Λ
            </span>
            <span>UDIT</span>
          </div>
          <p className="text-[9px] text-cyan-400 font-bold tracking-[0.3em] uppercase mt-1">Sovereign Identity Architecture v2.2</p>
        </div>

        <div className="flex items-center gap-10">
          <div className="hidden lg:flex flex-col items-end">
             <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.cyan }}></div>
                <span className="text-[10px] font-black tracking-widest uppercase text-white">SENTINEL v1.0 ACTIVE</span>
             </div>
             <span className="text-[8px] text-slate-500 uppercase font-black mt-1">asia-southeast1: authoritative instance</span>
          </div>
          <div className="h-8 w-[1px] bg-white/10"></div>
          <Lock size={20} className={isLocked ? "text-emerald-500" : "text-slate-600"} />
        </div>
      </header>

      {/* --- PROGRESS RAIL --- */}
      <div className="px-10 py-4 bg-black/20 border-b border-white/5">
        <ProgressRail activeTab={activeTab} />
      </div>

      {/* --- MAIN WORKFLOW CANVAS --- */}
      <main className="flex-1 overflow-y-auto p-10 max-w-6xl mx-auto w-full">
        
        {/* TAB 1 & 2: SETUP & EXTRACTION */}
        {activeTab === 1 && (
           <div className="space-y-8 animate-in fade-in duration-500">
              <div className="border-l-4 border-cyan-400 pl-8 py-2">
                 <h2 className="text-3xl font-black tracking-tighter uppercase">01 Entity Setup</h2>
                 <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-bold italic">"Keeping the logic where it belongs: in the hands of the person who carries the risk."</p>
              </div>
              <div className="p-12 rounded-2xl bg-black/20 border border-white/5 flex flex-col items-center justify-center text-center">
                 <Database size={48} className="text-cyan-500/20 mb-6" />
                 <p className="text-slate-400 max-w-md">Initialize the sovereign reporting context by mapping your legal entity to the 1000-9999 account substrate.</p>
              </div>
           </div>
        )}

        {activeTab === 2 && (
          <ExtractionView />
        )}

        {/* TAB 3: REFINEMENT (AGENT PERSONAS) */}
        {activeTab === 3 && (
          <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500">
             <div className="flex justify-between items-end border-l-4 border-cyan-400 pl-8 py-2">
                <div>
                   <h2 className="text-3xl font-black tracking-tighter uppercase">03 Audit Refinement</h2>
                   <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-bold">Dual-Agent Forensic Validation</p>
                </div>
                <div className="text-right">
                   <p className="text-[10px] text-slate-500 uppercase font-black">Refinement Progress</p>
                   <p className="text-xl font-black text-white uppercase tracking-tighter">94.8%</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-2xl bg-red-950/10 border border-red-500/20 space-y-6 relative overflow-hidden group">
                   <div className="flex items-center justify-between">
                      <h3 className="text-red-500 font-black text-xl tracking-tighter uppercase">THE AOUTHA</h3>
                      <span className="text-[9px] px-2 py-0.5 bg-red-500/20 text-red-400 font-bold uppercase tracking-widest rounded">Bad Cop</span>
                   </div>
                   <div className="p-4 bg-red-950/20 border border-red-500/20 rounded-xl">
                      <p className="text-[11px] font-black text-white uppercase mb-1">Critical Block: RM 1,700 Floor</p>
                      <p className="text-[10px] text-red-200/50 leading-relaxed italic">"Entry 8402 (Jan Salary) violates the 2026 Minimum Wage floor. Correct immediately."</p>
                   </div>
                </div>

                <div className="p-8 rounded-2xl bg-cyan-900/10 border border-cyan-500/20 space-y-6 relative overflow-hidden group">
                   <div className="flex items-center justify-between">
                      <h3 className="text-cyan-400 font-black text-xl tracking-tighter uppercase">MR. R.P.P</h3>
                      <span className="text-[9px] px-2 py-0.5 bg-cyan-500/20 text-cyan-400 font-bold uppercase tracking-widest rounded">Good Cop</span>
                   </div>
                   <div className="p-4 bg-cyan-900/20 border border-cyan-500/20 rounded-xl">
                      <p className="text-[11px] font-black text-white uppercase mb-1">Optimization: Automation CA</p>
                      <p className="text-[10px] text-cyan-200/50 leading-relaxed italic">"Identified software spend in 7102. Reclaim 200% Automation Capital Allowance here."</p>
                   </div>
                </div>
             </div>
          </div>
        )}

        {/* TAB 4: TAX */}
        {activeTab === 4 && (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="border-l-4 border-emerald-500 pl-8 py-2">
                <h2 className="text-3xl font-black tracking-tighter uppercase">04 Tax Snapshot</h2>
                <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-bold">Estimated Liability // Advisory Only</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 bg-black/20 border border-white/5 rounded-2xl">
                   <p className="text-[10px] text-slate-500 uppercase font-black mb-1">Baseline Liability</p>
                   <p className="text-3xl font-black text-white">RM 48,200</p>
                </div>
                <div className="p-8 bg-cyan-900/10 border border-cyan-500/20 rounded-2xl">
                   <p className="text-[10px] text-cyan-400 uppercase font-black mb-1">Optimized Liability</p>
                   <p className="text-3xl font-black text-white">RM 32,450</p>
                   <p className="text-[10px] text-cyan-500/70 mt-2 font-bold uppercase tracking-widest">Incentives Applied</p>
                </div>
             </div>
          </div>
        )}

        {/* TAB 6: INTELLIGENCE SUITE */}
        {activeTab === 6 && (
          <IntelligenceSuiteView />
        )}

        {/* TAB 5: EXPORT */}
        {activeTab === 5 && (
          <div className="space-y-8 animate-in fade-in duration-500">
             
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-8">
               <div className="space-y-2">
                 <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                   {getLanguageLabel('title')}
                 </h2>
                 <div className="flex items-center gap-2">
                   <CheckCircle2 size={16} className="text-emerald-500" />
                   <span className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase">{getLanguageLabel('badge')}</span>
                 </div>
               </div>

               <div className="flex gap-2 p-1.5 bg-black/40 rounded-xl border border-white/10">
                 {['en-MY', 'ms-MY', 'zh-Hans-MY'].map((lang) => (
                   <button
                     key={lang}
                     onClick={() => setLanguage(lang)}
                     className={`px-4 py-2 rounded-lg text-[10px] font-black tracking-widest transition-all ${
                       language === lang ? 'bg-cyan-500 text-slate-900' : 'text-slate-500 hover:text-white'
                     }`}
                   >
                     {lang.split('-')[0].toUpperCase()}
                   </button>
                 ))}
               </div>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[
                 { id: 'TB', label: 'Trial Balance', icon: ArrowRightLeft, active: true },
                 { id: 'PL', label: 'Profit & Loss', icon: TrendingUp, active: true },
                 { id: 'GL', label: 'General Ledger', icon: TableIcon, active: true },
                 { id: 'BS', label: 'Balance Sheet', icon: PieChart, active: false } 
               ].map((btn) => (
                 <button
                   key={btn.id}
                   disabled={!btn.active}
                   onClick={() => setExportView(btn.id)}
                   className={`flex flex-col items-start gap-4 p-6 rounded-xl border transition-all relative overflow-hidden group
                     ${exportView === btn.id 
                       ? 'bg-white/5 border-cyan-500/50' 
                       : 'bg-black/20 border-white/5 hover:border-white/20'}
                     ${!btn.active && 'opacity-40 grayscale cursor-not-allowed'}`}
                 >
                   <btn.icon size={24} style={{ color: exportView === btn.id ? colors.cyan : colors.slate }} />
                   <div className="flex flex-col items-start">
                      <span className={`text-[11px] font-black uppercase tracking-widest ${exportView === btn.id ? 'text-white' : 'text-slate-500'}`}>
                        {btn.label}
                      </span>
                      {!btn.active && <span className="text-[8px] text-amber-500 font-black uppercase mt-1 tracking-tighter">Phase 2+</span>}
                   </div>
                   {exportView === btn.id && (
                     <div className="absolute top-0 right-0 w-16 h-16 bg-cyan-500/5 rounded-bl-full border-b border-l border-cyan-500/20"></div>
                   )}
                 </button>
               ))}
             </div>

             <div className="bg-black/30 rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
               <div className="px-8 py-5 bg-white/5 border-b border-white/5 flex justify-between items-center">
                 <div className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                     {exportView === 'TB' ? 'Trial Balance Schedule' : 
                      exportView === 'PL' ? 'Statement of Comprehensive Income' :
                      'Forensic Ledger Preview'}
                   </span>
                 </div>
                 {language === 'zh-Hans-MY' && (
                   <div className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-md">
                     <span className="text-[8px] font-black text-cyan-400 uppercase tracking-tighter">Management View</span>
                   </div>
                 )}
               </div>

               <div className="overflow-x-auto">
                 <table className="w-full text-left text-[11px]">
                   <thead className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em] bg-black/40">
                     <tr>
                       <th className="px-8 py-5">Code</th>
                       <th className="px-8 py-5">Forensic Description</th>
                       <th className="px-8 py-5 text-right">Debit (MYR)</th>
                       <th className="px-8 py-5 text-right">Credit (MYR)</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5 font-medium">
                     {MOCK_LEDGER.map((row, idx) => (
                       <tr key={idx} className="hover:bg-white/5 transition-colors">
                         <td className="px-8 py-5 font-mono text-cyan-400 font-bold tracking-tighter">{row.accountCode}</td>
                         <td className="px-8 py-5 text-slate-200 uppercase tracking-tight">{row.description}</td>
                         <td className="px-8 py-5 text-right tabular-nums text-white">
                            {row.debit > 0 ? row.debit.toLocaleString(undefined, { minimumFractionDigits: 2 }) : '—'}
                         </td>
                         <td className="px-8 py-5 text-right tabular-nums text-white">
                            {row.credit > 0 ? row.credit.toLocaleString(undefined, { minimumFractionDigits: 2 }) : '—'}
                         </td>
                       </tr>
                     ))}
                   </tbody>
                 </table>
               </div>
             </div>

             <div className="p-6 bg-black/40 rounded-xl border border-white/5 flex gap-5 items-start">
               <Globe size={18} className="text-cyan-500 mt-1 shrink-0" />
               <p className="text-[10px] leading-relaxed text-slate-500 italic font-medium max-w-4xl">
                 {getLanguageLabel('disclaimer')}
               </p>
             </div>

             <div className="flex justify-end gap-4 pt-4 pb-12">
               <button className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white/5 text-slate-400 text-[10px] font-black uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all">
                 <FileSpreadsheet size={16} />
                 Excel Workbook
               </button>
               <button 
                onClick={() => setIsLocked(true)}
                className="flex items-center gap-2 px-10 py-4 rounded-xl bg-cyan-500 text-slate-900 text-[10px] font-black uppercase tracking-widest shadow-xl shadow-cyan-500/10 hover:translate-y-[-2px] active:translate-y-[0] transition-all">
                 <Download size={16} />
                 {isLocked ? 'Audit Locked (LHDN Sealed)' : 'Generate Final Dossier'}
               </button>
             </div>
          </div>
        )}

      </main>

      {/* --- SOVEREIGN NAVIGATION --- */}
      <nav className="h-24 border-t border-white/10 bg-black/60 backdrop-blur-2xl flex items-center justify-center gap-16 sticky bottom-0 z-50">
        <TabButton id={1} label="Setup" icon={Database} color={colors.cyan} />
        <TabButton id={2} label="Extract" icon={Search} color={colors.cyan} />
        <TabButton id={3} label="Refine" icon={Activity} color="#A78BFA" />
        <TabButton id={4} label="Tax" icon={TrendingUp} color={colors.success} />
        <TabButton id={5} label="Export" icon={Download} color={colors.warning} />
        <TabButton id={6} label="Intelligence" icon={Zap} color={colors.cyan} />
      </nav>

      <footer className="bg-black py-10 border-t border-white/10 px-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex flex-col">
              <span className="text-sm font-black text-white tracking-widest uppercase">RPR COMMUNICATIONS</span>
              <p className="text-[9px] text-slate-600 tracking-[0.5em] uppercase mt-1">Sovereign Identity Substrate // Build 2026.01.15</p>
           </div>
           <div className="text-center md:text-right">
              <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">© 2026 RPR Communications, LLC. Delaware, USA.</p>
              <p className="text-[9px] uppercase font-bold text-cyan-400 mt-1 tracking-widest">Sovereign Logic Integrator v2.2 // Malaysia Active</p>
           </div>
        </div>
      </footer>
    </div>
  );
}
