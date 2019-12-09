export interface ICalculatorState {
  readonly swapRates: object;
  readonly baseCurrency: string[];
  readonly dayOfWeek: string[];
  readonly directions: string[];
  readonly exchangeRate: number;
  readonly symbol: string;
  readonly ccyCharge: number;
  readonly swapRate: number;
  readonly accBaseCharge: number;
  readonly args: string[];
}

export interface IBaseAction {
  readonly type: string;
  payload?: any;
}