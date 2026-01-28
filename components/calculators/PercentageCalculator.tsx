import React, { useState } from 'react';
import { formatWithCommas } from '../../utils/mathUtils';
import Button from '../Button';

interface CardProps {
  title: string;
  children: React.ReactNode;
  result: string;
  onCalc: () => void;
  onClear: () => void;
}

const Card: React.FC<CardProps> = ({ title, children, result, onCalc, onClear }) => (
  <div className="bg-slate-200 border border-slate-200 rounded-[1.5rem] p-6 shadow-xl w-full flex flex-col justify-between min-h-[340px] relative overflow-hidden">
    <div className="flex-1 flex flex-col relative z-10 w-full">
      <h3 className="text-slate-900 font-bold mb-6 text-center text-lg tracking-wide">{title}</h3>
      <div className="flex-1 flex flex-col justify-center items-center mb-6 w-full">
        {children}
      </div>
    </div>
    <div className="space-y-6 relative z-10 w-full mx-auto">
      <div className="grid grid-cols-2 gap-4">
        <Button label="Calculate" onClick={onCalc} variant="accent" className="w-full" />
        <Button label="Clear" onClick={onClear} variant="danger" className="w-full" />
      </div>
      {/* Result Section - Highlighted with Emerald 50 */}
      <div className="p-4 bg-gray-100 rounded-xl border border-gray-100 flex justify-between items-center shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] relative overflow-hidden h-16">
        <span className="text-neutral-900/60 text-xs font-bold uppercase tracking-wider relative z-10">Result</span>
        <span className="text-3xl font-mono text-neutral-900 font-extrabold tracking-tight relative z-10 truncate ml-4">{result}</span>
      </div>
    </div>
  </div>
);

interface InputProps {
  val: string;
  setVal: (v: string) => void;
  placeholder: string;
  onEnter?: () => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({ val, setVal, placeholder, onEnter, className = "w-40" }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/,/g, '');
    if (raw === '' || raw === '-' || /^-?\d*\.?\d*$/.test(raw)) setVal(raw);
  };
  return (
    <input
      type="text"
      inputMode="decimal"
      value={formatWithCommas(val)}
      onChange={handleChange}
      onKeyDown={(e) => { if (e.key === 'Enter' && onEnter) { e.preventDefault(); onEnter(); } }}
      placeholder={placeholder}
      className={`bg-white border border-slate-200 rounded-lg px-3 py-2 text-slate-900 focus:border-ocean-500 focus:ring-1 focus:ring-ocean-500/20 focus:outline-none text-center transition-all placeholder:text-slate-300 font-mono text-lg shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] ${className}`}
    />
  );
};

const PercentageCalculator: React.FC = () => {
  const [c1, setC1] = useState({ x: '', y: '', res: '-' });
  const [c2, setC2] = useState({ x: '', y: '', res: '-' });
  const [c3, setC3] = useState({ x: '', y: '', res: '-' });
  const [c4, setC4] = useState({ x: '', y: '', res: '-' });

  const calc1 = () => {
    const x = parseFloat(c1.x), y = parseFloat(c1.y);
    if (!isNaN(x) && !isNaN(y)) setC1({ ...c1, res: formatWithCommas(((x / 100) * y).toFixed(2)) });
  };
  const calc2 = () => {
    const x = parseFloat(c2.x), y = parseFloat(c2.y);
    if (!isNaN(x) && !isNaN(y) && y !== 0) setC2({ ...c2, res: ((x / y) * 100).toFixed(2) + '%' });
  };
  const calc3 = () => {
    const x = parseFloat(c3.x), y = parseFloat(c3.y);
    if (!isNaN(x) && !isNaN(y) && x !== 0) {
      const pct = ((y - x) / x) * 100;
      setC3({ ...c3, res: `${pct >= 0 ? '+' : ''}${pct.toFixed(2)}%` });
    }
  };
  const calc4 = () => {
    const x = parseFloat(c4.x), y = parseFloat(c4.y);
    if (!isNaN(x) && !isNaN(y) && y !== 0) setC4({ ...c4, res: formatWithCommas(((x * 100) / y).toFixed(2)) });
  };

  return (
    <div className="w-full flex flex-col items-center animate-fade-in-up">
      <div className="flex flex-col gap-10 items-center w-full max-w-7xl mx-auto pb-12">
        <div className="w-full max-w-[360px]">
          <Card title="Percentage of Value" result={c1.res} onCalc={calc1} onClear={() => setC1({x:'',y:'',res:'-'})}>
            <div className="flex flex-col items-center gap-3 w-full">
              <div className="flex items-center gap-2"><span className="text-slate-900 text-sm font-bold">What is</span><Input val={c1.x} setVal={v => setC1({...c1, x:v})} placeholder="%" onEnter={calc1} /></div>
              <div className="flex items-center gap-2"><span className="text-slate-900 text-sm font-bold">of</span><Input val={c1.y} setVal={v => setC1({...c1, y:v})} placeholder="Value" onEnter={calc1} /><span className="text-slate-900 text-sm font-bold">?</span></div>
            </div>
          </Card>
        </div>
        <div className="w-full max-w-[360px]">
          <Card title="Value is what %" result={c2.res} onCalc={calc2} onClear={() => setC2({x:'',y:'',res:'-'})}>
            <div className="flex flex-col items-center gap-3 w-full">
               <div className="flex items-center gap-2"><Input val={c2.x} setVal={v => setC2({...c2, x:v})} placeholder="Value" onEnter={calc2} /><span className="text-slate-900 text-sm font-bold">is what %</span></div>
               <div className="flex items-center gap-2"><span className="text-slate-900 text-sm font-bold">of</span><Input val={c2.y} setVal={v => setC2({...c2, y:v})} placeholder="Total" onEnter={calc2} /><span className="text-slate-900 text-sm font-bold">?</span></div>
            </div>
          </Card>
        </div>
        <div className="w-full max-w-[360px]">
          <Card title="Percentage Change" result={c3.res} onCalc={calc3} onClear={() => setC3({x:'',y:'',res:'-'})}>
            <div className="flex flex-col items-center gap-3 w-full">
              <div className="flex items-center gap-2"><span className="text-slate-900 text-sm font-bold">From</span><Input val={c3.x} setVal={v => setC3({...c3, x:v})} placeholder="Start" onEnter={calc3} /></div>
              <div className="flex items-center gap-2"><span className="text-slate-900 text-sm font-bold">to</span><Input val={c3.y} setVal={v => setC3({...c3, y:v})} placeholder="End" onEnter={calc3} /></div>
            </div>
          </Card>
        </div>
        <div className="w-full max-w-[360px]">
          <Card title="Value is % of What" result={c4.res} onCalc={calc4} onClear={() => setC4({x:'',y:'',res:'-'})}>
            <div className="flex flex-col items-center gap-3 w-full">
              <div className="flex items-center gap-2"><Input val={c4.x} setVal={v => setC4({...c4, x:v})} placeholder="Value" onEnter={calc4} /><span className="text-slate-900 text-sm font-bold">is</span></div>
              <div className="flex items-center gap-2"><Input val={c4.y} setVal={v => setC4({...c4, y:v})} placeholder="%" onEnter={calc4} /><span className="text-slate-900 text-sm font-bold">of what?</span></div>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-16 w-full max-w-2xl px-4 text-left border-t border-ocean-100 pt-12 pb-20">
        <h3 className="text-2xl font-bold text-ocean-900 mb-6">What is the Online Percentage Calculator?</h3>
        <div className="space-y-4 text-slate-700 leading-relaxed">
          <p>
            This percentage calculator online is a versatile tool for solving common percentage problems quickly and accurately. It is designed for everyday use in finance, shopping, business, school, and personal calculations, eliminating the need for manual formulas.
          </p>
          <p>
            The calculator includes multiple dedicated sections to handle different percentage scenarios. Users can calculate the percentage of a value, determine what percentage one value is of another, measure percentage increase or decrease, and find the original value when a percentage is known. Each section focuses on a single task, reducing errors and improving clarity.
          </p>
          <p>
            With clearly labeled input fields and instant results, this online percentage calculator is suitable for tasks such as calculating discounts, tax, interest, profit margins, growth rates, and comparisons between values. The clean interface and responsive layout ensure smooth use on both desktop and mobile devices.
          </p>
        </div>

        <div className="mt-8">
          <h4 className="text-lg font-bold text-ocean-900 mb-4">Key features:</h4>
          <ul className="flex flex-col gap-3">
            {[
              "Calculate a percentage of a given value",
              "Find what percentage one value is of another",
              "Percentage increase and decrease calculations",
              "Reverse percentage calculations (value is % of what)",
              "Fast, accurate results with a simple interface"
            ].map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-ocean-500 mt-2 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-8 text-slate-600 italic text-sm border-l-4 border-ocean-200 pl-4">
          This percentage calculator online complements the basic, scientific, and fraction calculators, providing a complete set of math tools for practical, real-world calculations.
        </p>
      </div>
    </div>
  );
};

export default PercentageCalculator;