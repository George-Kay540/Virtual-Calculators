import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Button from '../Button';
import Display from '../Display';
import { evaluateExpression } from '../../utils/mathUtils';
import { CalculatorState } from '../../types';

export default function BasicCalculator() {
  const [state, setState] = useState<CalculatorState>({
    display: '',
    result: '',
    history: '',
    isError: false
  });

  const DIGIT_LIMIT = 15;

  const handlePress = useCallback((val: string) => {
    setState(prev => {
      if (prev.result) {
        const isOperator = ['+', '−', '×', '/', '%'].includes(val);
        if (isOperator) {
           return {
             ...prev,
             display: prev.result + val,
             result: '',
             isError: false
           };
        } else {
           return {
             ...prev,
             display: val,
             result: '',
             isError: false
           };
        }
      }
      return { ...prev, display: prev.display + val, isError: false };
    });
  }, []);

  const handleClear = useCallback(() => {
    setState({ display: '', result: '', history: '', isError: false });
  }, []);

  const handleBackspace = useCallback(() => {
    setState(prev => ({ 
      ...prev, 
      display: prev.display.slice(0, -1),
      result: '' 
    }));
  }, []);

  const handleToggleSign = useCallback(() => {
    setState(prev => {
      if (prev.result) {
         const newVal = (parseFloat(prev.result) * -1).toString();
         return { ...prev, display: newVal, result: '', isError: false };
      }
      const d = prev.display;
      if (!d) return { ...prev, display: '-' };
      if (['+', '−', '×', '/', '(', ')'].includes(d.slice(-1))) {
        return { ...prev, display: d + '-' };
      }
      const match = d.match(/(-?)((\d*\.)?\d+)$/);
      if (match) {
        const [fullMatch, sign, number] = match;
        const prefix = d.slice(0, -fullMatch.length);
        const newNumber = sign === '-' ? number : `-${number}`;
        return { ...prev, display: prefix + newNumber, isError: false };
      }
      return { ...prev, display: d + '-' };
    });
  }, []);

  const handleCalculate = useCallback(() => {
    const res = evaluateExpression(state.display, 'deg', Math.pow(10, DIGIT_LIMIT));
    if (res === 'Error') {
      setState(prev => ({ ...prev, isError: true }));
    } else {
      setState(prev => ({ 
        history: prev.display,
        display: '',
        result: res,
        isError: false 
      }));
    }
  }, [state.display]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const key = e.key;
      if (/^[0-9]$/.test(key)) { e.preventDefault(); handlePress(key); } 
      else if (key === '.') { e.preventDefault(); handlePress('.'); }
      else if (key === '+') { e.preventDefault(); handlePress('+'); }
      else if (key === '-') { e.preventDefault(); handlePress('−'); }
      else if (key === '*') { e.preventDefault(); handlePress('×'); }
      else if (key === '/') { e.preventDefault(); handlePress('/'); }
      else if (key === '%') { e.preventDefault(); handlePress('%'); }
      else if (key === 'Enter' || key === '=') { e.preventDefault(); handleCalculate(); }
      else if (key === 'Backspace') { e.preventDefault(); handleBackspace(); }
      else if (key === 'Escape') { e.preventDefault(); handleClear(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePress, handleCalculate, handleBackspace, handleClear]);

  const liveResult = useMemo(() => {
    if (!state.display) return '';
    const cleaned = state.display.replace(/[+\-×/]+$/, '');
    if (!Number.isNaN(Number(cleaned))) return ''; 
    const res = evaluateExpression(cleaned, 'deg', Math.pow(10, DIGIT_LIMIT));
    return res === 'Error' ? '' : res;
  }, [state.display]);

  return (
    <div className="w-full flex flex-col items-center animate-fade-in-up">
      <div className="w-full max-w-[380px] mx-auto">
        <div className="bg-zinc-500 rounded-[1.5rem] p-1 shadow-2xl ring-1 ring-white/10 relative">
          <div className="bg-zinc-500 rounded-[1.3rem] p-4 border-t border-white/20 shadow-inner">
            <div className="mb-4 bg-gray-700 rounded-xl border-4 border-gray-700 shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)] overflow-hidden relative">
              <Display 
                input={state.display} 
                result={state.result || liveResult} 
                isError={state.isError} 
                digitLimit={DIGIT_LIMIT}
              />
            </div>
            
            <div className="grid grid-cols-4 gap-3">
              <Button label="AC" onClick={handleClear} variant="danger" />
              <Button label="%" onClick={() => handlePress('%')} variant="secondary" />
              <Button label="⌫" onClick={handleBackspace} variant="danger" />
              <Button label="÷" onClick={() => handlePress('/')} variant="operator" />

              <Button label="7" onClick={() => handlePress('7')} variant="primary" />
              <Button label="8" onClick={() => handlePress('8')} variant="primary" />
              <Button label="9" onClick={() => handlePress('9')} variant="primary" />
              <Button label="×" onClick={() => handlePress('×')} variant="operator" />

              <Button label="4" onClick={() => handlePress('4')} variant="primary" />
              <Button label="5" onClick={() => handlePress('5')} variant="primary" />
              <Button label="6" onClick={() => handlePress('6')} variant="primary" />
              <Button label="−" onClick={() => handlePress('−')} variant="operator" />

              <Button label="1" onClick={() => handlePress('1')} variant="primary" />
              <Button label="2" onClick={() => handlePress('2')} variant="primary" />
              <Button label="3" onClick={() => handlePress('3')} variant="primary" />
              <Button label="+" onClick={() => handlePress('+')} variant="operator" />

              <Button label="+/-" onClick={handleToggleSign} variant="purple" />
              <Button label="0" onClick={() => handlePress('0')} variant="primary" />
              <Button label="." onClick={() => handlePress('.')} variant="primary" />
              <Button label="=" onClick={handleCalculate} variant="accent" />
            </div>
          </div>
        </div>
        <div className="mx-auto mt-4 w-1/3 h-2 bg-black/10 rounded-[100%] blur-md" />
      </div>

      <div className="mt-20 w-full max-w-2xl px-4 text-left border-t border-ocean-100 pt-10 pb-20">
        <h3 className="text-2xl font-bold text-ocean-900 mb-6">What is the Basic Online Calculator?</h3>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            This basic online calculator is a fast, simple, and reliable tool designed for everyday arithmetic. It allows users to quickly perform essential math operations such as addition, subtraction, multiplication, and division directly in their browser—no downloads or sign-ups required. It is suitable for quick calculations inside your browser.
          </p>
          <p>
            The calculator features a clean, intuitive interface with clearly labeled number keys, operator buttons, and a large display for easy reading. Useful functions like percentage calculation, decimal input, sign change (+/−), and clear (AC) make it suitable for students, professionals, and anyone needing quick calculations.
          </p>
          <p>
            Built for speed and accuracy, this online calculator works seamlessly on desktop and mobile devices. Whether you’re balancing expenses, checking figures, or doing simple math at work or school, this tool provides instant results with minimal effort.
          </p>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-bold text-ocean-900 mb-4">Key features:</h4>
          <ul className="flex flex-col gap-3">
            {[
              "Basic arithmetic operations (+, −, ×, ÷)",
              "Percentage (%) calculations",
              "Decimal and negative number support",
              "Clear and reset functionality",
              "Responsive, user-friendly design"
            ].map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-ocean-500 mt-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 text-slate-600 italic text-sm border-l-4 border-ocean-200 pl-4">
          This basic calculator online is ideal for daily use and serves as a foundation for more advanced calculators on the site, helping users find exactly the math tool they need in one place.
        </p>
      </div>
    </div>
  );
}
