import CalculatorActionTypes from './calculator.types';
import SwapRates from './calculator.data';
import { localizedDaysOfWeek } from './calculator.util';

const dayOfWeek = localizedDaysOfWeek().filter((val, index) => index > 0 && index < 6);

const INITIAL_STATE = {
  swapRates: SwapRates,
  baseCurrency: ['AUD', 'EUR', 'USD', 'GBP', 'HKD'],
  dayOfWeek,
  directions: ['Long', 'Short'],
  exchangeRate: 0,
  symbol: '',
  ccyCharge: 0,
  swapRate: SwapRates['AUDUSD']['long'],
  accBaseCharge: 0,
  args: []
};

const calculatorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CalculatorActionTypes.FETCH_EXCHANGE_RATE_START:
      return {
        ...state,
        symbol: action.payload
      };
    case CalculatorActionTypes.FETCH_EXCHANGE_RATE_SUCCESS:
      return {
        ...state,
        exchangeRate: action.payload
      };
    case CalculatorActionTypes.FETCH_ACC_BASECHARGE_START:
    case CalculatorActionTypes.FETCH_CCY_CHARGE_RATE_START:
      return {
        ...state,
        args: action.payload
      };
    case CalculatorActionTypes.FETCH_ACC_BASECHARGE_SUCCESS:
      return {
        ...state,
        accBaseCharge: action.payload
      };
    case CalculatorActionTypes.FETCH_CCY_CHARGE_RATE_SUCCESS:
      return {
        ...state,
        ccyCharge: action.payload
      };
    case CalculatorActionTypes.FETCH_EXCHANGE_RATE_FAILURE:
    case CalculatorActionTypes.FETCH_ACC_BASECHARGE_FAILURE:
    case CalculatorActionTypes.FETCH_CCY_CHARGE_RATE_FAILURE:
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};

export default calculatorReducer;