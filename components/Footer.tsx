import React from 'react';
import { CalculatorType } from '../types';

interface FooterProps {
  onNavigate: (type: CalculatorType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full mt-auto py-6 sm:py-8 px-4 border-t border-ocean-100 bg-white/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-xs sm:text-sm font-medium text-ocean-900/60 text-center sm:text-left">
          &copy; {new Date().getFullYear()} Virtual-Calculators. All rights reserved.
        </div>
        <nav className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6">
          <button 
            onClick={() => onNavigate(CalculatorType.ABOUT)}
            className="text-xs sm:text-sm font-semibold text-ocean-700 hover:text-ocean-900 transition-colors whitespace-nowrap"
          >
            About
          </button>
          <button 
            onClick={() => onNavigate(CalculatorType.TERMS)}
            className="text-xs sm:text-sm font-semibold text-ocean-700 hover:text-ocean-900 transition-colors whitespace-nowrap"
          >
            Terms of Use
          </button>
          <button 
            onClick={() => onNavigate(CalculatorType.PRIVACY)}
            className="text-xs sm:text-sm font-semibold text-ocean-700 hover:text-ocean-900 transition-colors whitespace-nowrap"
          >
            Privacy Policy
          </button>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;