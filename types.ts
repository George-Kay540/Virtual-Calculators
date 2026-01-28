export enum CalculatorType {
  BASIC = 'basic',
  SCIENTIFIC = 'scientific',
  FRACTION = 'fraction',
  PERCENTAGE = 'percentage',
  ABOUT = 'about',
  TERMS = 'terms',
  PRIVACY = 'privacy'
}

export type AngleMode = 'deg' | 'rad';

export interface CalculatorState {
  display: string;
  result: string;
  history: string;
  isError: boolean;
  lastAnswer?: string;
}

export interface FractionState {
  num1: string;
  den1: string;
  num2: string;
  den2: string;
  operator: '+' | '-' | '*' | '/';
}