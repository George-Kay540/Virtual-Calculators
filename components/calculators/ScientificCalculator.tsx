import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Button from '../Button';
import Display from '../Display';
import { evaluateExpression } from '../../utils/mathUtils';
import { CalculatorState, AngleMode } from '../../types';

export default function ScientificCalculator() {
  const [state, setState] = useState<CalculatorState>({
    display: '',
    result: '',
    history: '',
    isError: false,
    lastAnswer: ''
  });
  const [angleMode, setAngleMode] = useState<AngleMode>('deg');

  const DIGIT_LIMIT = 20;

  const handlePress = useCallback((val: string) => {
    setState(prev => {
      if (prev.result) {
        const isChaining = ['+', '−', '×', '/', '%', '!', '^'].includes(val) || val.startsWith('^');
        if (isChaining) {
           return { ...prev, display: prev.result + val, result: '', isError: false };
        } else {
           return { ...prev, display: val, result: '', isError: false };
        }
      }
      return { ...prev, display: prev.display + val, isError: false };
    });
  }, []);

  const handleFunc = useCallback((func: string) => {
    setState(prev => {
        if (prev.result) {
            return { ...prev, display: func + '(', result: '', isError: false };
        }
        return { ...prev, display: prev.display + func + '(', isError: false };
    });
  }, []);

  const handleClear = useCallback(() => {
    setState(prev => ({ 
        display: '', 
        result: '', 
        history: '', 
        isError: false,
        lastAnswer: prev.result || prev.lastAnswer 
    }));
  }, []);

  const handleBackspace = useCallback(() => {
    setState(prev => ({ ...prev, display: prev.display.slice(0, -1), result: '' }));
  }, []);

  const handleAns = useCallback(() => {
    setState(prev => {
      const valToInsert = prev.result || prev.lastAnswer;
      if (!valToInsert) return prev;
      if (prev.result) {
          return { ...prev, display: valToInsert, result: '', isError: false };
      }
      return { ...prev, display: prev.display + valToInsert, isError: false };
    });
  }, []);

  const handleToggleSign = useCallback(() => {
    setState(prev => {
      if (prev.result) {
         const newVal = (parseFloat(prev.result) * -1).toString();
         return { ...prev, display: newVal, result: '', isError: false };
      }
      const d = prev.display;
      if (!d) return { ...prev, display: '-' };
      if (['+', '−', '×', '/', '(', ')', '^'].includes(d.slice(-1))) {
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
    const res = evaluateExpression(state.display, angleMode, Math.pow(10, DIGIT_LIMIT));
    if (res === 'Error') {
      setState(prev => ({ ...prev, isError: true }));
    } else {
      setState(prev => ({ 
        history: prev.display,
        display: '',
        result: res,
        isError: false,
        lastAnswer: res 
      }));
    }
  }, [state.display, angleMode]);

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
      else if (key === '^') { e.preventDefault(); handlePress('^'); }
      else if (key === '!') { e.preventDefault(); handlePress('!'); }
      else if (key === '(') { e.preventDefault(); handlePress('('); }
      else if (key === ')') { e.preventDefault(); handlePress(')'); }
      else if (key === 'e') { e.preventDefault(); handlePress('e'); }
      else if (key === 'Enter' || key === '=') { e.preventDefault(); handleCalculate(); }
      else if (key === 'Backspace') { e.preventDefault(); handleBackspace(); }
      else if (key === 'Escape') { e.preventDefault(); handleClear(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePress, handleCalculate, handleBackspace, handleClear]);

  const liveResult = useMemo(() => {
    if (!state.display) return '';
    const cleaned = state.display.replace(/[+\-×/(*^−]+$/, '');
    if (!Number.isNaN(Number(cleaned))) return '';
    const res = evaluateExpression(cleaned, angleMode, Math.pow(10, DIGIT_LIMIT));
    return res === 'Error' ? '' : res;
  }, [state.display, angleMode]);

  return (
    <div className="w-full flex flex-col items-center animate-fade-in-up">
      <div className="w-full max-w-[450px] mx-auto">
        <div className="bg-zinc-500 rounded-[1.5rem] p-1 shadow-2xl ring-1 ring-white/10 relative">
          <div className="bg-zinc-500 rounded-[1.3rem] p-3 border-t border-white/20 shadow-inner">
            <div className="mb-3 bg-gray-700 rounded-xl border-4 border-gray-700 shadow-[inset_0_2px_8_rgba(0,0,0,0.5)] overflow-hidden relative">
              <div className="absolute top-2 left-3 z-20 flex gap-2">
                 <button onClick={() => setAngleMode('deg')} className={`text-[10px] font-bold px-1.5 py-0.5 rounded transition-colors ${angleMode === 'deg' ? 'bg-black/20 text-black' : 'text-black/50 hover:text-black'}`}>DEG</button>
                 <button onClick={() => setAngleMode('rad')} className={`text-[10px] font-bold px-1.5 py-0.5 rounded transition-colors ${angleMode === 'rad' ? 'bg-black/20 text-black' : 'text-black/50 hover:text-black'}`}>RAD</button>
              </div>
              <Display 
                input={state.display} 
                result={state.result || liveResult} 
                isError={state.isError} 
                digitLimit={DIGIT_LIMIT}
              />
            </div>
            
            <div className="grid grid-cols-5 gap-x-2 gap-y-2">
              <Button label="sin" onClick={() => handleFunc('sin')} variant="secondary" />
              <Button label="cos" onClick={() => handleFunc('cos')} variant="secondary" />
              <Button label="tan" onClick={() => handleFunc('tan')} variant="secondary" />
              <Button label="√" onClick={() => handleFunc('√')} variant="secondary" />
              <Button label="x√y" onClick={() => handlePress('^(1/')} variant="secondary" />

              <Button label={<span className="text-xs">sin⁻¹</span>} onClick={() => handleFunc('asin')} variant="secondary" />
              <Button label={<span className="text-xs">cos⁻¹</span>} onClick={() => handleFunc('acos')} variant="secondary" />
              <Button label={<span className="text-xs">tan⁻¹</span>} onClick={() => handleFunc('atan')} variant="secondary" />
              <Button label="x²" onClick={() => handlePress('^2')} variant="secondary" />
              <Button label="xʸ" onClick={() => handlePress('^')} variant="secondary" />

              <Button label="ln" onClick={() => handleFunc('ln')} variant="secondary" />
              <Button label="log" onClick={() => handleFunc('log')} variant="secondary" />
              <Button label="eˣ" onClick={() => handlePress('e^')} variant="secondary" />
              <Button label="(" onClick={() => handlePress('(')} variant="secondary" />
              <Button label=")" onClick={() => handlePress(')')} variant="secondary" />

              <Button label="π" onClick={() => handlePress('π')} variant="secondary" />
              <Button label="AC" onClick={handleClear} variant="danger" />
              <Button label="%" onClick={() => handlePress('%')} variant="secondary" />
              <Button label="⌫" onClick={handleBackspace} variant="danger" />
              <Button label="÷" onClick={() => handlePress('/')} variant="operator" />

              <Button label="e" onClick={() => handlePress('e')} variant="secondary" />
              <Button label="7" onClick={() => handlePress('7')} variant="primary" />
              <Button label="8" onClick={() => handlePress('8')} variant="primary" />
              <Button label="9" onClick={() => handlePress('9')} variant="primary" />
              <Button label="×" onClick={() => handlePress('×')} variant="operator" />

              <Button label="n!" onClick={() => handlePress('!')} variant="secondary" />
              <Button label="4" onClick={() => handlePress('4')} variant="primary" />
              <Button label="5" onClick={() => handlePress('5')} variant="primary" />
              <Button label="6" onClick={() => handlePress('6')} variant="primary" />
              <Button label="−" onClick={() => handlePress('−')} variant="operator" />

              <Button label="1/x" onClick={() => handlePress('^(-1)')} variant="secondary" />
              <Button label="1" onClick={() => handlePress('1')} variant="primary" />
              <Button label="2" onClick={() => handlePress('2')} variant="primary" />
              <Button label="3" onClick={() => handlePress('3')} variant="primary" />
              <Button label="+" onClick={() => handlePress('+')} variant="operator" />

              <Button label="Ans" onClick={handleAns} variant="secondary" />
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
        <h3 className="text-2xl font-bold text-ocean-900 mb-6">What is the Online Scientific Calculator?</h3>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            This online scientific calculator is a powerful math tool built for advanced calculations in science, engineering, finance, and education. It extends beyond basic arithmetic to support a wide range of scientific and trigonometric functions, making it suitable for students, professionals, and technical users.
          </p>
          <p>
            The calculator provides comprehensive trigonometry support, including sine (sin), cosine (cos), tangent (tan), and their inverse functions, as well as degree (DEG) and radian (RAD) modes for precise angle calculations. It also supports logarithmic and exponential functions, including log, ln, eˣ, and xʸ, allowing users to solve complex equations directly online.
          </p>
          <p>
            Additional features such as square roots, powers, factorials (n!), constants (π and e), parentheses, and an Ans memory function make this scientific calculator versatile and efficient. The large display and clearly arranged buttons ensure precision and ease of use, even for long expressions.
          </p>
          <p>
            This online scientific calculator works instantly in your browser and is fully responsive, eliminating the need for physical devices or software installation.
          </p>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-bold text-ocean-900 mb-4">Key features:</h4>
          <ul className="flex flex-col gap-3">
            {[
              "Trigonometric functions (sin, cos, tan, inverse)",
              "Degree (DEG) and Radian (RAD) modes",
              "Logarithmic and exponential calculations",
              "Powers, roots, factorials, and constants",
              "Parentheses and advanced expression handling",
              "Clean, responsive, user-friendly interface"
            ].map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-ocean-500 mt-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 text-slate-600 italic text-sm border-l-4 border-ocean-200 pl-4">
          This online scientific calculator is ideal for academic work, technical problem-solving, and anyone who needs accurate, advanced math calculations in one place.
        </p>
      </div>
    </div>
  );
}
