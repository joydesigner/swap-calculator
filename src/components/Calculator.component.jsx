import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchExchangeRateStart, fetchAccBaseChargeStart } from '../redux/calculator/calculator.actions';
import { selectSwapRatesForCurrency, selectSwapRatesForBaseCurrency, selectDayOfWeek, selectDirections, selectSwapRateLong, selectSwapRates, selectExchangeRate, selectAccBaseCharge } from '../redux/calculator/calculator.selectors';
import { getSwapRate, getCcyCharge } from '../redux/calculator/calculator.util';

const Calculator = ({ swapCurrencies, baseCurrencies, dayOfWeek, directions, swapRateLong, swapRates, fetchExchangeRateStart, fetchAccBaseChargeStart, exchangeRate, accBaseCharge }) => {
  const [positionSize, setPositionSize] = useState(1);
  const [swapRate, setSwapRate] = useState(swapRateLong);
  const initialSymbol = swapCurrencies[5];
  const [symbol, setSymbol] = useState(initialSymbol);
  const [selectedDirection, setSelectedDirection] = useState(directions[0].toLowerCase());
  const [ccyCharge, setCcyCharge] = useState(0);
  const [dow, setdow] = useState(1);
  const [baseCurrency, setBaseCurrency] = useState('AUD');
  // const [accBaseCharge, setAccBaseCharge] = useState(0);

  useEffect(() => {
    async function fetchRate() {
      fetchExchangeRateStart(initialSymbol);
      setSymbol(initialSymbol);
      const ccyChargeRate = getCcyCharge(exchangeRate, positionSize, swapRate, dow).toFixed(4);
      setCcyCharge(ccyChargeRate);
      fetchAccBaseChargeStart([parseFloat(ccyChargeRate), symbol, baseCurrency]);
    }
    fetchRate();
  }, []);

  const onPositionSizeChangeHandle = async event => {
    const { value } = event.target;
    setPositionSize(value);
    const ccyChargeRate = getCcyCharge(exchangeRate, value, swapRate, dow).toFixed(4);
    fetchAccBaseChargeStart([parseFloat(ccyChargeRate), symbol, baseCurrency]);
    setCcyCharge(ccyChargeRate);
  }

  const onExchangeRateChangeHandle = event => {

  }

  const onSymbolChangeHandle = async event => {
    console.log(event.target.value);
    const symbol = event.target.value;
    const swapRate = getSwapRate(swapRates, symbol, selectedDirection);
    fetchExchangeRateStart(symbol);
    const ccyChargeRate = getCcyCharge(exchangeRate, positionSize, swapRate, dow).toFixed(4);
    fetchAccBaseChargeStart([parseFloat(ccyChargeRate), symbol, baseCurrency]);
    console.log('accBaseCharge', accBaseCharge);
    setCcyCharge(ccyChargeRate);
    setSymbol(symbol);
    setSwapRate(swapRate.toFixed(4));
  }

  const onDirectionChangeHandle = async event => {
    const { value } = event.target;
    const swapRate = getSwapRate(swapRates, symbol, value);
    const ccyChargeRate = getCcyCharge(exchangeRate, positionSize, swapRate, dow).toFixed(4);
    fetchAccBaseChargeStart([parseFloat(ccyChargeRate), symbol, baseCurrency]);
    setSelectedDirection(value);
    setSwapRate(swapRate);
    setCcyCharge(ccyChargeRate);
  }

  const onDayOfWeekChangeHandle = async event => {
    const dayOfWeek = parseInt(event.target.value);
    const ccyChargeRate = getCcyCharge(exchangeRate, positionSize, swapRate, dayOfWeek).toFixed(4);
    fetchAccBaseChargeStart([parseFloat(ccyChargeRate), symbol, baseCurrency]);
    setdow(dayOfWeek);
    setCcyCharge(ccyChargeRate);
  }

  const onBaseCurrencyChangeHandle = async event => {
    const { value } = event.target;
    fetchAccBaseChargeStart([parseFloat(ccyCharge), symbol, value]);
    setBaseCurrency(value);
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
          <input disabled className='form-control' id='exchangeRate' name='exchangeRate' value={exchangeRate} onChange={onExchangeRateChangeHandle} />
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
          <input id='swapRate' disabled name='swapRate' className='form-control' value={swapRate} />
        </div>
        <h3>Quote CCY Charge ccyCharge &nbsp;
        {ccyCharge}
        </h3>
        <h3 >Charge in acccount base currency &nbsp;
        {accBaseCharge}
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
  exchangeRate: selectExchangeRate,
  accBaseCharge: selectAccBaseCharge
});

const mapDispatchToProps = dispatch => ({
  fetchExchangeRateStart: symbol => dispatch(fetchExchangeRateStart(symbol)),
  fetchAccBaseChargeStart: (ccyCharge, symbol, baseCurrency) => dispatch(fetchAccBaseChargeStart(ccyCharge, symbol, baseCurrency))
});

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);