import CalculatorActionTypes from './calculator.types';
import { IBaseAction } from './common.types';

export const fetchExchangeRateStart = (symbol: string): IBaseAction => ({
  type: CalculatorActionTypes.FETCH_EXCHANGE_RATE_START,
  payload: symbol
});

export const fetchExchangeRateSuccess = (exchangeRate: number): IBaseAction => ({
  type: CalculatorActionTypes.FETCH_EXCHANGE_RATE_SUCCESS,
  payload: exchangeRate
});

export const fetchExchangeRateFailure = (errorMessage: string): IBaseAction => ({
  type: CalculatorActionTypes.FETCH_EXCHANGE_RATE_FAILURE,
  payload: errorMessage
});

export const fetchAccBaseChargeStart = (args: string[]): IBaseAction => ({
  type: CalculatorActionTypes.FETCH_ACC_BASECHARGE_START,
  payload: args
});

export const fetchAccBaseChargeSuccess = (accBaseCharge: string): IBaseAction => ({
  type: CalculatorActionTypes.FETCH_ACC_BASECHARGE_SUCCESS,
  payload: accBaseCharge
});

export const fetchAccBaseChargeFailure = (errorMessage: string): IBaseAction => ({
  type: CalculatorActionTypes.FETCH_ACC_BASECHARGE_FAILURE,
  payload: errorMessage
});

export const fetchCCYChargeRateStart = (args: string[]): IBaseAction => ({
  type: CalculatorActionTypes.FETCH_CCY_CHARGE_RATE_START,
  payload: args
});

export const fetchCCYChargeRateSuccess = (ccyChargeRate: number): IBaseAction => ({
  type: CalculatorActionTypes.FETCH_CCY_CHARGE_RATE_SUCCESS,
  payload: ccyChargeRate
});

export const fetchCCYChargeRateFailure = (errorMessage: string): IBaseAction => ({
  type: CalculatorActionTypes.FETCH_CCY_CHARGE_RATE_FAILURE,
  payload: errorMessage
});



