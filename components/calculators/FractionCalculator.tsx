import React, { useState } from 'react';
import { simplifyFraction, decimalToFraction, formatWithCommas, gcd, toMixedNumber } from '../../utils/mathUtils';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Button from '../Button';

// --- Shared Internal Components ---

const MathFraction: React.FC<{ whole?: number | string; num: string | number; den: string | number; size?: 'sm' | 'md' | 'lg' }> = ({ whole, num, den, size = 'md' }) => {
  const isWhole = den.toString() === '1';
  const sizeClasses = {
    sm: { num: 'text-[10px]', den: 'text-[10px]', line: 'w-3', whole: 'text-xs' },
    md: { num: 'text-sm font-bold', den: 'text-sm font-bold', line: 'w-6', whole: 'text-base' },
    lg: { num: 'text-xl font-extrabold', den: 'text-xl font-extrabold', line: 'w-10', whole: 'text-2xl' }
  };

  const showWhole = whole !== undefined && whole !== 0 && whole !== '0';

  if (isWhole && size !== 'lg' && !showWhole) return <span className="font-mono">{num}</span>;

  return (
    <div className="flex items-center gap-1.5 inline-flex align-middle mx-1">
      {showWhole && <span className={`${sizeClasses[size].whole} font-mono font-extrabold`}>{whole}</span>}
      {(num.toString() !== '0' || !showWhole) && (
        <div className="flex flex-col items-center">
          <span className={`${sizeClasses[size].num} font-mono leading-none py-0.5`}>{formatWithCommas(num.toString())}</span>
          <div className={`h-[1.5px] bg-current rounded-full ${sizeClasses[size].line}`} />
          <span className={`${sizeClasses[size].den} font-mono leading-none py-0.5`}>{formatWithCommas(den.toString())}</span>
        </div>
      )}
    </div>
  );
};

const MathStepLine: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-1.5 py-1.5 border-b border-slate-100 last:border-0 w-full overflow-x-auto scrollbar-hide">
    <span className="text-slate-400 font-bold text-xs">=</span>
    <div className="flex items-center gap-1 whitespace-nowrap text-[11px] text-slate-600">
      {children}
    </div>
  </div>
);

const Card: React.FC<{ 
  title: string; 
  children: React.ReactNode; 
  result: React.ReactNode; 
  steps: React.ReactNode; 
  onCalc: () => void; 
  onClear: () => void;
}> = ({ title, children, result, steps, onCalc, onClear }) => (
  <div className="bg-slate-200 border border-slate-200 rounded-[1.5rem] p-6 shadow-xl w-full flex flex-col min-h-[340px] h-fit relative overflow-hidden transition-all duration-300">
    <div className="flex-1 flex flex-col relative z-10 w-full">
      <h3 className="text-slate-900 font-bold mb-6 text-center text-lg tracking-wide">{title}</h3>
      <div className="flex-1 flex flex-col justify-center items-center mb-6 w-full">
        {children}
      </div>
    </div>

    <div className="space-y-4 relative z-10 w-full mx-auto mt-auto">
      <div className="grid grid-cols-2 gap-4">
        <Button label="Calculate" onClick={onCalc} variant="accent" className="w-full h-10 text-sm" />
        <Button label="Clear" onClick={onClear} variant="danger" className="w-full h-10 text-sm" />
      </div>

      <div className="p-3 bg-gray-100 rounded-xl border border-gray-100 flex flex-col shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] relative overflow-hidden h-auto min-h-[4rem]">
        {result ? (
          <div className="w-full animate-fade-in-up">
            <div className="flex justify-between items-center mb-2 border-b border-slate-200 pb-1">
              <span className="text-neutral-900/60 text-[10px] font-bold uppercase tracking-wider">Result</span>
              <div className="flex-1 flex justify-end px-2">{result}</div>
            </div>
            {steps && (
              <div className="w-full">
                 <p className="text-[9px] uppercase tracking-widest font-bold text-slate-400 mb-1">Steps:</p>
                 <div className="flex flex-col">{steps}</div>
              </div>
            )}
          </div>
        ) : (
          <div className="h-full flex items-center justify-between w-full">
            <span className="text-neutral-900/60 text-xs font-bold uppercase tracking-wider">Result</span>
            <span className="text-2xl font-mono text-neutral-300 font-extrabold">-</span>
          </div>
        )}
      </div>
    </div>
  </div>
);

const Input = ({ value, onChange, placeholder, className = '', onEnter }: any) => (
  <input 
    type="text" 
    inputMode="decimal"
    value={formatWithCommas(value)}
    onChange={(e) => {
      const raw = e.target.value.replace(/,/g, '');
      if (raw === '' || raw === '-' || /^-?\d*\.?\d*$/.test(raw)) onChange(raw);
    }}
    onKeyDown={(e) => e.key === 'Enter' && onEnter?.()}
    placeholder={placeholder}
    className={`bg-white border border-slate-200 rounded-lg px-2 py-1.5 text-slate-900 focus:border-ocean-500 focus:outline-none focus:ring-1 focus:ring-ocean-500/20 text-center transition-all placeholder:text-slate-300 font-mono shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] ${className}`}
  />
);

const FractionInput = ({ num, den, onNumChange, onDenChange, onEnter, inputClass = "w-20 h-14 text-xl" }: any) => (
  <div className="flex flex-col items-center gap-1.5">
    <Input value={num} onChange={onNumChange} placeholder="n" className={inputClass} onEnter={onEnter} />
    <div className="w-10 h-[2.5px] bg-slate-400 rounded-full"></div>
    <Input value={den} onChange={onDenChange} placeholder="d" className={inputClass} onEnter={onEnter} />
  </div>
);

const OperatorSelect = ({ value, onChange, className = "w-14 h-14 text-xl" }: any) => (
  <select 
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`bg-white border border-slate-200 rounded-lg text-center text-slate-900 focus:outline-none cursor-pointer shadow-sm font-bold ${className}`}
  >
    <option value="+">+</option>
    <option value="-">−</option>
    <option value="*">×</option>
    <option value="/">÷</option>
  </select>
);

export default function FractionCalculator() {
  const [simple, setSimple] = useState({ n1: '', d1: '', n2: '', d2: '', op: '+' });
  const [simpleRes, setSimpleRes] = useState<React.ReactNode | null>(null);
  const [simpleSteps, setSimpleSteps] = useState<React.ReactNode | null>(null);

  const [mixed, setMixed] = useState({ w1: '', n1: '', d1: '', w2: '', n2: '', d2: '', op: '+' });
  const [mixedRes, setMixedRes] = useState<React.ReactNode | null>(null);
  const [mixedSteps, setMixedSteps] = useState<React.ReactNode | null>(null);

  const [decIn, setDecIn] = useState('');
  const [decRes, setDecRes] = useState<React.ReactNode | null>(null);
  const [decSteps, setDecSteps] = useState<React.ReactNode | null>(null);

  const [f2d, setF2D] = useState({ n: '', d: '' });
  const [f2dRes, setF2DRes] = useState<React.ReactNode | null>(null);
  const [f2dSteps, setF2DSteps] = useState<React.ReactNode | null>(null);

  const calcSimple = () => {
    const n1 = parseInt(simple.n1) || 0, d1 = parseInt(simple.d1) || 1;
    const n2 = parseInt(simple.n2) || 0, d2 = parseInt(simple.d2) || 1;
    const op = simple.op;
    if (d1 === 0 || d2 === 0 || (op === '/' && n2 === 0)) { setSimpleRes(<span className="text-rose-500 font-bold">Error</span>); return; }
    
    const steps: React.ReactNode[] = [];
    let finalN = 0, finalD = 1;
    if (op === '+' || op === '-') {
      const cd = d1 * d2;
      const t1 = n1 * d2, t2 = n2 * d1;
      finalN = op === '+' ? t1 + t2 : t1 - t2; finalD = cd;
      steps.push(<MathStepLine key="s1"><MathFraction num={t1} den={cd} /> {op} <MathFraction num={t2} den={cd} /></MathStepLine>);
    } else if (op === '*') {
      finalN = n1 * n2; finalD = d1 * d2;
      steps.push(<MathStepLine key="s1"><MathFraction num={`${n1}×${n2}`} den={`${d1}×${d2}`} /></MathStepLine>);
    } else {
      finalN = n1 * d2; finalD = d1 * n2;
      steps.push(<MathStepLine key="s1"><MathFraction num={n1} den={d1} /> × <MathFraction num={d2} den={n2} /></MathStepLine>);
    }
    steps.push(<MathStepLine key="sf"><MathFraction num={finalN} den={finalD} /></MathStepLine>);
    
    const simp = simplifyFraction(finalN, finalD);
    if (simp.num !== finalN) steps.push(<MathStepLine key="simp">Simplify: <MathFraction num={simp.num} den={simp.den} /></MathStepLine>);

    if (Math.abs(simp.num) >= Math.abs(simp.den)) {
      const mixedNum = toMixedNumber(simp.num, simp.den);
      steps.push(<MathStepLine key="mixed">Mixed Number: <MathFraction whole={mixedNum.whole} num={mixedNum.num} den={mixedNum.den} /></MathStepLine>);
      setSimpleRes(<MathFraction whole={mixedNum.whole} num={mixedNum.num} den={mixedNum.den} size="lg" />);
    } else {
      setSimpleRes(<MathFraction num={simp.num} den={simp.den} size="lg" />);
    }
    setSimpleSteps(steps);
  };

  const calcMixed = () => {
    const w1 = parseInt(mixed.w1) || 0, n1 = parseInt(mixed.n1) || 0, d1 = parseInt(mixed.d1) || 1;
    const w2 = parseInt(mixed.w2) || 0, n2 = parseInt(mixed.n2) || 0, d2 = parseInt(mixed.d2) || 1;
    const op = mixed.op;
    const iN1 = (w1 < 0 ? -1 : 1) * (Math.abs(w1) * d1 + n1), iD1 = d1;
    const iN2 = (w2 < 0 ? -1 : 1) * (Math.abs(w2) * d2 + n2), iD2 = d2;
    const steps: React.ReactNode[] = [<MathStepLine key="cv">Improper: <MathFraction num={iN1} den={iD1} /> {op} <MathFraction num={iN2} den={iD2} /></MathStepLine>];
    let fN = 0, fD = 1;
    if (op === '+' || op === '-') { fN = op === '+' ? (iN1 * iD2 + iN2 * iD1) : (iN1 * iD2 - iN2 * iD1); fD = iD1 * iD2; }
    else if (op === '*') { fN = iN1 * iN2; fD = iD1 * iD2; }
    else { fN = iN1 * iD2; fD = iD1 * iN2; }
    steps.push(<MathStepLine key="res"><MathFraction num={fN} den={fD} /></MathStepLine>);
    const simp = simplifyFraction(fN, fD);
    if (simp.num !== fN) steps.push(<MathStepLine key="simp">Simplify: <MathFraction num={simp.num} den={simp.den} /></MathStepLine>);

    if (Math.abs(simp.num) >= Math.abs(simp.den)) {
      const mixedNum = toMixedNumber(simp.num, simp.den);
      steps.push(<MathStepLine key="mixed">Mixed Number: <MathFraction whole={mixedNum.whole} num={mixedNum.num} den={mixedNum.den} /></MathStepLine>);
      setMixedRes(<MathFraction whole={mixedNum.whole} num={mixedNum.num} den={mixedNum.den} size="lg" />);
    } else {
      setMixedRes(<MathFraction num={simp.num} den={simp.den} size="lg" />);
    }
    setMixedSteps(steps);
  };

  const calcDec = () => {
    if (!decIn) return;
    const frac = decimalToFraction(decIn);
    if (!frac) return;
    const places = decIn.split('.')[1]?.length || 0;
    const den = Math.pow(10, places);
    const num = Math.round(parseFloat(decIn) * den);
    const steps = [<MathStepLine key="s1">{decIn} = <MathFraction num={num} den={den} /></MathStepLine>];
    if (frac.num !== num) steps.push(<MathStepLine key="s2">Simplify: <MathFraction num={frac.num} den={frac.den} /></MathStepLine>);
    if (Math.abs(frac.num) >= Math.abs(frac.den)) {
      const mixedNum = toMixedNumber(frac.num, frac.den);
      steps.push(<MathStepLine key="mixed">Mixed Number: <MathFraction whole={mixedNum.whole} num={mixedNum.num} den={mixedNum.den} /></MathStepLine>);
      setDecRes(<MathFraction whole={mixedNum.whole} num={mixedNum.num} den={mixedNum.den} size="lg" />);
    } else {
      setDecRes(<MathFraction num={frac.num} den={frac.den} size="lg" />);
    }
    setDecSteps(steps);
  };

  const calcF2D = () => {
    const n = parseInt(f2d.n) || 0, d = parseInt(f2d.d) || 1;
    if (d === 0) return;
    const res = (n / d).toString();
    setF2DRes(<span className="text-2xl font-bold font-mono text-neutral-900">{res}</span>);
    setF2DSteps(<MathStepLine>{n} ÷ {d} = {res}</MathStepLine>);
  };

  return (
    <div className="w-full flex flex-col items-center animate-fade-in-up px-4 pb-20">
      <div className="flex flex-col gap-10 items-center w-full max-w-7xl mx-auto">
        <div className="w-full max-w-[360px]">
          <Card title="Simple Fraction Calculator" result={simpleRes} steps={simpleSteps} onCalc={calcSimple} onClear={() => { setSimple({n1:'',d1:'',n2:'',d2:'',op:'+'}); setSimpleRes(null); setSimpleSteps(null); }}>
            <div className="flex items-center gap-4">
              <FractionInput num={simple.n1} den={simple.d1} onNumChange={(v:any)=>setSimple({...simple, n1:v})} onDenChange={(v:any)=>setSimple({...simple, d1:v})} onEnter={calcSimple} />
              <OperatorSelect value={simple.op} onChange={(v:any)=>setSimple({...simple, op:v})} />
              <FractionInput num={simple.n2} den={simple.d2} onNumChange={(v:any)=>setSimple({...simple, n2:v})} onDenChange={(v:any)=>setSimple({...simple, d2:v})} onEnter={calcSimple} />
            </div>
          </Card>
        </div>

        <div className="w-full max-w-[360px]">
          <Card title="Mixed Numbers Calculator" result={mixedRes} steps={mixedSteps} onCalc={calcMixed} onClear={() => { setMixed({w1:'',n1:'',d1:'',w2:'',n2:'',d2:'',op:'+'}); setMixedRes(null); setMixedSteps(null); }}>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <Input value={mixed.w1} onChange={(v:any)=>setMixed({...mixed, w1:v})} placeholder="0" className="w-14 h-14 text-xl" onEnter={calcMixed} />
                <FractionInput num={mixed.n1} den={mixed.d1} onNumChange={(v:any)=>setMixed({...mixed, n1:v})} onDenChange={(v:any)=>setMixed({...mixed, d1:v})} onEnter={calcMixed} inputClass="w-16 h-10 text-base" />
              </div>
              <OperatorSelect value={mixed.op} onChange={(v:any)=>setMixed({...mixed, op:v})} className="w-12 h-12 text-lg" />
              <div className="flex items-center gap-1.5">
                <Input value={mixed.w2} onChange={(v:any)=>setMixed({...mixed, w2:v})} placeholder="0" className="w-14 h-14 text-xl" onEnter={calcMixed} />
                <FractionInput num={mixed.n2} den={mixed.d2} onNumChange={(v:any)=>setMixed({...mixed, n2:v})} onDenChange={(v:any)=>setMixed({...mixed, d2:v})} onEnter={calcMixed} inputClass="w-16 h-10 text-base" />
              </div>
            </div>
          </Card>
        </div>

        <div className="w-full max-w-[360px]">
          <Card title="Decimal to Fraction" result={decRes} steps={decSteps} onCalc={calcDec} onClear={() => { setDecIn(''); setDecRes(null); setDecSteps(null); }}>
            <div className="flex items-center gap-3">
              <Input value={decIn} onChange={setDecIn} placeholder="1.25" className="w-24 h-12 text-xl" onEnter={calcDec} />
              <span className="text-xl font-bold text-slate-400">=</span>
              <div className="flex flex-col items-center">
                 <span className="text-2xl text-slate-300 font-bold">?</span>
                 <div className="w-8 h-[2px] bg-slate-300"></div>
                 <span className="text-2xl text-slate-300 font-bold">?</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="w-full max-w-[360px]">
          <Card title="Fraction to Decimal" result={f2dRes} steps={f2dSteps} onCalc={calcF2D} onClear={() => { setF2D({n:'',d:''}); setF2DRes(null); setF2DSteps(null); }}>
            <div className="flex items-center gap-4">
              <FractionInput num={f2d.n} den={f2d.d} onNumChange={(v:any)=>setF2D({...f2d, n:v})} onDenChange={(v:any)=>setF2D({...f2d, d:v})} onEnter={calcF2D} inputClass="w-16 h-11 text-lg" />
              <ArrowRight className="text-slate-400" />
              <div className="w-20 h-12 bg-slate-100/50 rounded-lg border border-slate-200 flex items-center justify-center font-mono text-slate-300">0.0</div>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-16 w-full max-w-2xl px-4 text-left border-t border-ocean-100 pt-12 pb-20">
        <h3 className="text-2xl font-bold text-ocean-900 mb-6">What is the Online Fraction Calculator?</h3>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            This fraction calculator online is a comprehensive tool for working with fractions, mixed numbers, and decimals in one place. It is designed for students, teachers, and anyone who needs accurate fraction calculations without manual steps or conversions.
          </p>
          <p>
            The calculator supports basic fraction operations such as addition, subtraction, multiplication, and division using a simple fraction calculator interface. Users can also work with mixed numbers, making it easy to calculate expressions that include whole numbers and fractions together.
          </p>
          <p>
            In addition to standard fraction math, this online fraction calculator includes built-in decimal to fraction and fraction to decimal converters. These tools automatically simplify results, helping users understand values in the format they need for schoolwork, exams, or real-world applications.
          </p>
          <p>
            Each calculator section is clearly separated, with dedicated input fields, calculate and clear buttons, and a large result display for readability. The layout is responsive and works smoothly across desktop and mobile devices.
          </p>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-bold text-ocean-900 mb-4">Key features:</h4>
          <ul className="flex flex-col gap-3">
            {[
              "Fraction addition, subtraction, multiplication, and division",
              "Mixed number calculator support",
              "Decimal to fraction conversion",
              "Fraction to decimal conversion",
              "Automatic simplification of results",
              "Clean, easy-to-use online interface"
            ].map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-ocean-500 mt-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 text-slate-600 italic text-sm border-l-4 border-ocean-200 pl-4">
          This fraction calculator online removes the complexity of fraction math and provides fast, accurate results, making it an essential tool alongside basic and scientific calculators.
        </p>
      </div>
    </div>
  );
}