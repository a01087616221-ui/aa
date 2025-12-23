
import React, { useState, useCallback, useEffect } from 'react';
import { Operation } from '../types';

interface CalculatorUIProps {
  mode: 'standard' | 'scientific';
  onResult: (expression: string, result: string) => void;
}

const CalculatorUI: React.FC<CalculatorUIProps> = ({ mode, onResult }) => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation>(null);
  const [resetNext, setResetNext] = useState(false);

  const calculate = (a: number, b: number, op: Operation): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 0;
      case '%': return a % b;
      case '^': return Math.pow(a, b);
      default: return b;
    }
  };

  const handleNumber = (num: string) => {
    if (resetNext || display === '0') {
      setDisplay(num);
      setResetNext(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperation = (op: Operation) => {
    const current = parseFloat(display);
    if (prevValue === null) {
      setPrevValue(current);
    } else if (operation) {
      const result = calculate(prevValue, current, operation);
      setPrevValue(result);
      setDisplay(result.toString());
    }
    setOperation(op);
    setEquation(`${display} ${op}`);
    setResetNext(true);
  };

  const handleEqual = () => {
    if (prevValue === null || !operation) return;
    const current = parseFloat(display);
    const result = calculate(prevValue, current, operation);
    const fullEq = `${prevValue} ${operation} ${current} =`;
    
    onResult(fullEq, result.toString());
    setDisplay(result.toString());
    setEquation('');
    setPrevValue(null);
    setOperation(null);
    setResetNext(true);
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setPrevValue(null);
    setOperation(null);
  };

  const handleScientific = (func: string) => {
    const current = parseFloat(display);
    let result = 0;
    let desc = '';

    switch (func) {
      case 'sin': result = Math.sin(current); desc = `sin(${current})`; break;
      case 'cos': result = Math.cos(current); desc = `cos(${current})`; break;
      case 'tan': result = Math.tan(current); desc = `tan(${current})`; break;
      case 'sqrt': result = Math.sqrt(current); desc = `√(${current})`; break;
      case 'log': result = Math.log10(current); desc = `log(${current})`; break;
      case 'exp': result = Math.exp(current); desc = `exp(${current})`; break;
      case 'pi': result = Math.PI; desc = 'π'; break;
    }

    onResult(desc, result.toString());
    setDisplay(result.toString());
    setResetNext(true);
  };

  const btnClass = "h-16 flex items-center justify-center text-xl font-medium rounded-2xl transition-all active:scale-95";
  const numBtn = `${btnClass} bg-slate-800 text-slate-100 hover:bg-slate-700`;
  const opBtn = `${btnClass} bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600/30`;
  const actionBtn = `${btnClass} bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20`;
  const specialBtn = `${btnClass} bg-slate-700/50 text-slate-300 hover:bg-slate-700`;

  return (
    <div className="p-6 w-full max-w-md mx-auto">
      {/* Display Screen */}
      <div className="mb-6 p-4 bg-slate-950/50 rounded-2xl border border-slate-800 flex flex-col items-end justify-end h-32 overflow-hidden">
        <span className="text-sm text-slate-500 h-6 truncate max-w-full font-medium">{equation}</span>
        <span className="text-4xl font-bold mono-font truncate max-w-full text-blue-400">
          {display}
        </span>
      </div>

      {/* Keypad */}
      <div className={`grid gap-3 ${mode === 'scientific' ? 'grid-cols-5' : 'grid-cols-4'}`}>
        {/* Scientific buttons if enabled */}
        {mode === 'scientific' && (
          <>
            <button onClick={() => handleScientific('sin')} className={specialBtn}>sin</button>
            <button onClick={() => handleScientific('cos')} className={specialBtn}>cos</button>
            <button onClick={() => handleScientific('tan')} className={specialBtn}>tan</button>
            <button onClick={() => handleScientific('pi')} className={specialBtn}>π</button>
            <button onClick={() => handleScientific('sqrt')} className={specialBtn}>√</button>
            <button onClick={() => handleScientific('log')} className={specialBtn}>log</button>
            <button onClick={() => handleScientific('exp')} className={specialBtn}>exp</button>
            <button onClick={() => handleOperation('^')} className={specialBtn}>xʸ</button>
            <div className="col-span-2"></div>
          </>
        )}

        {/* Standard Pad */}
        <button onClick={handleClear} className={`${specialBtn} text-rose-400`}>AC</button>
        <button onClick={() => handleOperation('%')} className={specialBtn}>%</button>
        <button onClick={() => setDisplay((parseFloat(display) * -1).toString())} className={specialBtn}>+/-</button>
        <button onClick={() => handleOperation('/')} className={opBtn}>÷</button>

        <button onClick={() => handleNumber('7')} className={numBtn}>7</button>
        <button onClick={() => handleNumber('8')} className={numBtn}>8</button>
        <button onClick={() => handleNumber('9')} className={numBtn}>9</button>
        <button onClick={() => handleOperation('*')} className={opBtn}>×</button>

        <button onClick={() => handleNumber('4')} className={numBtn}>4</button>
        <button onClick={() => handleNumber('5')} className={numBtn}>5</button>
        <button onClick={() => handleNumber('6')} className={numBtn}>6</button>
        <button onClick={() => handleOperation('-')} className={opBtn}>−</button>

        <button onClick={() => handleNumber('1')} className={numBtn}>1</button>
        <button onClick={() => handleNumber('2')} className={numBtn}>2</button>
        <button onClick={() => handleNumber('3')} className={numBtn}>3</button>
        <button onClick={() => handleOperation('+')} className={opBtn}>+</button>

        <button onClick={() => handleNumber('0')} className={`${numBtn} col-span-2`}>0</button>
        <button onClick={() => handleNumber('.')} className={numBtn}>.</button>
        <button onClick={handleEqual} className={actionBtn}>=</button>
      </div>
    </div>
  );
};

export default CalculatorUI;
