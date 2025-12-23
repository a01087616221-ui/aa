
export type Operation = '+' | '-' | '*' | '/' | '%' | '^' | null;

export interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export interface CalculationState {
  currentValue: string;
  previousValue: string | null;
  operation: Operation;
  isNewInput: boolean;
}
