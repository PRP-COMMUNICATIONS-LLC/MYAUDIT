import React from 'react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: string[];
}

const TabSwitch: React.FC<Props> = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div className="flex space-x-1 bg-slate-800 p-1 rounded-lg">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors 
            ${activeTab === tab 
              ? 'bg-sky-600 text-white' 
              : 'text-slate-300 hover:bg-slate-700'}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabSwitch;
