
import React from 'react';
import { HistoryItem } from '../types';

interface HistorySidebarProps {
  history: HistoryItem[];
  onClear: () => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ history, onClear }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center justify-between border-b border-slate-800 bg-slate-900/50">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">History</h2>
        <button 
          onClick={onClear}
          className="text-[10px] text-slate-500 hover:text-rose-400 font-bold uppercase transition-colors"
        >
          Clear
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center">
            <svg className="w-8 h-8 mb-2 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs">기록이 없습니다</p>
          </div>
        ) : (
          history.map((item) => (
            <div key={item.id} className="group">
              <p className="text-[10px] text-slate-500 font-medium mb-1">{item.expression}</p>
              <p className="text-lg font-bold text-blue-400 mono-font truncate">{item.result}</p>
              <div className="h-px w-full bg-slate-800/50 mt-2 group-last:hidden" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistorySidebar;
