import { all, call } from 'redux-saga/effects';
import { calculatorSagas } from './calculator/calculator.sagas';

export default function* rootSaga() {
  yield all([
    call(calculatorSagas)
  ])
}