import { takeLatest, put, all, call } from 'redux-saga/effects';
import CalculatorActionTypes from './calculator.types';
import { fetchExchangeRate, getAccBaseCharge } from './calculator.util';
import { fetchExchangeRateSuccess, fetchExchangeRateFailure, fetchAccBaseChargeSuccess, fetchAccBaseChargeFailure } from './calculator.actions';

export function* fetchExchangeRateAsync({ payload }) {
  try {
    const exchangeRate = yield call(fetchExchangeRate, payload);
    yield put(fetchExchangeRateSuccess(exchangeRate.toFixed(4)));
  } catch (error) {
    yield put(fetchExchangeRateFailure(error.message));
  }
}

export function* fetchAccBaseChargeAsync({ payload }) {
  try {
    yield console.log('args', payload);
    const accBaseChargeRate = yield call(getAccBaseCharge, payload[0], payload[1], payload[2]);
    yield put(fetchAccBaseChargeSuccess(accBaseChargeRate.toFixed(4)));
  } catch (error) {
    yield put(fetchAccBaseChargeFailure(error.message));
  }
}

export function* fetchExchangeRateStart() {
  yield takeLatest(CalculatorActionTypes.FETCH_EXCHANGE_RATE_START, fetchExchangeRateAsync);
}

export function* fetchAccBaseChargeStart() {
  yield takeLatest(CalculatorActionTypes.FETCH_ACC_BASECHARGE_START, fetchAccBaseChargeAsync);
}

export function* calculatorSagas() {
  yield all(
    [
      call(fetchExchangeRateStart),
      call(fetchAccBaseChargeStart)
    ],
  );
}