import { createSelector } from 'reselect';

const selectCalculator = state => state.calculator;

export const selectSwapRates = createSelector(
  [selectCalculator],
  calculator => calculator.swapRates
);

export const selectSwapRatesForBaseCurrency = createSelector(
  [selectCalculator],
  calculator => calculator.baseCurrency
);

export const selectSwapRatesForCurrency = createSelector(
  [selectSwapRates],
  swapRates => Object.keys(swapRates)
);

export const selectDayOfWeek = createSelector(
  [selectCalculator],
  calculator => calculator.dayOfWeek
);

export const selectDirections = createSelector(
  [selectCalculator],
  calculator => calculator.directions
);

export const selectSwapRateLong = createSelector(
  [selectCalculator],
  calculator => calculator.swapRate
);

export const selectExchangeRate = createSelector(
  [selectCalculator],
  calculator => calculator.exchangeRate
);

export const selectAccBaseCharge = createSelector(
  [selectCalculator],
  calculator => calculator.accBaseCharge
);

export const selectCCYCharge = createSelector(
  [selectCalculator],
  calculator => calculator.ccyCharge
);







