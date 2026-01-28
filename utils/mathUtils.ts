
import { AngleMode } from '../types';

export const evaluateExpression = (expression: string, angleMode: AngleMode = 'deg', resultThreshold: number = 1e20): string => {
  if (!expression.trim()) return '';

  try {
    // Sanitize and prepare expression for JS evaluation
    let sanitized = expression.replace(/\s+/g, '');

    sanitized = sanitized
      .replace(/×/g, '*')
      .replace(/−/g, '-') 
      .replace(/π/g, 'Math.PI')
      .replace(/e/g, 'Math.E')
      .replace(/\^/g, '**');

    sanitized = sanitized.replace(/(\d+(\.\d+)?)%/g, '($1/100)');
    sanitized = sanitized.replace(/\)(?=[\d\.\(a-zA-Z])/g, ')*');
    sanitized = sanitized.replace(/(\d)(?=[a-zA-Z\(])/g, '$1*');

    const safeMath = {
      sin: (x: number) => {
        if (angleMode === 'deg') {
          const norm = ((x % 360) + 360) % 360;
          if (norm === 0 || norm === 180) return 0;
          if (norm === 90) return 1;
          if (norm === 270) return -1;
        }
        const rad = angleMode === 'deg' ? x * (Math.PI / 180) : x;
        const res = Math.sin(rad);
        return Math.abs(res) < 1e-15 ? 0 : res;
      },
      cos: (x: number) => {
        if (angleMode === 'deg') {
          const norm = ((x % 360) + 360) % 360;
          if (norm === 90 || norm === 270) return 0;
          if (norm === 0) return 1;
          if (norm === 180) return -1;
        }
        const rad = angleMode === 'deg' ? x * (Math.PI / 180) : x;
        const res = Math.cos(rad);
        return Math.abs(res) < 1e-15 ? 0 : res;
      },
      tan: (x: number) => {
        if (angleMode === 'deg') {
          const norm = ((x % 180) + 180) % 180;
          if (norm === 90) return NaN; // Undefined asymptote
          if (norm === 0) return 0;
        }
        const rad = angleMode === 'deg' ? x * (Math.PI / 180) : x;
        const c = Math.cos(rad);
        if (Math.abs(c) < 1e-15) return NaN;
        const res = Math.tan(rad);
        return Math.abs(res) < 1e-15 ? 0 : res;
      },
      asin: (x: number) => Math.asin(x) * (angleMode === 'deg' ? 180 / Math.PI : 1),
      acos: (x: number) => Math.acos(x) * (angleMode === 'deg' ? 180 / Math.PI : 1),
      atan: (x: number) => Math.atan(x) * (angleMode === 'deg' ? 180 / Math.PI : 1),
      sqrt: Math.sqrt,
      log: Math.log10, 
      ln: Math.log,    
      exp: Math.exp,
      pow: Math.pow,
      abs: Math.abs,
      PI: Math.PI,
      E: Math.E
    };

    const functionMap: Record<string, string> = {
      'asin': 'safe.asin',
      'acos': 'safe.acos',
      'atan': 'safe.atan',
      'sin': 'safe.sin',
      'cos': 'safe.cos',
      'tan': 'safe.tan',
      '√': 'safe.sqrt',
      'log': 'safe.log',
      'ln': 'safe.ln'
    };

    const funcKeys = Object.keys(functionMap).sort((a, b) => b.length - a.length);
    const funcRegex = new RegExp(`(${funcKeys.join('|')})\\(`, 'g');

    sanitized = sanitized.replace(funcRegex, (match, funcName) => {
      return `${functionMap[funcName]}(`;
    });

    if (sanitized.includes('!')) {
       const factorial = (n: number): number => {
          if (n < 0) return NaN;
          if (n === 0 || n === 1) return 1;
          let r = 1;
          for (let i = 2; i <= n; i++) r *= i;
          return r;
       };
       sanitized = sanitized.replace(/(\d+)!/g, (_, n) => factorial(parseInt(n)).toString());
    }

    const fn = new Function('safe', `return ${sanitized}`);
    const result = fn(safeMath);

    if (!isFinite(result) || isNaN(result)) return 'Error';
    
    // Use scientific notation for numbers exceeding threshold
    if (Math.abs(result) >= resultThreshold) {
      return result.toExponential(4);
    }
    
    return parseFloat(result.toFixed(10)).toString();

  } catch (e) {
    return 'Error';
  }
};

export const gcd = (a: number, b: number): number => {
  return b === 0 ? a : gcd(b, a % b);
};

export const simplifyFraction = (num: number, den: number): { num: number, den: number } => {
  if (den === 0) return { num: 0, den: 0 };
  const common = gcd(Math.abs(num), Math.abs(den));
  let rNum = num / common;
  let rDen = den / common;
  if (rDen < 0) {
    rNum = -rNum;
    rDen = -rDen;
  }
  return { num: rNum, den: rDen };
};

export const toMixedNumber = (num: number, den: number): { whole: number, num: number, den: number } => {
  const whole = Math.floor(Math.abs(num) / Math.abs(den)) * (num < 0 ? -1 : 1);
  const remainderNum = Math.abs(num) % Math.abs(den);
  return {
    whole,
    num: remainderNum,
    den: Math.abs(den)
  };
};

export const decimalToFraction = (decimalStr: string): { num: number, den: number } | null => {
  const parts = decimalStr.split('.');
  if (parts.length > 2) return null;
  
  const whole = parseInt(parts[0]) || 0;
  const fractionPart = parts[1];
  
  if (!fractionPart) {
    return { num: whole, den: 1 };
  }
  
  const den = Math.pow(10, fractionPart.length);
  const num = parseInt(fractionPart);
  
  const totalNum = whole >= 0 
    ? whole * den + num 
    : whole * den - num;

  return simplifyFraction(totalNum, den);
};

export const formatWithCommas = (expression: string, digitLimit: number = 20): string => {
  if (!expression) return '';
  // If already scientific, just return it
  if (expression.includes('e+') || expression.includes('e-')) {
    return expression;
  }
  // Replace each numerical chunk
  return expression.replace(/(\d+)(\.\d*)?/g, (_match, p1, p2) => {
    // If integer part exceeds limit, use exponential
    if (p1.length > digitLimit) {
      return Number(p1 + (p2 || '')).toExponential(4);
    }
    return parseInt(p1).toLocaleString('en-US') + (p2 || '');
  });
};
