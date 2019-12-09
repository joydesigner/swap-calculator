export const ticker = (symbol) => symbol.trim().match(/.{1,3}/g);

export const fetchExchangeRate = async (symbol) => {
  const [base, currency] = ticker(symbol);
  const { rates } = await fetch(`https://openexchangerates.org/api/latest.json?app_id=aaaf757c39ce48ba85b5276f71a34f1d&base=${base}&symbols=${currency}`)
    .then(_ => _.json());
  return rates[currency];
};

export const getSwapRate = (swapRatesData, symbol, direction) => {
  console.log(swapRatesData[symbol][direction]);
  return swapRatesData[symbol][direction]
};

export const getCcyCharge = (exchangeRate, positionSize, swapRate, dayOfWeek) => {
  return (0.00001 / exchangeRate) * (positionSize * 100000 * swapRate) * ((dayOfWeek === 3) ? 3 : 1);
};

export const localizedDaysOfWeek = () => {
  let day = new Date();
  const daysOfWeek = [];

  for (let i = 0; i < 7; ++i) {
    const dayOfWeek = new Date(day);
    dayOfWeek.setDate(day.getDate() + 1);
    day = dayOfWeek;

    daysOfWeek[day.getDay()] = day.toLocaleString(window.navigator.language, { weekday: 'long' });
  };

  return daysOfWeek;
};

export const getAccBaseCharge = async (ccyCharge, symbol, baseCurrency) => {
  const exRate = await fetchExchangeRate(`${ticker(symbol)[1]}${baseCurrency}`);
  return ccyCharge * exRate;
};
