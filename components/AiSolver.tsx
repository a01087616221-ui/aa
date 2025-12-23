
import React, { useState } from 'react';
import { solveComplexMath } from '../services/geminiService';

interface AiSolverProps {
  onResult: (expression: string, result: string) => void;
}

const AiSolver: React.FC<AiSolverProps> = ({ onResult }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastResult, setLastResult] = useState<string | null>(null);

  const handleSolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    const result = await solveComplexMath(query);
    setLastResult(result);
    onResult(`AI: ${query}`, result);
    setLoading(false);
  };

  return (
    <div className="p-8 w-full min-h-[400px] flex flex-col justify-between">
      <div className="space-y-4">
        <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-2xl">
          <h3 className="text-sm font-bold text-blue-400 mb-1">AI Smart Solver</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            복잡한 문장형 수학 문제나 공식, 단위 변환을 자연어로 물어보세요. 
            <br/>예: "1500의 15%는 얼마야?", "서울에서 부산까지 거리를 마일로 변환해줘"
          </p>
        </div>

        {lastResult && (
          <div className="p-6 bg-slate-950/50 rounded-2xl border border-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <span className="text-xs text-slate-500 block mb-2 font-medium">AI의 계산 결과:</span>
            <p className="text-2xl font-bold text-blue-400 mono-font">{lastResult}</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSolve} className="mt-8 relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="문제를 입력하세요..."
          className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-6 py-4 pr-24 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-slate-200"
        />
        <button
          type="submit"
          disabled={loading}
          className={`absolute right-2 top-2 bottom-2 px-6 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${
            loading 
            ? 'bg-slate-700 text-slate-500 cursor-not-allowed' 
            : 'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20'
          }`}
        >
          {loading ? (
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : '풀기'}
        </button>
      </form>
    </div>
  );
};

export default AiSolver;
