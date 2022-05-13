import React, { useEffect, useState } from "react";
import CurrencyInput from "./components/CurrencyInput";

import Header from './components/Header';

const BASE_URL = "https://open.exchangerate-api.com/v6/latest/UAH";

function App() {
  const [currencyOptions, setcurrencyOptions] = useState([]);
  const [fromCurrency, setfromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [usd, setUsd] = useState();
  const [euro, setEuro] = useState();
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState();
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }
  useEffect(() => {
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const firstCurrency = Object.keys(data.base_code);
        const secondCurrency = Object.keys(data.rates)[65];
        setcurrencyOptions(Object.keys(data.rates));
        setfromCurrency(firstCurrency);
        setToCurrency(secondCurrency);
        setUsd(data.rates['USD']);
        setEuro(data.rates['EUR']);
      });
  }, []);
  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base_code=${fromCurrency}&symbols=${toCurrency}`)
        .then((res) => res.json())
        .then((data) => setExchangeRate(data.rates[toCurrency]));

    }
  }, [fromCurrency, toCurrency]);
  function handleFromAmount(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  }
  function handleToAmount(e) {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <>
      <div className="container">
        <Header usd={usd} euro={euro}/>

        <div className="form">
          <div className="form-content">
            <div className="item">
            <p>From</p>
            <CurrencyInput
              currencyOptions={currencyOptions}
              selectedCurrency={fromCurrency}
              onchangeCurrency={(e) => {
                setfromCurrency(e.target.value);
              }}
              amount={fromAmount}
              onchangeAmount={handleFromAmount}
            />
            </div>
            <div className="item">
            <p>TO</p>
            <CurrencyInput
              currencyOptions={currencyOptions}
              selectedCurrency={toCurrency}
              onchangeCurrency={(e) => {
                setToCurrency(e.target.value);
              }}
              amount={toAmount}
              onchangeAmount={handleToAmount}
            />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
