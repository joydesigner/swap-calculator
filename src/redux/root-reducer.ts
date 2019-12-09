import { combineReducers } from 'redux';

import calculatorReducer from './calculator/calculator.reducer';

const rootReducer = combineReducers({
  calculator: calculatorReducer
});

export default rootReducer;