import { takeLatest, put, all, call } from 'redux-saga/effects';
import CalculatorActionTypes from './calculator.types';
import { fetchExchangeRate, getAccBaseCharge, getCcyCharge } from './calculator.util';
import { IBaseAction } from './common.types';
import { fetchExchangeRateSuccess, fetchExchangeRateFailure, fetchAccBaseChargeSuccess, fetchAccBaseChargeFailure, fetchCCYChargeRateSuccess, fetchCCYChargeRateFailure } from './calculator.actions';

export function* fetchExchangeRateAsync({ payload }: IBaseAction) {
  try {
    const exchangeRate = yield call(fetchExchangeRate, payload);
    yield put(fetchExchangeRateSuccess(exchangeRate));
  } catch (error) {
    yield put(fetchExchangeRateFailure(error.message));
  }
}

export function* fetchAccBaseChargeAsync({ payload }: IBaseAction) {
  try {
    const accBaseChargeRate = yield call(getAccBaseCharge, parseFloat(payload[0]), payload[1], payload[2]);
    yield put(fetchAccBaseChargeSuccess(accBaseChargeRate));
  } catch (error) {
    yield put(fetchAccBaseChargeFailure(error.message));
  }
}

export function* fetchCCYChargeRateAsync({ payload }: IBaseAction) {
  try {
    const ccyChargeRate = yield call(getCcyCharge, payload[0], payload[1], payload[2], payload[3]);
    yield put(fetchCCYChargeRateSuccess(ccyChargeRate));
  } catch (error) {
    yield put(fetchCCYChargeRateFailure(error.message));
  }
}

export function* fetchExchangeRateStart() {
  yield takeLatest(CalculatorActionTypes.FETCH_EXCHANGE_RATE_START, fetchExchangeRateAsync);
}

export function* fetchAccBaseChargeStart() {
  yield takeLatest(CalculatorActionTypes.FETCH_ACC_BASECHARGE_START, fetchAccBaseChargeAsync);
}

export function* fetchCCYChargeRateStart() {
  yield takeLatest(CalculatorActionTypes.FETCH_CCY_CHARGE_RATE_START, fetchCCYChargeRateAsync);
}

export function* calculatorSagas() {
  yield all(
    [
      call(fetchExchangeRateStart),
      call(fetchCCYChargeRateStart),
      call(fetchAccBaseChargeStart),
    ],
  );
}