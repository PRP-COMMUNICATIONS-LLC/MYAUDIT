import React from 'react';
import { 
  Database, 
  Search, 
  Activity, 
  TrendingUp, 
  Download 
} from 'lucide-react';

interface Tab {
  id: number;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
}

interface TabRailProps {
  activeTab: number;
  onTabChange: (tabId: number) => void;
  tabs?: Tab[];
}

const DEFAULT_TABS: Tab[] = [
  { id: 1, label: 'Setup', icon: Database },
  { id: 2, label: 'Extraction', icon: Search },
  { id: 3, label: 'Review & Verify', icon: Activity },
  { id: 4, label: 'Tax Planning', icon: TrendingUp },
  { id: 5, label: 'Export', icon: Download },
];

const TabRail: React.FC<TabRailProps> = ({ 
  activeTab, 
  onTabChange, 
  tabs = DEFAULT_TABS 
}) => {
  const colors = {
    cyan: '#00D9FF',
    success: '#059669',
    warning: '#D97706',
    purple: '#A78BFA',
  };

  const getTabColor = (tabId: number): string => {
    if (tabId === 3) return colors.purple;
    if (tabId === 4) return colors.success;
    if (tabId === 5) return colors.warning;
    return colors.cyan;
  };

  return (
    <nav className="h-24 border-t border-slate-800 bg-slate-950/60 backdrop-blur-2xl flex items-center justify-center gap-16 sticky bottom-0 z-50">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        const tabColor = getTabColor(tab.id);

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center justify-center p-3 transition-all duration-300 relative rounded-3xl ${
              isActive 
                ? 'text-white bg-slate-900/40 border border-slate-800' 
                : 'text-slate-500 hover:text-white hover:bg-slate-900/20'
            }`}
          >
            <Icon 
              size={22} 
              style={{ color: isActive ? tabColor : 'inherit' }} 
            />
            <span className="text-[9px] mt-1.5 font-black uppercase tracking-widest">
              {tab.label}
            </span>
            {isActive && (
              <div 
                className="absolute -bottom-1 w-8 h-0.5 rounded-full" 
                style={{ backgroundColor: tabColor }}
              ></div>
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default TabRail;
