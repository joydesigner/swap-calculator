import CalculatorActionTypes from './calculator.types';

export const fetchExchangeRateStart = symbol => ({
  type: CalculatorActionTypes.FETCH_EXCHANGE_RATE_START,
  payload: symbol
});

export const fetchExchangeRateSuccess = exchangeRate => ({
  type: CalculatorActionTypes.FETCH_EXCHANGE_RATE_SUCCESS,
  payload: exchangeRate
});

export const fetchExchangeRateFailure = errorMessage => ({
  type: CalculatorActionTypes.FETCH_EXCHANGE_RATE_FAILURE,
  payload: errorMessage
});

export const fetchAccBaseChargeStart = args => ({
  type: CalculatorActionTypes.FETCH_ACC_BASECHARGE_START,
  payload: args
});

export const fetchAccBaseChargeSuccess = accBaseCharge => ({
  type: CalculatorActionTypes.FETCH_ACC_BASECHARGE_SUCCESS,
  payload: accBaseCharge
});

export const fetchAccBaseChargeFailure = errorMessage => ({
  type: CalculatorActionTypes.FETCH_ACC_BASECHARGE_FAILURE,
  payload: errorMessage
});

export const fetchCCYChargeRateStart = args => ({
  type: CalculatorActionTypes.FETCH_CCY_CHARGE_RATE_START,
  payload: args
});

export const fetchCCYChargeRateSuccess = ccyChargeRate => ({
  type: CalculatorActionTypes.FETCH_CCY_CHARGE_RATE_SUCCESS,
  payload: ccyChargeRate
});

export const fetchCCYChargeRateFailure = errorMessage => ({
  type: CalculatorActionTypes.FETCH_CCY_CHARGE_RATE_FAILURE,
  payload: errorMessage
});



