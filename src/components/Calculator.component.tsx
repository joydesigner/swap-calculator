import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchExchangeRateStart, fetchAccBaseChargeStart, fetchCCYChargeRateStart } from '../redux/calculator/calculator.actions';
import { selectSwapRatesForCurrency, selectSwapRatesForBaseCurrency, selectDayOfWeek, selectDirections, selectSwapRateLong, selectSwapRates, selectAccBaseCharge, selectCCYCharge } from '../redux/calculator/calculator.selectors';
import { getSwapRate, getCcyCharge, fetchExchangeRate } from '../redux/calculator/calculator.util';

type CalculatorProps = { swapCurrencies: string[], baseCurrencies: string[], dayOfWeek: string[], directions: string[], swapRateLong: number, swapRates: object, fetchExchangeRateStart: any, fetchAccBaseChargeStart: any, fetchCCYChargeRateStart: any, accBaseCharge: number, ccyCharge: number };

const Calculator = ({ swapCurrencies, baseCurrencies, dayOfWeek, directions, swapRateLong, swapRates, fetchExchangeRateStart, fetchAccBaseChargeStart, fetchCCYChargeRateStart, accBaseCharge, ccyCharge }: CalculatorProps) => {
  const [positionSize, setPositionSize] = useState(1);
  const [swapRate, setSwapRate] = useState(swapRateLong);
  const initialSymbol = swapCurrencies[5];
  const [symbol, setSymbol] = useState(initialSymbol);
  const [selectedDirection, setSelectedDirection] = useState(directions[0].toLowerCase());
  const [dow, setdow] = useState(1);
  const [baseCurrency, setBaseCurrency] = useState('AUD');
  const [exchangeRate, setExchangeRate] = useState(0);

  useEffect(() => {
    async function runCalculator() {
      const exRate = await fetchExchangeRate(initialSymbol);
      const ccyChargeRate = getCcyCharge(exRate, 1, swapRate, dow);

      setExchangeRate(exRate);
      setSymbol(initialSymbol);
      fetchCCYChargeRateStart([exRate, 1, swapRate, dow]);
      fetchAccBaseChargeStart([ccyChargeRate, symbol, baseCurrency]);
    }
    runCalculator();

  }, []);

  const onPositionSizeChangeHandle = event => {
    const { value } = event.target;
    const ccyChargeRate = getCcyCharge(exchangeRate, value, swapRate, dow);

    setPositionSize(value);
    fetchCCYChargeRateStart([exchangeRate, value, swapRate, dow]);
    fetchAccBaseChargeStart([ccyChargeRate, symbol, baseCurrency]);
  }


  const onSymbolChangeHandle = async event => {
    const swapCurrency = event.target.value;
    const swapRate = getSwapRate(swapRates, swapCurrency, selectedDirection);
    const exRate = await fetchExchangeRate(swapCurrency);
    const ccyChargeRate = getCcyCharge(exRate, positionSize, swapRate, dow);

    setSymbol(swapCurrency);
    setSwapRate(swapRate);
    setExchangeRate(exRate);
    fetchExchangeRateStart(symbol);
    fetchCCYChargeRateStart([exchangeRate, positionSize, swapRate, dow]);
    fetchAccBaseChargeStart([ccyChargeRate, swapCurrency, baseCurrency]);
  }

  const onDirectionChangeHandle = event => {
    const { value } = event.target;
    const swapRate = getSwapRate(swapRates, symbol, value);
    const ccyChargeRate = getCcyCharge(exchangeRate, positionSize, swapRate, dow);

    setSelectedDirection(value);
    setSwapRate(swapRate);
    fetchCCYChargeRateStart([exchangeRate, positionSize, swapRate, dow]);
    fetchAccBaseChargeStart([ccyChargeRate, symbol, baseCurrency]);
  }

  const onDayOfWeekChangeHandle = event => {
    const dayOfWeek = parseInt(event.target.value);
    const ccyChargeRate = getCcyCharge(exchangeRate, positionSize, swapRate, dayOfWeek);

    setdow(dayOfWeek);
    fetchExchangeRate(symbol);
    fetchCCYChargeRateStart([exchangeRate, positionSize, swapRate, dayOfWeek]);
    fetchAccBaseChargeStart([ccyChargeRate, symbol, baseCurrency]);
  }

  const onBaseCurrencyChangeHandle = async event => {
    const { value } = event.target;

    setBaseCurrency(value);
    fetchAccBaseChargeStart([ccyCharge, symbol, value]);
  }

  return (
    <div className='calculator'>
      <form id='calculator-form'>
        <h2 className='text-center'>Swap Calculator</h2>
        <div className='form-group'>
          <label htmlFor="symbol">Currency</label>
          <select className='form-control' id='symbol' name='symbol' value={symbol} onChange={onSymbolChangeHandle}>
            {swapCurrencies.map(currency => (
              <option key={currency} value={currency} >{currency}</option>
            ))}
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='positionSize'>Position size (lots)</label>
          <input className='form-control' id='positionSize' name='positionSize' type='number' value={positionSize} onChange={onPositionSizeChangeHandle} />
        </div>

        <div className='form-group'>
          <label htmlFor='exchangeRate'>Exchange rate</label>
          <input disabled className='form-control' id='exchangeRate' name='exchangeRate' value={exchangeRate.toFixed(4)} />
        </div>

        <div className='form-group'>
          <label htmlFor='baseCurrency' >Acc base currency</label>
          <select className='form-control' id='baseCurrency' name='baseCurrency' value={baseCurrency} onChange={onBaseCurrencyChangeHandle}>
            {baseCurrencies.map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='dayOfWeek'>Day of the week hold</label>
          <select className='form-control' id='dayOfWeek' name='dayOfWeek' value={dow} onChange={onDayOfWeekChangeHandle} >
            {
              dayOfWeek.map((day, index) => (
                <option key={day} value={index + 1}>{day}</option>
              ))
            }

          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='direction'>Direction</label>
          <select className='form-control' id='direction' name='direction' onChange={onDirectionChangeHandle} value={selectedDirection}>
            {
              directions.map(direction => (
                <option key={direction} value={direction.toLowerCase()}>{direction}</option>
              ))
            }
          </select>
        </div>

        <div className='form-group'>
          <label htmlFor='swapRate'>Swap rate </label>
          <input id='swapRate' disabled name='swapRate' className='form-control' value={swapRate.toFixed(4)} />
        </div>
        <h3>Quote CCY Charge ccyCharge &nbsp;
        {ccyCharge.toFixed(4)}
        </h3>
        <h3 >Charge in acccount base currency &nbsp;
        {accBaseCharge.toFixed(4)}
        </h3>
      </form>
    </div>
  )
};

const mapStateToProps = (state, props) => createStructuredSelector({
  swapCurrencies: selectSwapRatesForCurrency,
  baseCurrencies: selectSwapRatesForBaseCurrency,
  dayOfWeek: selectDayOfWeek,
  directions: selectDirections,
  swapRateLong: selectSwapRateLong,
  swapRates: selectSwapRates,
  accBaseCharge: selectAccBaseCharge,
  ccyCharge: selectCCYCharge
});

const mapDispatchToProps = dispatch => ({
  fetchExchangeRateStart: symbol => dispatch(fetchExchangeRateStart(symbol)),
  fetchCCYChargeRateStart: (exchangeRate, positionSize, swapRate, dayOfWeek) => dispatch(fetchCCYChargeRateStart(exchangeRate, positionSize, swapRate, dayOfWeek)),
  fetchAccBaseChargeStart: (ccyCharge, symbol, baseCurrency) => dispatch(fetchAccBaseChargeStart(ccyCharge, symbol, baseCurrency))
});

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);