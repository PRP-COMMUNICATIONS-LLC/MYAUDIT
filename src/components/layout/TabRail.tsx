import React from 'react';
import {
  Database,
  Search,
  Activity,
  TrendingUp,
  Download,
} from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  integrityScore?: number;
}

interface TabRailProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: Tab[];
}

const ICONS: { [key: string]: React.ElementType } = {
  'Setup': Database,
  'Extraction': Search,
  'Review & Verify': Activity,
  'Tax Planning': TrendingUp,
  'Export': Download,
};

const colors = {
    cyan: '#00D9FF',
    success: '#059669',
    warning: '#D97706',
  };

  const getTabColor = (label: string): string => {
    switch(label) {
      case 'Setup': return colors.cyan;
      case 'Extraction': return colors.cyan;
      case 'Review & Verify': return '#A78BFA'; // Purple for validation
      case 'Tax Planning': return colors.success;
      case 'Export': return colors.warning;
      default: return colors.cyan;
    }
  };

  const TabButton = ({
    id,
    label,
    icon: Icon,
    color,
    activeTab,
    onTabChange,
    integrityScore
  }: {
    id: string;
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
    color: string;
    activeTab: string;
    onTabChange: (id: string) => void;
    integrityScore?: number;
  }) => (
    <button
      onClick={() => onTabChange(id)}
      className={`
        rounded-3xl px-6 py-3 border transition-all duration-300
        ${activeTab === id
          ? 'bg-slate-900 border-slate-700 ring-2 ring-cyan-400/50 shadow-lg shadow-cyan-400/25'
          : 'bg-slate-950 border-slate-800 hover:border-slate-700'
        }
      `}
    >
      <div className="flex flex-col items-center gap-2">
        <Icon size={22} style={{ color: activeTab === id ? color : '#64748b' }} />
        <span className={`text-[9px] font-black uppercase tracking-widest ${
          activeTab === id ? 'text-white' : 'text-slate-500'
        }`}>
          {label}
        </span>
        {integrityScore !== undefined && (
          <span className="text-[8px] font-bold text-cyan-400">
            {(integrityScore * 100).toFixed(0)}%
          </span>
        )}
      </div>
    </button>
  );


const TabRail = ({ activeTab, onTabChange, tabs }: TabRailProps) => {
    return (
        <nav className="h-24 border-t border-slate-800 bg-slate-950/60 backdrop-blur-2xl flex items-center justify-center gap-4 sticky bottom-0 z-50">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                id={tab.id}
                label={tab.label}
                icon={ICONS[tab.label]}
                color={getTabColor(tab.label)}
                activeTab={activeTab}
                onTabChange={onTabChange}
                integrityScore={tab.integrityScore}
              />
            ))}
        </nav>
    )
}

export default TabRail;