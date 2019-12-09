export interface ICalculatorState {
  readonly swapRates: any;
  readonly baseCurrency: string[];
  readonly dayOfWeek: string[];
  readonly directions: string[];
  readonly exchangeRate: number;
  readonly symbol: string;
  readonly ccyCharge: number;
  readonly swapRate: number;
  readonly accBaseCharge: number;
  readonly args: any[];
}

export interface IBaseAction {
  readonly type: string;
  payload?: any;
}

export type CalculatorProps = { swapCurrencies?: string[], baseCurrencies?: string[], dayOfWeek?: string[], directions?: string[], swapRateLong?: number, swapRates?: object, fetchExchangeRateStart?: any, fetchAccBaseChargeStart?: any, fetchCCYChargeRateStart?: any, accBaseCharge?: number, ccyCharge?: number };