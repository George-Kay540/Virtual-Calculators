import React from 'react';
import { formatWithCommas } from '../utils/mathUtils';

interface DisplayProps {
  input: string;
  result: string;
  isError?: boolean;
  digitLimit?: number;
}

const Display: React.FC<DisplayProps> = ({ input, result, isError, digitLimit = 20 }) => {
  const formattedInput = formatWithCommas(input, digitLimit);
  const formattedResult = result && result !== 'Error' ? formatWithCommas(result, digitLimit) : '';

  return (
    <div className="w-full bg-[#a7af7c] rounded-xl p-3 mb-2 shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)] border border-gray-600 relative overflow-hidden group h-40 flex flex-col justify-between">
      {/* Subtle scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,255,255,0.02),rgba(255,255,255,0.02))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%] opacity-20" />
      
      {/* Top Section: Active Input with Blinking Caret */}
      <div className="relative z-10 w-full overflow-hidden flex justify-end items-center h-8">
        <div className="font-mono text-2xl text-black tracking-tight whitespace-nowrap flex items-center">
          {formattedInput}
          <div className="w-[2px] h-[24px] bg-black ml-0.5 animate-blink" />
        </div>
      </div>

      {/* Bottom Section: Dynamic Result */}
      <div className="relative z-10 w-full overflow-hidden flex justify-end">
         <div className={`font-mono text-4xl font-bold tracking-tight whitespace-nowrap transition-colors duration-300 ${isError ? 'text-red-400' : 'text-black'}`}>
          {formattedResult || (isError ? 'Error' : '\u00A0')}
        </div>
      </div>
    </div>
  );
};

export default Display;