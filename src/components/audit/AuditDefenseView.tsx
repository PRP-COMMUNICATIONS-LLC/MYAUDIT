import React from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';

interface AuditDefenseViewProps {
  isAuditMode: boolean;
  onTriggerAuditMode: () => void;
  defenseConfidence: number;
}

const AuditDefenseView: React.FC<AuditDefenseViewProps> = ({
  isAuditMode,
  onTriggerAuditMode,
  defenseConfidence,
}) => {

  if (isAuditMode) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="border-l-4 border-amber-500 pl-8 py-2">
          <h2 className="text-3xl font-black tracking-tighter uppercase">Audit Defense Posture</h2>
          <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-bold">LHDN_AUDIT_NOTICE Detected</p>
        </div>
        <div className="p-12 rounded-3xl bg-slate-950 border border-amber-500/50 flex flex-col items-center justify-center text-center space-y-6">
            <FileSpreadsheet size={48} className="text-amber-400/20 mb-6" />
            <p className="text-slate-400 max-w-md">The system has entered a defensive state. Management reports are collapsed, and the Audit Defense Package is ready for generation.</p>
            <p className="text-amber-400 text-lg font-bold">Defense Confidence: {(defenseConfidence * 100).toFixed(2)}%</p>
            <button
                // onClick={handleExportAuditPack} // This would be passed in from App.tsx or context
                className="px-10 py-4 rounded-xl bg-amber-500 text-slate-900 text-[11px] font-black uppercase tracking-widest shadow-xl shadow-amber-500/10 hover:translate-y-[-2px] active:translate-y-[0] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
                <Download size={16} />
                Generate Audit Defense Package (ZIP)
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
        <div className="border-l-4 border-cyan-400 pl-8 py-2">
            <h2 className="text-3xl font-black tracking-tighter uppercase">05 Export</h2>
            <p className="text-slate-500 text-sm mt-1 uppercase tracking-widest font-bold">Generate Final Audit Pack</p>
        </div>
        <div className="p-12 rounded-3xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center space-y-6">
            <FileSpreadsheet size={48} className="text-cyan-400/20 mb-6" />
            <p className="text-slate-400 max-w-md">Export the complete forensic ledger as a JSON audit pack for external review.</p>
            <button
                // onClick={handleExportAuditPack}
                className="px-10 py-4 rounded-xl bg-cyan-500 text-slate-900 text-[11px] font-black uppercase tracking-widest shadow-xl shadow-cyan-500/10 hover:translate-y-[-2px] active:translate-y-[0] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
                <Download size={16} />
                Export Audit Pack (JSON)
            </button>
            <button onClick={onTriggerAuditMode} className="text-xs text-slate-500 mt-4 hover:text-amber-400">
                (Test: Trigger Audit Mode)
            </button>
        </div>
    </div>
  );
};

export default AuditDefenseView;