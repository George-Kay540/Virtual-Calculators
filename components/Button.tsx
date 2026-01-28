import React from 'react';

interface ButtonProps {
  label: string | React.ReactNode;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'secondary' | 'operator' | 'accent' | 'danger' | 'ghost' | 'purple';
  className?: string;
  doubleWidth?: boolean;
  tall?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'default', 
  className = '',
  doubleWidth = false,
  tall = false
}) => {
  
  // Base styles for a mechanical plastic key
  const baseStyles = "relative font-bold rounded-lg transition-all duration-75 select-none flex items-center justify-center border-t border-white/20";
  
  const shadowStyles = {
    // Standard raised state
    default: "translate-y-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_4px_0_0_rgba(0,0,0,0.2),0_7px_10px_rgba(0,0,0,0.15)]",
    // Pressed state
    active: "active:translate-y-[3px] active:shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_1px_0_0_rgba(0,0,0,0.2),0_2px_5px_rgba(0,0,0,0.1)]"
  };

  const variants = {
    default: "bg-[#F8F9FA] text-zinc-800 hover:bg-white",
    primary: "bg-[#F8F9FA] text-zinc-800 hover:bg-white", 
    secondary: "bg-zinc-300 text-zinc-900 hover:bg-zinc-200", 
    operator: "bg-blue-600 text-white hover:bg-blue-500", 
    accent: "bg-emerald-600 text-white hover:bg-emerald-500 text-xl", 
    danger: "bg-rose-600 text-white hover:bg-rose-500", 
    purple: "bg-purple-600 text-white hover:bg-purple-500",
    ghost: "text-zinc-600 hover:text-zinc-800 hover:bg-zinc-100 shadow-none border-none translate-y-0 active:translate-y-0 active:scale-95" 
  };

  const isGhost = variant === 'ghost';

  return (
    <button 
      onClick={onClick}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${!isGhost ? shadowStyles.default : ''}
        ${!isGhost ? shadowStyles.active : ''}
        ${doubleWidth ? 'col-span-2' : ''} 
        ${tall ? 'row-span-2 h-full' : 'h-10 sm:h-11'}
        ${className}
      `}
    >
      <span className="relative z-10 text-sm tracking-tight">{label}</span>
    </button>
  );
};

export default Button;