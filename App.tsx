
import React, { useState, useCallback, useEffect } from 'react';
import CalculatorUI from './components/CalculatorUI';
import HistorySidebar from './components/HistorySidebar';
import AiSolver from './components/AiSolver';
import { HistoryItem } from './types';

const App: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [mode, setMode] = useState<'standard' | 'scientific' | 'ai'>('standard');

  const addToHistory = useCallback((expression: string, result: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      expression,
      result,
      timestamp: Date.now(),
    };
    setHistory(prev => [newItem, ...prev].slice(0, 50));
  }, []);

  const clearHistory = () => setHistory([]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-950 text-slate-100 overflow-hidden">
      <div className="relative w-full max-w-4xl flex gap-6 items-start">
        {/* Main Interface */}
        <div className="flex-1 flex flex-col gap-4">
          <header className="flex items-center justify-between mb-2">
            <div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                OmniCalc AI
              </h1>
              <p className="text-xs text-slate-500 font-medium">Professional Mathematical Suite</p>
            </div>
            <div className="flex bg-slate-900/50 p-1 rounded-lg border border-slate-800">
              {(['standard', 'scientific', 'ai'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    mode === m 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {m.toUpperCase()}
                </button>
              ))}
            </div>
          </header>

          <main className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300">
            {mode !== 'ai' ? (
              <CalculatorUI 
                mode={mode} 
                onResult={addToHistory} 
              />
            ) : (
              <AiSolver onResult={addToHistory} />
            )}
          </main>

          <footer className="text-center">
            <button 
              onClick={() => setShowHistory(!showHistory)}
              className="text-xs text-slate-500 hover:text-blue-400 transition-colors flex items-center justify-center gap-1 mx-auto"
            >
              {showHistory ? '히스토리 숨기기' : '히스토리 보기'}
            </button>
          </footer>
        </div>

        {/* Desktop History Sidebar */}
        <div className={`hidden lg:block w-72 h-[600px] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden transition-all duration-300 ${showHistory ? 'opacity-100' : 'opacity-0 translate-x-10 pointer-events-none'}`}>
          <HistorySidebar history={history} onClear={clearHistory} />
        </div>
      </div>

      {/* Mobile History Drawer */}
      {showHistory && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
          <div className="w-4/5 h-full bg-slate-900 border-l border-slate-800">
             <div className="p-4 flex justify-between items-center border-b border-slate-800">
               <h2 className="font-bold">계산 기록</h2>
               <button onClick={() => setShowHistory(false)} className="text-slate-400">닫기</button>
             </div>
             <HistorySidebar history={history} onClear={clearHistory} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
