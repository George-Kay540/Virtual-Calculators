import React from 'react';
import { CalculatorType } from '../types';
import { Calculator, FlaskConical, Divide, Percent, X } from 'lucide-react';

interface SidebarProps {
  activeType: CalculatorType;
  onSelect: (type: CalculatorType) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeType, onSelect, isOpen, onClose }) => {
  const items = [
    { type: CalculatorType.BASIC, label: 'Basic Calculator', icon: Calculator },
    { type: CalculatorType.SCIENTIFIC, label: 'Scientific Calculator', icon: FlaskConical },
    { type: CalculatorType.FRACTION, label: 'Fraction Calculators', icon: Divide },
    { type: CalculatorType.PERCENTAGE, label: 'Percentage Calculators', icon: Percent },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50
        w-70 bg-slate-200 border-r border-black/10
        transform transition-transform duration-300 ease-in-out
        md:transform-none flex flex-col shadow-2xl md:shadow-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-6 flex justify-between items-center border-b border-black/10">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-ocean-900 tracking-tight leading-tight">Virtual-Calculators</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-black mt-0.5">Online Calculator Suite</p>
          </div>
          <button onClick={onClose} className="md:hidden p-2 hover:bg-black/5 rounded-full text-black">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
          {items.map((item) => {
            const isActive = activeType === item.type;
            return (
              <button
                key={item.type}
                onClick={() => {
                  onSelect(item.type);
                  onClose();
                }}
                className={`
                  w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-white text-black shadow-lg shadow-black/5 ring-1 ring-black/5' 
                    : 'text-black hover:bg-white/40'}
                `}
              >
                <div className={`
                  p-2 rounded-lg transition-colors flex-shrink-0
                  ${isActive ? 'bg-ocean-100 text-ocean-700' : 'bg-transparent text-black/70 group-hover:bg-white/50'}
                `}>
                  <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <div className={`text-sm whitespace-nowrap overflow-hidden text-ellipsis ${isActive ? 'font-bold' : 'font-semibold'}`}>
                    {item.label}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;